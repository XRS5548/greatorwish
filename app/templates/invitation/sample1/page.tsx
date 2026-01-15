'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Camera, Star, Sparkles } from 'lucide-react';

interface Flower {
  id: number;
  emoji: string;
  x: number;
}

interface Step {
  title: string;
  content: string;
  button: string;
}

export default function RomanticInvitation() {
  const [step, setStep] = useState<number>(1);
  const [likes, setLikes] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  // Initialize window height on client side
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addFlower = () => {
    const flowerEmojis = ['🌸', '🌹', '💐', '🌺', '🌷', '🥀'];
    const newFlower: Flower = {
      id: Date.now(),
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      x: Math.random() * 80 + 10,
    };
    setFlowers(prev => [...prev, newFlower]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
    }, 5000);
  };

  const sendLove = () => {
    if (message.trim()) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setMessage('');
    }
  };

  const steps: Step[] = [
    {
      title: "Welcome sir! 👋",
      content: "Aaj special hai kyunki hum celebrate kar rahe hain naye rishton ki shuruaat",
      button: "Aage Chalein →"
    },
    {
      title: "Ek Pyara Sa Invitation ✨",
      content: "Rajveer Sir ke saath ek romantic evening ka plan hai",
      button: "Details Dekhein →"
    },
    {
      title: "Special Moments Waiting 💖",
      content: "Music, dance, aur beautiful memories banane ka mauka",
      button: "RSVP Karein →"
    }
  ];

  // Confetti emojis array
  const confettiEmojis = ['🎉', '✨', '🎊', '💖', '🥳'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 md:p-8 font-sans">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 text-2xl"
            initial={{ 
              y: -50, 
              x: Math.random() * 100 
            }}
            animate={{ 
              y: windowHeight + 100,
              x: Math.random() * 100 - 50 + (Math.random() * 100)
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-50px',
              }}
              initial={{ y: 0, rotate: 0 }}
              animate={{ 
                y: windowHeight,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                ease: "easeOut"
              }}
            >
              {confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Flowers */}
      {flowers.map(flower => (
        <motion.div
          key={flower.id}
          className="fixed text-3xl pointer-events-none z-40"
          style={{ left: `${flower.x}%`, top: '-50px' }}
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: windowHeight,
            rotate: 360,
          }}
          transition={{ duration: 5, ease: "easeInOut" }}
        >
          {flower.emoji}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                  ${step >= num ? 'bg-gradient-to-r from-pink-500 to-red-500' : 'bg-gray-300'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step > num ? '✓' : num}
              </motion.div>
              <span className="text-sm mt-2 text-gray-600">
                {['Start', 'Details', 'RSVP'][num-1]}
              </span>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-pink-200/50 border border-pink-100 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-pink-500 via-red-400 to-rose-500 p-8 text-center relative">
            <button 
              onClick={() => setLikes(prev => prev + 1)}
              className="absolute top-4 right-4 bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <Heart className={`w-6 h-6 ${likes > 0 ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {likes}
              </span>
            </button>

            <motion.h1 
              className="text-5xl font-bold text-white mb-4 tracking-tight"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Fresher's Night 2026 💕
            </motion.h1>
            
            <p className="text-xl text-white/90 font-light">
              Pyar bhara, hasi bhara, yaadon bhara ek raat!
            </p>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {/* Current Step Content */}
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {steps[step-1].title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {steps[step-1].content}
              </p>
            </motion.div>

            {/* Interactive Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addFlower}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-pink-200"
              >
                <Sparkles className="w-5 h-5" />
                Flowers Bhejein 🌸
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(prev => !prev)}
                className="px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-purple-200"
              >
                <Music className="w-5 h-5" />
                {isPlaying ? 'Music Band Karein' : 'Music Chalu Karein'} 🎵
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-amber-200"
              >
                <Camera className="w-5 h-5" />
                Photo Click Karein 📸
              </motion.button>
            </div>

            {/* Love Message Box */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-8 border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Rajveer Sir ke liye Message 💌
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Aapka pyar bhara message likhein..."
                  className="flex-1 p-4 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendLove}
                  disabled={!message.trim()}
                  className={`px-8 rounded-xl font-bold text-lg flex items-center gap-2 ${
                    message.trim() 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Bhejein
                </motion.button>
              </div>
            </div>

            {/* Event Details - Hinglish */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="bg-white p-6 rounded-2xl border border-pink-100 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Date & Time</h4>
                    <p className="text-gray-600">15 March 2026, 7:30 PM se</p>
                    <p className="text-sm text-pink-600">Late mat aana please! 😊</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-2xl border border-pink-100 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Venue & Dress Code</h4>
                    <p className="text-gray-600">College Garden (Romantic Setup)</p>
                    <p className="text-sm text-pink-600">Semi-formal / Traditional best hai! 👗</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Host Section - Special for Rajveer Sir */}
            <div className="text-center p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border-2 border-dashed border-pink-300 mb-8">
              <div className="inline-block p-3 rounded-full bg-white shadow-lg mb-4">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Special Host: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Rajveer Sir</span>
              </h3>
              <p className="text-xl text-gray-600 mb-4">
                "Ek aisi party jo yaad rahegi zindagi bhar! 🤗"
              </p>
              <div className="flex justify-center gap-2">
                <span className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm">Charming</span>
                <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm">Funny</span>
                <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm">Amazing Host</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                className={`px-8 py-3 rounded-full font-bold text-lg ${
                  step > 1 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={step === 1}
              >
                ← Pichla Step
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(prev => Math.min(3, prev + 1))}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg shadow-pink-300"
              >
                {step < 3 ? steps[step-1].button : 'Done! 🎉'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <div className="mt-8 flex justify-center gap-8 text-center">
          <div className="bg-white/80 p-4 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-pink-600">150+</div>
            <div className="text-gray-600">Log Attend Kar Rahe</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-pink-600">5+</div>
            <div className="text-gray-600">Special Performances</div>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow-lg">
            <div className="text-2xl font-bold text-pink-600">∞</div>
            <div className="text-gray-600">Memories Banenge</div>
          </div>
        </div>
      </div>
    </main>
  );
}