import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Layers, Cpu, ExternalLink, ArrowDown } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';

export const HeroSection = ({ heroData }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(14, 1100, 1.03);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden z-10"
    >
      {/* Dynamic 3D ambient radial glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[140px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: High-Contrast Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border-theme-glow shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider text-text uppercase">
                {heroData?.availableForHire ? 'Available for New Projects' : 'Full-Stack Craftsman'}
              </span>
            </motion.div>

            {/* Name Heading with 3D Depth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[0.95] text-text">
                Noman Nawaz<span className="text-primary">.</span>
              </h1>
            </motion.div>

            {/* Subtitle / Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl sm:text-2xl font-display font-semibold gradient-text-vibrant max-w-xl"
            >
              {heroData?.title || 'Full-Stack MERN Developer & UI/UX Motion Designer'}
            </motion.h2>

            {/* Description Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-secondary max-w-lg leading-relaxed font-sans"
            >
              {heroData?.subtitle ||
                'Crafting scalable full-stack web applications, high-contrast visual systems, and physics-driven micro-interactions with React, Node.js, and MongoDB.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/60 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span>{heroData?.ctaText || 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass hover:bg-surface-hover hover:border-theme-glow text-text font-bold transition-all duration-300 hover:scale-105"
              >
                <span>Get In Touch</span>
                <Sparkles className="w-4 h-4 text-primary" />
              </a>
            </motion.div>

            {/* Quick Metrics / Tech Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-6 pt-4 text-xs font-semibold text-tertiary"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span>MERN Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-secondary" />
                <span>60+ FPS Motion</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Cloudinary CMS</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Tilt Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-72 sm:w-80 lg:w-[22rem]"
            >
              {/* Outer Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-secondary to-accent rounded-3xl opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500" />

              {/* 3D Tilt Card Frame */}
              <div
                ref={ref}
                style={style}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative rounded-3xl overflow-hidden glass border-2 border-theme-glow p-3 shadow-2xl transition-all duration-300"
              >
                {/* Glare Reflection */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.8}), transparent 60%)`,
                  }}
                />

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-secondary">
                  <img
                    src={
                      heroData?.imageUrl ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
                    }
                    alt="Noman Nawaz"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80" />

                  {/* Glass Nameplate Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl glass border-theme backdrop-blur-xl">
                    <p className="text-xs font-bold text-text uppercase tracking-wider">
                      Noman Nawaz
                    </p>
                    <p className="text-[11px] text-secondary truncate">
                      Full-Stack Engineer & Motion Designer
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Orbiting 3D Badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-xl glass border-theme-glow shadow-xl text-xs font-bold text-text flex items-center gap-2 backdrop-blur-xl"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>100% Reactive</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-xl glass border-theme-glow shadow-xl text-xs font-bold text-text flex items-center gap-2 backdrop-blur-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>3D Tilt Enabled</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
