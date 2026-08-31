import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Globe, Server, Database, Code, Layout, Zap, Cpu, Layers,
  Terminal, ShieldCheck, Cloud, Smartphone, GitBranch, Palette,
  Box, Workflow, Gauge, Lock, Wifi, BarChart3, Blocks, Send, Figma,
  MonitorSmartphone, FileCode
} from 'lucide-react';

// Color map for vibrant high-contrast badges
const getSkillBadgeConfig = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('react') || lower.includes('next')) {
    return { icon: Globe, color: 'from-cyan-500 to-blue-600', text: 'text-cyan-400' };
  }
  if (lower.includes('node') || lower.includes('express')) {
    return { icon: Server, color: 'from-emerald-500 to-green-600', text: 'text-emerald-400' };
  }
  if (lower.includes('mongo') || lower.includes('postgre') || lower.includes('redis')) {
    return { icon: Database, color: 'from-green-500 to-teal-600', text: 'text-teal-400' };
  }
  if (lower.includes('typescript') || lower.includes('javascript') || lower.includes('python')) {
    return { icon: Code, color: 'from-blue-600 to-indigo-600', text: 'text-blue-400' };
  }
  if (lower.includes('tailwind') || lower.includes('css')) {
    return { icon: Layout, color: 'from-sky-400 to-cyan-600', text: 'text-sky-400' };
  }
  if (lower.includes('motion') || lower.includes('gsap') || lower.includes('three') || lower.includes('canvas')) {
    return { icon: Zap, color: 'from-purple-500 to-pink-500', text: 'text-purple-400' };
  }
  if (lower.includes('docker') || lower.includes('aws') || lower.includes('cloud') || lower.includes('vercel')) {
    return { icon: Cloud, color: 'from-amber-500 to-orange-600', text: 'text-amber-400' };
  }
  if (lower.includes('auth') || lower.includes('jwt')) {
    return { icon: Lock, color: 'from-rose-500 to-red-600', text: 'text-rose-400' };
  }
  if (lower.includes('git') || lower.includes('ci/cd')) {
    return { icon: GitBranch, color: 'from-orange-500 to-amber-600', text: 'text-orange-400' };
  }
  if (lower.includes('figma')) {
    return { icon: Palette, color: 'from-pink-500 to-rose-600', text: 'text-pink-400' };
  }
  return { icon: FileCode, color: 'from-indigo-500 to-purple-600', text: 'text-indigo-400' };
};

const SkillPill = ({ name }) => {
  const config = getSkillBadgeConfig(name);
  const Icon = config.icon;

  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-3 mx-1.5 sm:mx-2 rounded-2xl glass hover:border-theme-glow transition-all duration-300 group hover:scale-105 shadow-md cursor-default select-none">
      <div className={`p-1.5 sm:p-2 rounded-xl bg-gradient-to-tr ${config.color} text-white shadow-sm flex items-center justify-center`}>
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
      <div>
        <span className="block font-display font-bold text-xs sm:text-sm text-text group-hover:text-primary transition-colors whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );
};

export const SkillsWheel = ({ skills = [] }) => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const { playHover } = useSound();

  const activeSkills = skills && skills.length > 0 ? skills : [
    'React 19', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
    'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Redis', 'GraphQL',
    'Docker', 'AWS Cloud', 'Prisma', 'Vite', 'REST APIs',
    'Motion', 'GSAP', 'Figma', 'Git', 'CI/CD',
    'WebSockets', 'JWT Auth', 'Cloudinary', 'Mongoose',
  ];

  const handleMouseDown = (e) => {
    isDown.current = true;
    setIsDragging(true);
    const clientX = e.pageX || (e.touches && e.touches[0].pageX);
    startX.current = clientX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const mid = Math.ceil(activeSkills.length / 2);
  const row1 = activeSkills.slice(0, mid);
  const row2 = activeSkills.slice(mid);

  // Duplicate arrays for seamless infinite animation
  const row1Doubled = [...row1, ...row1, ...row1];
  const row2Doubled = [...row2, ...row2, ...row2];

  return (
    <section id="skills" className="relative py-24 overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-primary mb-3 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{t.skills.badge}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
        >
          {t.skills.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-secondary text-sm sm:text-base max-w-xl mx-auto font-sans"
        >
          {t.skills.desc}
        </motion.p>
      </div>

      {/* Marquee Container with smooth physics */}
      <div
        ref={containerRef}
        className={`marquee-container relative space-y-4 ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Edge fade gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-40 bg-gradient-to-r from-bg to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-40 bg-gradient-to-l from-bg to-transparent z-20" />

        {/* Row 1 — Scrolls left */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {row1Doubled.map((skill, i) => (
              <SkillPill key={`r1-${i}`} name={skill} />
            ))}
          </div>
        </div>

        {/* Row 2 — Scrolls right */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {row2Doubled.map((skill, i) => (
              <SkillPill key={`r2-${i}`} name={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsWheel;
