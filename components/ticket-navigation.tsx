"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { id: "beginnings", label: "Beginnings", hindi: "शुरुआत" },
  { id: "engineering", label: "Engineering", hindi: "इंजीनियरिंग" },
  { id: "building", label: "Building", hindi: "निर्माण" },
  { id: "future", label: "Future", hindi: "भविष्य" },
];

export function TicketNavigation() {
  const [activeSection, setActiveSection] = useState<string>("beginnings");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find which section is currently in view
      for (let i = navItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(navItems[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {navItems.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
          onClick={() => scrollToSection(item.id)}
          className={`group relative flex items-center`}
        >
          {/* Ticket shape */}
          <div
            className={`relative bg-card/80 backdrop-blur-sm border rounded-r-lg transition-all duration-300 ${
              activeSection === item.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            {/* Perforation */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-background rounded-r-full" />

            {/* Content */}
            <div className="pl-4 pr-3 py-2 min-w-[100px]">
              <p className="text-[10px] text-muted-foreground mb-0.5">{item.hindi}</p>
              <p
                className={`text-xs font-medium transition-colors ${
                  activeSection === item.id ? "text-primary" : "text-foreground"
                }`}
              >
                {item.label}
              </p>
            </div>

            {/* Station number */}
            <div 
              className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 border rounded-full flex items-center justify-center transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-primary border-primary" 
                  : "bg-card border-border"
              }`}
            >
              <span 
                className={`font-mono text-[10px] transition-colors ${
                  activeSection === item.id ? "text-background" : "text-muted-foreground"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Active indicator line */}
          {activeSection === item.id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.nav>
  );
}
