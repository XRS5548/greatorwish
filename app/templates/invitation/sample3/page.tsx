'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Zap, Sparkles, Music, Camera, Gift, Users, 
  Trophy, Crown, PartyPopper, Volume2, Star,
  Heart, MessageSquare, Clock, MapPin
} from 'lucide-react';

// 3D Floating Elements Component
function FloatingElements() {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Follow mouse slightly
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.x * 2,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.y * 2,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`heart-${i}`} position={[
          Math.sin(i * 0.8) * 3,
          Math.cos(i * 0.6) * 3,
          Math.sin(i * 0.4) * 2
        ]}>
          <sphereGeometry args={[0.1 + Math.sin(i) * 0.05, 16, 16]} />
          <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Floating Stars */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`star-${i}`} position={[
          Math.cos(i * 1.2) * 4,
          Math.sin(i * 1) * 4,
          Math.cos(i * 0.8) * 3
        ]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ffd166" emissive="#ffd166" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Simple 3D Text without font loading
function Simple3DText() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Create text using simple 3D shapes */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.2]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.2]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.2]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.2]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.2]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

interface Effect {
  id: number;
  type: string;
  emoji: string;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

interface View {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface PartyHighlight {
  icon: string;
  title: string;
  desc: string;
}

export default function UltraModernInvitation() {
  const [activeView, setActiveView] = useState<string>('hero');
  const [musicVolume, setMusicVolume] = useState<number>(70);
  const [effects, setEffects] = useState<Effect[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confettiActive, setConfettiActive] = useState<boolean>(false);
  const [hologramText, setHologramText] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(86400); // 24 hours in seconds
  const [windowHeight, setWindowHeight] = useState<number>(0);
  
  // Initialize window height
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };
  
  const addEffect = (type: string) => {
    const emojiMap: Record<string, string> = {
      sparkles: '✨',
      fire: '🔥',
      music: '🎵',
      star: '⭐',
      heart: '💖'
    };
    
    const newEffect: Effect = {
      id: Date.now(),
      type,
      emoji: emojiMap[type]
    };
    
    setEffects(prev => [newEffect, ...prev].slice(0, 6));
    
    // Create particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      emoji: newEffect.emoji,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Auto remove particles
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 2000);
  };
  
  const views: View[] = [
    { id: 'hero', label: '🌌 Hero', icon: Zap },
    { id: 'details', label: '📋 Details', icon: Clock },
    { id: 'interactive', label: '🎮 Interactive', icon: PartyPopper },
    { id: 'host', label: '👑 Host', icon: Crown },
    { id: 'rsvp', label: '✅ RSVP', icon: Users }
  ];
  
  const partyHighlights: PartyHighlight[] = [
    { icon: '🎤', title: 'Live Performances', desc: 'Singing & Dancing' },
    { icon: '🍕', title: 'Food Court', desc: 'Unlimited Snacks' },
    { icon: '📸', title: 'Photo Booth', desc: '3D Photos' },
    { icon: '🎁', title: 'Surprise Gifts', desc: 'For Everyone' },
    { icon: '🎮', title: 'Gaming Zone', desc: 'VR & Console Games' },
    { icon: '💃', title: 'Dance Floor', desc: 'With DJ' }
  ];
  
  const confettiEmojis = ['🎉', '✨', '🎊', '🎈', '🥳'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-mono overflow-hidden">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ff00ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <FloatingElements />
          <Simple3DText />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}px`
            }}
            initial={{ 
              opacity: 1,
              scale: 0,
              y: 0
            }}
            animate={{
              opacity: [1, 0],
              scale: [0, 1, 0],
              y: -100,
              rotate: 360
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        
        {/* Header with Countdown */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12 p-6 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              NEON NIGHTS 2026
            </h1>
            <p className="text-xl text-cyan-300 mt-2">The Ultimate Fresher Party</p>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-cyan-400 mb-2">COUNTDOWN TO PARTY</div>
            <div className="text-3xl font-bold font-mono bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl shadow-2xl">
              {formatTime(countdown)}
            </div>
          </div>
        </motion.div>
        
        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {views.map(view => (
            <motion.button
              key={view.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(view.id)}
              className={`px-5 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                activeView === view.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-2xl shadow-cyan-500/30' 
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
              }`}
            >
              <view.icon className="w-5 h-5" />
              {view.label}
            </motion.button>
          ))}
        </div>
        
        {/* Main Content Area */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-purple-900/30">
          
          <AnimatePresence mode="wait">
            {/* HERO VIEW */}
            {activeView === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                {/* 3D Canvas Preview */}
                <div className="h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-cyan-500/30 relative">
                  <Canvas className="w-full h-full">
                    <color attach="background" args={['#0a0a0a']} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
                    <Stars radius={50} depth={30} count={2000} factor={4} />
                    <FloatingElements />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
                  </Canvas>
                  <div className="absolute bottom-4 left-4 text-xs text-cyan-300 bg-black/50 px-3 py-1 rounded-full">
                    🔄 3D Scene - Drag to rotate
                  </div>
                </div>
                
                {/* Welcome Message */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">
                    Welcome to the <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">Future of Parties</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                    Where neon meets nostalgia, and every moment creates memories that last forever. 
                    Get ready for an experience like never before!
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addEffect('sparkles')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Add Sparkles
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConfettiActive(!confettiActive)}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-bold flex items-center gap-2"
                    >
                      <PartyPopper className="w-5 h-5" />
                      {confettiActive ? 'Stop Confetti' : 'Launch Confetti'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* DETAILS VIEW */}
            {activeView === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl border border-cyan-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-8 h-8 text-cyan-400" />
                        <h3 className="text-2xl font-bold">Date & Time</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-gray-400">📅 Date</span>
                          <span className="text-xl font-bold">March 15, 2026</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-gray-400">⏰ Time</span>
                          <span className="text-xl font-bold">7:00 PM - 1:00 AM</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <span className="text-gray-400">🎯 Theme</span>
                          <span className="text-xl font-bold text-cyan-300">Neon Future</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-8 h-8 text-purple-400" />
                        <h3 className="text-2xl font-bold">Venue</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="text-xl font-bold mb-1">Sky Garden Rooftop</div>
                          <div className="text-gray-400">Central Campus • Level 15</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg">
                          <div className="text-sm text-gray-400 mb-1">Special Features:</div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm">360° View</span>
                            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">LED Dance Floor</span>
                            <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full text-sm">Photo Zones</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Highlights */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Party Highlights ✨</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {partyHighlights.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all"
                        >
                          <div className="text-3xl mb-2">{item.icon}</div>
                          <div className="font-bold text-lg mb-1">{item.title}</div>
                          <div className="text-sm text-gray-400">{item.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* INTERACTIVE VIEW */}
            {activeView === 'interactive' && (
              <motion.div
                key="interactive"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                {/* Music Control Panel */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Music className="w-8 h-8 text-purple-400" />
                      <h3 className="text-2xl font-bold">DJ Control Panel</h3>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Volume2 className="w-5 h-5" />
                      <span className="font-mono">{musicVolume}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Volume Control</span>
                        <span>{musicVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(Number(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-purple-600"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['🎵 Pop', '💃 EDM', '🎤 Hip-Hop', '🔥 Bollywood'].map((genre, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 bg-gray-800/50 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all text-center"
                        >
                          <div className="text-2xl mb-2">{genre.charAt(0)}</div>
                          <div className="font-bold">{genre.slice(2)}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Effects Panel */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl border border-cyan-500/20">
                  <h3 className="text-2xl font-bold mb-6">Special Effects Panel</h3>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {['sparkles', 'fire', 'music', 'star', 'heart'].map((effect) => (
                      <motion.button
                        key={effect}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addEffect(effect)}
                        className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-white/5 hover:border-purple-500/50 flex items-center gap-2"
                      >
                        <span className="text-2xl">
                          {{
                            sparkles: '✨',
                            fire: '🔥',
                            music: '🎵',
                            star: '⭐',
                            heart: '💖'
                          }[effect]}
                        </span>
                        <span className="capitalize">{effect}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Active Effects */}
                  {effects.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Active Effects:</div>
                      <div className="flex flex-wrap gap-2">
                        {effects.map(effect => (
                          <motion.div
                            key={effect.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-full border border-cyan-500/30 flex items-center gap-2"
                          >
                            <span className="text-xl">{effect.emoji}</span>
                            <span className="text-sm capitalize">{effect.type}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* HOST VIEW */}
            {activeView === 'host' && (
              <motion.div
                key="host"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-center"
              >
                <div className="max-w-2xl mx-auto">
                  {/* Hologram Card */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl rounded-3xl" />
                    <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-cyan-500/30">
                      <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 mb-6">
                        <Crown className="w-12 h-12" />
                      </div>
                      
                      <h2 className="text-4xl font-bold mb-2">
                        <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                          RAJVEER SIR
                        </span>
                      </h2>
                      
                      <div className="text-xl text-cyan-300 mb-6">The Ultimate Host</div>
                      
                      <div className="bg-gray-900/50 p-6 rounded-2xl mb-6 border border-white/5">
                        <p className="text-2xl italic mb-4">
                          "This isn't just a party, it's an experience you'll remember forever!"
                        </p>
                        <p className="text-gray-400">
                          With over a decade of creating unforgettable memories, Rajveer Sir brings 
                          his signature style to make this the best fresher party ever.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/30 rounded-xl">
                          <div className="text-3xl mb-2">🎯</div>
                          <div className="font-bold">Visionary</div>
                        </div>
                        <div className="p-4 bg-gray-900/30 rounded-xl">
                          <div className="text-3xl mb-2">⚡</div>
                          <div className="font-bold">Energetic</div>
                        </div>
                        <div className="p-4 bg-gray-900/30 rounded-xl">
                          <div className="text-3xl mb-2">🤝</div>
                          <div className="font-bold">Connector</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addEffect('star');
                      addEffect('heart');
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-bold text-xl shadow-2xl shadow-cyan-500/30"
                  >
                    👑 Salute to Rajveer Sir! 👑
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* RSVP VIEW */}
            {activeView === 'rsvp' && (
              <motion.div
                key="rsvp"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4">
                    Secure Your <span className="text-transparent bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text">Spot</span>
                  </h2>
                  <p className="text-gray-400">Limited seats available. Don't miss out!</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Number of Guests</label>
                      <div className="flex gap-4">
                        {[1, 2, 3, 4].map(num => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 p-4 bg-gray-900 border border-gray-700 rounded-xl text-center hover:border-cyan-500 transition-all"
                          >
                            <div className="text-2xl">{num === 4 ? '4+' : num}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {num === 1 ? 'Just Me' : num === 4 ? 'Group' : `${num} People`}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Special Message (Optional)</label>
                      <textarea
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-all h-32"
                        placeholder="Any special requests or messages..."
                        value={hologramText}
                        onChange={(e) => setHologramText(e.target.value)}
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        addEffect('sparkles');
                        setConfettiActive(true);
                        setTimeout(() => setConfettiActive(false), 3000);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-cyan-600 rounded-xl font-bold text-xl shadow-2xl shadow-green-500/30"
                    >
                      CONFIRM MY SPOT 🎟️
                    </motion.button>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
                    <p>🔐 Your data is secure • 🎁 Early birds get special gifts</p>
                    <p className="text-sm mt-2">Confirmation email will be sent within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Live Stats Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-cyan-400">247</div>
                <div className="text-sm text-gray-400">Confirmed Guests</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">98%</div>
                <div className="text-sm text-gray-400">Excitement Level</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-pink-400">∞</div>
                <div className="text-sm text-gray-400">Memories to Make</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-2xl font-bold text-green-400">24</div>
                <div className="text-sm text-gray-400">Hours to Go</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎉 Get ready for the most epic night of your life! 🎉</p>
          <p className="mt-2">Questions? Contact: party@fresher2026.edu • 📱 +91 98765 43210</p>
        </div>
      </div>
      
      {/* Confetti Effect */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {[...Array(100)].map((_, i) => (
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
                rotate: 720,
                x: Math.random() * 100 - 50
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
    </div>
  );
}