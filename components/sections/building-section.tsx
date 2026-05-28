"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

const projects = [
  {
    title: "CareConnect",
    description:
      "Full-stack home healthcare platform with 4 role-based dashboards (Patient, Nurse, Care Assistant, Admin). Real-time appointment booking, emergency ambulance dispatch, and secure doctor consultations.",
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB"],
    metrics: { roles: "4", apis: "100%", revenue: "Auto-split" },
    github: "https://github.com/itzanki/CareConnect.git",
    live: "https://care-connect-beta-sable.vercel.app/dashboard/patient",
    featured: true,
    highlights: [
      "JWT + BCrypt auth with role-based access",
      "70/30 automated revenue split logic",
      "Real-time GPS for ambulance routing",
    ],
  },
  {
    title: "Smart Recipe Generator",
    description:
      "Full-stack web app that generates personalized recipes based on user-selected ingredients and preferences. Modular, scalable architecture with RESTful APIs.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    metrics: { type: "Full Stack", api: "RESTful", arch: "Modular" },
    github: "https://github.com/itzanki/Recipe_generator.git",
    live: "https://recipe-generator-pink.vercel.app/",
    featured: true,
    highlights: [
      "Ingredient-based recipe generation",
      "User preference management",
      "Scalable backend architecture",
    ],
  },
  {
    title: "Prediscan Medtech",
    description:
      "8+ secure Python-based REST APIs handling high-volume medical image data with 30% faster response times.",
    tech: ["Python", "AWS S3", "AWS Lambda", "REST API"],
    metrics: { apis: "8+", faster: "30%", throughput: "+40%" },
    github: "#",
    featured: false,
  },
  {
    title: "TecnovaCore",
    description:
      "3 full-stack web applications with end-to-end user flows from authentication to CRUD operations.",
    tech: ["React", "Node.js", "Express", "SQL"],
    metrics: { apps: "3", auth: "JWT", db: "SQL" },
    github: "#",
    featured: false,
  },
];

export function BuildingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="building"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 madhubani-pattern opacity-5" />

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
              स्टेशन 3
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Building
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Real engineering work. Products that solve problems and scale.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                className="group"
              >
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-500 h-full">
                  {/* Featured badge */}
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                      Featured
                    </span>
                  </div>

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-4 h-4 text-muted-foreground" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                          aria-label={`View ${project.title} live`}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="space-y-1 mb-6">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary/50 border border-border rounded-full text-xs font-mono text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="font-mono text-lg text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            ))}
        </div>

        {/* Other projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="font-serif text-xl text-foreground mb-6">Professional Work</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-card/30 border border-border rounded-lg p-6 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-muted-foreground bg-secondary/30 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Metrics */}
                    <div className="flex gap-4 pt-4 border-t border-border/50">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="font-mono text-sm text-primary">{value}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Certifications badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-card/30 border border-border rounded-full">
            <Star className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-foreground">AWS Certified</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-card/30 border border-border rounded-full">
            <GitFork className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-foreground">Zscaler Certified</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-card/30 border border-border rounded-full">
            <Github className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-foreground">Palo Alto Networks</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
