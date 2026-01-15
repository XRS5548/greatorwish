import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { username, name, email, phone, password } = await req.json()

    if (!username || !name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // 🔗 MongoDB connect (INLINE)
    const client = new MongoClient(process.env.MONGODB_URI!)
    await client.connect()

    const db = client.db("maindatabase")
    const users = db.collection("users")

    // 🔍 Duplicate check
    const exists = await users.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
        { phone },
      ],
    })

    if (exists) {
      await client.close()
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await users.insertOne({
      username: username.toLowerCase(),
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: "creator",
      createdAt: new Date(),
    })

    // 🔑 JWT
    const token = jwt.sign(
      { userId: result.insertedId },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    await client.close()

    const res = NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: result.insertedId,
          username,
          name,
          email,
        },
      },
      { status: 201 }
    )

    // 🍪 Cookie set
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
