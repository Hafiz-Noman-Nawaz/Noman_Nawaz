import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Trophy, FolderGit2, Calendar, Sparkles } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';

const TimelineCard = ({ item, index }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(10, 1000, 1.02);

  const getIcon = () => {
    if (item.type === 'education') return <GraduationCap className="w-4 h-4 text-secondary" />;
    if (item.type === 'award') return <Trophy className="w-4 h-4 text-amber-400" />;
    if (item.type === 'project') return <FolderGit2 className="w-4 h-4 text-accent" />;
    return <Briefcase className="w-4 h-4 text-primary" />;
  };

  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal w-full mb-12 ${
      isEven ? 'md:flex-row-reverse' : ''
    }`}>
      {/* Center Node Indicator */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-9 h-9 rounded-full glass border-2 border-theme-glow shadow-xl flex items-center justify-center bg-bg">
          {getIcon()}
        </div>
      </div>

      {/* Card Wrapper */}
      <div className="w-[calc(100%-3.5rem)] ml-14 md:ml-0 md:w-[calc(50%-2.5rem)]">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            ref={ref}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="p-6 rounded-3xl glass-card border border-theme hover:border-theme-glow shadow-xl relative overflow-hidden"
          >
            {/* Dynamic Glare */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.8}), transparent 60%)`,
              }}
            />

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-primary flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.year}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface text-secondary border border-theme">
                {item.type}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-display font-bold text-text">
              {item.title}
            </h4>

            {item.company && (
              <p className="text-xs font-semibold text-secondary mt-0.5">
                {item.company}
              </p>
            )}

            <p className="text-xs sm:text-sm text-tertiary mt-2 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const TimelineSection = ({ milestones = [] }) => {
  const fallbackMilestones = [
    {
      year: '2024 — Present',
      title: 'Lead Full-Stack MERN & Motion Engineer',
      company: 'HyperScale Systems',
      description: 'Architecting high-frequency real-time web applications, managing microservices with Docker, and engineering 60fps physics animations.',
      type: 'work',
    },
    {
      year: '2023 — 2024',
      title: 'Senior Frontend & Motion Developer',
      company: 'Vortex Interactive Studio',
      description: 'Created collaborative WebGL animation canvases, bespoke client visual design systems, and sub-30ms WebSocket syncing pipelines.',
      type: 'work',
    },
    {
      year: '2022 — 2023',
      title: 'Full-Stack JavaScript Developer',
      company: 'Nexus Innovations',
      description: 'Developed scalable REST APIs with Express.js, integrated JWT authorization systems, and built responsive React user interfaces.',
      type: 'work',
    },
    {
      year: '2022',
      title: 'B.S. in Computer Science (Honors)',
      company: 'University Graduate',
      description: 'Graduated with high honors focusing on Distributed Systems, Cloud Architecture, and Interactive Human-Computer Graphics.',
      type: 'education',
    },
  ];

  const items = milestones.length > 0 ? milestones : fallbackMilestones;

  return (
    <section id="timeline" className="relative py-28 z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-primary mb-3 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Experience & Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            The roadmap of engineering leadership, product launches, and technical milestones.
          </motion.p>
        </div>

        {/* Timeline Spine */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-40 z-10" />

          {/* Milestone Cards */}
          <div className="space-y-4">
            {items.map((item, idx) => (
              <TimelineCard key={item._id || idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
