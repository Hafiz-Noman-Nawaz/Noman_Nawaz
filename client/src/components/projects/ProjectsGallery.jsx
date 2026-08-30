import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FolderGit2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export const ProjectsGallery = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-28 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-secondary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-secondary shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text">
              Featured Case Studies & Projects
            </h2>
            <p className="text-secondary text-sm sm:text-base max-w-xl font-sans">
              Interact with the 3D cards below. Click any card to inspect full architectural case studies and tech stacks.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-tertiary uppercase tracking-wider"
          >
            {projects.length} project{projects.length !== 1 ? 's' : ''} showcased
          </motion.p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project._id || idx}
                project={project}
                index={idx}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl border border-theme">
            <p className="text-secondary text-sm">No projects loaded yet. Add them from the CMS dashboard.</p>
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
