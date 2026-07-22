import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: string;
  col: number; // 0 for left column, 1 for right column
}

const EXPLORATION_ITEMS: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'Cropify Dashboard',
    category: 'AI & ML UI',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-3',
    col: 0,
  },
  {
    id: 'exp-2',
    title: 'Train N Grain UI',
    category: 'Web App Interface',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-3',
    col: 1,
  },
  {
    id: 'exp-3',
    title: 'Data Science Pipeline',
    category: 'Analytics & ML',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-2',
    col: 0,
  },
  {
    id: 'exp-4',
    title: 'Power BI Dashboard',
    category: 'Data Visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-2',
    col: 1,
  },
  {
    id: 'exp-5',
    title: 'AI Workflow Visualization',
    category: 'System Architecture',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    rotation: '-rotate-4',
    col: 0,
  },
  {
    id: 'exp-6',
    title: 'Modern Portfolio Concepts',
    category: 'Frontend Engineering',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    rotation: 'rotate-4',
    col: 1,
  },
];

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);

  const [activeLightbox, setActiveLightbox] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedContent = pinnedContentRef.current;
    const colLeft = colLeftRef.current;
    const colRight = colRightRef.current;

    if (!section || !pinnedContent || !colLeft || !colRight) return;

    const ctx = gsap.context(() => {
      // 1. Pin center header content
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // 2. Parallax movements for columns
      gsap.fromTo(
        colLeft,
        { y: '5%' },
        {
          y: '-25%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        colRight,
        { y: '25%' },
        {
          y: '-45%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftColItems = EXPLORATION_ITEMS.filter((item) => item.col === 0);
  const rightColItems = EXPLORATION_ITEMS.filter((item) => item.col === 1);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-transparent py-24 overflow-hidden select-none"
    >
      {/* Layer 1: Pinned Center Content (z-10) */}
      <div
        ref={pinnedContentRef}
        className="h-screen sticky top-0 left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
      >
        <div className="pointer-events-auto flex flex-col items-center max-w-xl bg-bg/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl">
          {/* Eyebrow */}
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">
            Explorations
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-text-primary mb-4">
            Visual <span className="font-display italic font-normal">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-muted text-sm md:text-base max-w-sm mb-6 leading-relaxed">
            Project showcases, layout concepts, and visual models across AI, analytics, and software architecture.
          </p>

          {/* Github button */}
          <a
            href="https://github.com/TechTrivedi"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-[1px] rounded-full overflow-hidden inline-flex items-center"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
            <span className="rounded-full text-xs font-medium px-6 py-3 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-colors duration-200 flex items-center gap-2">
              Follow on GitHub <span>↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns Grid (z-20) */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-start">
          {/* Column 1 (Left) */}
          <div ref={colLeftRef} className="flex flex-col gap-16 md:gap-32 items-center md:items-start">
            {leftColItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`group relative aspect-square w-full max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-xl ${item.rotation} hover:rotate-0 hover:scale-105 transition-all duration-500`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-medium">
                    {item.category}
                  </span>
                  <span className="text-lg font-light text-text-primary">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Right) */}
          <div ref={colRightRef} className="flex flex-col gap-16 md:gap-32 items-center md:items-end pt-12 md:pt-32">
            {rightColItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`group relative aspect-square w-full max-w-[320px] rounded-3xl bg-surface border border-stroke overflow-hidden cursor-pointer shadow-xl ${item.rotation} hover:rotate-0 hover:scale-105 transition-all duration-500`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-muted font-medium">
                    {item.category}
                  </span>
                  <span className="text-lg font-light text-text-primary">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-colors"
                aria-label="Close Lightbox"
              >
                ✕
              </button>

              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex justify-between items-center bg-surface">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted font-medium block mb-1">
                    {activeLightbox.category}
                  </span>
                  <h3 className="text-2xl font-light text-text-primary">
                    {activeLightbox.title}
                  </h3>
                </div>
                <span className="text-xs font-medium text-muted border border-stroke px-4 py-2 rounded-full">
                  Visual Showcase &apos;26
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
