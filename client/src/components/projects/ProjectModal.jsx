import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
  CheckCircle2,
  Zap,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { useSound } from '../../context/SoundContext';

export const ProjectModal = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop, tablet, mobile
  const { playClick, playWhoosh } = useSound();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => Math.max(0, prev - 1));
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => Math.min(images.length - 1, prev + 1));
    };
    playWhoosh();
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const images = [project.thumbnail, ...(project.gallery || [])].filter(Boolean);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-xl z-40"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-50 w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-theme bg-surface/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                {project.date}
              </span>
              <h2 className="text-base sm:text-xl font-display font-bold text-text truncate">
                {project.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Device Mode Switcher (Desktop / Tablet / Mobile) */}
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-2xl glass border border-theme">
                <button
                  onClick={() => {
                    playClick();
                    setDeviceMode('desktop');
                  }}
                  title="MacBook Desktop Mode"
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                    deviceMode === 'desktop' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-text'
                  }`}
                >
                  <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">MacBook</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setDeviceMode('tablet');
                  }}
                  title="iPad Tablet Mode"
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                    deviceMode === 'tablet' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-text'
                  }`}
                >
                  <Tablet className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">iPad</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setDeviceMode('mobile');
                  }}
                  title="iPhone Mobile Mode"
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                    deviceMode === 'mobile' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-text'
                  }`}
                >
                  <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">iPhone</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 sm:p-2 rounded-full glass hover:bg-surface-hover text-text transition-all"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6">
            {/* Device Frame Viewport Container */}
            <div className="flex justify-center py-2 max-w-full overflow-hidden">
              <div
                className={`transition-all duration-500 ease-out relative overflow-hidden bg-black shadow-2xl max-w-full ${
                  deviceMode === 'desktop'
                    ? 'w-full aspect-[16/10] rounded-xl sm:rounded-2xl border-[4px] sm:border-[8px] border-[#1e1e24]'
                    : deviceMode === 'tablet'
                    ? 'w-[440px] aspect-[4/3] rounded-2xl sm:rounded-3xl border-[6px] sm:border-[10px] border-[#1e1e24]'
                    : 'w-[260px] aspect-[9/19] rounded-3xl sm:rounded-[38px] border-[6px] sm:border-[10px] border-[#1e1e24]'
                }`}
              >
                {/* Mobile Notch indicator */}
                {deviceMode === 'mobile' && (
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3 sm:h-4 bg-black rounded-full z-30 border border-white/10" />
                )}

                {/* Media (Video or Image) */}
                {project.previewVideo ? (
                  <video
                    src={project.previewVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={images[activeImageIndex] || project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                )}

                {/* Left/Right controls */}
                {images.length > 1 && !project.previewVideo && (
                  <>
                    <button
                      onClick={() => {
                        playClick();
                        setActiveImageIndex((p) => (p > 0 ? p - 1 : images.length - 1));
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full glass hover:bg-surface text-white transition-transform active:scale-95 z-20"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => {
                        playClick();
                        setActiveImageIndex((p) => (p < images.length - 1 ? p + 1 : 0));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full glass hover:bg-surface text-white transition-transform active:scale-95 z-20"
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      playClick();
                      setActiveImageIndex(i);
                    }}
                    className={`relative w-16 sm:w-20 h-10 sm:h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === i
                        ? 'border-primary scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Impact Metrics in Modal */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mr-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Impact:
                </span>
                {project.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-lg bg-bg text-primary font-mono text-[10px] sm:text-xs font-bold border border-primary/30"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* Quick Links & Stack Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl glass border border-theme">
              <div className="flex items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:opacity-90 shadow-md shadow-primary/30 transition-all"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl glass hover:bg-surface-hover text-xs sm:text-sm font-bold transition-colors text-text"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-secondary mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Stack:
                </span>
                {project.techStack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-bg text-primary border border-theme font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-tertiary">
                Project Summary
              </h3>
              <p className="text-sm sm:text-base text-text leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Markdown Case Study */}
            {project.caseStudy ? (
              <div className="pt-5 border-t border-theme space-y-3">
                <h3 className="text-lg sm:text-xl font-display font-bold text-text flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  Architecture & Case Study
                </h3>
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-secondary leading-relaxed space-y-2.5 prose-headings:text-text prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-code:text-primary prose-code:bg-bg prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded overflow-x-auto">
                  <Markdown>{project.caseStudy}</Markdown>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
