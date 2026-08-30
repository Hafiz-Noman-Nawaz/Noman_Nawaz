import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Github,
  Linkedin,
  Sparkles,
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
  const photoUrl =
    heroData?.imageUrl ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';
  const location = settings?.location || 'Pakistan — Available Worldwide / Remote';
  const skillsList = settings?.skills || [
    'React 19', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript',
    'Tailwind CSS v4', 'Motion', 'Docker', 'AWS Cloud', 'REST APIs', 'Cloudinary'
  ];

  // Dynamic filter for timeline categories from CMS
  const workMilestones = timeline.filter((item) => !item.type || item.type === 'work');
  const educationMilestones = timeline.filter((item) => item.type === 'education');
  const awardMilestones = timeline.filter((item) => item.type === 'award');

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
          className="relative z-50 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-h-full print:bg-white print:text-black"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-theme bg-surface/80 backdrop-blur-md sticky top-0 z-20 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-display font-bold text-text">Curriculum Vitae</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold font-mono">
                CMS Synced
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Save / Print PDF</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-2 rounded-full glass hover:bg-surface text-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Printable Resume Sheet */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-6 print:space-y-6">
            {/* Top Identity & Photo Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-theme pb-8">
              {/* Uploaded Avatar Picture */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-theme-glow shadow-xl flex-shrink-0 bg-surface">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Identity Details */}
              <div className="space-y-2 text-center sm:text-left flex-grow">
                <h1 className="text-3xl sm:text-4xl font-display font-black text-text tracking-tight print:text-black">
                  {name}
                </h1>
                <p className="text-sm sm:text-base font-semibold gradient-text-vibrant font-display">
                  {tagline}
                </p>

                {/* Contact Coordinates */}
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

            {/* Professional Summary / Main Intro */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 print:text-black">
                <Sparkles className="w-3.5 h-3.5" /> Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans print:text-gray-700">
                {bio}
              </p>
            </div>

            {/* Core Technical Stack */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                <Code className="w-3.5 h-3.5 text-primary" /> Core Technical Proficiencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-bold glass border border-theme text-text print:border-gray-300 print:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Milestones & Experience */}
            {workMilestones.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                  <Briefcase className="w-3.5 h-3.5 text-secondary" /> Career Milestones & Experience
                </h2>

                <div className="space-y-3">
                  {workMilestones.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="p-4 rounded-2xl glass border border-theme space-y-1.5 print:border-gray-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="font-display font-bold text-sm text-text print:text-black">
                          {item.title}
                        </h3>
                        <span className="text-xs font-mono text-primary font-bold">
                          {item.year}
                        </span>
                      </div>
                      {item.company && (
                        <p className="text-xs font-semibold text-secondary">
                          {item.company}
                        </p>
                      )}
                      <p className="text-xs text-tertiary leading-relaxed font-sans print:text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Engineering Projects Showcase */}
            {projects.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                  <FolderGit2 className="w-3.5 h-3.5 text-accent" /> Key Projects & Architectural Case Studies
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projects.slice(0, 4).map((p, idx) => (
                    <div
                      key={p._id || idx}
                      className="p-4 rounded-2xl glass border border-theme space-y-2 flex flex-col justify-between print:border-gray-300"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-text print:text-black truncate">
                            {p.title}
                          </h4>
                          <span className="text-[10px] font-mono text-tertiary">
                            {p.date}
                          </span>
                        </div>
                        <p className="text-xs text-secondary line-clamp-2 leading-relaxed print:text-gray-700">
                          {p.description}
                        </p>
                      </div>

                      {p.techStack && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {p.techStack.slice(0, 4).map((t, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-surface text-primary border border-theme font-mono font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education & Degrees */}
            {educationMilestones.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary" /> Education & Academic Background
                </h2>

                <div className="space-y-2.5">
                  {educationMilestones.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="p-4 rounded-2xl glass border border-theme flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 print:border-gray-300"
                    >
                      <div>
                        <h3 className="font-bold text-text print:text-black text-sm">{item.title}</h3>
                        <p className="text-secondary print:text-gray-700">{item.company}</p>
                        {item.description && (
                          <p className="text-tertiary mt-1 text-[11px]">{item.description}</p>
                        )}
                      </div>
                      <span className="text-primary font-mono font-bold flex-shrink-0">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Certifications & Honors */}
            {(certificates.length > 0 || awardMilestones.length > 0) && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5 print:text-black">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Verified Accreditations & Honors
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {certificates.map((cert, idx) => (
                    <div
                      key={cert._id || idx}
                      className="p-3.5 rounded-2xl glass border border-theme flex items-center justify-between text-xs print:border-gray-300"
                    >
                      <div>
                        <h4 className="font-bold text-text print:text-black">{cert.title}</h4>
                        <p className="text-secondary text-[11px]">{cert.issuer}</p>
                      </div>
                      <span className="text-xs font-mono text-tertiary">{cert.issueDate}</span>
                    </div>
                  ))}

                  {awardMilestones.map((award, idx) => (
                    <div
                      key={award._id || idx}
                      className="p-3.5 rounded-2xl glass border border-theme flex items-center justify-between text-xs print:border-gray-300"
                    >
                      <div>
                        <h4 className="font-bold text-text print:text-black">{award.title}</h4>
                        <p className="text-secondary text-[11px]">{award.company}</p>
                      </div>
                      <span className="text-xs font-mono text-tertiary">{award.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
