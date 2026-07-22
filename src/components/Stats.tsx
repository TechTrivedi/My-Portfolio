import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    value: '3+',
    label: 'Major Projects',
    sublabel: 'End-to-end intelligent systems designed and deployed',
  },
  {
    value: '2026',
    label: 'B.Tech Graduate',
    sublabel: 'Focusing on computer science, AI, ML & analytics',
  },
  {
    value: '100%',
    label: 'Passion for Building',
    sublabel: 'Constantly writing code, tuning models, and learning daily',
  },
];

export const Stats: React.FC = () => {
  return (
    <section id="stats" className="bg-transparent py-16 md:py-24 border-y border-stroke/50 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="flex flex-col p-8 rounded-3xl bg-surface/40 border border-stroke hover:border-white/20 transition-all duration-300 group"
            >
              {/* Value */}
              <span className="text-5xl sm:text-6xl lg:text-7xl font-display text-text-primary tracking-tight mb-4 group-hover:scale-105 origin-left transition-transform duration-300">
                {stat.value}
              </span>

              {/* Label */}
              <h3 className="text-lg font-medium text-text-primary mb-2">
                {stat.label}
              </h3>

              {/* Sublabel */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
