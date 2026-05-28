"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Ticket } from "lucide-react";
import { toPng } from "html-to-image";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/itzanki" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-kumar-an2004" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/heyy_anki" },
  { icon: Mail, label: "Email", href: "mailto:anki9905@gmail.com" },
];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const [ticketData, setTicketData] = useState<any>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ankitJourneyTicket");
    if (saved) {
      try {
        setTicketData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleDownload = async () => {
    if (!ticketRef.current || !ticketData || isDownloading) return;
    
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(ticketRef.current, { 
        cacheBust: true,
        pixelRatio: 2
      });
      
      const link = document.createElement("a");
      link.download = `Ankit_Journey_Ticket_${ticketData.ticketNumber}.png`;
      link.href = dataUrl;
      
      // Append to body, click, and remove (required for some browsers)
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Automatically close the modal after a short delay
      setTimeout(() => {
        setShowTicket(false);
      }, 500);
    } catch (e) {
      console.error("Failed to download ticket:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-20 border-t border-border overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 madhubani-pattern opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Bihar, India → The World</span>
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-2">
              Ankit Kumar
            </h3>
            <p className="text-muted-foreground mb-4">
              Full-stack Software Developer | B.Tech CSE @ ITM University Gwalior
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Phone className="w-4 h-4" />
              <span>+91-6204031059</span>
            </div>
          </motion.div>

          {/* Right side - Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 md:justify-end"
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="p-4 bg-card/30 border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="my-12 h-px bg-border"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg text-primary">यात्रा</span>
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Ankit Kumar. All rights reserved
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="font-serif text-sm tracking-wide text-primary/80">
              सुकून से देखिए, प्यार से बनाया गया है ♥
            </span>
          </div>
        </motion.div>

        {/* Easter egg - Hindi text and Ticket Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-8 gap-4"
        >
          {ticketData && (
            <button 
              onClick={() => setShowTicket(true)}
              className="flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full text-xs text-primary/80 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              View Your Journey Ticket
            </button>
          )}
          <p className="text-center text-xs text-muted-foreground/50">
            बिहार से इंटरनेट बनाने तक — सफर जारी है
          </p>
        </motion.div>
      </div>

      {/* Ticket Download Modal */}
      <AnimatePresence>
        {showTicket && ticketData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setShowTicket(false)}
          >
            <div 
              className="relative flex flex-col items-center w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 no-scrollbar gap-8" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ticket Wrapper (for html-to-image to screenshot cleanly) */}
              <div className="p-4 flex flex-col gap-6" ref={ticketRef}>
                
                {/* --- FRONT OF TICKET --- */}
                <div 
                  className="w-[90vw] md:w-[700px] flex rounded-lg shadow-2xl relative overflow-hidden shrink-0"
                  style={{ backgroundColor: "#f0b469", color: "#1a1714", height: "260px" }}
                >
                  {/* Perforated Stub */}
                  <div className="w-1/4 border-r-4 border-dashed border-[#1a1714]/20 p-4 flex flex-col justify-between items-center bg-[#e6a15c]">
                    <div className="font-serif font-bold text-2xl md:text-3xl tracking-widest text-[#1a1714]/80 mt-2" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                      भारतीय रेल
                    </div>
                    <div className="font-mono text-[10px] md:text-xs font-bold text-[#1a1714]/70 mt-4">
                      NO. {ticketData.ticketNumber}
                    </div>
                  </div>
                  
                  {/* Main Ticket */}
                  <div className="w-3/4 p-6 flex flex-col justify-between relative overflow-hidden bg-[#f0b469]">
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
                        <div className="font-mono text-sm md:text-base font-bold text-black">{ticketData.date}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">FROM</p>
                        <p className="font-serif font-bold text-lg md:text-xl leading-tight text-black truncate">{ticketData.from}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">TO</p>
                        <p className="font-serif font-bold text-lg md:text-xl whitespace-nowrap leading-tight text-black">ANKIT'S JOURNEY</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 z-10">
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">PASSENGER NAME</p>
                        <p className="font-mono font-bold uppercase text-black text-sm md:text-base truncate">{ticketData.name}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold text-black/60 mb-1">CLASS</p>
                        <p className="font-mono font-bold uppercase text-black text-sm md:text-base">{ticketData.ticketClass}</p>
                      </div>
                    </div>
                    
                    {/* Stamp Overlay */}
                    <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 border-4 border-red-800 text-red-800 rounded-full w-20 h-20 md:w-28 md:h-28 flex flex-col items-center justify-center pointer-events-none opacity-85 rotate-[-15deg]">
                      <div className="font-serif font-black text-sm md:text-lg tracking-widest">PUNCHED</div>
                      <div className="font-mono text-[8px] md:text-[10px] font-bold mt-1 border-t border-red-800 pt-1">{ticketData.date}</div>
                    </div>
                    
                    {/* Punch Hole (Front: Right) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-transparent rounded-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] z-20" />
                  </div>
                </div>

                {/* --- BACK OF TICKET --- */}
                <div 
                  className="w-[90vw] md:w-[700px] flex rounded-lg shadow-2xl relative overflow-hidden shrink-0"
                  style={{ backgroundColor: "#f0b469", color: "#1a1714", height: "260px" }}
                >
                  {/* Main Ticket (Back side is mirrored: Main is on the left) */}
                  <div className="w-3/4 p-6 flex flex-col justify-between relative overflow-hidden bg-[#f0b469]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none scale-x-[-1]">
                      <span className="text-9xl font-serif">IR</span>
                    </div>

                    <div className="flex flex-col gap-2 z-10 h-full justify-center pl-4 md:pl-8 py-2">
                      <h3 className="mt-2 text-lg md:text-xl font-serif font-bold uppercase tracking-widest text-black border-b border-black/20 pb-2">TERMS & CONDITIONS</h3>
                      
                      <div className="text-[10px] md:text-xs font-mono text-black/80 space-y-1.5 text-left max-w-md">
                        <p>1. This ticket is non-transferable. Valid only for exploring the digital universe of Ankit Kumar.</p>
                        <p>2. Passenger is requested to maintain curiosity and enjoy the experience.</p>
                        <p>3. This acts as a permanent souvenir of your digital visit.</p>
                      </div>

                      <div className="mt-1 pt-3 font-mono text-center max-w-md border-t border-black/20 pb-1">
                        <p className="text-sm md:text-base font-bold text-black italic">"Thanks for visiting my journey!"</p>
                        <div className="mt-2 flex justify-between items-end">
                          <div className="text-left">
                            <p className="text-[10px] text-black/60">CONTACT STATION MASTER</p>
                            <p className="text-base md:text-lg font-bold tracking-wider">+91-6204031059</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-black/60 uppercase">Dev Portfolio</p>
                            <p className="text-base md:text-lg font-bold tracking-wider uppercase">Ankit Kumar</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Punch Hole (Back: Left) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-transparent rounded-full shadow-[inset_-2px_2px_5px_rgba(0,0,0,0.8)] z-20" />
                  </div>

                  {/* Perforated Stub (Back side is mirrored: Stub is on the right) */}
                  <div className="w-1/4 border-l-4 border-dashed border-[#1a1714]/20 p-4 flex flex-col justify-between items-center bg-[#e6a15c]">
                    <div className="font-serif font-bold text-2xl md:text-3xl tracking-widest text-[#1a1714]/80 mt-2" style={{ writingMode: "vertical-rl" }}>
                      भारतीय रेल
                    </div>
                    <div className="font-mono text-[10px] md:text-xs font-bold text-[#1a1714]/70 mt-4">
                      NO. {ticketData.ticketNumber}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowTicket(false)}
                  className="px-6 py-2 border border-border rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-6 py-2 bg-[#f0b469] text-[#1a1714] rounded font-mono font-bold uppercase tracking-widest hover:bg-[#e6a15c] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isDownloading ? "Downloading..." : "Download Souvenir"}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
