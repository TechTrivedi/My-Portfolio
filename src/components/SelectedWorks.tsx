import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

interface FlashcardFeature {
  icon: string;
  label: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  span: string; // e.g. col-span-12 md:col-span-7
  aspectRatio: string;
  image: string;
  url?: string;
  isVideo?: boolean;
  hideLinkOptions?: boolean;
  flashcardFeatures?: FlashcardFeature[];
}

const HLS_SOURCE = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const PROJECTS: Project[] = [
  {
    id: 'train-n-grain',
    title: 'Train N Grain',
    category: 'Fitness Analytics Platform',
    description: 'Personalized workout & nutrition planning powered by intelligent analytics.',
    span: 'col-span-12 md:col-span-7',
    aspectRatio: 'aspect-[4/3] md:aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    url: 'https://train-n-grain.vercel.app',
    flashcardFeatures: [
      { icon: '🏋️‍♂️', label: 'Custom Workout Routines' },
      { icon: '🥗', label: 'Smart Nutrition & Macros' },
      { icon: '📊', label: 'Fitness Analytics Dashboard' },
      { icon: '⚡', label: 'React + Node.js Platform' },
    ],
  },
  {
    id: 'cropify',
    title: 'CROPIFY',
    category: 'AI Crop Intelligence System',
    description: 'Machine learning powered crop recommendation and yield prediction platform enabling precision agriculture.',
    span: 'col-span-12 md:col-span-5',
    aspectRatio: 'aspect-[4/3] md:aspect-[4/5]',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    hideLinkOptions: true,
    flashcardFeatures: [
      { icon: '🌾', label: 'Soil NPK & pH Analysis' },
      { icon: '📈', label: 'ML Harvest Yield Prediction' },
      { icon: '🛰️', label: 'Real-time Climate Data Sync' },
      { icon: '🤖', label: 'Scikit-Learn & Python Pipeline' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    category: 'Modern Web Experiences',
    description: 'Responsive interfaces, premium UI, animations, and full-stack development.',
    span: 'col-span-12',
    aspectRatio: 'aspect-[4/3] md:aspect-[21/9]',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    url: 'https://github.com/TechTrivedi/dark-portfolio',
    isVideo: true,
    flashcardFeatures: [
      { icon: '🎨', label: 'GSAP & Framer Motion' },
      { icon: '📹', label: 'HLS Video Stream Engine' },
      { icon: '⚡', label: 'Vite + React + TypeScript' },
      { icon: '🎯', label: 'Custom Dark Design System' },
    ],
  },
];

export const SelectedWorks: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(HLS_SOURCE);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SOURCE;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section id="work" className="bg-transparent py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-text-primary mb-3">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-muted text-sm md:text-base max-w-md">
              A showcase of key projects built across AI, machine learning, data science, and modern web applications.
            </p>
          </div>

          {/* Desktop "View all work" button */}
          <a
            href="https://github.com/TechTrivedi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 group relative p-[1px] rounded-full overflow-hidden self-start md:self-auto"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
            <span className="rounded-full text-xs font-medium px-5 py-2.5 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-colors duration-200">
              View GitHub <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, idx) => {
            const hasLink = Boolean(project.url) && !project.hideLinkOptions;
            const CardComponent = hasLink ? motion.a : motion.div;

            return (
              <CardComponent
                key={project.id}
                {...(hasLink
                  ? {
                      href: project.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className={`${project.span} group relative bg-surface border border-stroke rounded-3xl overflow-hidden block ${project.aspectRatio} ${
                  hasLink ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Background Image or HLS Video */}
                {project.isVideo ? (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                    />
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                )}

                {/* Halftone Overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />

                {/* Default Subtle Gradient at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />

                {/* Default Bottom Title Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex justify-between items-end transition-opacity duration-300 group-hover:opacity-0 z-10">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-muted block mb-1 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light text-text-primary">
                      {project.title}
                    </h3>
                  </div>
                  {hasLink && (
                    <div className="w-10 h-10 rounded-full border border-stroke/80 bg-surface/50 backdrop-blur-sm flex items-center justify-center text-text-primary text-sm">
                      ↗
                    </div>
                  )}
                </div>

                {/* Hover Backdrop Blur & Card Content */}
                <div className="absolute inset-0 bg-bg/85 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-400 p-6 md:p-8 flex flex-col justify-between z-20">
                  {/* Top Header Tag */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase tracking-[0.25em] text-muted font-medium">
                      0{idx + 1} — {project.category}
                    </span>
                    {hasLink && (
                      <span className="text-xs px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white font-medium">
                        Live App ↗
                      </span>
                    )}
                  </div>

                  {/* Flashcard Body Container */}
                  <div className="bg-surface/90 border border-stroke rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-2xl my-auto flex flex-col gap-2.5">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-text-primary tracking-tight mb-0.5">
                        {project.title}
                      </h3>
                      <span className="text-[11px] uppercase tracking-wider text-muted font-medium">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-muted text-xs leading-relaxed">
                      {project.description}
                    </p>

                    {project.flashcardFeatures && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stroke/60 mt-1">
                        {project.flashcardFeatures.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 bg-bg/50 px-2.5 py-1.5 rounded-xl border border-stroke/40 text-xs text-text-primary/90">
                            <span>{feat.icon}</span>
                            <span className="text-[11px] font-medium leading-none">{feat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Info Bar */}
                  <div className="flex items-end justify-between text-[11px] text-muted font-medium pt-2 border-t border-stroke/40">
                    <span className="self-center">Project Architecture</span>

                    {/* View Button (only rendered for linked projects) */}
                    {hasLink ? (
                      <div className="relative p-[1px] rounded-full overflow-hidden inline-block shrink-0">
                        <div className="absolute inset-0 accent-gradient-border" />
                        <div className="relative rounded-full px-4 py-2 bg-white text-bg font-medium text-xs flex items-center gap-1.5 shadow-lg">
                          View — <span className="font-display italic font-normal text-sm">{project.title}</span>
                          <span>↗</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-text-primary/70 font-mono text-[10px] self-center">Project Showcase</span>
                    )}
                  </div>
                </div>
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
};
