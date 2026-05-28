"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChaiTapri } from "@/components/chai-tapri";

const timeline = [
  {
    year: "2022",
    title: "Started B.Tech in CSE",
    description: "Began my journey at ITM University, Gwalior. CGPA: 7.94",
  },
  {
    year: "Dec 2024",
    title: "Backend Developer Intern",
    description: "Prediscan Medtech - Built 8+ REST APIs, optimized AWS workflows by 40%",
  },
  {
    year: "May 2025",
    title: "Full Stack Developer Intern",
    description: "TecnovaCore - Deployed 3 full-stack apps with JWT auth and SQL integration",
  },
  {
    year: "May 2026",
    title: "B.Tech Graduation",
    description: "Completing Computer Science Engineering degree",
  },
];

export function EngineeringSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="engineering"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-light/50 to-transparent" />

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
              स्टेशन 2
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Engineering
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            The craft of building. Years of learning, iterating, and shipping.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h3 className="font-serif text-2xl text-foreground">Tech Stack</h3>
            <ChaiTapri />

            {/* Terminal snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-8 bg-charcoal border border-border rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/50" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <div className="w-3 h-3 rounded-full bg-chart-2/50" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-4 font-mono text-xs">
                <p className="text-muted-foreground">
                  <span className="text-primary">~</span> cat certifications.txt
                </p>
                <p className="text-foreground mt-1">AWS Cloud Foundations Graduate</p>
                <p className="text-foreground">Zscaler Cybersecurity (EDU-102)</p>
                <p className="text-foreground">Palo Alto Networks Virtual Intern</p>
                <p className="text-muted-foreground mt-2">
                  <span className="text-primary">~</span> echo $SECURITY_STACK
                </p>
                <p className="text-foreground mt-1">JWT | BCrypt | CORS | REST API Design</p>
                <p className="text-muted-foreground mt-2">
                  <span className="text-primary">~</span> echo $FUNDAMENTALS
                </p>
                <p className="text-foreground mt-1">OOP | DBMS | OS | CN | Agile/Scrum</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">Journey</h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              {/* Timeline items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.15, duration: 0.5 }}
                    className="relative pl-12 group"
                  >
                    {/* Dot */}
                    <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-card border-2 border-primary/50 group-hover:border-primary group-hover:bg-primary/20 transition-all" />

                    {/* Content */}
                    <div className="bg-card/30 border border-border rounded-lg p-4 hover:border-primary/30 transition-all">
                      <span className="font-mono text-xs text-primary">{item.year}</span>
                      <h4 className="font-serif text-lg text-foreground mt-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
