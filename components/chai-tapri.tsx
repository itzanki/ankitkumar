"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  unit: string;
  note: string;
}

interface MenuCategory {
  id: string;
  titleHindi: string;
  titleEng: string;
  description: string;
  containerClass: string;
  skills: Skill[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "languages",
    titleHindi: "शुद्ध चाय (Languages)",
    titleEng: "Core Languages",
    description: "The strong base of any good tea. Long-brewed fundamentals.",
    containerClass: "from-amber-800/10 to-amber-700/5 border-amber-900/30",
    skills: [
      { name: "TypeScript", level: 85, unit: "ml", note: "Strong and type-safe" },
      { name: "Java", level: 85, unit: "ml", note: "Robust OOP foundation" },
      { name: "Python", level: 80, unit: "ml", note: "Clean and smooth" },
      { name: "JavaScript", level: 75, unit: "ml", note: "Dynamic and fluid" },
      { name: "SQL", level: 80, unit: "ml", note: "Structured extraction" },
    ],
  },
  {
    id: "frontend",
    titleHindi: "कटिंग चाय (Frontend)",
    titleEng: "Visual & Interface",
    description: "Brewed for speed and aesthetics. Stirred with micro-animations.",
    containerClass: "from-yellow-800/10 to-yellow-700/5 border-yellow-900/30",
    skills: [
      { name: "React.js", level: 75, unit: "ml", note: "State-driven flavor" },
      { name: "Next.js", level: 70, unit: "ml", note: "Server-side warmth" },
      { name: "Tailwind CSS", level: 75, unit: "ml", note: "Styled to perfection" },
    ],
  },
  {
    id: "backend",
    titleHindi: "समोसा-चटनी (Backend)",
    titleEng: "Server & Databases",
    description: "The savory bites that fill the stomach. Hearty architecture.",
    containerClass: "from-emerald-800/10 to-emerald-700/5 border-emerald-900/30",
    skills: [
      { name: "Node.js", level: 70, unit: "g", note: "Scalable runtime engine" },
      { name: "Express.js", level: 75, unit: "g", note: "Minimal router spice" },
      { name: "MongoDB", level: 80, unit: "g", note: "NoSQL storage crunch" },
    ],
  },
  {
    id: "cloud",
    titleHindi: "कुल्हड़ चाय (Cloud & DevOps)",
    titleEng: "Infrastructure",
    description: "Earthy clay cups, built for the world scale. Deployed safely.",
    containerClass: "from-orange-850/10 to-orange-700/5 border-orange-950/30",
    skills: [
      { name: "Git & Linux", level: 85, unit: "bar", note: "Secure foundation" },
      { name: "AWS", level: 80, unit: "bar", note: "S3, EC2, Lambda clouds" },
      { name: "Docker", level: 80, unit: "bar", note: "Contained fresh freshness" },
    ],
  },
];

export function ChaiTapri() {
  const [activeCategory, setActiveCategory] = useState<string>("languages");

  const currentCategory = menuCategories.find((cat) => cat.id === activeCategory)!;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Tapri Visual Stage */}
      <div className="relative h-64 w-full bg-card/10 border border-border/40 rounded-2xl overflow-hidden shadow-inner flex items-end justify-around pb-6 px-4">
        {/* Ambient Stall Steam Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none z-0" />
        <div className="absolute top-4 left-6">
          <span className="font-serif text-xs text-primary/40 uppercase tracking-[0.2em]">चाय की टपरी</span>
          <h4 className="font-serif text-lg text-primary/60 mt-1">Ankit's Tech Tapri</h4>
        </div>

        {/* 1. Boiling Kettle (Languages) */}
        <div 
          onClick={() => setActiveCategory("languages")}
          className="relative z-10 flex flex-col items-center cursor-pointer group"
        >
          {/* Steam animation */}
          <div className="absolute -top-10 left-6 flex flex-col gap-1 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20],
                  x: [0, i % 2 === 0 ? 5 : -5, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-primary/20 rounded-full blur-[1px]"
              />
            ))}
          </div>

          <motion.div
            animate={
              activeCategory === "languages"
                ? { y: [0, -2, 0], rotate: [0, 1, -1, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 0.6,
              repeat: activeCategory === "languages" ? Infinity : 0,
              repeatType: "mirror"
            }}
            className="relative"
          >
            {/* Metal Kettle SVG */}
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              className={`transition-colors duration-300 ${
                activeCategory === "languages" 
                  ? "text-primary filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                  : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}
            >
              {/* Kettle body */}
              <path d="M12 42C12 28.7452 22.7452 18 36 18C49.2548 18 60 28.7452 60 42C60 43.1046 59.1046 44 58 44H14C12.8954 44 12 43.1046 12 42Z" fill="currentColor" opacity="0.8" />
              {/* Kettle base */}
              <rect x="14" y="44" width="44" height="4" rx="1" fill="currentColor" />
              {/* Kettle lid knob */}
              <circle cx="36" cy="14" r="3" fill="currentColor" />
              {/* Kettle lid */}
              <path d="M26 18C26 16.5 28 16 36 16C44 16 46 16.5 46 18H26Z" fill="currentColor" />
              {/* Spout */}
              <path d="M13 32L2 28L4 24L15 29L13 32Z" fill="currentColor" />
              {/* Handle */}
              <path d="M22 18V12C22 9 26 6 36 6C46 6 50 9 50 12V18" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Stove Fire */}
          <div className="w-12 h-2 bg-zinc-800 rounded-full mt-1 flex justify-center relative">
            <div className="absolute -top-1 flex gap-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: activeCategory === "languages" ? [6, 12, 6] : [2, 4, 2]
                  }}
                  transition={{
                    duration: 0.4 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-1 rounded-t-full ${
                    activeCategory === "languages" ? "bg-amber-500" : "bg-zinc-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <span className="text-[10px] font-mono mt-2 text-muted-foreground group-hover:text-primary transition-colors">
            Core Burner
          </span>
        </div>

        {/* 2. Cutting Chai Glass Holder (Frontend) */}
        <div 
          onClick={() => setActiveCategory("frontend")}
          className="relative z-10 flex flex-col items-center cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            animate={
              activeCategory === "frontend" 
                ? { y: [0, -2, 0] } 
                : { y: 0 }
            }
            transition={{ duration: 1, repeat: activeCategory === "frontend" ? Infinity : 0 }}
          >
            {/* Wire Stand & Glasses SVG */}
            <svg 
              width="68" 
              height="60" 
              viewBox="0 0 68 60" 
              className={`transition-colors duration-300 ${
                activeCategory === "frontend" 
                  ? "text-primary filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                  : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}
            >
              {/* Stand Handle */}
              <path d="M12 24V10C12 7 16 4 34 4C52 4 56 7 56 10V24" stroke="currentColor" strokeWidth="2.5" fill="none" />
              {/* Stand Tray Base */}
              <rect x="4" y="24" width="60" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
              
              {/* Glass 1 (Left) */}
              <path d="M10 26L12 48C12.2 50 14 52 16 52H20C22 52 23.8 50 24 48L26 26" fill="currentColor" opacity={activeCategory === "frontend" ? 0.7 : 0.3} stroke="currentColor" strokeWidth="1.5" />
              {/* Liquid in Glass 1 */}
              <path d="M12.5 35L13.5 47C13.6 48.5 14.8 49.5 16 49.5H20C21.2 49.5 22.4 48.5 22.5 47L23.5 35H12.5Z" fill="#b45309" opacity={activeCategory === "frontend" ? 0.9 : 0.4} />

              {/* Glass 2 (Right) */}
              <path d="M42 26L44 48C44.2 50 46 52 48 52H52C54 52 55.8 50 56 48L58 26" fill="currentColor" opacity={activeCategory === "frontend" ? 0.7 : 0.3} stroke="currentColor" strokeWidth="1.5" />
              {/* Liquid in Glass 2 */}
              <path d="M44.5 38L45.5 47C45.6 48.5 46.8 49.5 48 49.5H52C53.2 49.5 54.4 48.5 54.5 47L55.5 38H44.5Z" fill="#b45309" opacity={activeCategory === "frontend" ? 0.9 : 0.4} />
            </svg>
          </motion.div>

          <span className="text-[10px] font-mono mt-2 text-muted-foreground group-hover:text-primary transition-colors">
            Cutting Stand
          </span>
        </div>

        {/* 3. Samosa Plate (Backend) */}
        <div 
          onClick={() => setActiveCategory("backend")}
          className="relative z-10 flex flex-col items-center cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            animate={
              activeCategory === "backend" 
                ? { scale: [1, 1.03, 1] } 
                : { scale: 1 }
            }
            transition={{ duration: 1.2, repeat: activeCategory === "backend" ? Infinity : 0 }}
          >
            {/* Samosa Plate SVG */}
            <svg 
              width="64" 
              height="60" 
              viewBox="0 0 64 60" 
              className={`transition-colors duration-300 ${
                activeCategory === "backend" 
                  ? "text-primary filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                  : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}
            >
              {/* Plate / Leaf (Pattal) */}
              <ellipse cx="32" cy="42" rx="28" ry="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <ellipse cx="32" cy="42" rx="26" ry="8" fill="currentColor" opacity="0.1" />

              {/* Samosa 1 (Left Back) */}
              <path d="M12 40L24 24L30 38Z" fill="currentColor" opacity={activeCategory === "backend" ? 0.8 : 0.4} stroke="currentColor" strokeWidth="1.5" />
              {/* Samosa 2 (Right Back) */}
              <path d="M34 38L42 22L52 38Z" fill="currentColor" opacity={activeCategory === "backend" ? 0.8 : 0.4} stroke="currentColor" strokeWidth="1.5" />
              {/* Samosa 3 (Front Center) */}
              <path d="M22 45L34 26L44 43Z" fill="currentColor" opacity={activeCategory === "backend" ? 0.95 : 0.5} stroke="currentColor" strokeWidth="2" />
              
              {/* Chutney Drops */}
              <circle cx="16" cy="45" r="2" fill="#15803d" opacity="0.7" />
              <circle cx="48" cy="44" r="3" fill="#b91c1c" opacity="0.7" />
            </svg>
          </motion.div>

          <span className="text-[10px] font-mono mt-2 text-muted-foreground group-hover:text-primary transition-colors">
            Samosa Plate
          </span>
        </div>

        {/* 4. Kulhad Stand (Cloud & DevOps) */}
        <div 
          onClick={() => setActiveCategory("cloud")}
          className="relative z-10 flex flex-col items-center cursor-pointer group"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            animate={
              activeCategory === "cloud" 
                ? { rotate: [0, 2, -2, 0] } 
                : { rotate: 0 }
            }
            transition={{ duration: 0.5, repeat: activeCategory === "cloud" ? 3 : 0 }}
          >
            {/* Clay Cups (Kulhads) Stack SVG */}
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 60 60" 
              className={`transition-colors duration-300 ${
                activeCategory === "cloud" 
                  ? "text-primary filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                  : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}
            >
              {/* Bench shelf line */}
              <line x1="2" y1="52" x2="58" y2="52" stroke="currentColor" strokeWidth="2" />

              {/* Kulhad 1 (Bottom Left) */}
              <path d="M8 50 L12 36 A6 6 0 0 1 24 36 L28 50 Z" fill="currentColor" opacity={activeCategory === "cloud" ? 0.85 : 0.4} stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="18" cy="36" rx="6" ry="2" fill="#c2410c" opacity="0.6" />

              {/* Kulhad 2 (Bottom Right) */}
              <path d="M30 50 L34 36 A6 6 0 0 1 46 36 L50 50 Z" fill="currentColor" opacity={activeCategory === "cloud" ? 0.85 : 0.4} stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="40" cy="36" rx="6" ry="2" fill="#c2410c" opacity="0.6" />

              {/* Kulhad 3 (Stacked Top Center) */}
              <path d="M19 34 L23 20 A6 6 0 0 1 35 20 L39 34 Z" fill="currentColor" opacity={activeCategory === "cloud" ? 0.95 : 0.5} stroke="currentColor" strokeWidth="2" />
              <ellipse cx="29" cy="20" rx="6" ry="2" fill="#c2410c" opacity="0.8" />
            </svg>
          </motion.div>

          <span className="text-[10px] font-mono mt-2 text-muted-foreground group-hover:text-primary transition-colors">
            Kulhad Pile
          </span>
        </div>
      </div>

      {/* Menu / Chalkboard Recipe Card */}
      <div className="relative min-h-[300px] border border-primary/20 rounded-2xl bg-charcoal/40 p-6 shadow-xl backdrop-blur-sm">
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40 rounded-br-sm pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="font-serif text-sm text-primary tracking-wide block">
                    {currentCategory.titleHindi}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground mt-1">
                    {currentCategory.titleEng}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/60 px-3 py-1 border border-border/60 rounded-full">
                  RECIPE NO. 0{menuCategories.indexOf(currentCategory) + 1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 italic font-serif">
                "{currentCategory.description}"
              </p>
            </div>

            {/* Recipe Ingredients / Skills progress */}
            <div className="space-y-5">
              {currentCategory.skills.map((skill, idx) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      <span className="font-mono text-sm text-foreground font-semibold">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className="text-sm text-primary font-bold">{skill.level}</span>
                      <span className="text-[10px] text-muted-foreground">{skill.unit}</span>
                    </div>
                  </div>

                  {/* Progress fill bar */}
                  <div className="h-2 bg-secondary/40 rounded-full overflow-hidden border border-border/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full relative"
                    >
                      {/* Fluid glow overlay */}
                      <div className="absolute inset-0 bg-white/5 opacity-50" />
                    </motion.div>
                  </div>

                  {/* Micro-notes */}
                  <span className="font-serif text-[11px] text-muted-foreground/75 pl-3.5">
                    * {skill.note}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
