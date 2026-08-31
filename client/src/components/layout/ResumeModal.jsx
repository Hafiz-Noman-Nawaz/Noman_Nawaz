import React, { useState, useEffect, useRef } from 'react';
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
  Zap,
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
  const [layoutMode, setLayoutMode] = useState('executive'); // 'executive', 'modern', 'minimal'
  const resumeContainerRef = useRef(null);
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

  const name = settings?.fullName || 'Noman Nawaz';
  const tagline = heroData?.title || 'Lead Full-Stack MERN Engineer & UI/UX Architect';
  const bio =
    settings?.bio ||
    heroData?.subtitle ||
    'High-velocity Full-Stack Engineer specializing in distributed Node.js architectures, React 19 visual systems, real-time WebSocket infrastructure, and high-conversion web applications.';
  const photoUrl = heroData?.imageUrl || '';
  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';
  const location = settings?.location || 'Pakistan — Available Worldwide / Remote';
  const github = settings?.github || 'https://github.com/Hafiz-Noman-Nawaz';
  const linkedin = settings?.linkedin || 'https://linkedin.com/in/nomannawaz';
  const portfolioUrl = 'https://www.nouman-nawaz.dev';

  const skillsList = settings?.skills || [
    'React 19', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript',
    'Tailwind CSS v4', 'Motion', 'Docker', 'AWS Cloud', 'REST APIs', 'Cloudinary',
    'PostgreSQL', 'Redis', 'GraphQL', 'WebSockets', 'JWT Auth', 'Vite'
  ];

  // Dynamic filter: only include projects marked to show on resume (or default true)
  const resumeProjects = projects.filter((p) => p.showOnResume !== false);
  const workMilestones = timeline.filter((item) => !item.type || item.type === 'work');
  const educationMilestones = timeline.filter((item) => item.type === 'education');
  const verifiedCerts = certificates || [];

  // Dedicated Recruiter Clean Print Window Generator
  const handlePrint = () => {
    playClick();

    const printContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${name} - Executive Resume</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 9.5pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    a {
      color: #2563eb;
      text-decoration: none;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-left h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-bottom: 2px;
    }
    .header-left .tagline {
      font-size: 11pt;
      font-weight: 600;
      color: #4338ca;
      margin-bottom: 6px;
    }
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 8.5pt;
      color: #475569;
      font-weight: 500;
    }
    .contact-item {
      display: inline-flex;
      align-items: center;
    }
    .photo-box {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      overflow: hidden;
      border: 1.5px solid #cbd5e1;
      flex-shrink: 0;
    }
    .photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .section {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 10.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary-text {
      font-size: 9pt;
      color: #334155;
      text-align: justify;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 6px;
    }
    .skill-pill {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      padding: 2px 7px;
      border-radius: 5px;
      font-size: 8.5pt;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 600;
      color: #1e293b;
    }
    .item {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }
    .item-company {
      font-size: 9pt;
      font-weight: 600;
      color: #4338ca;
    }
    .item-date {
      font-size: 8.5pt;
      font-family: ui-monospace, SFMono-Regular, monospace;
      color: #64748b;
      font-weight: 600;
    }
    .item-desc {
      font-size: 8.5pt;
      color: #334155;
      margin-top: 2px;
    }
    .project-links {
      font-size: 8pt;
      margin-top: 3px;
      display: flex;
      gap: 12px;
    }
    .project-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
    .stack-tag {
      font-size: 7.5pt;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1d4ed8;
      padding: 1px 5px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-weight: 600;
    }
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>${name}</h1>
      <div class="tagline">${tagline}</div>
      <div class="contact-row">
        <span class="contact-item">📧 ${email}</span>
        <span class="contact-item">📱 ${phone}</span>
        <span class="contact-item">📍 ${location}</span>
        <span class="contact-item">🌐 <a href="${portfolioUrl}">${portfolioUrl}</a></span>
        <span class="contact-item">🐙 <a href="${github}">github.com/${github.split('/').pop()}</a></span>
      </div>
    </div>
    ${photoUrl ? `<div class="photo-box"><img src="${photoUrl}" alt="${name}" /></div>` : ''}
  </div>

  <div class="section">
    <div class="section-title">Professional Executive Summary</div>
    <p class="summary-text">${bio}</p>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills Arsenal</div>
    <div class="skills-grid">
      ${skillsList.map((s) => `<span class="skill-pill">${s}</span>`).join('')}
    </div>
  </div>

  ${
    workMilestones.length > 0
      ? `
  <div class="section">
    <div class="section-title">Professional Experience & Milestones</div>
    ${workMilestones
      .map(
        (w) => `
    <div class="item">
      <div class="item-header">
        <span class="item-title">${w.title}</span>
        <span class="item-date">${w.year}</span>
      </div>
      ${w.company ? `<div class="item-company">${w.company}</div>` : ''}
      <div class="item-desc">${w.description}</div>
    </div>
    `
      )
      .join('')}
  </div>
  `
      : ''
  }

  ${
    resumeProjects.length > 0
      ? `
  <div class="section">
    <div class="section-title">Featured Software Engineering Projects (${resumeProjects.length})</div>
    ${resumeProjects
      .map(
        (p) => `
    <div class="item" style="border: 1px solid #e2e8f0; padding: 7px 10px; border-radius: 8px; margin-bottom: 8px; background: #fafafa;">
      <div class="item-header">
        <span class="item-title" style="font-size: 9.5pt;">${p.title}</span>
        <span class="item-date">${p.date || 'Production'}</span>
      </div>
      <div class="item-desc">${p.description}</div>
      ${
        p.techStack && p.techStack.length > 0
          ? `
      <div class="project-stack">
        ${p.techStack.map((t) => `<span class="stack-tag">${t}</span>`).join('')}
      </div>
      `
          : ''
      }
      <div class="project-links">
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank">🔗 Live Demo: ${p.liveUrl}</a>` : ''}
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">📂 Source Code: ${p.githubUrl}</a>` : ''}
      </div>
    </div>
    `
      )
      .join('')}
  </div>
  `
      : ''
  }

  <div class="grid-2col section">
    ${
      educationMilestones.length > 0
        ? `
    <div>
      <div class="section-title">Education & Degrees</div>
      ${educationMilestones
        .map(
          (e) => `
      <div class="item">
        <div class="item-title" style="font-size: 9pt;">${e.title}</div>
        <div class="item-company" style="font-size: 8.5pt;">${e.company}</div>
        <div class="item-date">${e.year}</div>
      </div>
      `
        )
        .join('')}
    </div>
    `
        : ''
    }

    ${
      verifiedCerts.length > 0
        ? `
    <div>
      <div class="section-title">Verified Accreditations</div>
      ${verifiedCerts
        .map(
          (c) => `
      <div class="item">
        <div class="item-title" style="font-size: 9pt;">${c.title}</div>
        <div class="item-company" style="font-size: 8.5pt;">${c.issuer} (${c.issueDate})</div>
      </div>
      `
        )
        .join('')}
    </div>
    `
        : ''
    }
  </div>
</body>
</html>
    `;

    const printIframe = document.createElement('iframe');
    printIframe.style.position = 'fixed';
    printIframe.style.right = '0';
    printIframe.style.bottom = '0';
    printIframe.style.width = '0';
    printIframe.style.height = '0';
    printIframe.style.border = '0';
    document.body.appendChild(printIframe);

    const doc = printIframe.contentWindow.document;
    doc.open();
    doc.write(printContent);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow.focus();
      printIframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printIframe);
      }, 2000);
    }, 400);
  };

  const layouts = [
    { id: 'executive', label: '2-Column Split', icon: Columns },
    { id: 'modern', label: 'Modern Dark', icon: Sparkles },
    { id: 'minimal', label: 'ATS Paper', icon: FileText },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-xl z-40"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-50 w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Action Bar with Layout Switcher */}
          <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-theme bg-surface/90 backdrop-blur-md sticky top-0 z-20 gap-3">
            {/* Layout Mode Selector */}
            <div className="flex items-center gap-1 p-1 rounded-2xl glass border border-theme">
              <span className="text-[10px] uppercase font-bold text-tertiary px-2 hidden sm:inline">Design:</span>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Download Executive PDF</span>
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
          {/* LAYOUT 1: SILICON VALLEY 2-COLUMN SPLIT (Executive Sidebar) */}
          {/* ========================================================================= */}
          {layoutMode === 'executive' && (
            <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column Sidebar (4 cols) */}
              <div className="md:col-span-4 space-y-6 border-b md:border-b-0 md:border-r border-theme pb-6 md:pb-0 md:pr-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg bg-surface mx-auto md:mx-0 flex items-center justify-center">
                  {photoUrl ? (
                    <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-3xl font-display font-black text-white">
                      {name[0] || 'N'}
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <h2 className="font-display font-bold text-xl text-text">{name}</h2>
                  <p className="text-xs text-primary font-medium">{tagline}</p>
                </div>

                {/* Contact Coordinates */}
                <div className="space-y-2 text-xs text-secondary border-t border-theme pt-4">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-tertiary">Coordinates</p>
                  <p className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {email}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-secondary flex-shrink-0" /> {phone}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" /> {location}</p>
                  <p className="flex items-center gap-1.5 truncate"><Globe className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {portfolioUrl}</p>
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
                        <p className="font-bold text-text">{item.title}</p>
                        <p className="text-secondary">{item.company} · {item.year}</p>
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
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">{bio}</p>
                </div>

                {/* Experience */}
                {workMilestones.length > 0 && (
                  <div className="space-y-4 border-t border-theme pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text">Experience & Milestones</h3>
                    <div className="space-y-3">
                      {workMilestones.map((item, idx) => (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-text text-sm">{item.title}</span>
                            <span className="font-mono text-primary font-bold">{item.year}</span>
                          </div>
                          {item.company && <p className="text-secondary font-medium">{item.company}</p>}
                          <p className="text-tertiary leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dynamic Projects with Stack & Links */}
                {resumeProjects.length > 0 && (
                  <div className="space-y-3 border-t border-theme pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text">Featured Software Projects</h3>
                      <span className="text-[10px] font-mono text-tertiary">{resumeProjects.length} Highlighted</span>
                    </div>
                    <div className="space-y-3">
                      {resumeProjects.map((p, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl glass border border-theme space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-text text-sm">{p.title}</span>
                            <span className="font-mono text-[10px] text-tertiary">{p.date || '2025'}</span>
                          </div>
                          <p className="text-secondary leading-relaxed">{p.description}</p>

                          {/* Tech stack */}
                          {p.techStack && p.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {p.techStack.map((t, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-surface text-primary border border-theme font-mono font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Links */}
                          <div className="flex items-center gap-3 pt-1 text-[11px] font-medium">
                            {p.liveUrl && (
                              <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-secondary hover:underline flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Live Demo
                              </a>
                            )}
                            {p.githubUrl && (
                              <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-tertiary hover:text-text flex items-center gap-1">
                                <Github className="w-3 h-3" /> Source Code
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LAYOUT 2: MODERN DARK GLASSMORPHIC */}
          {/* ========================================================================= */}
          {layoutMode === 'modern' && (
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
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
                  <h1 className="text-3xl sm:text-4xl font-display font-black text-text tracking-tight">
                    {name}
                  </h1>
                  <p className="text-sm sm:text-base font-semibold gradient-text-vibrant font-display">
                    {tagline}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-medium text-secondary">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
                  {bio}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-primary" /> Core Technical Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl text-xs font-mono font-bold glass border border-theme text-text">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Milestones */}
              {workMilestones.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-secondary" /> Career Milestones & Experience
                  </h2>
                  <div className="space-y-3">
                    {workMilestones.map((item, idx) => (
                      <div key={item._id || idx} className="p-4 rounded-2xl glass border border-theme space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="font-display font-bold text-sm text-text">{item.title}</h3>
                          <span className="text-xs font-mono text-primary font-bold">{item.year}</span>
                        </div>
                        {item.company && <p className="text-xs font-semibold text-secondary">{item.company}</p>}
                        <p className="text-xs text-tertiary leading-relaxed font-sans">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Projects */}
              {resumeProjects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-accent" /> Featured Engineering Projects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {resumeProjects.map((p, idx) => (
                      <div key={p._id || idx} className="p-4 rounded-2xl glass border border-theme space-y-2 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-bold text-xs sm:text-sm text-text truncate">{p.title}</h4>
                            <span className="text-[10px] font-mono text-tertiary">{p.date}</span>
                          </div>
                          <p className="text-xs text-secondary line-clamp-2 leading-relaxed">{p.description}</p>
                        </div>
                        {p.techStack && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {p.techStack.map((t, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-surface text-primary border border-theme font-mono font-medium">{t}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-3 pt-1 text-[11px]">
                          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-secondary hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Live</a>}
                          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-tertiary hover:text-text flex items-center gap-1"><Github className="w-3 h-3" /> Code</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {educationMilestones.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-secondary" /> Education
                  </h2>
                  <div className="space-y-2.5">
                    {educationMilestones.map((item, idx) => (
                      <div key={item._id || idx} className="p-4 rounded-2xl glass border border-theme flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                        <div>
                          <h3 className="font-bold text-text text-sm">{item.title}</h3>
                          <p className="text-secondary">{item.company}</p>
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
          {/* LAYOUT 3: MINIMALIST ATS-FRIENDLY PAPER */}
          {/* ========================================================================= */}
          {layoutMode === 'minimal' && (
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6 bg-white text-black font-sans">
              {/* Minimal Header */}
              <div className="border-b-2 border-black pb-4 text-center space-y-1">
                <h1 className="text-3xl font-serif font-bold tracking-tight text-black">{name}</h1>
                <p className="text-xs font-semibold text-gray-800 uppercase tracking-widest">{tagline}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-gray-700">
                  <span>{email}</span>
                  <span>•</span>
                  <span>{phone}</span>
                  <span>•</span>
                  <span>{location}</span>
                  <span>•</span>
                  <span>{portfolioUrl}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5">Professional Profile</h2>
                <p className="text-xs text-gray-800 leading-relaxed text-justify">{bio}</p>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5">Technical Proficiencies</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((s, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 bg-gray-100 border border-gray-300 text-black font-mono font-semibold rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              {workMilestones.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5">Professional Experience</h2>
                  <div className="space-y-2.5">
                    {workMilestones.map((item, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <div className="flex justify-between items-baseline font-bold text-black">
                          <span>{item.title}</span>
                          <span className="font-mono text-[10px] text-gray-700">{item.year}</span>
                        </div>
                        {item.company && <p className="text-gray-800 font-semibold">{item.company}</p>}
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resumeProjects.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5">Featured Engineering Projects</h2>
                  <div className="space-y-2">
                    {resumeProjects.map((p, idx) => (
                      <div key={idx} className="text-xs space-y-1 p-2 rounded bg-gray-50 border border-gray-200">
                        <div className="flex justify-between items-baseline font-bold text-black">
                          <span>{p.title}</span>
                          <span className="font-mono text-[10px] text-gray-600">{p.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{p.description}</p>
                        {p.techStack && (
                          <p className="text-[10px] font-mono text-gray-800">
                            <strong>Stack:</strong> {p.techStack.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {educationMilestones.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-gray-300 pb-0.5">Education</h2>
                  {educationMilestones.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-xs">
                      <div>
                        <p className="font-bold text-black">{item.title}</p>
                        <p className="text-gray-700">{item.company}</p>
                      </div>
                      <span className="font-mono text-[10px] text-gray-600">{item.year}</span>
                    </div>
                  ))}
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
