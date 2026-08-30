import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Github,
  Linkedin,
  Sparkles,
  Layout,
  FileText,
  Columns,
  Check,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const ResumeModal = ({
  isOpen,
  onClose,
  heroData,
  settings,
  projects = [],
  timeline = [],
  certificates = [],
}) => {
  const [layoutMode, setLayoutMode] = useState('modern'); // 'modern', 'executive', 'minimal'
  const { playClick, playWhoosh } = useSound();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      playWhoosh();
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  const name = settings?.fullName || 'Noman Nawaz';
  const tagline = heroData?.title || 'Lead Full-Stack MERN Engineer & UI/UX Motion Designer';
  const bio =
    settings?.bio ||
    heroData?.subtitle ||
    'Specialized in architecting high-frequency reactive web applications, scalable REST/GraphQL backend systems, and silky 60fps micro-interaction physics with React, Node.js, and MongoDB.';
  const photoUrl = heroData?.imageUrl || '';
  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';
  const location = settings?.location || 'Pakistan — Available Worldwide / Remote';
  const github = settings?.github || 'https://github.com/Hafiz-Noman-Nawaz';
  const linkedin = settings?.linkedin || 'https://linkedin.com';
  const skillsList = settings?.skills || [
    'React 19', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript',
    'Tailwind CSS v4', 'Motion', 'Docker', 'AWS Cloud', 'REST APIs', 'Cloudinary'
  ];

  const workMilestones = timeline.filter((item) => !item.type || item.type === 'work');
  const educationMilestones = timeline.filter((item) => item.type === 'education');
  const awardMilestones = timeline.filter((item) => item.type === 'award');

  const layouts = [
    { id: 'modern', label: 'Modern Dark', icon: Sparkles },
    { id: 'executive', label: '2-Column Split', icon: Columns },
    { id: 'minimal', label: 'Minimal ATS', icon: FileText },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto print:p-0 print:m-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-xl z-40 print:hidden"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-50 w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-h-full print:bg-white print:text-black"
        >
          {/* Header Action Bar with Layout Switcher */}
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-theme bg-surface/90 backdrop-blur-md sticky top-0 z-20 gap-3 print:hidden">
            {/* Layout Mode Selector */}
            <div className="flex items-center gap-1 p-1 rounded-2xl glass border border-theme">
              <span className="text-[10px] uppercase font-bold text-tertiary px-2 hidden sm:inline">Layout:</span>
              {layouts.map((l) => {
                const Icon = l.icon;
                const isActive = layoutMode === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      playClick();
                      setLayoutMode(l.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-secondary hover:text-text'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{l.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Print & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 rounded-full glass hover:bg-surface text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LAYOUT 1: MODERN DARK GLASSMORPHIC (Default) */}
          {/* ========================================================================= */}
          {layoutMode === 'modern' && (
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-6 print:space-y-6">
              {/* Top Identity & Photo Banner */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-theme pb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-theme-glow shadow-xl flex-shrink-0 bg-surface flex items-center justify-center">
                  {photoUrl ? (
                    <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-3xl font-display font-black text-white">
                      {name[0] || 'N'}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <h1 className="text-3xl sm:text-4xl font-display font-black text-text tracking-tight print:text-black">
                    {name}
                  </h1>
                  <p className="text-sm sm:text-base font-semibold gradient-text-vibrant font-display">
                    {tagline}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-medium text-secondary print:text-gray-800">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-primary" /> {email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-secondary" /> {phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent" /> {location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 print:text-black">
                  <Sparkles className="w-3.5 h-3.5" /> Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans print:text-gray-700">
                  {bio}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                  <Code className="w-3.5 h-3.5 text-primary" /> Core Technical Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl text-xs font-mono font-bold glass border border-theme text-text print:border-gray-300 print:text-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Milestones */}
              {workMilestones.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                    <Briefcase className="w-3.5 h-3.5 text-secondary" /> Career Milestones & Experience
                  </h2>
                  <div className="space-y-3">
                    {workMilestones.map((item, idx) => (
                      <div key={item._id || idx} className="p-4 rounded-2xl glass border border-theme space-y-1.5 print:border-gray-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-display font-bold text-sm text-text print:text-black">{item.title}</h3>
                          <span className="text-xs font-mono text-primary font-bold">{item.year}</span>
                        </div>
                        {item.company && <p className="text-xs font-semibold text-secondary">{item.company}</p>}
                        <p className="text-xs text-tertiary leading-relaxed font-sans print:text-gray-700">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Projects */}
              {projects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                    <FolderGit2 className="w-3.5 h-3.5 text-accent" /> Key Engineering Projects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {projects.slice(0, 4).map((p, idx) => (
                      <div key={p._id || idx} className="p-4 rounded-2xl glass border border-theme space-y-2 flex flex-col justify-between print:border-gray-300">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-bold text-xs sm:text-sm text-text print:text-black truncate">{p.title}</h4>
                            <span className="text-[10px] font-mono text-tertiary">{p.date}</span>
                          </div>
                          <p className="text-xs text-secondary line-clamp-2 leading-relaxed print:text-gray-700">{p.description}</p>
                        </div>
                        {p.techStack && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {p.techStack.slice(0, 4).map((t, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-surface text-primary border border-theme font-mono font-medium">{t}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              {educationMilestones.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                    <GraduationCap className="w-3.5 h-3.5 text-secondary" /> Education
                  </h2>
                  <div className="space-y-2.5">
                    {educationMilestones.map((item, idx) => (
                      <div key={item._id || idx} className="p-4 rounded-2xl glass border border-theme flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 print:border-gray-300">
                        <div>
                          <h3 className="font-bold text-text print:text-black text-sm">{item.title}</h3>
                          <p className="text-secondary print:text-gray-700">{item.company}</p>
                        </div>
                        <span className="text-primary font-mono font-bold">{item.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 2: SILICON VALLEY 2-COLUMN SPLIT (Executive Sidebar) */}
          {/* ========================================================================= */}
          {layoutMode === 'executive' && (
            <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 print:p-4 print:gap-6">
              {/* Left Column Sidebar (4 cols) */}
              <div className="md:col-span-4 space-y-6 border-b md:border-b-0 md:border-r border-theme pb-6 md:pb-0 md:pr-6">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg bg-surface mx-auto md:mx-0 flex items-center justify-center">
                  {photoUrl ? (
                    <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-3xl font-display font-black text-white">
                      {name[0] || 'N'}
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <h2 className="font-display font-bold text-xl text-text print:text-black">{name}</h2>
                  <p className="text-xs text-primary font-medium">{tagline}</p>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-xs text-secondary border-t border-theme pt-4 print:text-gray-800">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-tertiary">Coordinates</p>
                  <p className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {email}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-secondary flex-shrink-0" /> {phone}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" /> {location}</p>
                </div>

                {/* Skills */}
                <div className="space-y-2 border-t border-theme pt-4">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-tertiary">Skills Arsenal</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-lg bg-surface border border-theme text-text font-mono font-medium">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                {educationMilestones.length > 0 && (
                  <div className="space-y-2 border-t border-theme pt-4">
                    <p className="font-bold uppercase tracking-wider text-[10px] text-tertiary">Education</p>
                    {educationMilestones.map((item, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <p className="font-bold text-text print:text-black">{item.title}</p>
                        <p className="text-secondary print:text-gray-700">{item.company} · {item.year}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column Main Body (8 cols) */}
              <div className="md:col-span-8 space-y-6">
                {/* Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Executive Summary</h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans print:text-gray-700">{bio}</p>
                </div>

                {/* Experience */}
                {workMilestones.length > 0 && (
                  <div className="space-y-4 border-t border-theme pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text">Experience & Milestones</h3>
                    <div className="space-y-3">
                      {workMilestones.map((item, idx) => (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-text text-sm print:text-black">{item.title}</span>
                            <span className="font-mono text-primary font-bold">{item.year}</span>
                          </div>
                          <p className="text-secondary font-medium">{item.company}</p>
                          <p className="text-tertiary leading-relaxed print:text-gray-700">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Projects */}
                {projects.length > 0 && (
                  <div className="space-y-3 border-t border-theme pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text">Featured Projects</h3>
                    <div className="space-y-2.5">
                      {projects.slice(0, 3).map((p, idx) => (
                        <div key={idx} className="p-3 rounded-xl glass border border-theme space-y-1 text-xs print:border-gray-300">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-text">{p.title}</span>
                            <span className="font-mono text-[10px] text-tertiary">{p.date}</span>
                          </div>
                          <p className="text-secondary leading-relaxed line-clamp-2">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 3: MINIMALIST ATS-FRIENDLY PAPER (Clean Monochrome) */}
          {/* ========================================================================= */}
          {layoutMode === 'minimal' && (
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6 bg-white text-black font-sans print:p-4">
              {/* Minimal Header */}
              <div className="border-b-2 border-black pb-4 text-center space-y-1">
                <h1 className="text-3xl font-serif font-bold tracking-tight text-black">{name}</h1>
                <p className="text-sm font-medium text-gray-700">{tagline}</p>
                <p className="text-xs text-gray-600">
                  {email} • {phone} • {location} • {github}
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-300 pb-0.5">Professional Summary</h2>
                <p className="text-xs text-gray-800 leading-relaxed pt-1">{bio}</p>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-300 pb-0.5">Technical Competencies</h2>
                <p className="text-xs text-gray-800 pt-1 font-mono">{skillsList.join(' • ')}</p>
              </div>

              {/* Work Experience */}
              {workMilestones.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-300 pb-0.5">Experience</h2>
                  <div className="space-y-3 pt-1">
                    {workMilestones.map((item, idx) => (
                      <div key={idx} className="space-y-0.5 text-xs">
                        <div className="flex justify-between items-baseline font-bold text-black">
                          <span>{item.title} {item.company ? `| ${item.company}` : ''}</span>
                          <span className="font-normal text-gray-600">{item.year}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-300 pb-0.5">Selected Projects</h2>
                  <div className="space-y-2 pt-1">
                    {projects.slice(0, 3).map((p, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-black">
                          <span>{p.title}</span>
                          <span className="font-normal text-gray-600">{p.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{p.description}</p>
                        {p.techStack && <p className="text-[11px] text-gray-500 font-mono">Stack: {p.techStack.join(', ')}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {educationMilestones.length > 0 && (
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-300 pb-0.5">Education</h2>
                  <div className="space-y-1 pt-1">
                    {educationMilestones.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-black">{item.title} {item.company ? `— ${item.company}` : ''}</span>
                        <span className="text-gray-600">{item.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
