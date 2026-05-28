"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 madhubani-pattern opacity-20" />

      {/* Animated fog/smoke particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0.5,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Moving light reflections */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >

        {/* Railway ticket card */}
        <motion.div
          initial={{ y: 50, opacity: 0, rotateX: 15 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-lg mb-12"
        >
          <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 md:p-8 shadow-2xl">
            {/* Ticket perforations */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-l-full" />

            {/* Ticket header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-border">
              <div className="text-left">
                <p className="railway-text text-[10px] text-muted-foreground">From</p>
                <p className="font-serif text-lg text-foreground">Bihar</p>
              </div>
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="flex-1 h-px bg-border" />
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-2"
                >
                  <svg
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                    className="text-primary"
                  >
                    <path
                      d="M0 6h20M16 2l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="text-right">
                <p className="railway-text text-[10px] text-muted-foreground">Destination</p>
                <p className="font-serif text-lg text-primary">Software Engineer</p>
              </div>
            </div>

            {/* Ticket details */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="railway-text text-[10px] text-muted-foreground mb-1">Platform</p>
                <p className="font-mono text-sm text-foreground">01</p>
              </div>
              <div>
                <p className="railway-text text-[10px] text-muted-foreground mb-1">Class</p>
                <p className="font-mono text-sm text-foreground">FULL STACK</p>
              </div>
              <div>
                <p className="railway-text text-[10px] text-muted-foreground mb-1">Status</p>
                <p className="font-mono text-sm text-primary">CONFIRMED</p>
              </div>
            </div>

            {/* Barcode decoration */}
            <div className="mt-6 pt-4 border-t border-dashed border-border">
              <div className="flex justify-center gap-[2px]">
                {isMounted && [...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted-foreground/30"
                    style={{
                      width: Math.random() > 0.5 ? "2px" : "1px",
                      height: "20px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight">
            <span className="block">Hi, I&apos;m Ankit Kumar</span>
            <span className="gold-gradient">Full Stack Developer</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Building scalable web applications with React, Node.js, and AWS.
          <br />
          <span className="text-primary/80 italic">From Bihar to the World. Rooted but Futuristic.</span>
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="railway-text text-[10px] text-muted-foreground tracking-widest">
            Scroll to Begin Journey
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Station markers */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-4 md:left-8 bottom-20 flex gap-4 hidden md:flex"
      >
        <span
          className="font-mono text-xs text-muted-foreground/50"
          style={{ writingMode: "vertical-rl" }}
        >
          STATION 00 — ORIGIN
        </span>
        <span
          className="font-serif text-4xl text-primary/30 tracking-widest drop-shadow-sm"
          style={{ writingMode: "vertical-rl" }}
        >
          गंगा
        </span>
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute right-4 md:right-8 bottom-20 font-mono text-xs text-muted-foreground/50 hidden md:block"
        style={{ writingMode: "vertical-lr" }}
      >
        प्रस्थान बिंदु
      </motion.div>
    </section>
  );
}
