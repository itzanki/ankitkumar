"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Monitor } from "lucide-react";

export function BeginningsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const storyCards = [
    {
      title: "First Spark",
      hindi: "पहली चिंगारी",
      description:
        "A dusty computer in a small town cyber cafe. The glow of a CRT monitor. A world of possibilities opened through the internet.",
      year: "Early Days",
    },
    {
      title: "Curiosity",
      hindi: "जिज्ञासा",
      description:
        "Hours spent learning how websites worked. The magic of HTML, CSS, and JavaScript. The first code that changed everything.",
      year: "Learning",
    },
    {
      title: "The Dream",
      hindi: "सपना",
      description:
        "A decision to pursue Computer Science at ITM University, Gwalior. Leaving home with nothing but ambition and a small-town hunger to build.",
      year: "2022",
    },
  ];

  const [isInteractive, setIsInteractive] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ type: "system" | "user"; text: string }[]>([
    { type: "system", text: "Interactive mode enabled. Type 'help' for commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInteractive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInteractive]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newOutput = [...output, { type: "user" as const, text: `$ ${input}` }];
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case "help":
        newOutput.push({ type: "system", text: "Commands: ls, whoami, clear, exit, sudo, hire_ankit" });
        break;
      case "ls":
        newOutput.push({ type: "system", text: "CareConnect  RecipeGenerator  Prediscan  TecnovaCore" });
        break;
      case "whoami":
        newOutput.push({ type: "system", text: "Ankit Kumar - Full Stack Developer from Bihar, India." });
        break;
      case "hire_ankit":
        newOutput.push({ type: "system", text: "Redirecting to mailto:anki9905@gmail.com..." });
        setTimeout(() => window.location.href = "mailto:anki9905@gmail.com", 1500);
        break;
      case "sudo":
        newOutput.push({ type: "system", text: "Permission denied." });
        break;
      case "clear":
        setOutput([]);
        setInput("");
        return;
      case "exit":
        setIsInteractive(false);
        setOutput([{ type: "system", text: "Interactive mode enabled. Type 'help' for commands." }]);
        setInput("");
        return;
      default:
        newOutput.push({ type: "system", text: `Command not found: ${cmd}` });
    }

    setOutput(newOutput);
    setInput("");
  };

  return (
    <section
      ref={sectionRef}
      id="beginnings"
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 madhubani-pattern opacity-10" />

      {/* CRT scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
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
              स्टेशन 1
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Beginnings
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Every great journey has humble origins. This is where mine started.
          </p>
        </motion.div>

        {/* CRT Monitor visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center mb-20"
        >
          <div className="relative">
            {/* Monitor frame */}
            <div className="w-72 md:w-96 aspect-[4/3] bg-secondary rounded-lg p-4 shadow-2xl border border-border">
              {/* Screen */}
              <div className="w-full h-full bg-charcoal rounded overflow-hidden relative">
                {/* Screen glow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent" />

                {/* Terminal content */}
                <div 
                  className="absolute inset-0 p-4 font-mono text-xs md:text-sm text-primary overflow-y-auto cursor-text z-20"
                  onClick={() => setIsInteractive(true)}
                >
                  {!isInteractive ? (
                    <div className="flex flex-col h-full" title="Click to interact">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.3 }}
                      >
                        <span className="text-muted-foreground">$</span> whoami
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.2, duration: 0.3 }}
                        className="mt-1"
                      >
                        ankit_kumar_from_bihar
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.6, duration: 0.3 }}
                        className="mt-3"
                      >
                        <span className="text-muted-foreground">$</span> echo $OBJECTIVE
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 2, duration: 0.3 }}
                        className="mt-1 text-foreground text-[10px] md:text-xs"
                      >
                        {'"Solve complex problems, deliver impact"'}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 2.4, duration: 0.3 }}
                        className="mt-3"
                      >
                        <span className="text-muted-foreground">$</span> cat stack.txt
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 2.8, duration: 0.3 }}
                        className="mt-1 text-foreground text-[10px] md:text-xs"
                      >
                        React | Node.js | Express | MongoDB | AWS
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: [0, 1, 0] } : {}}
                        transition={{ delay: 3.2, duration: 0.8, repeat: Infinity }}
                        className="mt-3"
                      >
                        <span className="text-muted-foreground">$</span>{" "}
                        <span className="bg-primary/50">_</span>
                        <span className="ml-2 text-[10px] text-muted-foreground opacity-50">(Click to type)</span>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="flex flex-col min-h-full">
                      {output.map((line, i) => (
                        <div key={i} className={`mb-1 ${line.type === 'user' ? 'text-primary' : 'text-primary/70'}`}>
                          {line.text}
                        </div>
                      ))}
                      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                        <span className="text-primary font-bold">$</span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1 bg-transparent outline-none text-primary/90 caret-primary"
                          autoFocus
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </form>
                    </div>
                  )}
                </div>

                {/* Scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)",
                  }}
                />
              </div>
            </div>

            {/* Monitor stand */}
            <div className="w-20 h-8 bg-secondary mx-auto rounded-b-lg" />
            <div className="w-32 h-2 bg-secondary/80 mx-auto rounded-full" />

            {/* Monitor icon label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
              <Monitor className="w-4 h-4" />
              <span className="text-xs font-mono">Where it all began</span>
            </div>
          </div>
        </motion.div>

        {/* Story cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-500 h-full">
                {/* Year badge */}
                <div className="absolute -top-3 right-4 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="font-mono text-xs text-primary">{card.year}</span>
                </div>

                {/* Hindi label */}
                <span className="text-xs text-muted-foreground">{card.hindi}</span>

                {/* Title */}
                <h3 className="font-serif text-xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
