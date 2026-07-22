import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_TEXT = "BUILDING AI • ANALYZING DATA • CREATING PRODUCTS • SOLVING PROBLEMS • ";

export const Footer: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // GSAP Marquee Ticker Setup
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative bg-transparent pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      {/* Top GSAP Infinite Marquee Ticker */}
      <div className="w-full overflow-hidden border-y border-stroke/40 py-4 mb-16 bg-surface/30 backdrop-blur-sm select-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-sm md:text-base tracking-[0.25em] uppercase text-text-primary/80 font-medium px-4"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center relative z-10">
        {/* CTA Heading */}
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-4">
          Get in Touch
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-none tracking-tight text-text-primary mb-8">
          Let&apos;s build together.
        </h2>

        {/* Email CTA Button */}
        <a
          href="mailto:sarthaktrivedi1212@gmail.com"
          className="group relative p-[2px] rounded-full overflow-hidden mb-16 transition-transform duration-300 hover:scale-105 inline-block"
        >
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
          <span className="rounded-full text-sm md:text-base font-medium px-8 py-4 bg-surface text-text-primary border border-stroke group-hover:border-transparent transition-colors duration-200 flex items-center gap-3">
            sarthaktrivedi1212@gmail.com
            <span className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </span>
        </a>

        {/* Footer Bar */}
        <div className="w-full pt-8 border-t border-stroke/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { name: 'GitHub', url: 'https://github.com/TechTrivedi' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sarthaktrivedi/' },
              { name: 'Email', url: 'mailto:sarthaktrivedi1212@gmail.com' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-2.5 bg-surface/80 border border-stroke px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-medium text-text-primary text-[11px]">
              Available for Internships &amp; Remote Opportunities
            </span>
          </div>

          {/* Copyright */}
          <span>© {new Date().getFullYear()} Sarthak Trivedi. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
