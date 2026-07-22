import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // High precision requestAnimationFrame counter (0 to 100 over 2700ms)
  useEffect(() => {
    const DURATION = 2700;

    const animateCounter = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCounter);
      } else {
        setCount(100);
        setIsDone(true);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateCounter);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle completion delay (400ms)
  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isDone, onComplete]);

  // Word rotation every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-14 select-none overflow-hidden"
    >
      {/* Top Left: Portfolio label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
      >
        Portfolio
      </motion.div>

      {/* Center: Rotating Words */}
      <div className="flex items-center justify-center h-40 relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={ROTATING_WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 tracking-wide text-center"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom Right: Counter Display */}
      <div className="flex justify-end items-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none tracking-tighter"
        >
          {String(count).padStart(3, "0")}
        </motion.div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50 overflow-hidden">
        <div
          className="h-full accent-gradient transition-transform duration-75 ease-linear origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  );
};
