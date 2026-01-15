'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

export default function RomanticInvitation() {
  const [step, setStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  
  const steps = [
    {
      title: "Ek Special Invitation",
      message: "Rajveer Sir, main aapse kuch poochna chahti hoon...",
      buttonText: "Aage badhein"
    },
    {
      title: "Freshers Party",
      message: "Freshers party 18 January, 2026 ko hai",
      buttonText: "Sunne mein interesting hai"
    },
    {
      title: "Ek Request",
      message: "Main soch rahi thi ki kya aap mere partner ban kar mere saath aa sakte hain?",
      buttonText: "Aur bataiye"
    },
    {
      title: "Ek Yaadgar Shaam",
      message: "Shaam ke liye aapka saath bahut khoobsurat hoga",
      buttonText: "Aapka kya kehna hai?"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowFinal(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setShowFinal(false);
  };

  return (
    <>
      <Head>
        <title>Rajveer Sir ke liye Invitation</title>
        <meta name="description" content="Rajveer Sir ke liye ek special invitation" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-rose-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative Header */}
          <div className="relative h-32 bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-rose-200 rounded-full -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-200 rounded-full translate-x-16 translate-y-16"></div>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-rose-800 font-playfair">Ek Invitation</h1>
              <div className="flex justify-center mt-2">
                <div className="w-16 h-1 bg-rose-300 rounded-full"></div>
              </div>
            </motion.div>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {!showFinal ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Name Display */}
                  <motion.div 
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Rajveer Sir ke liye</h2>
                    <div className="flex justify-center">
                      <div className="w-12 h-0.5 bg-rose-300"></div>
                    </div>
                  </motion.div>

                  {/* Step Content */}
                  <h3 className="text-3xl md:text-4xl font-bold text-rose-700 mb-6 font-dancing">
                    {steps[step].title}
                  </h3>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {steps[step].message}
                  </motion.p>

                  {/* Date Display */}
                  {step === 1 && (
                    <motion.div 
                      className="mb-8 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200 inline-block"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="text-2xl font-bold text-rose-700">18 January, 2026</div>
                      <div className="text-lg text-rose-600">Sunday Shaam</div>
                    </motion.div>
                  )}

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mb-10">
                    {steps.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === step ? 'bg-rose-500' : 'bg-rose-200'}`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={handleNext}
                    className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-rose-600 hover:to-pink-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {steps[step].buttonText}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Final Message */}
                  <motion.div
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="mb-8 inline-block"
                  >
                    <div className="text-6xl">💖</div>
                  </motion.div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-rose-700 mb-6 font-dancing">
                        Kya Aap Mere Saath Aayenge?
                  </h3>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Rajveer Sir, aapka saath mujhe bahut special lagega freshers party ke liye, 18 January 2026 ko.
                  </motion.p>
                  
                  <motion.div 
                    className="mb-10 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-2xl font-bold text-rose-700 mb-2">Ek khoobsurat shaam ke liye intezaar rahega</div>
                    <div className="text-lg text-rose-600">Aapki Mojudgi shaam ko special banayegi</div>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={handleReset}
                      className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Phir Se Padhein
                    </motion.button>
                    
                    <motion.button
                      onClick={() => alert("Dhanyawaad! Party mein saath bitane ka intezaar rahega!")}
                      className="px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Khushi Se Sweekar Karen
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    className="mt-10 pt-6 border-t border-rose-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-lg text-rose-500">Aapki aagrah se,</p>
                    <p className="text-md text-gray-600 mt-2">Freshers party mein aapse milne ka intezaar rahega</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative Footer */}
          <div className="h-6 bg-gradient-to-r from-rose-100 to-pink-100"></div>
        </motion.div>

        {/* Floating Hearts */}
        <div className="fixed top-10 left-5 text-2xl opacity-30 animate-pulse">❤️</div>
        <div className="fixed top-20 right-10 text-xl opacity-40 animate-pulse delay-100">💕</div>
        <div className="fixed bottom-20 left-10 text-3xl opacity-20 animate-pulse delay-300">💖</div>
        <div className="fixed bottom-10 right-20 text-xl opacity-50 animate-pulse delay-200">💗</div>
        
        {/* Instructions */}
        <motion.div 
          className="mt-8 text-center text-gray-600 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm">Rajveer Sir ko freshers party ke liye partner banne ka invitation, 18 January 2026.</p>
        </motion.div>
      </div>
    </>
  );
}