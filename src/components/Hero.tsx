import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ROLE_ITEMS = [
  { role: "Data Analyst", phrase: "A Data Analyst based in India." },
  { role: "AI/ML Developer", phrase: "An AI Developer building intelligent products." },
  { role: "Full Stack Developer", phrase: "A Full Stack Developer creating seamless experiences." },
  { role: "Problem Solver", phrase: "A Problem Solver turning ideas into reality." },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Role cycler every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLE_ITEMS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
      });

      tl.to(
        ".blur-in",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentRoleObj = ROLE_ITEMS[roleIndex];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden pt-20 pb-28 bg-transparent"
    >
      {/* Hero Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div
          className="blur-in opacity-0 translate-y-5 text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium"
          style={{ filter: "blur(10px)" }}
        >
          COLLECTION &apos;26
        </div>

        {/* Name */}
        <h1 className="name-reveal opacity-0 translate-y-12 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 selection:bg-white/30">
          Sarthak Trivedi
        </h1>

        {/* Role line */}
        <p className="blur-in opacity-0 translate-y-5 text-lg md:text-xl text-text-primary/90 mb-6 font-light h-10 flex items-center justify-center" style={{ filter: "blur(10px)" }}>
          <span
            key={roleIndex}
            className="font-display italic text-2xl md:text-3xl text-text-primary animate-role-fade-in inline-block"
          >
            {currentRoleObj.phrase}
          </span>
        </p>

        {/* Description */}
        <p
          className="blur-in opacity-0 translate-y-5 text-sm md:text-base text-muted max-w-lg mb-12 font-normal leading-relaxed"
          style={{ filter: "blur(10px)" }}
        >
          Designing intelligent digital experiences by combining AI, data, and clean engineering to create products people genuinely enjoy using.
        </p>

        {/* CTA Buttons */}
        <div
          className="blur-in opacity-0 translate-y-5 flex flex-wrap justify-center items-center gap-4"
          style={{ filter: "blur(10px)" }}
        >
          {/* See Works Solid Button */}
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
            <span className="rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
              See Works
            </span>
          </a>

          {/* Reach out Outlined Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300" />
            <span className="rounded-full text-sm font-medium px-7 py-3.5 border-2 border-stroke bg-bg/80 backdrop-blur-md text-text-primary group-hover:border-transparent transition-colors duration-300">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
