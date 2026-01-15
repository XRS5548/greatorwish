'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Music2, Camera, PartyPopper, Sparkles, 
  Star, Gift, MessageCircle, Users, Trophy,
  PlayCircle, PauseCircle, Volume2
} from 'lucide-react';

interface Heart {
  id: number;
  emoji: string;
  x: number;
  speed: number;
  size: number;
}

interface Confetti {
  id: number;
  emoji: string;
  x: number;
  rotation: number;
  size: number;
}

interface Memory {
  id: number;
  text: string;
  emoji: string;
}

interface Chat {
  user: string;
  msg: string;
  time: string;
}

export default function MastInvitation() {
  const [activeTab, setActiveTab] = useState<string>('invite');
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [danceMode, setDanceMode] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loveLevel, setLoveLevel] = useState<number>(0);
  const [floatingHearts, setFloatingHearts] = useState<Heart[]>([]);
  const [typingText, setTypingText] = useState<string>('');
  const [currentMessage, setCurrentMessage] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  
  const messages = [
    "Hello Cuties! 👋 Ready for masti?",
    "Rajveer Sir ka special party hai! 🎉",
    "Dance karna hai? Music chalu karein! 🎵",
    "Photo khichna na bhoolna! 📸",
    "Party toh banti hai boss! 🥳"
  ];

  // Typing effect for messages
  useEffect(() => {
    const message = messages[currentMessage];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= message.length) {
        setTypingText(message.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [currentMessage]);

  // Initialize window height
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingHearts.length < 15) {
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💓'];
        const heart: Heart = {
          id: Date.now() + Math.random(),
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          x: Math.random() * 100,
          speed: 2 + Math.random() * 3,
          size: 20 + Math.random() * 20
        };
        setFloatingHearts(prev => [...prev, heart]);
        
        setTimeout(() => {
          setFloatingHearts(prev => prev.filter(h => h.id !== heart.id));
        }, 10000);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [floatingHearts.length]);

  const createConfetti = () => {
    const confettiEmojis = ['🎊', '✨', '🎉', '🎈', '💫'];
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 30; i++) {
      newConfetti.push({
        id: Date.now() + i,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        x: Math.random() * 100,
        rotation: Math.random() * 360,
        size: 15 + Math.random() * 15
      });
    }
    setConfetti(newConfetti);
    
    setTimeout(() => {
      setConfetti([]);
    }, 3000);
  };

  const addMemory = () => {
    const memoriesList = [
      "😍 First time college me party!",
      "🎤 Rajveer Sir ka stand-up comedy!",
      "💃 Group dance competition!",
      "📸 Selfie with seniors!",
      "🎁 Surprise gifts milenge!",
      "🍕 Pizza party!",
      "🎶 DJ night!",
      "🤪 Crazy games!"
    ];
    
    const memoryEmojis = ['😍', '🎤', '💃', '📸', '🎁', '🍕', '🎶', '🤪'];
    
    const newMemory: Memory = {
      id: Date.now(),
      text: memoriesList[Math.floor(Math.random() * memoriesList.length)],
      emoji: memoryEmojis[memories.length % 8]
    };
    
    setMemories(prev => [newMemory, ...prev].slice(0, 5));
    setLoveLevel(prev => Math.min(prev + 10, 100));
  };

  const tabs = [
    { id: 'invite', label: '🎯 Invitation', icon: '📨' },
    { id: 'party', label: '🎉 Party Zone', icon: '🥳' },
    { id: 'rajveer', label: '🌟 Rajveer Sir', icon: '👑' },
    { id: 'chat', label: '💬 Live Chat', icon: '💌' }
  ];

  const chatMessages: Chat[] = [
    { user: "Anjali", msg: "Excited for party! 😍", time: "2 min ago" },
    { user: "Rajveer Sir", msg: "Sabko surprises milega! 🎁", time: "10 min ago" },
    { user: "Priya", msg: "Dress shopping done! 👗", time: "15 min ago" },
    { user: "Aman", msg: "DJ kaun hai? 🎧", time: "20 min ago" },
  ];

  const stats = [
    { label: "Attending", value: "200+", emoji: "👥" },
    { label: "Performances", value: "8", emoji: "🎭" },
    { label: "Hours of Fun", value: "6", emoji: "⏳" },
    { label: "Surprises", value: "∞", emoji: "🎁" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 p-4 md:p-8 font-sans overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: windowHeight + 100,
              opacity: [0, 1, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: heart.speed,
              ease: "linear"
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
        
        {confetti.map(c => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              left: `${c.x}%`,
              fontSize: `${c.size}px`
            }}
            initial={{ y: -50, rotate: 0 }}
            animate={{ 
              y: windowHeight,
              rotate: 720,
              x: [0, 50, -50, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          >
            {c.emoji}
          </motion.div>
        ))}
      </div>

      {/* Dancing Emojis when dance mode is on */}
      {danceMode && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${(i * 10)}%`,
                bottom: '0px'
              }}
              animate={{
                y: [0, -100, 0, -50, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {['💃', '🕺', '👯', '🎊'][i % 4]}
            </motion.div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header with Animated Text */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity 
            }}
          >
            FRESHER'S NIGHT 2026
          </motion.h1>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-2xl text-white font-bold">
              "Bohot MASTI Hogi Boss! 🤪"
            </p>
          </div>
        </motion.div>

        {/* Typing Message Box */}
        <motion.div 
          className="bg-black/20 backdrop-blur-md rounded-2xl p-4 mb-8 border-2 border-white/30 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center text-white text-2xl">
              🎤
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Live Announcement:</div>
              <div className="text-xl text-white">
                {typingText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentMessage((prev) => (prev + 1) % messages.length)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-pink-600 shadow-2xl shadow-white/50' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 border-white/20 shadow-2xl">
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'invite' && (
              <motion.div
                key="invite"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                {/* Love Meter */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold">Party Excitement Level</div>
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="relative h-8 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${loveLevel}%` }}
                      transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                      {loveLevel}% EXCITED! 🔥
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 gap-2">
                    <button 
                      onClick={() => setLoveLevel(prev => Math.min(prev + 10, 100))}
                      className="px-4 py-2 bg-white text-pink-600 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                      Increase Excitement! ⬆️
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm border border-white/30"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-xl font-bold text-white mb-2">Date & Time</h3>
                    <p className="text-white/90">15 March 2026</p>
                    <p className="text-white/90">7:30 PM Onwards</p>
                    <p className="text-sm text-yellow-300 mt-2">Late aaya toh entry nahi! ⏰</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm border border-white/30"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="text-4xl mb-4">📍</div>
                    <h3 className="text-xl font-bold text-white mb-2">Venue</h3>
                    <p className="text-white/90">College Amphitheatre</p>
                    <p className="text-white/90">(Fully Decorated! ✨)</p>
                    <p className="text-sm text-yellow-300 mt-2">Google Maps pe location aayega! 🗺️</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm border border-white/30"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="text-4xl mb-4">👗</div>
                    <h3 className="text-xl font-bold text-white mb-2">Dress Code</h3>
                    <p className="text-white/90">Semi-Formal / Traditional</p>
                    <p className="text-white/90">Best Dress pehno! ✨</p>
                    <p className="text-sm text-yellow-300 mt-2">Fashion show bhi hoga! 👑</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'party' && (
              <motion.div
                key="party"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Party Zone - Mast Karein! 🎪</h2>
                  <p className="text-xl text-white/90">Interactive features try karein</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Music Player */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Music2 className="w-8 h-8 text-white" />
                      <h3 className="text-2xl font-bold text-white">DJ Zone 🎵</h3>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMusicPlaying(!musicPlaying)}
                        className="p-4 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        {musicPlaying ? 
                          <PauseCircle className="w-10 h-10 text-white" /> : 
                          <PlayCircle className="w-10 h-10 text-white" />
                        }
                      </motion.button>
                      <div className="flex-1">
                        <div className="text-white font-bold mb-2">Now Playing: Party Anthem</div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-yellow-400 rounded-full"
                            animate={musicPlaying ? {
                              width: ['0%', '100%'],
                              transition: {
                                duration: 3,
                                repeat: Infinity
                              }
                            } : { width: '0%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['🎤', '💃', '🎧', '🥁'].map((emoji, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className="p-3 rounded-lg bg-white/20 text-2xl hover:bg-white/30"
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Dance Floor */}
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <PartyPopper className="w-8 h-8 text-white" />
                      <h3 className="text-2xl font-bold text-white">Dance Floor 💃🕺</h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDanceMode(!danceMode)}
                      className={`w-full py-4 rounded-xl font-bold text-lg mb-4 ${
                        danceMode 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {danceMode ? 'Dance Band Karein ✋' : 'Dance Chalu Karein! 🎊'}
                    </motion.button>
                    <p className="text-white/90 text-center">
                      {danceMode 
                        ? 'Sare log dance kar rahe! 🔥' 
                        : 'Dance button dabao, masti shuru karo!'}
                    </p>
                  </div>
                </div>

                {/* Party Actions */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createConfetti}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Confetti Chhodo! 🎊
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addMemory}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-bold flex items-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Memory Add Karein 📸
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'rajveer' && (
              <motion.div
                key="rajveer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400/50"
                  />
                  
                  <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 p-8 rounded-3xl relative z-10">
                    <div className="text-6xl mb-4">👑</div>
                    <h2 className="text-4xl font-black text-white mb-2">
                      SPECIAL HOST
                    </h2>
                    <h3 className="text-5xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      RAJVEER SIR
                    </h3>
                    
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                      <p className="text-2xl text-white font-bold mb-4">
                        "Tension mat lo, party pakki hai! 😎"
                      </p>
                      <p className="text-white/90">
                        Sir promises: "Masti, music, aur memories - teeno milega!"
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/10 p-4 rounded-xl">
                        <div className="text-3xl">😄</div>
                        <div className="text-white font-bold">Always Funny</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl">
                        <div className="text-3xl">🤝</div>
                        <div className="text-white font-bold">Best Host</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl">
                        <div className="text-3xl">🎯</div>
                        <div className="text-white font-bold">Party King</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        createConfetti();
                        setLoveLevel(100);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl shadow-red-500/50"
                    >
                      👑 Rajveer Sir Rocks! 👑
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Live Chat 💬</h2>
                  <p className="text-white/90">Sabke comments dekhein!</p>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto p-4 bg-white/5 rounded-2xl">
                  {chatMessages.map((chat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-2xl ${
                        chat.user === "Rajveer Sir" 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-400/30' 
                          : 'bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-white">{chat.user}</div>
                        <div className="text-sm text-white/60">{chat.time}</div>
                      </div>
                      <p className="text-white/90">{chat.msg}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Send Message */}
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Apna message likhein..."
                    className="flex-1 p-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-pink-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold"
                  >
                    Send ✨
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Memories Section */}
          {memories.length > 0 && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Your Memories Collection ✨
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {memories.map(memory => (
                  <motion.div
                    key={memory.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl text-white font-bold flex items-center gap-3"
                  >
                    <span className="text-2xl">{memory.emoji}</span>
                    <span>{memory.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          className="mt-8 text-center"
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity 
          }}
        >
          <button className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-black text-2xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-shadow">
            🎫 RSVP KARO - MASTI PAKKI! 🎫
          </button>
          <p className="text-white/80 mt-4 text-lg">
            Last date: 10 March 2026 • Don't miss the fun! 🥳
          </p>
        </motion.div>
      </div>
    </main>
  );
}