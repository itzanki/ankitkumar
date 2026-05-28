"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Sparkles, Globe, Code, Cpu } from "lucide-react";

const visions = [
  {
    icon: Cpu,
    title: "AI-Native Products",
    description:
      "Building intelligent systems that augment human capability. The next wave of software is AI-first.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Creating infrastructure and products that serve millions. Building for the world, not just a region.",
  },
  {
    icon: Code,
    title: "Open Source",
    description:
      "Contributing to the commons. Good software should be shared, improved, and accessible to all.",
  },
];

export function FutureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="future"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

      {/* Falling Bodhi (Peepal) Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: -50,
              rotate: 0,
              scale: 0.5 + Math.random() * 0.8,
            }}
            animate={{
              y: "120vh",
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          >
            {/* Custom Bodhi Leaf SVG Path */}
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12 2c0 0-4.5 4-6 9.5-1 3.5.5 7 2.5 8.5 1.5 1 3 1.5 3.5 1.5v2h1v-2c.5 0 2-.5 3.5-1.5 2-1.5 3.5-5 2.5-8.5C16.5 6 12 2 12 2z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="railway-text text-xs text-muted-foreground tracking-[0.3em]">
              स्टेशन 4
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            The journey continues. Here&apos;s where I&apos;m headed.
          </p>
        </motion.div>

        {/* Vision cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {visions.map((vision, index) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <vision.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {vision.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {vision.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="relative inline-block mb-8">
            <Sparkles className="w-8 h-8 text-primary mx-auto" />
          </div>

          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
            <span className="gold-gradient">&ldquo;Roots in Bihar.</span>
            <br />
            <span className="text-foreground">Mindset global.&rdquo;</span>
          </blockquote>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12">
            Seeking a software developer role to contribute production-grade engineering, 
            solve complex technical problems, and deliver measurable business impact.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:anki9905@gmail.com"
              className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/itzanki"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-border text-foreground rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2"
            >
              <span>View GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
