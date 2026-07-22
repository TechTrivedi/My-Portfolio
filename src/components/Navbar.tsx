import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Section scrollSpy
      const sections = ['home', 'work', 'journal', 'explorations', 'stats', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setCurrentSection(sectionId);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center gap-1 sm:gap-2 rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-1.5 sm:px-2.5 sm:py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-black/40 border-white/20 bg-surface' : ''
        }`}
      >
        {/* 1. Logo (ST Initials) */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full p-[2px] accent-gradient hover:accent-gradient-reverse transition-all duration-300 hover:scale-110"
          aria-label="Home Logo"
        >
          <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary group-hover:text-white transition-colors">
              ST
            </span>
          </div>
        </a>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {[
            { name: 'Home', id: 'home' },
            { name: 'Work', id: 'work' },
            { name: 'Journal', id: 'journal' },
          ].map((link) => {
            const isActive = currentSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-text-primary bg-stroke/60 shadow-inner'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. Say hi Button */}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, 'contact')}
          className="group relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden transition-all duration-300"
        >
          {/* Accent border on hover */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient-border transition-opacity duration-300 -z-10" />
          <span className="inline-flex items-center gap-1 text-xs sm:text-sm rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 font-medium bg-surface text-text-primary border border-stroke group-hover:border-transparent backdrop-blur-md transition-all duration-200">
            Say hi <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </span>
        </a>
      </nav>
    </header>
  );
};
