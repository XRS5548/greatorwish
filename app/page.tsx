import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function SimpleTemplatePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Choose Your Template
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">💌</div>
            <h3 className="text-xl font-bold mb-2">Sample 1</h3>
            <p className="text-gray-600 mb-6">Classic invitation design</p>
            <Link href={"/templates/invitation/sample1"}>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Select Template
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Sample 2</h3>
            <p className="text-gray-600 mb-6">Modern invitation design</p>
            <Link href={"/templates/invitation/sample2"}>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Select Template
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Sample 3</h3>
            <p className="text-gray-600 mb-6">Creative invitation design</p>
            <Link href={"/templates/invitation/sample3"}>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Select Template
              </Button>
            </Link>
          </div>
           <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Sample 4</h3>
            <p className="text-gray-600 mb-6">Creative invitation design</p>
            <Link href={"/templates/invitation/sample4"}>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Select Template
              </Button>
            </Link>
          </div>
          
        </div>



        
        
        <p className="text-center text-gray-500 mt-10">
          Select any template to customize and create your perfect invitation
        </p>
        
      </div>
    </div>
  )
}