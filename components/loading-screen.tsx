"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"ticket" | "loading">("ticket");
  const [passengerName, setPassengerName] = useState("Guest Passenger");
  const [fromLocation, setFromLocation] = useState("");
  const [ticketClass, setTicketClass] = useState("AC 3-Tier");
  const [isPunched, setIsPunched] = useState(false);
  const [isTicketExiting, setIsTicketExiting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(12345);
  const [today, setToday] = useState("");

  useEffect(() => {
    setTicketNumber(Math.floor(Math.random() * 90000) + 10000);
    setToday(new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).toUpperCase());
  }, []);

  // Loading Screen State
  const [progress, setProgress] = useState(0);
  const [isLoadingExiting, setIsLoadingExiting] = useState(false);

  const handlePunch = () => {
    if (isPunched) return;
    
    // Save ticket data to localStorage
    const ticketData = {
      name: passengerName || "GUEST",
      from: fromLocation || "EARTH",
      ticketClass: ticketClass,
      date: today,
      ticketNumber: ticketNumber
    };
    try {
      localStorage.setItem("ankitJourneyTicket", JSON.stringify(ticketData));
    } catch(e) {}

    // Play punch sound using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "square";
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}

    setIsPunched(true);

    // Wait for punch animation, then flip ticket out
    setTimeout(() => {
      setIsTicketExiting(true);
      // Wait for ticket to completely exit, then start loading screen
      setTimeout(() => {
        setStage("loading");
      }, 800);
    }, 1500);
  };

  useEffect(() => {
    if (stage !== "loading") return;

    const duration = 2000; // Slightly faster since we already waited for ticket
    const interval = 30;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoadingExiting(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {!isLoadingExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          style={{ perspective: 1500 }}
        >
          {/* Global Backgrounds */}
          <div className="absolute inset-0 paper-texture pointer-events-none" />
          <div className="absolute inset-0 madhubani-pattern opacity-30 pointer-events-none" />
          <div className="absolute inset-0 vignette pointer-events-none" />

          {/* STAGE 1: TICKET */}
          <AnimatePresence>
            {stage === "ticket" && !isTicketExiting && (
              <motion.div
                key="ticket-stage"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
                className="relative z-10 flex flex-col items-center w-full"
              >
                {/* Intro Text */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 text-center"
                >
                  <p className="railway-text text-sm text-primary tracking-[0.3em] mb-2">
                    WELCOME TO THE JOURNEY
                  </p>
                  <p className="font-serif text-muted-foreground italic">
                    Please enter your details to board
                  </p>
                </motion.div>

                {/* Ticket Container */}
                <motion.div
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={
                    isPunched 
                      ? { rotateX: [0, 0, -180], scale: [1, 1.05, 0.8], opacity: [1, 1, 0] } 
                      : { rotateX: 0, opacity: 1 }
                  }
                  transition={
                    isPunched 
                      ? { duration: 1.5, times: [0, 0.3, 1], ease: "easeInOut" } 
                      : { duration: 0.8, type: "spring" }
                  }
                  className="w-[90%] max-w-[700px] flex rounded-lg shadow-2xl relative overflow-hidden transform-style-3d"
                  style={{ backgroundColor: "#f0b469", color: "#1a1714", minHeight: "240px" }}
                >
                  {/* Perforated Stub */}
                  <div className="w-1/4 border-r-4 border-dashed border-[#1a1714]/20 p-4 flex flex-col justify-between items-center bg-[#e6a15c]">
                    <div className="font-serif font-bold text-2xl md:text-3xl tracking-widest text-[#1a1714]/80 mt-2" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                      भारतीय रेल
                    </div>
                    <div className="font-mono text-[10px] md:text-xs font-bold text-[#1a1714]/70 mt-4">
                      NO. {ticketNumber}
                    </div>
                  </div>
                  
                  {/* Main Ticket */}
                  <div className="w-3/4 p-6 flex flex-col justify-between relative overflow-hidden bg-[#f0b469]">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <span className="text-9xl font-serif">IR</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-serif font-bold tracking-widest text-lg md:text-xl text-black">INDIAN RAILWAYS</h2>
                        <p className="font-mono text-[10px] font-bold mt-1 tracking-widest text-black/70">JOURNEY TICKET</p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[10px] font-bold text-black/60">DATE</div>
                        <div className="font-mono text-sm md:text-base font-bold text-black">{today}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 z-10">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">FROM</p>
                        {isPunched ? (
                          <p className="font-serif font-bold text-lg md:text-xl leading-tight text-black truncate">{fromLocation || "EARTH"}</p>
                        ) : (
                          <input 
                            type="text" 
                            value={fromLocation} 
                            onChange={(e) => setFromLocation(e.target.value)}
                            className="bg-transparent border-b-2 border-black/30 focus:border-black outline-none font-serif font-bold uppercase w-full text-black placeholder:text-black/30 transition-colors text-lg md:text-xl leading-tight pointer-events-auto"
                            placeholder="YOUR CITY"
                            maxLength={15}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">TO</p>
                        <p className="font-serif font-bold text-lg md:text-xl whitespace-nowrap leading-tight text-black">ANKIT'S JOURNEY</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 z-10">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">PASSENGER NAME</p>
                        {isPunched ? (
                          <p className="font-mono font-bold uppercase text-black text-sm md:text-base truncate">{passengerName || "GUEST"}</p>
                        ) : (
                          <input 
                            type="text" 
                            value={passengerName} 
                            onChange={(e) => setPassengerName(e.target.value)}
                            className="bg-transparent border-b-2 border-black/30 focus:border-black outline-none font-mono font-bold uppercase w-full text-black placeholder:text-black/30 transition-colors text-sm md:text-base pointer-events-auto"
                            placeholder="ENTER NAME"
                            maxLength={20}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">CLASS</p>
                        {isPunched ? (
                          <p className="font-mono font-bold uppercase text-black text-sm md:text-base">{ticketClass}</p>
                        ) : (
                          <select 
                            value={ticketClass}
                            onChange={(e) => setTicketClass(e.target.value)}
                            className="bg-transparent border-b-2 border-black/30 focus:border-black outline-none font-mono font-bold uppercase w-full cursor-pointer text-black transition-colors text-sm md:text-base pointer-events-auto"
                          >
                            <option className="bg-[#f0b469]">GENERAL</option>
                            <option className="bg-[#f0b469]">SLEEPER</option>
                            <option className="bg-[#f0b469]">AC 3-TIER</option>
                            <option className="bg-[#f0b469]">FIRST AC</option>
                          </select>
                        )}
                      </div>
                    </div>
                    
                    {/* Stamp Overlay */}
                    <AnimatePresence>
                      {isPunched && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 2, rotate: -30 }}
                          animate={{ opacity: 0.85, scale: 1, rotate: -15 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 border-4 border-red-800 text-red-800 rounded-full w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center pointer-events-none"
                        >
                          <div className="font-serif font-black text-sm md:text-lg tracking-widest">PUNCHED</div>
                          <div className="font-mono text-[8px] md:text-[10px] font-bold mt-1 border-t border-red-800 pt-1">{today}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Punch Hole */}
                  <AnimatePresence>
                    {isPunched && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-background rounded-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] z-20"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isPunched ? 0 : 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12"
                >
                  <button 
                    onClick={handlePunch}
                    disabled={isPunched}
                    className="px-8 py-3 bg-[#f0b469] hover:bg-[#e6a15c] text-[#1a1714] font-mono font-bold uppercase tracking-widest transition-all rounded shadow-[0_0_15px_rgba(240,180,105,0.3)] hover:shadow-[0_0_25px_rgba(240,180,105,0.5)] active:scale-95 disabled:opacity-0 relative z-20 cursor-pointer pointer-events-auto"
                  >
                    Punch Ticket to Board
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2: ORIGINAL LOADING SCREEN */}
          <AnimatePresence>
            {stage === "loading" && (
              <motion.div
                key="loading-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-8"
              >
                {/* Railway-style logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="w-24 h-24 border-2 border-primary rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-primary/50 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-serif text-primary">यात्रा</span>
                    </div>
                  </div>
                </motion.div>

                {/* Loading text */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="railway-text text-xs text-muted-foreground tracking-[0.3em] mb-2">
                    Preparing Your Journey
                  </p>
                  <p className="font-serif text-lg text-foreground/80 italic">
                    From Bihar to Building the Internet
                  </p>
                </motion.div>

                {/* Progress bar */}
                <div className="w-64 h-[2px] bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Progress percentage */}
                <motion.span
                  className="font-mono text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative elements for STAGE 2 */}
          <AnimatePresence>
            {stage === "loading" && (
              <>
                <motion.div
                  className="absolute bottom-8 left-8 text-muted-foreground/30 font-mono text-xs z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  PLATFORM 1
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-8 text-muted-foreground/30 font-mono text-xs z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  भारतीय रेल
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
