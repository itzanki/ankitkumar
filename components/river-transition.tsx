"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function RiverTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const waveOffset1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const waveOffset2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="relative h-64 w-full overflow-hidden">
      {/* River bed gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      {/* Main river SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main river gradient */}
          <linearGradient id="riverMainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          {/* Shimmer gradient */}
          <linearGradient id="riverShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.3" />
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
            <animate attributeName="x1" values="-100%;100%" dur="3s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0%;200%" dur="3s" repeatCount="indefinite" />
          </linearGradient>

          {/* Water reflection filter */}
          <filter id="waterReflection" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" result="noise" seed="5">
              <animate attributeName="baseFrequency" values="0.01 0.05;0.015 0.06;0.01 0.05" dur="8s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Glow effect */}
          <filter id="riverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* River bank - top */}
        <motion.path
          d="M0,70 Q100,60 200,75 T400,70 T600,80 T800,65 T1000,75 T1200,70"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.15"
          style={{ pathLength: pathProgress }}
        />

        {/* Main river body - wide flowing water */}
        <motion.path
          d="M0,100 Q150,80 300,105 T600,95 T900,110 T1200,100"
          fill="none"
          stroke="url(#riverMainGradient)"
          strokeWidth="40"
          strokeLinecap="round"
          filter="url(#waterReflection)"
          style={{ pathLength: pathProgress }}
        />

        {/* River current lines */}
        <motion.path
          d="M0,90 Q200,75 400,95 T800,85 T1200,95"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="20 30"
          style={{ pathLength: pathProgress, x: waveOffset1 }}
        />

        <motion.path
          d="M0,105 Q180,120 360,100 T720,115 T1080,100 T1200,110"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeDasharray="15 25"
          style={{ pathLength: pathProgress, x: waveOffset2 }}
        />

        <motion.path
          d="M0,115 Q250,95 500,118 T1000,108 T1200,115"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeDasharray="10 20"
          style={{ pathLength: pathProgress }}
        />

        {/* Shimmer overlay */}
        <motion.path
          d="M0,100 Q150,80 300,105 T600,95 T900,110 T1200,100"
          fill="none"
          stroke="url(#riverShimmer)"
          strokeWidth="30"
          strokeLinecap="round"
          style={{ pathLength: pathProgress }}
        />

        {/* River bank - bottom */}
        <motion.path
          d="M0,130 Q100,140 200,125 T400,135 T600,120 T800,130 T1000,125 T1200,130"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.15"
          style={{ pathLength: pathProgress }}
        />

        {/* Ripple circles */}
        <circle cx="300" cy="100" r="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.3">
          <animate attributeName="r" values="0;15;0" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="600" cy="95" r="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.3">
          <animate attributeName="r" values="0;12;0" dur="3.5s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="900" cy="105" r="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.3">
          <animate attributeName="r" values="0;10;0" dur="3s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
        </circle>
      </svg>

      {/* Floating debris/leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 100%)`,
            top: `${35 + Math.random() * 30}%`,
          }}
          initial={{ x: "-5%", opacity: 0 }}
          animate={{
            x: ["105%"],
            y: [0, -10, 5, -8, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.7, 0.7, 0],
          }}
          transition={{
            x: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            opacity: { duration: 12 + i * 3, repeat: Infinity },
            delay: i * 1.8,
          }}
        />
      ))}

      {/* Light sparkles on water */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${40 + Math.sin(i) * 15}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ganga reference text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-[10px] font-mono text-primary/50 tracking-widest">
          ~ गंगा ~
        </span>
      </motion.div>
    </div>
  );
}
