import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  MapPin,
  Gift,
  Heart,
  Volume2,
  VolumeX,
  Star,
  Sparkles,
  Calendar,
  Cloud,
  ArrowRight,
  ArrowLeft,
  Gamepad2,
  Quote,
  Music,
  PartyPopper,
  Crown,
  Wind,
  MousePointer2,
  CalendarHeart
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Decorative Components ---

const Ribbon = ({ className }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20C10 10 20 5 30 5C40 5 45 15 50 20C55 15 60 5 70 5C80 5 90 10 90 20C90 35 70 35 50 20C30 35 10 35 10 20Z" fill="currentColor" />
    <path d="M50 20L40 40M50 20L60 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const Glitter = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      setParticles(prev => [...prev.slice(-20), {
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 2 + 3
      }]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
            exit={{ opacity: 0 }}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: ['#FFD700', '#FFB7C5', '#FFFFFF'][Math.floor(Math.random() * 3)]
            }}
            className="absolute rounded-full shadow-[0_0_10px_currentColor]"
            transition={{ duration: p.duration, ease: "easeInOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Ambient Particles (Sakura & Balloons) ---
const AmbientBackground = () => {
  const [sakuras, setSakuras] = useState([]);
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const sInterval = setInterval(() => {
      setSakuras(prev => [...prev.slice(-15), { id: Math.random(), x: Math.random() * 100 }]);
    }, 3000);

    const bInterval = setInterval(() => {
      setBalloons(prev => [...prev.slice(-10), { id: Math.random(), x: Math.random() * 100, size: Math.random() * 40 + 20 }]);
    }, 4000);

    return () => { clearInterval(sInterval); clearInterval(bInterval); };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sakura Petals */}
      <AnimatePresence>
        {sakuras.map(s => (
          <motion.div
            key={s.id}
            initial={{ y: -50, x: `${s.x}%`, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", x: `${s.x + (Math.random() * 20 - 10)}%`, opacity: 0.6, rotate: 360 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute text-sakura"
          >
            <Wind size={20} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Balloons */}
      <AnimatePresence>
        {balloons.map(b => (
          <motion.div
            key={b.id}
            initial={{ y: "110vh", x: `${b.x}%`, opacity: 0 }}
            animate={{ y: "-20vh", x: `${b.x + (Math.random() * 10 - 5)}%`, opacity: 0.3 }}
            transition={{ duration: 15, ease: "easeOut" }}
            className="absolute text-princess-pink"
          >
            <Cloud size={b.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Background Music Component ---
const MusicPlayer = ({ isPlaying, toggleMusic }) => {
  return (
    <div className="fixed top-6 right-6 z-[60]">
      <motion.button
        onClick={toggleMusic}
        className="p-3 bg-white/60 backdrop-blur-md rounded-full shadow-lg border-2 border-princess-pink text-hot-pink hover:bg-princess-pink/20 transition-all bubble-bounce"
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </div>
  );
};

// --- Slide Wrapper ---
const Slide = ({ children, direction }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.2 }}
    transition={{ type: "spring", stiffness: 120, damping: 15 }}
    className="h-full w-full absolute bg-gradient-to-b from-pearl-white to-sakura/20 overflow-y-auto pt-24 pb-48 hide-scrollbar scroll-smooth"
  >
    <div className="min-h-full w-full flex flex-col items-center justify-center p-6 text-center">
      {children}
    </div>
  </motion.div>
);

// --- New Features Components ---

const RelationshipCounter = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const startDate = new Date('2025-11-09T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const min = Math.floor((diff / 1000 / 60) % 60);
      const sec = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, min, sec });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Card = ({ label, value }) => (
    <div className="bg-white/80 backdrop-blur-sm p-3 md:p-5 rounded-2xl md:rounded-3xl border-2 border-sakura shadow-md">
      <div className="text-2xl md:text-5xl font-black text-hot-pink font-poppins">{value}</div>
      <div className="text-[10px] md:text-xs text-princess-pink font-bold uppercase tracking-widest mt-1 md:mt-2">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center">
      <Card label="Hari" value={time.days} />
      <span className="text-hot-pink font-black text-2xl md:text-4xl animate-pulse">:</span>
      <Card label="Jam" value={time.hours} />
      <span className="text-hot-pink font-black text-2xl md:text-4xl animate-pulse">:</span>
      <Card label="Menit" value={time.min} />
      <span className="text-hot-pink font-black text-2xl md:text-4xl animate-pulse">:</span>
      <Card label="Detik" value={time.sec} />
    </div>
  );
};

const HoldToHug = () => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  const startHug = () => {
    if (isFinished) return;
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          setIsFinished(true);
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF1493', '#FFFFFF']
          });
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const stopHug = () => {
    if (isFinished) return;
    clearInterval(timerRef.current);
    setProgress(0);
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="hugging"
            className="relative"
            animate={progress > 0 ? { rotate: [-1, 1, -1] } : {}}
            transition={{ repeat: Infinity, duration: 0.1 }}
          >
            {/* Progress Ring */}
            <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90">
              <circle
                cx="50%" cy="50%" r="45%"
                className="stroke-sakura/30 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="50%" cy="50%" r="45%"
                className="stroke-hot-pink fill-none"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>
            <motion.button
              onMouseDown={startHug}
              onMouseUp={stopHug}
              onMouseLeave={stopHug}
              onTouchStart={startHug}
              onTouchEnd={stopHug}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 active:scale-95 transition-transform"
            >
              <Heart
                size={progress > 0 ? 80 + progress / 2 : 80}
                fill={progress > 0 ? "#FF1493" : "none"}
                className="text-hot-pink transition-all"
              />
              <p className="mt-4 font-black text-hot-pink text-xs md:text-sm tracking-widest uppercase">Tahan Peluknya 🤍</p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-hot-pink">
              <PartyPopper size={100} className="text-hot-pink animate-bounce" />
            </div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 text-3xl md:text-5xl font-dancing text-hot-pink font-black"
            >
              Pelukan Terikirim! 🧸🤍
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BalloonPop = () => {
  const wishes = [
    "Bahagia Selalu! 🌟",
    "Makin Sayang! 💖",
    "Tetap Cantik! 🎀",
    "Sehat Terus! 🍀",
    "Mimpi Terwujud! ✨",
    "Selalu Sabar! 🧸"
  ];
  const [popped, setPopped] = useState([]);

  const handlePop = (index) => {
    if (popped.includes(index)) return;
    setPopped([...popped, index]);
    confetti({
      particleCount: 50,
      scalar: 0.7,
      colors: ['#FFB7C5', '#FFD700']
    });
  };

  return (
    <div className="relative w-full max-w-lg h-[400px] md:h-[500px]">
      {wishes.map((wish, i) => (
        <motion.div
          key={i}
          initial={{ y: 500, x: i * 60 }}
          animate={{
            y: popped.includes(i) ? -100 : [400, -100],
            x: i * 60 + Math.sin(i) * 30
          }}
          transition={{
            y: { repeat: Infinity, duration: 8 + i, ease: "linear" },
            x: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          className="absolute"
        >
          <AnimatePresence mode="wait">
            {!popped.includes(i) ? (
              <motion.div
                key="balloon"
                onClick={() => handlePop(i)}
                whileHover={{ scale: 1.2 }}
                className="cursor-pointer text-princess-pink"
                exit={{ scale: 3, opacity: 0 }}
              >
                <div className="w-16 h-20 md:w-20 md:h-24 bg-current rounded-t-full rounded-b-[40%] shadow-lg flex items-center justify-center text-white font-black text-[10px] md:text-xs">
                  PECÁH!
                </div>
                <div className="w-[2px] h-12 bg-current mx-auto mt-[-2px] opacity-40" />
              </motion.div>
            ) : (
              <motion.div
                key="wish"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg border-2 border-sakura text-hot-pink font-black whitespace-nowrap text-sm"
              >
                {wish}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Existing Slides ---

const HeroSlide = ({ direction, onNext }) => (
  <Slide direction={direction}>
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Ribbon className="w-24 h-24 md:w-32 md:h-32 absolute -top-20 -left-12 md:-top-24 md:-left-16 text-princess-pink rotate-[-15deg] opacity-60" />
      <Ribbon className="w-24 h-24 md:w-32 md:h-32 absolute -top-20 -right-12 md:-top-24 md:-right-16 text-princess-pink rotate-[15deg] opacity-60" />

      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Crown className="mx-auto mb-6 text-gold w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
      </motion.div>

      <h1 className="text-4xl md:text-8xl font-black text-hot-pink font-poppins mb-4 tracking-tighter drop-shadow-md glitter-text">
        Happy 21st, Raraa!
      </h1>
      <p className="text-xl md:text-4xl font-dancing text-princess-pink mb-12 font-bold">
        Halaman Rahasia Paling Spesial... 💖
      </p>

      <motion.button
        onClick={onNext}
        className="group relative bg-hot-pink text-white px-8 py-4 md:px-10 md:py-5 rounded-[2rem] text-xl md:text-2xl font-bold shadow-[0_10px_30px_rgba(255,20,147,0.4)] hover:shadow-[0_15px_40px_rgba(255,20,147,0.6)] transition-all bubble-bounce border-4 border-white"
        whileTap={{ scale: 0.9 }}
      >
        <Sparkles className="absolute -top-4 -left-4 text-gold group-hover:animate-spin size-5 md:size-6" />
        Buka Hati Raraa ✨
        <Sparkles className="absolute -bottom-4 -right-4 text-gold group-hover:animate-spin size-5 md:size-6" />
      </motion.button>
    </motion.div>
  </Slide>
);

const TimelineSlide = ({ direction }) => {
  const [step, setStep] = useState(0);
  const moments = [
    { title: "Roblox Story 🎮", text: "Delapan Februari, di dunia roblox semua bermula. Tak pernah ku sangka akhirnya hatiku jatuh sedalam ini padamu.", icon: <Gamepad2 /> },
    { title: "Suara Penenang 📞", text: "Malam terasa panjang saat rindu menyerang, tapi suaramu jadi penenang meski hanya lewat layar terang.", icon: <MessageCircle /> },
    { title: "LDR & VC 🌍", text: "Meski LDR memisahkan kita, VC jadi peluk sederhana. Jangan simpan lukamu sendiri, aku di sini untukmu.", icon: <MapPin /> },
    { title: "Our 21st Lily 🌸", text: "Hari ini, 21 lilin menyala. Menyebut namamu dalam doa, semoga hatimu selalu hangat meski hidup tak selalu ramah.", icon: <Calendar /> }
  ];

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing drop-shadow-sm">Memory Journey Kita 🎀</h2>
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(255,105,180,0.3)] border-4 border-sakura relative"
          >
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-16 h-16 md:w-24 md:h-24 text-princess-pink opacity-80">
              <Ribbon className="w-full h-full" />
            </div>

            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-hot-pink to-princess-pink rounded-2xl md:rounded-3xl flex items-center justify-center text-white mx-auto mb-6 md:mb-8 shadow-xl transform rotate-3">
              {React.cloneElement(moments[step].icon, { size: 32 })}
            </div>
            <h3 className="text-hot-pink font-black text-2xl md:text-3xl mb-4 tracking-tight">{moments[step].title}</h3>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed italic font-medium font-dancing">{moments[step].text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 md:mt-12 flex justify-center gap-4 md:gap-6">
          {moments.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setStep(i)}
              className={`h-3 md:h-4 rounded-full transition-all ${i === step ? 'w-8 md:w-12 bg-hot-pink shadow-[0_0_15px_#FF1493]' : 'w-3 md:w-4 bg-sakura hover:bg-princess-pink'}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </Slide>
  );
};

const LyricsSlide = ({ direction }) => {
  const lyrics = [
    "Maafkan aku yang sering menyakitkan, sering bertengkar, sering diam.",
    "Aku tahu aku bukan yang terbaik, sering egois, sering terlalu keras.",
    "Tapi aku mau belajar jadi lebih baik, agar bahagiamu tak lagi retak.",
    "Suatu hari nanti tak ada jarak lagi, tak ada layar, hanya aku dan kamu."
  ];

  return (
    <Slide direction={direction}>
      <div className="max-w-4xl px-4 md:px-8">
        <Quote className="mx-auto mb-8 md:mb-10 text-hot-pink opacity-40 w-12 h-12 md:w-16 md:h-16" />
        <div className="space-y-6 md:space-y-10">
          {lyrics.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, type: "spring" }}
              className="text-2xl md:text-5xl font-dancing text-gray-800 leading-tight italic font-black hover:text-hot-pink transition-colors cursor-default"
            >
              「 {line} 」
            </motion.p>
          ))}
        </div>
        <motion.div
          className="mt-12 md:mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <div className="h-[2px] w-8 md:w-12 bg-sakura" />
          <p className="text-hot-pink font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">Honest Heart 🤍</p>
          <div className="h-[2px] w-8 md:w-12 bg-sakura" />
        </motion.div>
      </div>
    </Slide>
  );
};

const CakeSlide = ({ direction }) => {
  const [blown, setBlown] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB7C5', '#FF69B4', '#FFFFFF']
    });
  };

  return (
    <Slide direction={direction}>
      <h2 className="text-4xl md:text-6xl font-black text-hot-pink mb-12 font-dancing">Waktunya Tiup Lilin! 🎂</h2>
      <div className="relative flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end">
          <div className="flex gap-4 mb-[-10px] z-20">
            {['2', '1'].map((n, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {!blown && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                      y: [0, -2, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.2 }}
                    className="w-4 h-6 bg-gold rounded-full blur-[2px] shadow-[0_0_10px_#FFD700]"
                  />
                )}
                <div className="w-8 h-12 bg-princess-pink rounded-t-lg flex items-center justify-center text-white font-black text-xl border-2 border-white shadow-md">
                  {n}
                </div>
              </div>
            ))}
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-40 h-16 bg-sakura rounded-t-3xl border-x-4 border-t-4 border-white shadow-inner z-10" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-56 h-20 bg-princess-pink border-x-4 border-t-4 border-white shadow-md z-[5]" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="w-72 h-24 bg-hot-pink rounded-b-lg border-4 border-white shadow-xl" />
          <div className="w-80 h-4 bg-gray-100 rounded-full shadow-md mt-[-4px]" />
        </div>
        <motion.button
          onClick={handleBlow}
          disabled={blown}
          className={`mt-16 px-8 py-4 rounded-full font-black text-2xl flex items-center gap-3 transition-all ${blown ? 'bg-gray-200 text-gray-400' : 'bg-hot-pink text-white shadow-xl hover:scale-105 active:scale-95'}`}
        >
          {blown ? "Sudah Ditiup! ✨" : "Tiup Lilinnya! 🌬️"}
          {!blown && <Wind className="animate-pulse" />}
        </motion.button>
      </div>
    </Slide>
  );
};

const LetterSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div className="max-w-3xl w-full bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-[0_30px_100px_rgba(255,105,180,0.3)] relative border-4 md:border-8 border-sakura">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-40 md:h-40">
        <Ribbon className="w-full h-full text-hot-pink" />
      </div>
      <h3 className="text-3xl md:text-5xl text-hot-pink font-black font-dancing mb-10 md:mb-12 glitter-text">Selamat Ulang Tahun, Raraa cintaku... 🎈</h3>
      <div className="font-dancing text-xl md:text-3xl text-gray-800 leading-relaxed space-y-8 md:space-y-10 text-center font-bold">
        <p>"Maafkan aku yang sering menyakitkan. Kita sering bertengkar, sering diam... Aku salah, terlalu banyak kau pendam."</p>
        <p className="text-princess-pink italic">"Kalau dunia terasa berat dan aku jadi alasan sesak, pegang tanganku meski jauh. Aku masih ingin berjuang untukmu."</p>
        <p>"Di umur dua puluh satu ini, semoga hatimu selalu hangat. Aku tak ingin kehilangan rasa, aku sayang kamu... jangan ragu, ya."</p>
        <p className="text-hot-pink text-3xl md:text-5xl mt-8 transition-all glitter-text">Forever Yours, Bobby 🤍</p>
      </div>
    </motion.div>
  </Slide>
);

const GiftSlide = ({ direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#FF1493', '#FF69B4', '#FFB7C5', '#FFD700', '#FFFFFF'] });
  };
  return (
    <Slide direction={direction}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="closed" className="flex flex-col items-center" exit={{ scale: 0, opacity: 0, rotate: 180 }}>
            <motion.div onClick={handleOpen} className="cursor-pointer relative group" animate={{ rotate: [-3, 3, -3], y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} whileHover={{ scale: 1.1 }}>
              <div className="absolute inset-0 bg-hot-pink/30 blur-[40px] md:blur-[60px] rounded-full scale-150 animate-pulse" />
              <Gift className="w-40 h-40 md:w-56 md:h-56 text-hot-pink relative z-10 drop-shadow-2xl" strokeWidth={1.5} />
              <Ribbon className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 md:w-20 md:h-20 text-white z-20" />
            </motion.div>
            <p className="mt-12 md:mt-16 text-hot-pink font-black text-2xl md:text-3xl animate-bounce tracking-widest glitter-text">TEKAN KADO RARAA! 🍰</p>
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center bg-white p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_40px_120px_rgba(255,20,147,0.4)] border-4 md:border-8 border-hot-pink relative mx-4">
            <Ribbon className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 text-hot-pink" />
            <h2 className="text-4xl md:text-8xl font-black text-hot-pink mb-8 md:mb-10 font-dancing glitter-text">HBD MY PRINCESS! 👑</h2>
            <p className="text-xl md:text-3xl text-gray-700 italic font-black max-w-xl mx-auto mb-8 font-dancing leading-relaxed">Semoga bahagiamu selalu utuh, tawamu tak pernah luntur. I love you more than segala-galanya! ❤️🍭</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
};

const FinalSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div initial={{ scale: 0.5 }} animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="relative">
      <div className="absolute inset-0 bg-hot-pink/30 rounded-full blur-[80px] md:blur-[120px]" />
      <Heart className="w-60 h-60 md:w-80 md:h-80 text-princess-pink" fill="currentColor" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <Ribbon className="w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-4" />
        <p className="font-dancing text-4xl md:text-6xl font-black mb-2 animate-pulse">Peluk Jauh! 🧸</p>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-80">Forever Yours</p>
      </div>
    </motion.div>
    <div className="mt-12 md:mt-16 text-center">
      <p className="mb-8 font-dancing text-2xl text-hot-pink font-bold">Sudah Berapa Lama Kita Bersama?</p>
      <RelationshipCounter />
      <div className="mt-12">
        <p className="text-hot-pink font-black tracking-[0.3em] uppercase text-sm md:text-lg mb-4">Bobby 🤍 Raraa</p>
        <p className="text-princess-pink font-dancing text-3xl md:text-4xl font-bold animate-bounce italic">Cant't wait to see you soon!</p>
      </div>
    </div>
  </Slide>
);

// --- Main App ---

function App() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // New Slides Mapping
  const SLIDES = [
    { key: "hero", comp: HeroSlide },
    { key: "timeline", comp: TimelineSlide },
    { key: "lyrics", comp: LyricsSlide },
    { key: "balloons", comp: (props) => <Slide {...props}><h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Wishes for You 🎈</h2><BalloonPop /></Slide> },
    { key: "cake", comp: CakeSlide },
    { key: "hug", comp: (props) => <Slide {...props}><h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Send Me A Hug! 🫂</h2><HoldToHug /></Slide> },
    { key: "letter", comp: LetterSlide },
    { key: "gift", comp: GiftSlide },
    { key: "final", comp: FinalSlide }
  ];

  const totalSlides = SLIDES.length;

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const nextSlide = () => {
    if (slide < totalSlides - 1) {
      if (slide === 0 && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
      }
      setDirection(1);
      setSlide(slide + 1);
    }
  };

  const prevSlide = () => {
    if (slide > 0) {
      setDirection(-1);
      setSlide(slide - 1);
    }
  };

  const CurrentSlideComp = SLIDES[slide].comp;

  return (
    <main className="h-screen w-screen bg-pearl-white overflow-hidden relative font-poppins selection:bg-hot-pink/20 selection:text-hot-pink cursor-default">
      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />
      <AmbientBackground />
      <Glitter />

      <audio ref={audioRef} loop src="/lagu-raraa.mp3" />

      {/* Progress Dots */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 flex gap-2 md:gap-4 z-[60] bg-white/60 backdrop-blur-md p-3 md:p-4 rounded-full border-2 border-sakura shadow-md">
        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            className="cursor-pointer flex items-center justify-center"
            onClick={() => { setDirection(i > slide ? 1 : -1); setSlide(i); }}
            whileHover={{ scale: 1.3 }}
          >
            <Heart
              fill={i <= slide ? "#FF1493" : "none"}
              stroke={i <= slide ? "#FF1493" : "#FFB7C5"}
              size={i === slide ? 22 : 12}
              className="transition-all duration-300"
              strokeWidth={3}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <CurrentSlideComp key={SLIDES[slide].key} direction={direction} onNext={nextSlide} />
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-6 left-0 right-0 md:bottom-10 flex justify-center items-center gap-6 md:gap-12 z-[60] px-4">
        <AnimatePresence>
          {slide > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={prevSlide}
              className="group flex items-center gap-2 text-hot-pink font-black bg-white/90 backdrop-blur-md px-5 py-3 md:px-8 md:py-4 rounded-[1.5rem] md:rounded-[2rem] shadow-lg border-2 md:border-4 border-sakura hover:bg-sakura/20 transition-all font-dancing text-lg md:text-2xl bubble-bounce"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform size-5 md:size-6" strokeWidth={3} />
              Kembali
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {slide < totalSlides - 1 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={nextSlide}
              className="group flex items-center gap-2 bg-hot-pink text-white px-6 py-4 md:px-10 md:py-5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-2 md:border-4 border-white transition-all font-dancing text-xl md:text-3xl font-black bubble-bounce whitespace-nowrap"
            >
              Lihat Kejutan 🎀
              <ArrowRight className="group-hover:translate-x-1 transition-transform size-5 md:size-6" strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] text-hot-pink/40 tracking-[0.3em] md:tracking-[0.5em] font-black uppercase pointer-events-none text-center px-4">
        Handcrafted for Raraa 🤍 Nov 9, 2025 - ✨ 2026
      </footer>
    </main>
  );
}

export default App;
