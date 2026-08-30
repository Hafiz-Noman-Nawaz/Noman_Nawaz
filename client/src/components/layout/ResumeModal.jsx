import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Globe, CheckCircle2, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const ResumeModal = ({ isOpen, onClose, settings }) => {
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

  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';
  const location = settings?.location || 'Pakistan (Remote Available)';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:m-0">
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
          className="relative z-50 w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-h-full print:bg-white print:text-black"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-theme bg-surface/80 backdrop-blur-md sticky top-0 z-20 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-display font-bold text-text">Curriculum Vitae</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold">
                Verified 2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save / Print PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass hover:bg-surface-hover text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Printable Resume Sheet */}
          <div className="overflow-y-auto p-8 sm:p-10 space-y-8 print:p-0 print:space-y-6">
            {/* Header / Identity */}
            <div className="border-b border-theme pb-6 space-y-3">
              <h1 className="text-3xl sm:text-4xl font-display font-black text-text tracking-tight print:text-black">
                Noman Nawaz
              </h1>
              <p className="text-base font-semibold text-primary">
                Full-Stack MERN Developer & UI/UX Motion Designer
              </p>
              <p className="text-sm text-secondary leading-relaxed font-sans max-w-2xl print:text-gray-700">
                Specialized in architecting high-frequency reactive web applications, scalable REST/GraphQL backend systems, and silky 60fps micro-interaction physics with React, Node.js, and MongoDB.
              </p>

              {/* Coordinates */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-secondary print:text-gray-800">
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

            {/* Core Competencies */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text flex items-center gap-2 print:text-black">
                <Code className="w-4 h-4 text-primary" /> Core Technical Mastery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl glass border border-theme space-y-1">
                  <p className="font-bold text-primary">Frontend & Motion</p>
                  <p className="text-secondary print:text-gray-700">React 19, Next.js, TypeScript, Tailwind CSS, Motion/GSAP, WebGL Canvas</p>
                </div>
                <div className="p-3 rounded-2xl glass border border-theme space-y-1">
                  <p className="font-bold text-secondary">Backend & APIs</p>
                  <p className="text-secondary print:text-gray-700">Node.js, Express.js, REST APIs, GraphQL, WebSockets, JWT Auth, Microservices</p>
                </div>
                <div className="p-3 rounded-2xl glass border border-theme space-y-1">
                  <p className="font-bold text-accent">Database & DevOps</p>
                  <p className="text-secondary print:text-gray-700">MongoDB (Mongoose), PostgreSQL, Redis Pub/Sub, Docker, Cloudinary, Vercel, Render</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text flex items-center gap-2 print:text-black">
                <Briefcase className="w-4 h-4 text-secondary" /> Professional Experience
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl glass border border-theme space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-sm text-text print:text-black">Lead Full-Stack MERN Engineer</h3>
                      <p className="text-xs text-primary font-medium">HyperScale Systems · Remote</p>
                    </div>
                    <span className="text-[11px] text-tertiary font-mono">2024 — Present</span>
                  </div>
                  <ul className="text-xs text-secondary space-y-1 list-disc list-inside print:text-gray-700">
                    <li>Architected distributed enterprise dashboard handling 10,000+ real-time websocket nodes.</li>
                    <li>Reduced client bundle payload by 42% through lazy loading, Code splitting, and WebGL optimization.</li>
                    <li>Built automated Cloudinary media processing pipelines and JWT authorization checkpoints.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl glass border border-theme space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-sm text-text print:text-black">Senior React & Motion Developer</h3>
                      <p className="text-xs text-secondary font-medium">Vortex Studio · Contract</p>
                    </div>
                    <span className="text-[11px] text-tertiary font-mono">2023 — 2024</span>
                  </div>
                  <ul className="text-xs text-secondary space-y-1 list-disc list-inside print:text-gray-700">
                    <li>Engineered multi-user collaborative animation canvas with sub-30ms delta sync.</li>
                    <li>Crafted accessible high-contrast design systems with 100% theme switching adherence.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text flex items-center gap-2 print:text-black">
                <GraduationCap className="w-4 h-4 text-accent" /> Education & Certifications
              </h2>
              <div className="p-4 rounded-2xl glass border border-theme flex justify-between items-center text-xs">
                <div>
                  <h3 className="font-bold text-text print:text-black">Bachelor of Science in Computer Science</h3>
                  <p className="text-secondary print:text-gray-700">Focus on Distributed Web Architectures & Interactive Human-Computer Interfaces</p>
                </div>
                <span className="text-tertiary font-mono">Graduated with Honors</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
