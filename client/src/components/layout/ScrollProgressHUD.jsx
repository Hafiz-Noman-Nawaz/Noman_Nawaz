import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSound } from '../../context/SoundContext';

export const ScrollProgressHUD = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { playClick } = useSound();

  const sections = [
    { id: 'hero', label: 'Intro' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Work' },
    { id: 'architecture-radar', label: 'Radar' },
    { id: 'code-playground', label: 'Code' },
    { id: 'github-activity', label: 'GitHub' },
    { id: 'timeline', label: 'Journey' },
    { id: 'certificates', label: 'Honors' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      // Check active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2.5) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 select-none pointer-events-auto">
      {/* Vertical Track Line */}
      <div className="relative w-0.5 h-48 bg-theme rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Section Node Dots */}
      <div className="flex flex-col gap-2.5">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              title={sec.label}
              className="group relative flex items-center"
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-primary ring-4 ring-primary/20 scale-125'
                    : 'bg-tertiary group-hover:bg-text'
                }`}
              />

              {/* Tooltip on Hover */}
              <span className="absolute left-6 px-2.5 py-1 rounded-lg glass text-[10px] font-bold text-text uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-theme">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollProgressHUD;
