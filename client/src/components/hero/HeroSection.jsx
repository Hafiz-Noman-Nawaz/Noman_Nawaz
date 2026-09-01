import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Layers, Cpu, Zap } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection = ({ heroData, onOpenEstimator, onOpenHireMe }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(12, 1100, 1.02);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();

  const photoUrl = heroData?.imageUrl;

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden z-10"
    >
      {/* Dynamic 3D ambient radial glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 30, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-primary/20 blur-[100px] sm:blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-20 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-secondary/20 blur-[100px] sm:blur-[140px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* Left Column: High-Contrast Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-text uppercase">
                {heroData?.availableForHire ? 'Available for New Projects' : 'Full-Stack Craftsman'}
              </span>
            </motion.div>

            {/* Name Heading with 3D Depth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-black tracking-tight leading-[1] sm:leading-[0.95] text-text">
                Noman Nawaz<span className="text-primary">.</span>
              </h1>
            </motion.div>

            {/* Subtitle / Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-2xl font-display font-semibold gradient-text-vibrant max-w-xl"
            >
              {heroData?.title || 'Full-Stack MERN Developer & UI/UX Motion Designer'}
            </motion.h2>

            {/* Description Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm sm:text-base lg:text-lg text-secondary max-w-lg leading-relaxed font-sans"
            >
              {heroData?.subtitle ||
                'Crafting scalable full-stack web applications, high-contrast visual systems, and physics-driven micro-interactions with React, Node.js, and MongoDB.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:py-4 rounded-2xl bg-primary text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                <span>{heroData?.ctaText || t.hero.ctaExplore}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenHireMe}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/40 hover:border-secondary text-text font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-md"
              >
                <Zap className="w-4 h-4 text-secondary fill-secondary" />
                <span>{t.hero.ctaHire}</span>
              </button>

              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl glass hover:bg-surface-hover hover:border-theme-glow text-text font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                <span>{t.hero.ctaEstimator}</span>
                <Sparkles className="w-4 h-4 text-accent" />
              </button>
            </motion.div>

            {/* Quick Metrics / Tech Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 text-[11px] sm:text-xs font-semibold text-tertiary"
            >
              <div className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-primary" />
                <span>MERN Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-secondary" />
                <span>60 FPS Motion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span>Cloudinary CMS</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Tilt Card */}
          <div className="lg:col-span-5 flex justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-64 sm:w-80 lg:w-[22rem] max-w-full"
            >
              {/* Outer Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-secondary to-accent rounded-3xl opacity-35 blur-xl group-hover:opacity-70 transition-opacity duration-500" />

              {/* 3D Tilt Card Frame */}
              <div
                ref={ref}
                style={style}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative rounded-3xl overflow-hidden glass border-2 border-theme-glow p-2.5 sm:p-3 shadow-2xl transition-all duration-300"
              >
                {/* Glare Reflection */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.8}), transparent 60%)`,
                  }}
                />

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-secondary flex items-center justify-center">
                  {/* Cyber Holographic Loading Skeleton */}
                  {(!photoUrl || !imageLoaded) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-surface/80 space-y-4">
                      {/* Outer Orbital Rings */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        <div className="absolute inset-2 rounded-full border-2 border-secondary/40 border-b-secondary animate-spin [animation-duration:2.5s] [animation-direction:reverse]" />
                        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                      </div>

                      <div className="text-center space-y-1">
                        <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest animate-pulse">
                          Loading Matrix...
                        </span>
                        <p className="text-[10px] text-tertiary">
                          Fetching Cloudinary Visuals
                        </p>
                      </div>

                      {/* Shimmer bar */}
                      <div className="w-28 h-1 bg-surface rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-accent animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* Real Uploaded Photo */}
                  {photoUrl && (
                    <img
                      src={photoUrl}
                      alt="Noman Nawaz — Full Stack Web Developer"
                      onLoad={() => setImageLoaded(true)}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="eager"
                      fetchPriority="high"
                    />
                  )}

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Glass Nameplate Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass border-theme backdrop-blur-xl">
                    <p className="text-xs font-bold text-text uppercase tracking-wider">
                      Noman Nawaz
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-secondary truncate">
                      Full-Stack Engineer & Motion Designer
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Orbiting 3D Badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2.5 -right-2 px-3 py-1 rounded-xl glass border-theme-glow shadow-xl text-[10px] sm:text-xs font-bold text-text flex items-center gap-1.5 backdrop-blur-xl"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>100% Reactive</span>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2.5 -left-2 px-3 py-1 rounded-xl glass border-theme-glow shadow-xl text-[10px] sm:text-xs font-bold text-text flex items-center gap-1.5 backdrop-blur-xl"
              >
                <Sparkles className="w-3 h-3 text-secondary" />
                <span>3D Tilt</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
