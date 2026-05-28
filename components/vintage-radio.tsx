"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Volume2, VolumeX, Power, RotateCcw } from "lucide-react";

interface Station {
  frequency: number;
  name: string;
  hindi: string;
  description: string;
  src: string;
}

const stations: Station[] = [
  { frequency: 88.5, name: "Stormy Train", hindi: "तूफानी सफर", description: "Rain & heavy bass echo", src: "/station-88-5.mp3" },
  { frequency: 91.1, name: "Chhath Lofi", hindi: "छठ लो-फाइ", description: "Pure crystal clear beats", src: "/ambient.mp3" },
  { frequency: 104.3, name: "Vividh Bharati", hindi: "विविध भारती", description: "Old-school shortwave filter", src: "/station-104-3.mp3" },
];

export function VintageRadio() {
  const [isOpen, setIsOpen] = useState(false);
  const [powerOn, setPowerOn] = useState(false);
  const [frequency, setFrequency] = useState(91.1); // Start at 91.1
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const staticGainRef = useRef<GainNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Web Audio API
  const initWebAudio = () => {
    if (audioCtxRef.current || !audioRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Source from audio element
      const source = ctx.createMediaElementSource(audioRef.current);

      // Main filter node
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 20000;
      filterNodeRef.current = filter;

      // Music Gain node
      const musicGain = ctx.createGain();
      musicGain.gain.value = volume;
      musicGainRef.current = musicGain;

      // Connect music path: Source -> Filter -> MusicGain -> Destination
      source.connect(filter);
      filter.connect(musicGain);
      musicGain.connect(ctx.destination);

      // Generate White Noise Buffer for static
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      // Create static noise source
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      // Static Gain node
      const staticGain = ctx.createGain();
      staticGain.gain.value = 0.0;
      staticGainRef.current = staticGain;

      // Connect static path: Noise -> StaticGain -> Destination
      noise.connect(staticGain);
      staticGain.connect(ctx.destination);
      noise.start();
      noiseSourceRef.current = noise;
    } catch (e) {
      console.warn("Web Audio API not fully supported. Falling back to default audio control.", e);
    }
  };

  // Toggle Power
  const handlePowerToggle = () => {
    const nextPower = !powerOn;
    setPowerOn(nextPower);

    // Initialize Web Audio on first user gesture
    if (nextPower) {
      initWebAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    }
  };

  // Handle HTML5 audio playback and Volume adjustments
  useEffect(() => {
    if (!audioRef.current) return;

    if (powerOn) {
      // Set volume before play
      if (musicGainRef.current) {
        musicGainRef.current.gain.value = volume;
      } else {
        audioRef.current.volume = volume;
      }

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log("Audio autoplay policy check:", err));
      }
    } else {
      audioRef.current.pause();
    }
  }, [powerOn]);

  // Adjust Volume in nodes
  useEffect(() => {
    if (musicGainRef.current) {
      musicGainRef.current.gain.value = volume * (1 - Math.min(1, Math.abs(frequency - 91.1) / 0.2));
    } else if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle Tuning Physics: mixes static noise and applies lowpass filters based on frequency distance
  useEffect(() => {
    if (!powerOn) return;

    // Find distance to closest station
    const nearestStation = stations.reduce((prev, curr) => {
      return Math.abs(frequency - curr.frequency) < Math.abs(frequency - prev.frequency) ? curr : prev;
    });
    
    const minDistance = Math.abs(frequency - nearestStation.frequency);
    const targetStation = nearestStation;

    const isTunedIn = minDistance < 0.25;
    const tuningRatio = isTunedIn ? minDistance / 0.25 : 1.0; // 0 = perfectly tuned, 1 = total static

    // Dynamically switch track when tuned into a new station
    if (isTunedIn && targetStation && audioRef.current) {
      const targetSrc = targetStation.src;
      const currentSrc = audioRef.current.getAttribute("src");
      if (currentSrc !== targetSrc) {
        audioRef.current.setAttribute("src", targetSrc);
        audioRef.current.load();
        if (powerOn) {
          audioRef.current.play().catch((err) => console.log("Track transition play deferred:", err));
        }
      }
    }

    // Music Volume: max when perfectly tuned, 0 when off-station
    const musicScale = isTunedIn ? 1.0 - tuningRatio : 0.0;
    // Static Volume: 0 when perfectly tuned, max (around 0.25 for comfort) when off-station
    const staticScale = tuningRatio * 0.15;

    // Set Gains
    if (musicGainRef.current) {
      musicGainRef.current.gain.value = volume * musicScale;
    }
    if (staticGainRef.current) {
      staticGainRef.current.gain.value = staticScale;
    }

    // Apply specific station filters for cultural texture
    if (filterNodeRef.current) {
      if (isTunedIn && targetStation) {
        const s: Station = targetStation;
        if (s.frequency === 88.5) {
          // Stormy Train: Muffled lowpass filter
          filterNodeRef.current.frequency.value = 500; 
        } else if (s.frequency === 104.3) {
          // Shortwave AM Radio: Bandpass-like effect (muffled high and low)
          filterNodeRef.current.frequency.value = 1600;
        } else {
          // Crystal clear FM
          filterNodeRef.current.frequency.value = 20000;
        }
      } else {
        // Muffled static when between stations
        filterNodeRef.current.frequency.value = 800;
      }
    }
  }, [frequency, powerOn, volume]);

  // Fallback handler for missing station mp3 files
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      const currentSrc = audio.getAttribute("src");
      if (currentSrc && currentSrc !== "/ambient.mp3") {
        console.warn(`Failed to load ${currentSrc}. Falling back to default ambient track.`);
        audio.setAttribute("src", "/ambient.mp3");
        audio.load();
        if (powerOn) {
          audio.play().catch((e) => console.log("Fallback playback deferred:", e));
        }
      }
    };

    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("error", handleError);
    };
  }, [powerOn]);

  // Clean up Web Audio resources on unmount
  useEffect(() => {
    return () => {
      if (noiseSourceRef.current) {
        try { noiseSourceRef.current.stop(); } catch (e) {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="fixed bottom-36 right-6 md:right-10 z-50 pointer-events-auto flex flex-col items-end">
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/ambient.mp3" loop />

      <AnimatePresence>
        {/* The Radio Body */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-72 bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 border border-amber-900/40 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-4 select-none relative overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Header: Brand Name */}
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-serif text-[10px] text-amber-700/60 uppercase tracking-widest">बिहार ट्रांजिस्टर</span>
              <span className="font-mono text-[9px] text-amber-600/40">AN-1998</span>
            </div>

            {/* Display / Dial Window */}
            <div className="h-16 bg-amber-950/40 border border-amber-900/60 rounded-lg p-2 flex flex-col justify-between relative overflow-hidden">
              {/* Dial Background lines */}
              <div className="absolute inset-x-2 top-6 bottom-4 flex justify-between opacity-30 pointer-events-none">
                {[...Array(21)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[1px] bg-amber-500 ${
                      i % 5 === 0 ? "h-4" : i % 2 === 0 ? "h-2.5" : "h-1.5"
                    }`}
                  />
                ))}
              </div>

              {/* Station Indicators (Tuning Labels) */}
              <div className="flex justify-between items-center text-[9px] font-mono text-amber-500/75 z-10">
                <span>88 MHz</span>
                <span>98 MHz</span>
                <span>108 MHz</span>
              </div>

              {/* Orange Needle pointer */}
              <motion.div
                animate={{ left: `${((frequency - 88) / 20) * 100}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="absolute top-4 bottom-3 w-[2px] bg-orange-500 shadow-[0_0_8px_#f97316] z-10"
              />

              {/* Current Status readouts */}
              <div className="flex justify-between items-end z-10 mt-1">
                <span className="font-mono text-[10px] text-orange-400 font-bold bg-black/40 px-1.5 py-0.5 rounded border border-orange-950/50">
                  {frequency.toFixed(1)} MHz
                </span>
                <span className="font-serif text-[9px] text-amber-500/75">
                  {powerOn
                    ? Math.abs(frequency - 91.1) < 0.25
                      ? "• TUNED IN"
                      : "• STATIC..."
                    : "• POWER OFF"}
                </span>
              </div>
            </div>

            {/* Station Preset shortcuts */}
            <div className="grid grid-cols-3 gap-1.5 my-3">
              {stations.map((st) => (
                <button
                  key={st.frequency}
                  onClick={() => {
                    if (powerOn) setFrequency(st.frequency);
                  }}
                  disabled={!powerOn}
                  className={`py-1 px-1 text-[9px] font-serif border rounded transition-all truncate text-center ${
                    powerOn && Math.abs(frequency - st.frequency) < 0.15
                      ? "bg-amber-600/20 border-primary text-primary"
                      : "bg-black/20 border-border/20 text-muted-foreground hover:border-amber-900/40"
                  }`}
                >
                  <div className="font-bold">{st.frequency}</div>
                  <div className="text-[7px] opacity-75">{st.hindi}</div>
                </button>
              ))}
            </div>

            {/* Dial Tuning bar */}
            <div className="flex flex-col gap-1 mb-3">
              <span className="text-[8px] font-mono text-muted-foreground/60">TUNE FREQUENCY</span>
              <input
                type="range"
                min="88"
                max="108"
                step="0.1"
                value={frequency}
                disabled={!powerOn}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full accent-primary h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              />
            </div>

            {/* Controls panel */}
            <div className="flex items-center justify-between pt-2.5 border-t border-amber-950/40">
              {/* Power Toggle Button */}
              <button
                onClick={handlePowerToggle}
                className={`p-2.5 rounded-full border transition-all ${
                  powerOn
                    ? "bg-red-950/20 border-red-500 text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)] animate-pulse"
                    : "bg-black/20 border-border/20 text-muted-foreground hover:border-border/50"
                }`}
                title={powerOn ? "Turn Radio Off" : "Turn Radio On"}
              >
                <Power className="w-4 h-4" />
              </button>

              {/* Speaker Grille decorative */}
              <div className="flex-1 px-4 flex flex-col gap-1 pointer-events-none opacity-40">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-[2px] bg-stone-700 rounded-full" />
                ))}
              </div>

              {/* Volume Slider & icon */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                  disabled={!powerOn}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  {volume === 0 || !powerOn ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  disabled={!powerOn}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 accent-primary h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3.5 rounded-full shadow-lg border backdrop-blur-md transition-all ${
          isOpen
            ? "bg-primary text-black border-primary"
            : "bg-charcoal/80 text-primary border-primary/20 hover:border-primary/50"
        }`}
        title="Tune Radio Station"
      >
        <div className="relative">
          {/* Pulsing signal rings if playing */}
          {powerOn && (
            <span className="absolute -inset-2 rounded-full border border-primary/40 animate-ping pointer-events-none" />
          )}
          <Radio className="w-5 h-5" />
        </div>
      </motion.button>
    </div>
  );
}
