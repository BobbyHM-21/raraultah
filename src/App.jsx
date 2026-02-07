import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
  CalendarHeart,
  Mail,
  Plane,
  Camera,
  Coffee,
  UtensilsCrossed,
  HandMetal,
  Trophy,
  HeartHandshake,
  Milestone,
  CheckCircle2
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

const MusicPlayer = ({ isPlaying, toggleMusic }) => (
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

// --- Climax Features Components ---

const BucketListSlide = ({ direction }) => {
  const items = [
    { text: "Makan es krim bareng 🍦", icon: <UtensilsCrossed /> },
    { text: "Gandeng tangan kamu di pantai 🌊", icon: <HandMetal /> },
    { text: "Nonton film sambil senderan 🍿", icon: <Camera /> },
    { text: "Bangun pagi liat muka kamu 😴", icon: <Coffee /> },
    { text: "Liburan bareng ke tempat impian ✈️", icon: <Plane /> }
  ];

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Suatu Hari Nanti... 🗺️</h2>
      <div className="space-y-4 md:space-y-6 w-full max-w-lg">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-md border-2 border-sakura flex items-center gap-4 group hover:bg-princess-pink/10 transition-colors"
          >
            <div className="p-3 bg-sakura/20 rounded-xl text-hot-pink group-hover:scale-110 transition-transform">
              {React.cloneElement(item.icon, { size: 24 })}
            </div>
            <p className="font-dancing text-xl md:text-2xl text-gray-800 font-bold">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
};

const OpenWhenLetter = ({ direction, onOpen }) => {
  const [isOpened, setIsOpened] = useState(false);
  const controls = useAnimation();

  const handleOpen = async () => {
    if (isOpened) return;
    await controls.start({ y: -100, opacity: 0, transition: { duration: 0.5 } });
    setIsOpened(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FFFFFF', '#FFB7C5']
    });
  };

  return (
    <Slide direction={direction}>
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            className="cursor-pointer relative flex flex-col items-center"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            animate={controls}
          >
            <div className="relative w-64 h-48 md:w-80 md:h-60 bg-white border-4 border-sakura rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full border-t-[100px] border-l-[150px] border-r-[150px] border-t-white border-l-sakura/10 border-r-sakura/10" />
              <Mail size={80} className="text-hot-pink relative z-10 mb-4" />
              <p className="font-black text-hot-pink text-sm md:text-lg tracking-widest uppercase relative z-10">TAP UNTUK BUKA 🖤</p>
              <div className="absolute bottom-4 right-4 text-princess-pink/20 font-dancing text-xl">For My Raraa</div>
            </div>
            <motion.p className="mt-8 text-princess-pink font-bold animate-pulse text-sm">Ada sesuatu yang ingin aku bilang...</motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="max-w-3xl w-full bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-2xl border-4 md:border-8 border-sakura relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32">
              <Ribbon className="w-full h-full text-hot-pink" />
            </div>
            <h3 className="text-3xl md:text-5xl text-hot-pink font-black font-dancing mb-10 md:mb-12 glitter-text">Selamat Ulang Tahun, Raraa cintaku... 🎈</h3>
            <div className="font-dancing text-xl md:text-3xl text-gray-800 leading-relaxed space-y-8 md:space-y-10 text-center font-bold">
              <p>
                "Maafkan aku yang sering menyakitkan. Kita sering bertengkar, sering diam... Aku salah, terlalu banyak kau pendam."
              </p>
              <p className="text-princess-pink italic">
                "Kalau dunia terasa berat dan aku jadi alasan sesak, pegang tanganku meski jauh. Aku masih ingin berjuang untukmu."
              </p>
              <p>
                "Di umur dua puluh satu ini, semoga hatimu selalu hangat. Aku tak ingin kehilangan rasa, aku sayang kamu... jangan ragu, ya."
              </p>
              <p className="text-hot-pink text-3xl md:text-5xl mt-8 transition-all glitter-text">
                Forever Yours, Bobby 🤍
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
};

// --- Ultra-Melting New Slides ---

const AwardSlide = ({ direction }) => {
  const awards = [
    { title: "Best LDR Partner", desc: "Sabar banget nunggu aku & selalu ada.", icon: <Heart className="text-hot-pink" /> },
    { title: "Prettiest Voice", desc: "Suara paling nenangin pas kita VC.", icon: <Volume2 className="text-gold" /> },
    { title: "Strongest Girl", desc: "Hebat banget ngadepin rindu sendirian.", icon: <Trophy className="text-princess-pink" /> },
    { title: "My Favorite Person", desc: "Satu-satunya orang yang bikin aku nyaman.", icon: <Star className="text-yellow-400" /> }
  ];

  return (
    <Slide direction={direction}>
      <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
        <Trophy size={64} className="text-gold mx-auto mb-6 drop-shadow-lg" />
      </motion.div>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-8 font-dancing">Awards for My Princess 👑</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
        {awards.map((award, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-sakura shadow-sm hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sakura/20 rounded-xl">{award.icon}</div>
              <div className="text-left">
                <p className="font-black text-hot-pink text-sm md:text-lg">{award.title}</p>
                <p className="font-dancing text-gray-600 text-sm md:text-base italic">{award.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
};

const ReasonsSlide = ({ direction }) => {
  const reasons = [
    "Suka banget sama cara kamu manggil sayang... 💓",
    "Suka senyum kamu yang bikin duniaku cerah 🌟",
    "Suka betapa sabarnya kamu hadepin aku ✨",
    "Suka cara kamu perhatian walau kita jauh 📞",
    "Suka betapa cantiknya kamu apa adanya 👑",
    " because you are simply YOU. My Raraa. 🤍"
  ];
  const [index, setIndex] = useState(0);

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Kenapa Aku Sayang Kamu? 🃏</h2>
      <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-white rounded-[2rem] border-4 border-hot-pink shadow-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer"
            onClick={() => setIndex((index + 1) % reasons.length)}
          >
            <Quote className="text-sakura mb-8 size-12" />
            <p className="font-dancing text-2xl md:text-4xl text-gray-800 font-black leading-relaxed italic">
              "{reasons[index]}"
            </p>
            <p className="mt-12 text-xs text-princess-pink font-bold animate-pulse">TAP UNTUK LIHAT ALASAN LAIN ✨</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Slide>
  );
};

const StarSlide = ({ direction }) => {
  return (
    <Slide direction={direction}>
      <div className="absolute inset-0 bg-[#0a0a1a] z-[-1] overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3,
              height: Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
          />
        ))}
      </div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="relative mb-12"
      >
        <Star size={120} className="text-gold fill-current drop-shadow-[0_0_50px_rgba(255,215,0,0.8)]" />
        <Sparkles className="absolute -top-4 -right-4 text-white animate-pulse" />
      </motion.div>
      <div className="max-w-2xl px-6">
        <h2 className="text-3xl md:text-6xl font-black text-white mb-8 font-dancing">A Star Named After You ✨</h2>
        <p className="text-xl md:text-3xl text-sakura font-dancing leading-relaxed italic font-bold">
          "Di duniaku yang kadang gelap dan sepi, kamulah satu-satunya bintang yang nggak pernah redup menyinari hariku."
        </p>
        <p className="mt-8 text-white/40 font-poppins text-xs tracking-[0.5em] uppercase">You are my universe 🌌</p>
      </div>
    </Slide>
  );
};

const PinkyPromiseSlide = ({ direction }) => {
  const [promised, setPromised] = useState(false);
  const handlePromise = () => {
    if (promised) return;
    setPromised(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF1493', '#FFFFFF', '#FFB7C5']
    });
  };

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Our Pinky Promise 🤙</h2>
      <div className="relative flex flex-col items-center">
        <motion.div
          onClick={handlePromise}
          className="cursor-pointer relative p-12 bg-white rounded-full border-4 border-sakura shadow-xl group mb-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {!promised ? (
              <motion.div key="unpromised" className="flex items-center justify-center gap-4 text-sakura">
                <HandMetal size={80} className="rotate-90 group-hover:scale-110 transition-transform" />
                <HandMetal size={80} className="-rotate-90 group-hover:scale-110 transition-transform -scale-x-100" />
              </motion.div>
            ) : (
              <motion.div key="promised" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-hot-pink">
                <HeartHandshake size={100} className="animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>
          {!promised && (
            <div className="absolute inset-0 border-4 border-hot-pink rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
          )}
        </motion.div>

        <p className="text-xl md:text-3xl font-dancing font-black text-gray-800 italic max-w-sm mb-4">
          {promised ? "Janji Terkunci Selamanya... 💖" : "Tap untuk janji selalu bareng-bareng? ✨"}
        </p>
        {promised && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-hot-pink font-black uppercase text-xs tracking-widest">
            <CheckCircle2 size={16} /> Locked in our hearts
          </motion.div>
        )}
      </div>
    </Slide>
  );
};

// --- Standard Feature Components ---

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
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF1493', '#FFFFFF'] });
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
          <motion.div key="hugging" className="relative" animate={progress > 0 ? { rotate: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: 0.1 }}>
            <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" className="stroke-sakura/30 fill-none" strokeWidth="8" />
              <circle cx="50%" cy="50%" r="45%" className="stroke-hot-pink fill-none" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} strokeLinecap="round" />
            </svg>
            <motion.button onMouseDown={startHug} onMouseUp={stopHug} onMouseLeave={stopHug} onTouchStart={startHug} onTouchEnd={stopHug} className="absolute inset-0 flex flex-col items-center justify-center p-8 active:scale-95 transition-transform">
              <Heart size={progress > 0 ? 80 + progress / 2 : 80} fill={progress > 0 ? "#FF1493" : "none"} className="text-hot-pink transition-all" />
              <p className="mt-4 font-black text-hot-pink text-xs md:text-sm tracking-widest uppercase">Tahan Peluknya 🤍</p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-hot-pink">
              <PartyPopper size={100} className="text-hot-pink animate-bounce" />
            </div>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-8 text-3xl md:text-5xl font-dancing text-hot-pink font-black">Pelukan Terikirim! 🧸🤍</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BalloonPop = () => {
  const wishes = ["Bahagia Selalu! 🌟", "Makin Sayang! 💖", "Tetap Cantik! 🎀", "Sehat Terus! 🍀", "Mimpi Terwujud! ✨", "Selalu Sabar! 🧸"];
  const [popped, setPopped] = useState([]);
  const handlePop = (index) => {
    if (popped.includes(index)) return;
    setPopped([...popped, index]);
    confetti({ particleCount: 50, scalar: 0.7, colors: ['#FFB7C5', '#FFD700'] });
  };
  return (
    <div className="relative w-full max-w-lg h-[400px] md:h-[500px]">
      {wishes.map((wish, i) => (
        <motion.div key={i} initial={{ y: 500, x: i * 60 }} animate={{ y: popped.includes(i) ? -100 : [400, -100], x: i * 60 + Math.sin(i) * 30 }} transition={{ y: { repeat: Infinity, duration: 8 + i, ease: "linear" }, x: { repeat: Infinity, duration: 3, ease: "easeInOut" } }} className="absolute">
          <AnimatePresence mode="wait">
            {!popped.includes(i) ? (
              <motion.div key="balloon" onClick={() => handlePop(i)} whileHover={{ scale: 1.2 }} className="cursor-pointer text-princess-pink" exit={{ scale: 3, opacity: 0 }}>
                <div className="w-16 h-20 md:w-20 md:h-24 bg-current rounded-t-full rounded-b-[40%] shadow-lg flex items-center justify-center text-white font-black text-[10px] md:text-xs">PECÁH!</div>
                <div className="w-[2px] h-12 bg-current mx-auto mt-[-2px] opacity-40" />
              </motion.div>
            ) : (
              <motion.div key="wish" initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg border-2 border-sakura text-hot-pink font-black whitespace-nowrap text-sm">{wish}</motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// --- Standard Slides ---

const HeroSlide = ({ direction, onNext }) => (
  <Slide direction={direction}>
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative">
      <Ribbon className="w-24 h-24 md:w-32 md:h-32 absolute -top-20 -left-12 md:-top-24 md:-left-16 text-princess-pink rotate-[-15deg] opacity-60" />
      <Ribbon className="w-24 h-24 md:w-32 md:h-32 absolute -top-20 -right-12 md:-top-24 md:-right-16 text-princess-pink rotate-[15deg] opacity-60" />
      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <Crown className="mx-auto mb-6 text-gold w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
      </motion.div>
      <h1 className="text-4xl md:text-8xl font-black text-hot-pink font-poppins mb-4 tracking-tighter drop-shadow-md glitter-text">Happy 21st, Raraa!</h1>
      <p className="text-xl md:text-4xl font-dancing text-princess-pink mb-12 font-bold">Halaman Rahasia Paling Spesial... 💖</p>
      <motion.button onClick={onNext} className="group relative bg-hot-pink text-white px-8 py-4 md:px-10 md:py-5 rounded-[2rem] text-xl md:text-2xl font-bold shadow-[0_10px_30px_rgba(255,20,147,0.4)] hover:shadow-[0_15px_40px_rgba(255,20,147,0.6)] transition-all bubble-bounce border-4 border-white" whileTap={{ scale: 0.9 }}>
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
    { title: "Roblox Story 🎮", text: "Di dunia Roblox semua bermula, tempat kita pertama kali menyapa. Tak pernah ku sangka akhirnya hatiku jatuh sedalam ini padamu.", icon: <Gamepad2 /> },
    { title: "Suara Penenang 📞", text: "Malam terasa panjang saat rindu menyerang, tapi suaramu jadi penenang meski hanya lewat layar terang.", icon: <MessageCircle /> },
    { title: "LDR & VC 🌍", text: "Meski LDR memisahkan kita, VC jadi peluk sederhana. Jangan simpan lukamu sendiri, aku di sini untukmu.", icon: <MapPin /> },
    { title: "Our 21st Lily 🌸", text: "Hari ini, 21 lilin menyala. Menyebut namamu dalam doa, semoga hatimu selalu hangat meski hidup tak selalu ramah.", icon: <Calendar /> }
  ];
  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing drop-shadow-sm">Memory Journey Kita 🎀</h2>
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(255,105,180,0.3)] border-4 border-sakura relative">
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-16 h-16 md:w-24 md:h-24 text-princess-pink opacity-80"><Ribbon className="w-full h-full" /></div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-hot-pink to-princess-pink rounded-2xl md:rounded-3xl flex items-center justify-center text-white mx-auto mb-6 md:mb-8 shadow-xl transform rotate-3">{React.cloneElement(moments[step].icon, { size: 32 })}</div>
            <h3 className="text-hot-pink font-black text-2xl md:text-3xl mb-4 tracking-tight">{moments[step].title}</h3>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed italic font-medium font-dancing">{moments[step].text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 md:mt-12 flex justify-center gap-4 md:gap-6">
          {moments.map((_, i) => (
            <motion.button key={i} onClick={() => setStep(i)} className={`h-3 md:h-4 rounded-full transition-all ${i === step ? 'w-8 md:w-12 bg-hot-pink shadow-[0_0_15px_#FF1493]' : 'w-3 md:w-4 bg-sakura hover:bg-princess-pink'}`} whileHover={{ scale: 1.2 }} />
          ))}
        </div>
      </div>
    </Slide>
  );
};

const LyricsSlide = ({ direction }) => {
  const lyrics = ["Maafkan aku yang sering menyakitkan, sering bertengkar, sering diam.", "Aku tahu aku bukan yang terbaik, sering egois, sering terlalu keras.", "Tapi aku mau belajar jadi lebih baik, agar bahagiamu tak lagi retak.", "Suatu hari nanti tak ada jarak lagi, tak ada layar, hanya aku dan kamu."];
  return (
    <Slide direction={direction}>
      <div className="max-w-4xl px-4 md:px-8">
        <Quote className="mx-auto mb-8 md:mb-10 text-hot-pink opacity-40 w-12 h-12 md:w-16 md:h-16" />
        <div className="space-y-6 md:space-y-10">
          {lyrics.map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.4, type: "spring" }} className="text-2xl md:text-5xl font-dancing text-gray-800 leading-tight italic font-black hover:text-hot-pink transition-colors cursor-default">「 {line} 」</motion.p>
          ))}
        </div>
        <motion.div className="mt-12 md:mt-16 flex items-center justify-center gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          <div className="h-[2px] w-8 md:w-12 bg-sakura" /><p className="text-hot-pink font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm">Honest Heart 🤍</p><div className="h-[2px] w-8 md:w-12 bg-sakura" />
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
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#FFB7C5', '#FF69B4', '#FFFFFF'] });
  };
  return (
    <Slide direction={direction}>
      <h2 className="text-4xl md:text-6xl font-black text-hot-pink mb-12 font-dancing">Waktunya Tiup Lilin! 🎂</h2>
      <div className="relative flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-end">
          <div className="flex gap-4 mb-[-10px] z-20">
            {['2', '1'].map((n, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {!blown && <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.2 }} className="w-4 h-6 bg-gold rounded-full blur-[2px] shadow-[0_0_10px_#FFD700]" />}
                <div className="w-8 h-12 bg-princess-pink rounded-t-lg flex items-center justify-center text-white font-black text-xl border-2 border-white shadow-md">{n}</div>
              </div>
            ))}
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-40 h-16 bg-sakura rounded-t-3xl border-x-4 border-t-4 border-white shadow-inner z-10" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-56 h-20 bg-princess-pink border-x-4 border-t-4 border-white shadow-md z-[5]" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="w-72 h-24 bg-hot-pink rounded-b-lg border-4 border-white shadow-xl" />
          <div className="w-80 h-4 bg-gray-100 rounded-full shadow-md mt-[-4px]" />
        </div>
        <motion.button onClick={handleBlow} disabled={blown} className={`mt-16 px-8 py-4 rounded-full font-black text-2xl flex items-center gap-3 transition-all ${blown ? 'bg-gray-200 text-gray-400' : 'bg-hot-pink text-white shadow-xl hover:scale-105 active:scale-95'}`}>{blown ? "Sudah Ditiup! ✨" : "Tiup Lilinnya! 🌬️"}{!blown && <Wind className="animate-pulse" />}</motion.button>
      </div>
    </Slide>
  );
};

const LetterSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div className="max-w-3xl w-full bg-white p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-[0_30px_100px_rgba(255,105,180,0.3)] relative border-4 md:border-8 border-sakura">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-40 md:h-40"><Ribbon className="w-full h-full text-hot-pink" /></div>
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
  const handleOpen = () => { if (isOpen) return; setIsOpen(true); confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#FF1493', '#FF69B4', '#FFB7C5', '#FFD700', '#FFFFFF'] }); };
  return (
    <Slide direction={direction}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="closed" className="flex flex-col items-center" exit={{ scale: 0, opacity: 0, rotate: 180 }}>
            <motion.div onClick={handleOpen} className="cursor-pointer relative group" animate={{ rotate: [-3, 3, -3], y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} whileHover={{ scale: 1.1 }}>
              <div className="absolute inset-0 bg-hot-pink/30 blur-[40px] md:blur-[60px] rounded-full scale-150 animate-pulse" /><Gift className="w-40 h-40 md:w-56 md:h-56 text-hot-pink relative z-10 drop-shadow-2xl" strokeWidth={1.5} /><Ribbon className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 md:w-20 md:h-20 text-white z-20" />
            </motion.div>
            <p className="mt-12 md:mt-16 text-hot-pink font-black text-2xl md:text-3xl animate-bounce tracking-widest glitter-text">TEKAN KADO RARAA! 🍰</p>
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center bg-white p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_40px_120px_rgba(255,20,147,0.4)] border-4 md:border-8 border-hot-pink relative mx-4">
            <Ribbon className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 text-hot-pink" /><h2 className="text-4xl md:text-8xl font-black text-hot-pink mb-8 md:mb-10 font-dancing glitter-text">HBD MY PRINCESS! 👑</h2>
            <p className="text-xl md:text-3xl text-gray-700 italic font-black max-w-xl mx-auto mb-8 font-dancing leading-relaxed">Semoga bahagiamu selalu utuh, tawamu tak pernah luntur. I love you more than segala-galanya! ❤️🍭</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
};

const MusicPlayerSlide = ({ direction }) => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const lyricsRef = useRef(null);

  const songs = [
    { title: "Lagu Raraa", file: "/lagu-raraa.mpeg", artist: "Bobby untuk Raraa" },
    { title: "Maaf", file: "/lagu-maaf.mpeg", artist: "Untuk Raraa" }
  ];

  const lyrics = {
    0: [
      "Delapan Februari",
      "Dua puluh satu lilin menyala",
      "Di sunyi layar malam ini",
      "Namamu jadi doa",
      "",
      "Kita bertemu tanpa rencana",
      "Di dunia maya, Roblox ceritanya",
      "Tak pernah ku duga akhirnya",
      "Hatiku jatuh hanya padamu",
      "",
      "Malam terasa panjang",
      "Rindu datang perlahan",
      "Suaramu menenangkan",
      "Meski jarak membentang",
      "",
      "Selamat ulang tahun, Raraa sayang",
      "Maafkan aku yang sering keliru",
      "Kita bertengkar, lalu terdiam",
      "Aku terlambat membaca yang kau pendam",
      "",
      "Meski LDR memisahkan kita",
      "VC jadi temu sederhana",
      "Jika hatimu menyimpan luka",
      "Tolong bicara, jangan sendiri",
      "",
      "Aku tahu aku belum sempurna",
      "Kadang egois, kadang tak peka",
      "Cintaku sering salah cara",
      "Dan itu membuatmu lelah",
      "",
      "Hari ini aku belajar jujur",
      "Mengakui salah dan bersyukur",
      "Aku ingin tumbuh bersamamu",
      "Menjadi lebih baik untukmu",
      "",
      "Saat dunia terasa berat",
      "Dan aku jadi bagian sesak",
      "Genggam tanganku meski jauh",
      "Aku masih ingin bertahan",
      "",
      "Selamat ulang tahun, Raraa cintaku",
      "Di usia dua puluh satu ini",
      "Semoga hatimu tetap hangat",
      "Walau hidup tak selalu pasti",
      "",
      "Meski LDR masih membentang",
      "Aku tak ingin kehilangan terang",
      "Aku akan belajar setia menjaga",
      "Agar bahagiamu tetap ada",
      "",
      "Suatu hari nanti",
      "Tak ada jarak lagi",
      "Tak ada layar, tak ada waktu",
      "Hanya aku dan kamu",
      "",
      "Ini lagu sederhana dariku",
      "Untuk kamu di hatiku",
      "Selamat ulang tahun, Raraa",
      "Aku memilihmu, selalu"
    ],
    1: [
      "Aku tak tahu",
      "Ke mana waktu akan membawa kita",
      "Jujur, aku takut",
      "Ini jadi cara terakhirku menyapamu",
      "",
      "Terima kasih",
      "Untuk semua yang pernah kamu beri",
      "Untuk sabar, tawa, dan luka",
      "Yang pernah kita bagi",
      "",
      "Mencinta ternyata tak selalu mudah",
      "Butuh hadir, mengerti, dan bertahan",
      "Dan aku sadar",
      "Tak semua bisa kujalani dengan sempurna",
      "",
      "Maafkan aku, sayang",
      "Jika caraku sering melukai",
      "Aku sudah berusaha sejujur yang aku bisa",
      "Meski hasilnya tak selalu baik",
      "",
      "Jika suatu hari kamu merasa lelah",
      "Atau ini bukan yang kamu mau",
      "Aku tak akan menahan",
      "Karena memaksa hanya menunda luka",
      "",
      "Aku tahu rasanya berharap",
      "Lalu kecewa setelah berjuang",
      "Tapi semua yang kulakukan",
      "Selalu datang dari niat yang tulus",
      "",
      "Jika memang ini akhirnya",
      "Biarlah berakhir tanpa benci",
      "Aku hanya ingin kamu",
      "Tetap baik-baik di sana",
      "",
      "Jaga dirimu",
      "Semoga kamu selalu bahagia",
      "Dan jika aku harus melepaskan",
      "Lakukanlah dengan tenang"
    ]
  };

  useEffect(() => {
    const audio = playerRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  const togglePlay = async () => {
    const audio = playerRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Playback error:", err);
    }
  };

  const changeSong = (index) => {
    if (index === currentSong) return;
    const audio = playerRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
    setCurrentSong(index);
    setCurrentTime(0);
  };

  const handleProgressClick = (e) => {
    const audio = playerRef.current;
    if (!audio || !duration) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    audio.currentTime = duration * percentage;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Slide direction={direction}>
      <h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-8 font-dancing">Our Songs 🎵</h2>

      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-[3rem] p-6 md:p-8 shadow-2xl border-4 border-sakura relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 3, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-hot-pink to-princess-pink rounded-full flex items-center justify-center shadow-xl"
          >
            <Music className="text-white" size={32} />
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6 mt-4">
          <h3 className="text-xl md:text-2xl font-black text-hot-pink mb-1">{songs[currentSong].title}</h3>
          <p className="text-princess-pink font-dancing text-sm md:text-base">{songs[currentSong].artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div
            onClick={handleProgressClick}
            className="w-full h-2 bg-sakura/30 rounded-full cursor-pointer overflow-hidden mb-2 hover:h-3 transition-all"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-hot-pink to-princess-pink rounded-full"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-princess-pink font-bold">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-hot-pink to-princess-pink rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all"
        >
          {isPlaying ? <VolumeX size={32} /> : <Volume2 size={32} />}
        </motion.button>

        {/* Song Selector */}
        <div className="flex gap-2 justify-center mb-6">
          {songs.map((song, index) => (
            <motion.button
              key={index}
              onClick={() => changeSong(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-2 px-3 rounded-2xl font-bold text-xs md:text-sm transition-all ${currentSong === index
                ? 'bg-hot-pink text-white shadow-lg'
                : 'bg-sakura/20 text-princess-pink hover:bg-sakura/40'
                }`}
            >
              {song.title}
            </motion.button>
          ))}
        </div>

        {/* Lyrics Display */}
        <div
          ref={lyricsRef}
          className="mt-4 p-4 bg-sakura/10 rounded-2xl border-2 border-sakura max-h-64 overflow-y-auto hide-scrollbar scroll-smooth"
        >
          <div className="text-center space-y-2">
            {lyrics[currentSong].map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className={`font-dancing text-sm md:text-base leading-relaxed transition-all ${line === ""
                  ? "h-2"
                  : "text-gray-700 hover:text-hot-pink font-semibold"
                  }`}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <audio ref={playerRef} src={songs[currentSong].file} preload="metadata" />
    </Slide>
  );
};

const FinalSlide = ({ direction }) => (
  <Slide direction={direction}>
    <motion.div initial={{ scale: 0.5 }} animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="relative">
      <div className="absolute inset-0 bg-hot-pink/30 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      <Heart className="w-60 h-60 md:w-80 md:h-80 text-princess-pink drop-shadow-[0_0_30px_rgba(255,20,147,0.5)]" fill="currentColor" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <Ribbon className="w-12 h-12 md:w-20 md:h-20 mb-2 md:mb-4" />
        <p className="font-dancing text-4xl md:text-6xl font-black mb-2">Peluk Jauh! 🧸</p>
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

  const SLIDES = [
    { key: "hero", comp: HeroSlide },
    { key: "timeline", comp: TimelineSlide },
    { key: "lyrics", comp: LyricsSlide },
    { key: "balloons", comp: (props) => <Slide {...props}><h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-4 font-dancing">Wishes for You 🎈</h2><p className="text-princess-pink font-bold text-sm md:text-lg mb-8 animate-pulse">Tap balonnya untuk melihat kejutan! ✨</p><BalloonPop /></Slide> },
    { key: "bucket", comp: BucketListSlide },
    { key: "cake", comp: CakeSlide },
    { key: "hug", comp: (props) => <Slide {...props}><h2 className="text-3xl md:text-5xl font-black text-hot-pink mb-12 font-dancing">Send Me A Hug! 🫂</h2><HoldToHug /></Slide> },
    { key: "reasons", comp: ReasonsSlide },
    { key: "awards", comp: AwardSlide },
    { key: "star", comp: StarSlide },
    { key: "promise", comp: PinkyPromiseSlide },
    { key: "open-when", comp: OpenWhenLetter },
    { key: "gift", comp: GiftSlide },
    { key: "final", comp: FinalSlide },
    { key: "music", comp: MusicPlayerSlide }
  ];

  const totalSlides = SLIDES.length;

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Music play blocked:", err);
    }
  };

  const startMusic = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked, waiting for interaction.");
      }
    }
  };

  const nextSlide = () => {
    if (slide < totalSlides - 1) {
      if (slide === 0) startMusic();
      setDirection(1);
      setSlide(slide + 1);
    }
  };

  const prevSlide = () => { if (slide > 0) { setDirection(-1); setSlide(slide - 1); } };

  return (
    <main className="h-screen w-screen bg-pearl-white overflow-hidden relative font-poppins selection:bg-hot-pink/20 selection:text-hot-pink cursor-default">
      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />
      <AmbientBackground />
      <Glitter />
      <audio ref={audioRef} loop src="/lagu-raraa.mp3" preload="auto" />

      <div className="fixed top-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-10 flex gap-1 md:gap-2 z-[60] bg-white/60 backdrop-blur-md p-2 md:p-3 rounded-full border-2 border-sakura shadow-md max-w-[90vw] overflow-x-auto hide-scrollbar scroll-smooth">
        {SLIDES.map((_, i) => (
          <motion.div key={i} className="cursor-pointer shrink-0" onClick={() => {
            if (slide === 0) startMusic();
            setDirection(i > slide ? 1 : -1);
            setSlide(i);
          }} whileHover={{ scale: 1.3 }}>
            <Heart fill={i <= slide ? "#FF1493" : "none"} stroke={i <= slide ? "#FF1493" : "#FFB7C5"} size={i === slide ? 18 : 10} className="transition-all duration-300" strokeWidth={3} />
          </motion.div>
        ))}
      </div>

      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {React.createElement(SLIDES[slide].comp, { key: SLIDES[slide].key, direction, onNext: nextSlide })}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-6 left-0 right-0 md:bottom-10 flex justify-center items-center gap-4 md:gap-12 z-[60] px-4">
        <AnimatePresence>
          {slide > 0 && (
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={prevSlide} className="group flex items-center gap-2 text-hot-pink font-black bg-white/90 backdrop-blur-md px-4 py-2 md:px-8 md:py-4 rounded-[1.5rem] md:rounded-[2rem] shadow-lg border-2 md:border-4 border-sakura hover:bg-sakura/20 transition-all font-dancing text-lg md:text-2xl bubble-bounce">
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform size-4 md:size-6" strokeWidth={3} />Kembali
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {slide < totalSlides - 1 && (
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={nextSlide} className="group flex items-center gap-2 bg-hot-pink text-white px-5 py-3 md:px-10 md:py-5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border-2 md:border-4 border-white transition-all font-dancing text-xl md:text-3xl font-black bubble-bounce whitespace-nowrap">
              Lihat Kejutan 🎀 <ArrowRight className="group-hover:translate-x-1 transition-transform size-4 md:size-6" strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] text-hot-pink/40 tracking-[0.3em] md:tracking-[0.5em] font-black uppercase pointer-events-none text-center px-4 w-full">
        Handcrafted with Love for Raraa 🤍 2025 - 2026
      </footer>
    </main>
  );
}

export default App;
