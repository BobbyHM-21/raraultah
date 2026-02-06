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
  Crown
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

// --- Heart Particles Effect ---
const HeartParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      setParticles(prev => [...prev.slice(-15), {
        id,
        x: Math.random() * 100,
      }]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0, y: "110vh" }}
            animate={{ opacity: 0.6, scale: 1, y: "-10vh" }}
            exit={{ opacity: 0 }}
            style={{ left: `${p.x}%` }}
            className="absolute text-sakura"
            transition={{ duration: 10, ease: "linear" }}
          >
            <Heart fill="currentColor" size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Slide Wrapper ---
// REFACTORED: Added overflow-y-auto and padding to avoid overlap with fixed UI
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

// --- Component Slides ---

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
        Happy 22nd, Hera!
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
        Buka Hati Hera ✨
        <Sparkles className="absolute -bottom-4 -right-4 text-gold group-hover:animate-spin size-5 md:size-6" />
      </motion.button>
    </motion.div>
  </Slide>
);

const TimelineSlide = ({ direction }) => {
  const [step, setStep] = useState(0);
  const moments = [
    { title: "Roblox Story 🎮", text: "Dimulai dari dunia blok, siapa sangka cinta kita nggak cuma bohongan. Dari Roblox jadi Rumah paling nyaman.", icon: <Gamepad2 /> },
    { title: "Suara Manismu 📞", text: "Malam-malam lewati layar kecil, tapi hangatnya suara kamu sampai ke ulu hati. Sleepcall yang paling berharga.", icon: <MessageCircle /> },
    { title: "Rindu LDR 🌍", text: "LDR menyiksa, tapi VC jadi nyawa. Walau jarak memisahkan tangan, hatiku tetap di genggamanmu.", icon: <MapPin /> },
    { title: "Our 22nd Lily 🌸", text: "Hari ini, 22 lilin menyala. Doaku sampai ke sana, menjagamu walau dari jauh saja.", icon: <Calendar /> }
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
    "Kadang cinta bikin emosi, kadang kata melukai.",
    "Maafkan aku yang sering kurang tenang, sering salah paham.",
    "Tapi cintaku tak pernah hilang, walau dunia kejam.",
    "Jangan lelah mencintaiku, aku tetap pilih kamu."
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
          {/* UPDATED: Change Blue heart to White heart */}
          <p className="text-hot-pink font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">Honest Heart 🤍</p>
          <div className="h-[2px] w-8 md:w-12 bg-sakura" />
        </motion.div>
      </div>
    </Slide>
  );
};

const ReasonsSlide = ({ direction }) => {
  const reasons = [
    "Senyummu paling cantik sedunia! ✨",
    "Sabar banget ngadepin egoku 🧸",
    "Suara manismu pas sleepcall 🌙",
    "Tetap bertahan walau LDR jauh 🌎",
    "Selalu jadi rumah paling hangat 🏠",
    "Karena Kamu Adalah Sayangku! 💖"
  ];

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 md:mb-16 font-dancing">Kenapa Hera Paling Spesial? 🍓</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0], backgroundColor: "#FFF0F5" }}
            className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_15px_40px_rgba(255,105,180,0.2)] border-2 border-sakura flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[160px]"
          >
            <div className="absolute top-2 left-2 text-sakura p-2 opacity-50 text-sm">🌸</div>
            <Star className="text-gold mb-4 md:mb-6 group-hover:scale-125 transition-transform size-8 md:size-10" fill="currentColor" />
            <p className="text-gray-800 font-bold italic text-xl md:text-2xl font-dancing leading-snug">{r}</p>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
};

const HeartDrawingSlide = ({ direction }) => {
  return (
    <Slide direction={direction}>
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 md:mb-16 font-dancing text-center">Cintaku Hanya Untukmu 💌</h2>
        </motion.div>
        <div className="relative scale-75 md:scale-100">
          <Ribbon className="absolute -top-10 -left-10 w-20 h-20 text-princess-pink -rotate-45" />
          <svg width="300" height="300" md:width="400" md:height="400" viewBox="0 0 200 200" className="drop-shadow-[0_20px_50px_rgba(255,20,147,0.3)]">
            <motion.path
              d="M100 40 C100 40 100 20 70 20 C40 20 20 50 20 80 C20 120 100 180 100 180 C100 180 180 120 180 80 C180 50 160 20 130 20 C100 20 100 40 100 40"
              fill="transparent"
              stroke="#FF1493"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0, fill: "rgba(255, 20, 147, 0)" }}
              animate={{
                pathLength: 1,
                fill: "rgba(255, 105, 180, 0.2)"
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                fill: { delay: 3, duration: 1.5 }
              }}
            />
            <motion.path
              d="M100 40 C100 40 100 20 70 20 C40 20 20 50 20 80 C20 120 100 180 100 180 C100 180 180 120 180 80 C180 50 160 20 130 20 C100 20 100 40 100 40"
              fill="none"
              stroke="#FFD700"
              strokeWidth="3"
              strokeDasharray="15 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
        {/* UPDATED: Change Blue heart to White heart */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="mt-8 md:mt-12 text-2xl md:text-3xl font-dancing text-hot-pink font-black italic text-center max-w-sm"
        >
          Tetap pilih kamu, hari ini, esok, dan seterusnya... 🤍
        </motion.p>
      </div>
    </Slide>
  );
};

const LetterSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div
      className="max-w-3xl w-full bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-[0_30px_100px_rgba(255,105,180,0.3)] relative border-4 md:border-8 border-sakura"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-40 md:h-40">
        <Ribbon className="w-full h-full text-hot-pink" />
      </div>

      <h3 className="text-3xl md:text-5xl text-hot-pink font-black font-dancing mb-10 md:mb-12 glitter-text">Selamat Ulang Tahun, Heraa Sayang... 🎈</h3>
      <div className="font-dancing text-xl md:text-4xl text-gray-800 leading-normal md:leading-loose space-y-6 md:space-y-10 text-center font-bold">
        <p>
          22 tahun lilin menyala, walau jarak pisahkan kita, doaku selalu sampai ke sana. Kamu adalah hadiah dari dunia maya yang jadi kenyataan terindahku.
        </p>
        <p className="text-princess-pink scale-105 md:scale-110 transform">
          "Maaf ya kalau aku sering egois, sering salah paham, bikin kamu nangis. Makasih udah bertahan saat aku sulit dimengerti."
        </p>
        <p className="glitter-text">
          Suatu hari kita tak lagi menghitung jarak. Tak lewat layar, tak lewat suara, tapi benar-benar bersatu selamanya.
        </p>
        {/* UPDATED: Change Blue heart to White heart */}
        <p className="text-hot-pink text-3xl md:text-6xl mt-8 md:mt-12 transition-all">
          Aku sayang kamu, sungguh 🤍 🎀
        </p>
      </div>
    </motion.div>
  </Slide>
);

const GiftSlide = ({ direction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FF69B4', '#FFB7C5', '#FFD700', '#FFFFFF']
    });
  };

  return (
    <Slide direction={direction}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            className="flex flex-col items-center"
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
          >
            <motion.div
              onClick={handleOpen}
              className="cursor-pointer relative group"
              animate={{ rotate: [-3, 3, -3], y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 bg-hot-pink/30 blur-[40px] md:blur-[60px] rounded-full scale-150 animate-pulse" />
              <Gift className="w-40 h-40 md:w-56 md:h-56 text-hot-pink relative z-10 drop-shadow-2xl" strokeWidth={1.5} />
              <Ribbon className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 md:w-20 md:h-20 text-white z-20" />
            </motion.div>
            <p className="mt-12 md:mt-16 text-hot-pink font-black text-2xl md:text-3xl animate-bounce tracking-widest glitter-text">TEKAN KADO HERA! 🍰</p>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center bg-white p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_40px_120px_rgba(255,20,147,0.4)] border-4 md:border-8 border-hot-pink relative mx-4"
          >
            <Ribbon className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 text-hot-pink" />
            <h2 className="text-4xl md:text-8xl font-black text-hot-pink mb-8 md:mb-10 font-dancing glitter-text">HBD MY PRINCESS! 👑</h2>
            <p className="text-xl md:text-3xl text-gray-700 italic font-black max-w-xl mx-auto mb-8 font-dancing leading-relaxed">
              Semoga bahagiamu selalu utuh, tawamu tak pernah luntur. I love you more than segala-galanya! ❤️🍭
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
};

const FinalSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-hot-pink/30 rounded-full blur-[80px] md:blur-[120px]" />
      <Heart className="w-60 h-60 md:w-80 md:h-80 text-princess-pink" fill="currentColor" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <Ribbon className="w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-4" />
        <p className="font-dancing text-4xl md:text-6xl font-black mb-2 animate-pulse">Peluk Jauh! 🧸</p>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-80">Forever Yours</p>
      </div>
    </motion.div>
    <div className="mt-12 md:mt-16 text-center">
      {/* UPDATED: Change Blue heart to White heart */}
      <p className="text-hot-pink font-black tracking-[0.3em] uppercase text-sm md:text-lg mb-4">Bobby 🤍 Hera</p>
      <p className="text-princess-pink font-dancing text-3xl md:text-4xl font-bold animate-bounce italic">Cant't wait to see you soon!</p>
    </div>
  </Slide>
);

// --- Main App ---

function App() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const totalSlides = 8;

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
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

  return (
    <main className="h-screen w-screen bg-pearl-white overflow-hidden relative font-poppins selection:bg-hot-pink/20 selection:text-hot-pink cursor-default">
      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />
      <HeartParticles />
      <Glitter />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/lagu-hera.mp3"
      />

      {/* Progress Dots - HEART VERSION */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 flex gap-2 md:gap-4 z-[60] bg-white/60 backdrop-blur-md p-3 md:p-4 rounded-full border-2 border-sakura shadow-md">
        {[...Array(totalSlides)].map((_, i) => (
          <motion.div
            key={i}
            className={`cursor-pointer flex items-center justify-center`}
            onClick={() => {
              setDirection(i > slide ? 1 : -1);
              setSlide(i);
            }}
            whileHover={{ scale: 1.3 }}
          >
            <Heart
              fill={i <= slide ? "#FF1493" : "none"}
              stroke={i <= slide ? "#FF1493" : "#FFB7C5"}
              size={i === slide ? 22 : 12}
              className={`transition-all duration-300 ${i === slide ? 'drop-shadow-[0_0_8px_#FF1493]' : ''} sm:size-24`}
              md:size={i === slide ? 28 : 16}
              strokeWidth={3}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {slide === 0 && <HeroSlide key={0} direction={direction} onNext={nextSlide} />}
          {slide === 1 && <TimelineSlide key={1} direction={direction} />}
          {slide === 2 && <LyricsSlide key={2} direction={direction} />}
          {slide === 3 && <ReasonsSlide key={3} direction={direction} />}
          {slide === 4 && <HeartDrawingSlide key={4} direction={direction} />}
          {slide === 5 && <LetterSlide key={5} direction={direction} />}
          {slide === 6 && <GiftSlide key={6} direction={direction} />}
          {slide === 7 && <FinalSlide key={7} direction={direction} />}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - PINKY BOUNCE */}
      {/* REFACTORED: Better positioning and sizing for mobile */}
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

      <footer className="fixed bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] text-hot-pink/40 tracking-[0.3em] md:tracking-[0.5em] font-black uppercase pointer-events-none">
        Special for Hera 🤍 2026
      </footer>
    </main>
  );
}

export default App;
