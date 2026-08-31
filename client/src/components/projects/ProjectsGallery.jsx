import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, Sparkles, Layers, Cpu, Globe } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useSound } from '../../context/SoundContext';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectsGallery = ({ projects = [] }) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { playClick } = useSound();

  const categories = [
    { id: 'all', label: t.projects.allTab, icon: FolderGit2 },
    { id: 'mern', label: 'Full-Stack MERN', icon: Layers },
    { id: 'ai', label: 'AI & Data Systems', icon: Cpu },
    { id: 'motion', label: '3D Motion & UI', icon: Sparkles },
    { id: 'next', label: 'Next.js & Cloud', icon: Globe },
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;

    return projects.filter((project) => {
      const text = `${project.title} ${project.description} ${(project.techStack || []).join(' ')}`.toLowerCase();

      if (activeCategory === 'mern') {
        return text.includes('react') || text.includes('node') || text.includes('mongo') || text.includes('express');
      }
      if (activeCategory === 'ai') {
        return text.includes('ai') || text.includes('model') || text.includes('python') || text.includes('bot') || text.includes('neural');
      }
      if (activeCategory === 'motion') {
        return text.includes('motion') || text.includes('3d') || text.includes('gsap') || text.includes('canvas') || text.includes('three');
      }
      if (activeCategory === 'next') {
        return text.includes('next') || text.includes('cloud') || text.includes('docker') || text.includes('aws') || text.includes('vercel');
      }
      return true;
    });
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="relative py-28 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-secondary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-secondary shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text">
              {t.projects.title}
            </h2>
            <p className="text-secondary text-sm sm:text-base max-w-xl font-sans">
              {t.projects.desc}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-tertiary uppercase tracking-wider"
          >
            {filteredProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
          </motion.p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 select-none no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'glass hover:border-theme-glow text-secondary hover:text-text'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Motion Layout animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onSelect={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl border border-theme">
            <p className="text-secondary text-sm">No projects found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>

      {/* Drill-down Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsGallery;
