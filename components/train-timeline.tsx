"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stations = [
  { id: 1, name: "Beginnings", hindi: "स्टेशन 1" },
  { id: 2, name: "Engineering", hindi: "स्टेशन 2" },
  { id: 3, name: "Building", hindi: "स्टेशन 3" },
  { id: 4, name: "Future", hindi: "स्टेशन 4" },
];

export function TrainTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const trainX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 py-4 px-6 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Track */}
        <div className="relative h-12 px-6">
          {/* Rail lines */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border -translate-y-[4px]" />

          {/* Bound train and dots within padded track */}
          <div className="relative w-full h-full">
            {/* Station markers */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
              {stations.map((station, index) => (
                <motion.div
                  key={station.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative group pointer-events-auto"
                >
                  <div className="w-3 h-3 rounded-full bg-card border-2 border-primary/50 group-hover:border-primary transition-colors" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <p className="text-[10px] font-mono text-primary">{station.hindi}</p>
                    <p className="text-[10px] text-muted-foreground">{station.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Train */}
            <motion.div
              style={{ left: trainX }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="relative"
              >
                {/* Train body */}
                <svg width="32" height="16" viewBox="0 0 32 16" className="text-primary">
                  <rect x="0" y="4" width="24" height="8" rx="2" fill="currentColor" opacity="0.8" />
                  <rect x="20" y="2" width="12" height="12" rx="2" fill="currentColor" />
                  <circle cx="8" cy="14" r="2" fill="currentColor" opacity="0.6" />
                  <circle cx="16" cy="14" r="2" fill="currentColor" opacity="0.6" />
                  <circle cx="26" cy="14" r="2" fill="currentColor" opacity="0.6" />
                  <rect x="22" y="4" width="4" height="4" rx="1" fill="var(--charcoal)" />
                </svg>
                {/* Smoke */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3], y: [-2, -6, -2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-2 right-1 w-2 h-2 bg-muted-foreground/30 rounded-full blur-sm"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-px bg-border overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full bg-primary origin-left"
          />
        </div>
      </div>
    </div>
  );
}
