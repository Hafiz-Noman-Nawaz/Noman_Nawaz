import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowUpRight, Play, Zap } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { useSound } from '../../context/SoundContext';

export const ProjectCard = ({ project, onSelect, index }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(12, 1000, 1.02);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const { playClick, playHover } = useSound();

  const handleMouseEnterCard = () => {
    setIsHovered(true);
    playHover();
    if (videoRef.current && project.previewVideo) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeaveCard = (e) => {
    setIsHovered(false);
    onMouseLeave(e);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      className="h-full"
    >
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        onClick={() => {
          playClick();
          onSelect(project);
        }}
        className="group relative h-full flex flex-col rounded-3xl glass-card overflow-hidden cursor-pointer border border-theme hover:border-theme-glow transition-all duration-300 shadow-xl"
      >
        {/* Dynamic 3D Glare Light Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.9}), transparent 60%)`,
          }}
        />

        {/* Project Thumbnail / Video Preview Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-secondary">
          <img
            src={project.thumbnail}
            alt={`${project.title} — Web Application Project by Noman Nawaz`}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              isHovered && project.previewVideo ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-108'
            }`}
            loading="lazy"
          />

          {/* Autoplay video preview on hover if available */}
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Date Tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold glass text-white backdrop-blur-md shadow-lg border border-white/20">
              <Calendar className="w-3 h-3 text-secondary" />
              {project.date}
            </span>
          </div>

          {/* Video indicator badge */}
          {project.previewVideo && (
            <div className="absolute top-4 right-4 z-20">
              <span className="p-1.5 rounded-full glass text-white backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center">
                <Play className="w-3 h-3 text-primary fill-primary" />
              </span>
            </div>
          )}

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Card Content & Metrics */}
        <div className="flex flex-col flex-grow justify-between p-6 bg-surface/60">
          <div className="space-y-3">
            {/* Impact Metric Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {project.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold font-mono uppercase tracking-wider"
                  >
                    <Zap className="w-2.5 h-2.5" />
                    {metric}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-xl font-display font-bold tracking-tight text-text group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-secondary line-clamp-2 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-theme flex items-center justify-between">
            <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1.5">
              View Case Study
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </span>

            <div className="flex items-center gap-1.5">
              {project.techStack?.slice(0, 2).map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-0.5 rounded-lg bg-bg-secondary text-secondary font-mono border border-theme font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.techStack?.length > 2 && (
                <span className="text-[11px] px-1.5 py-0.5 rounded-lg bg-bg-secondary text-tertiary font-mono">
                  +{project.techStack.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
