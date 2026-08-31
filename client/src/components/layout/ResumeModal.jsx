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

  // Dynamic filter: only include projects marked to show on resume
  const resumeProjects = projects.filter((p) => p.showOnResume !== false);
  const workMilestones = timeline.filter((item) => !item.type || item.type === 'work');
  const educationMilestones = timeline.filter((item) => item.type === 'education');
  const verifiedCerts = certificates || [];

  // Helper to parse case study highlights & clean stack
  const parseProjectData = (p) => {
    let overview = p.description || '';
    let highlights = [];

    if (p.caseStudy) {
      const lines = p.caseStudy.split('\n').map((l) => l.trim()).filter(Boolean);
      const bulletLines = lines.filter((l) => l.startsWith('- ') || l.startsWith('* ') || l.startsWith('• '));
      if (bulletLines.length > 0) {
        highlights = bulletLines.slice(0, 3).map((b) => b.replace(/^[-*•]\s*/, ''));
      } else {
        const bodyLines = lines.filter((l) => !l.startsWith('#') && l.length > 25);
        if (bodyLines.length > 1) {
          highlights = bodyLines.slice(1, 3);
        }
      }
    }

    if (highlights.length === 0 && p.metrics && p.metrics.length > 0) {
      highlights = p.metrics.slice(0, 2);
    }

    // Keep stack clean & focused (max 5-6 top technologies)
    const cleanStack = (p.techStack || []).slice(0, 6).join(' · ');

    return {
      overview,
      highlights,
      cleanStack,
    };
  };

  // Dedicated Print Generator that renders the EXACT active layoutMode
  const handlePrint = () => {
    playClick();

    let printHtmlBody = '';

    if (layoutMode === 'executive') {
      // ══════════════════════════════════════════════════════════════
      // LAYOUT 1: SILICON VALLEY 2-COLUMN SPLIT (Executive Sidebar)
      // ══════════════════════════════════════════════════════════════
      printHtmlBody = `
      <style>
        @page { size: A4 portrait; margin: 0mm; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #ffffff; color: #0f172a; margin: 0; padding: 0; }
        .executive-wrapper { display: flex; min-height: 100vh; }
        .sidebar { width: 33%; background: #0f172a; color: #f8fafc; padding: 18mm 8mm 18mm 12mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .main-column { width: 67%; padding: 18mm 14mm 18mm 10mm; background: #ffffff; }
        .photo-box { width: 75px; height: 75px; border-radius: 14px; overflow: hidden; border: 2px solid #818cf8; margin-bottom: 12px; }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-initial { width: 75px; height: 75px; border-radius: 14px; background: #4f46e5; color: white; display: flex; align-items: center; justify-content: center; font-size: 24pt; font-weight: 800; }
        .sidebar-name { font-size: 15pt; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; margin-bottom: 2px; }
        .sidebar-tagline { font-size: 8.5pt; color: #818cf8; font-weight: 600; margin-bottom: 16px; line-height: 1.3; }
        .sidebar-title { font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 3px; margin-bottom: 8px; margin-top: 14px; }
        .sidebar-row { font-size: 8pt; color: #cbd5e1; margin-bottom: 5px; word-break: break-all; }
        .sidebar-skills { display: flex; flex-wrap: wrap; gap: 4px; }
        .sidebar-skill-tag { background: #1e293b; color: #e2e8f0; font-size: 7.5pt; font-family: monospace; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid #334155; }
        .main-title { font-size: 9.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #0f172a; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 8px; margin-top: 14px; }
        .main-title:first-child { margin-top: 0; }
        .summary-p { font-size: 8.5pt; color: #334155; line-height: 1.4; text-align: justify; }
        .item { margin-bottom: 9px; page-break-inside: avoid; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; }
        .item-title { font-size: 9.5pt; font-weight: 700; color: #0f172a; }
        .item-company { font-size: 8.5pt; font-weight: 600; color: #4338ca; }
        .item-date { font-size: 8pt; font-family: monospace; color: #64748b; font-weight: 600; }
        .item-desc { font-size: 8pt; color: #475569; margin-top: 2px; }
        .project-card { border-left: 2.5px solid #4f46e5; padding-left: 8px; margin-bottom: 8px; page-break-inside: avoid; }
        .project-stack { font-size: 7.5pt; font-family: monospace; color: #4338ca; font-weight: 600; margin-bottom: 2px; }
        .project-links { font-size: 7.5pt; margin-top: 3px; display: flex; gap: 10px; }
        a { color: #2563eb; text-decoration: none; }
      </style>
      <div class="executive-wrapper">
        <div class="sidebar">
          ${photoUrl ? `<div class="photo-box"><img src="${photoUrl}" alt="${name}" /></div>` : `<div class="avatar-initial">${name[0]}</div>`}
          <div class="sidebar-name">${name}</div>
          <div class="sidebar-tagline">${tagline}</div>

          <div class="sidebar-title">Coordinates</div>
          <div class="sidebar-row">📧 ${email}</div>
          <div class="sidebar-row">📱 ${phone}</div>
          <div class="sidebar-row">📍 ${location}</div>
          <div class="sidebar-row">🌐 <a href="${portfolioUrl}" style="color:#60a5fa;">${portfolioUrl.replace(/^https?:\/\//, '')}</a></div>
          <div class="sidebar-row">🐙 <a href="${github}" style="color:#60a5fa;">${github.replace(/^https?:\/\//, '')}</a></div>

          <div class="sidebar-title">Skills Stack</div>
          <div class="sidebar-skills">
            ${skillsList.map((s) => `<span class="sidebar-skill-tag">${s}</span>`).join('')}
          </div>

          ${
            educationMilestones.length > 0
              ? `
          <div class="sidebar-title">Education</div>
          ${educationMilestones
            .map(
              (e) => `
            <div style="margin-bottom: 6px;">
              <div style="font-weight: 700; font-size: 8.5pt; color: #ffffff;">${e.title}</div>
              <div style="font-size: 8pt; color: #cbd5e1;">${e.company}</div>
              <div style="font-size: 7.5pt; color: #94a3b8; font-family: monospace;">${e.year}</div>
            </div>
          `
            )
            .join('')}
          `
              : ''
          }

          ${
            verifiedCerts.length > 0
              ? `
          <div class="sidebar-title">Accreditations</div>
          ${verifiedCerts
            .map(
              (c) => `
            <div style="margin-bottom: 5px;">
              <div style="font-weight: 700; font-size: 8pt; color: #ffffff;">${c.title}</div>
              <div style="font-size: 7.5pt; color: #94a3b8;">${c.issuer} (${c.issueDate})</div>
            </div>
          `
            )
            .join('')}
          `
              : ''
          }
        </div>

        <div class="main-column">
          <div class="main-title">Executive Summary</div>
          <p class="summary-p">${bio}</p>

          ${
            workMilestones.length > 0
              ? `
          <div class="main-title">Experience & Milestones</div>
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
          `
              : ''
          }

          ${
            resumeProjects.length > 0
              ? `
          <div class="main-title">Featured Software Architecture (${resumeProjects.length})</div>
          ${resumeProjects
            .map((p) => {
              const data = parseProjectData(p);
              return `
            <div class="project-card">
              <div class="item-header">
                <span class="item-title">${p.title}</span>
                <span class="item-date">${p.date || '2025'}</span>
              </div>
              ${data.cleanStack ? `<div class="project-stack">Stack: ${data.cleanStack}</div>` : ''}
              <div class="item-desc">${data.overview}</div>
              ${
                data.highlights.length > 0
                  ? `
                <ul style="margin-left: 14px; margin-top: 2px; font-size: 8pt; color: #475569;">
                  ${data.highlights.map((h) => `<li>${h}</li>`).join('')}
                </ul>
              `
                  : ''
              }
              <div class="project-links">
                ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank">🔗 Live Demo</a>` : ''}
                ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">📂 Source Code</a>` : ''}
              </div>
            </div>
            `;
            })
            .join('')}
          `
              : ''
          }
        </div>
      </div>
      `;
    } else if (layoutMode === 'modern') {
      // ══════════════════════════════════════════════════════════════
      // LAYOUT 2: MODERN DARK GLASSMORPHIC
      // ══════════════════════════════════════════════════════════════
      printHtmlBody = `
      <style>
        @page { size: A4 portrait; margin: 10mm 12mm; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #07070a; color: #f8fafc; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 9pt; line-height: 1.4; }
        .top-banner { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #8b5cf6; padding-bottom: 12px; margin-bottom: 14px; }
        .photo-box { width: 70px; height: 70px; border-radius: 16px; overflow: hidden; border: 2px solid #8b5cf6; flex-shrink: 0; }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
        .name { font-size: 18pt; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
        .tagline { font-size: 10pt; font-weight: 600; color: #06b6d4; margin-bottom: 4px; }
        .contacts { display: flex; flex-wrap: wrap; gap: 10px; font-size: 8pt; color: #94a3b8; }
        .sec-title { font-size: 9pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; border-bottom: 1px solid #1e1b4b; padding-bottom: 3px; margin-bottom: 8px; margin-top: 14px; }
        .skill-pill { background: #181826; border: 1px solid #3b3b54; color: #e2e8f0; font-size: 7.5pt; font-family: monospace; font-weight: 600; padding: 2px 6px; border-radius: 5px; }
        .dark-card { background: #0f0f18; border: 1px solid #27273a; border-left: 2.5px solid #8b5cf6; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px; page-break-inside: avoid; }
        .title-row { display: flex; justify-content: space-between; align-items: baseline; }
        .item-t { font-size: 9.5pt; font-weight: 700; color: #ffffff; }
        .item-d { font-size: 8pt; font-family: monospace; color: #a78bfa; font-weight: 600; }
        .item-c { font-size: 8.5pt; color: #06b6d4; font-weight: 600; }
        .item-desc { font-size: 8pt; color: #cbd5e1; margin-top: 2px; }
        .stack-line { font-size: 7.5pt; font-family: monospace; color: #38bdf8; font-weight: 600; margin-bottom: 2px; }
        a { color: #38bdf8; text-decoration: none; }
      </style>
      <div>
        <div class="top-banner">
          ${photoUrl ? `<div class="photo-box"><img src="${photoUrl}" alt="${name}" /></div>` : ''}
          <div>
            <div class="name">${name}</div>
            <div class="tagline">${tagline}</div>
            <div class="contacts">
              <span>📧 ${email}</span>
              <span>📱 ${phone}</span>
              <span>📍 ${location}</span>
              <span>🌐 <a href="${portfolioUrl}">${portfolioUrl.replace(/^https?:\/\//, '')}</a></span>
            </div>
          </div>
        </div>

        <div class="sec-title">Executive Summary</div>
        <p style="font-size: 8.5pt; color: #cbd5e1; text-align: justify;">${bio}</p>

        <div class="sec-title">Core Technical Arsenal</div>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          ${skillsList.map((s) => `<span class="skill-pill">${s}</span>`).join('')}
        </div>

        ${
          workMilestones.length > 0
            ? `
        <div class="sec-title">Career Milestones & Experience</div>
        ${workMilestones
          .map(
            (w) => `
          <div class="dark-card">
            <div class="title-row">
              <span class="item-t">${w.title}</span>
              <span class="item-d">${w.year}</span>
            </div>
            ${w.company ? `<div class="item-c">${w.company}</div>` : ''}
            <div class="item-desc">${w.description}</div>
          </div>
        `
          )
          .join('')}
        `
            : ''
        }

        ${
          resumeProjects.length > 0
            ? `
        <div class="sec-title">Featured Software Architecture</div>
        ${resumeProjects
          .map((p) => {
            const data = parseProjectData(p);
            return `
          <div class="dark-card">
            <div class="title-row">
              <span class="item-t">${p.title}</span>
              <span class="item-d">${p.date || '2025'}</span>
            </div>
            ${data.cleanStack ? `<div class="stack-line">Stack: ${data.cleanStack}</div>` : ''}
            <div class="item-desc">${data.overview}</div>
            ${
              data.highlights.length > 0
                ? `
              <ul style="margin-left: 14px; margin-top: 2px; font-size: 8pt; color: #94a3b8;">
                ${data.highlights.map((h) => `<li>${h}</li>`).join('')}
              </ul>
            `
                : ''
            }
            <div style="font-size: 7.5pt; margin-top: 3px; display: flex; gap: 10px;">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank">🔗 Live Demo</a>` : ''}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">📂 Source Code</a>` : ''}
            </div>
          </div>
          `;
          })
          .join('')}
        `
            : ''
        }
      </div>
      `;
    } else {
      // ══════════════════════════════════════════════════════════════
      // LAYOUT 3: MINIMALIST ATS-FRIENDLY PAPER (Monochrome Standard)
      // ══════════════════════════════════════════════════════════════
      printHtmlBody = `
      <style>
        @page { size: A4 portrait; margin: 10mm 12mm; }
        body { font-family: "Times New Roman", Times, serif; background: #ffffff; color: #000000; margin: 0; padding: 0; font-size: 9.5pt; line-height: 1.35; }
        .header { text-align: center; border-bottom: 1.5px solid #000000; padding-bottom: 6px; margin-bottom: 10px; }
        .name { font-size: 18pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
        .tagline { font-size: 9.5pt; font-style: italic; margin-bottom: 4px; }
        .contacts { font-size: 8.5pt; }
        .sec-title { font-size: 10pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 6px; margin-top: 10px; }
        .item { margin-bottom: 8px; page-break-inside: avoid; }
        .item-row { display: flex; justify-content: space-between; font-weight: bold; }
        .stack-row { font-size: 8.5pt; font-family: monospace; margin-top: 1px; margin-bottom: 2px; }
        a { color: #000000; text-decoration: underline; }
      </style>
      <div>
        <div class="header">
          <div class="name">${name}</div>
          <div class="tagline">${tagline}</div>
          <div class="contacts">
            ${email} &bull; ${phone} &bull; ${location} &bull; ${portfolioUrl} &bull; ${github}
          </div>
        </div>

        <div class="sec-title">Professional Summary</div>
        <p style="font-size: 9pt; text-align: justify;">${bio}</p>

        <div class="sec-title">Technical Proficiencies</div>
        <p style="font-size: 8.5pt; font-family: monospace;">${skillsList.join(', ')}</p>

        ${
          workMilestones.length > 0
            ? `
        <div class="sec-title">Professional Experience</div>
        ${workMilestones
          .map(
            (w) => `
          <div class="item">
            <div class="item-row">
              <span>${w.title} ${w.company ? `— ${w.company}` : ''}</span>
              <span>${w.year}</span>
            </div>
            <div style="font-size: 8.5pt; margin-top: 2px;">${w.description}</div>
          </div>
        `
          )
          .join('')}
        `
            : ''
        }

        ${
          resumeProjects.length > 0
            ? `
        <div class="sec-title">Featured Engineering Projects</div>
        ${resumeProjects
          .map((p) => {
            const data = parseProjectData(p);
            return `
          <div class="item">
            <div class="item-row">
              <span>${p.title}</span>
              <span>${p.date || '2025'}</span>
            </div>
            ${data.cleanStack ? `<div class="stack-row"><strong>Technologies:</strong> ${data.cleanStack}</div>` : ''}
            <div style="font-size: 8.5pt;">${data.overview}</div>
            ${
              data.highlights.length > 0
                ? `
              <ul style="margin-left: 16px; margin-top: 2px; font-size: 8.5pt;">
                ${data.highlights.map((h) => `<li>${h}</li>`).join('')}
              </ul>
            `
                : ''
            }
          </div>
          `;
          })
          .join('')}
        `
            : ''
        }

        ${
          educationMilestones.length > 0
            ? `
        <div class="sec-title">Education</div>
        ${educationMilestones
          .map(
            (e) => `
          <div class="item">
            <div class="item-row">
              <span>${e.title} — ${e.company}</span>
              <span>${e.year}</span>
            </div>
          </div>
        `
          )
          .join('')}
        `
            : ''
        }
      </div>
      `;
    }

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${name} - ${layoutMode.toUpperCase()} Resume</title>
</head>
<body>
  ${printHtmlBody}
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
    doc.write(fullHtml);
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
                <span>Download ({layoutMode === 'executive' ? '2-Column' : layoutMode === 'modern' ? 'Modern Dark' : 'ATS Paper'}) PDF</span>
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

                {/* Dynamic Projects with Case Study Layout */}
                {resumeProjects.length > 0 && (
                  <div className="space-y-4 border-t border-theme pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text">Featured Software Case Studies</h3>
                      <span className="text-[10px] font-mono text-tertiary">{resumeProjects.length} Highlighted</span>
                    </div>
                    <div className="space-y-4">
                      {resumeProjects.map((p, idx) => {
                        const data = parseProjectData(p);
                        return (
                          <div key={idx} className="p-4 rounded-2xl glass border border-theme space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-text text-sm">{p.title}</span>
                              <span className="font-mono text-[10px] text-tertiary">{p.date || '2025'}</span>
                            </div>

                            {data.cleanStack && (
                              <p className="text-[11px] font-mono font-semibold text-primary">
                                Stack: {data.cleanStack}
                              </p>
                            )}

                            <p className="text-secondary leading-relaxed">{data.overview}</p>

                            {data.highlights.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-tertiary pl-1 text-[11px]">
                                {data.highlights.map((h, i) => (
                                  <li key={i}>{h}</li>
                                ))}
                              </ul>
                            )}

                            {/* Links */}
                            <div className="flex items-center gap-4 pt-1 text-[11px] font-medium border-t border-theme/50 mt-2">
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
                        );
                      })}
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
                  <div className="space-y-3">
                    {resumeProjects.map((p, idx) => {
                      const data = parseProjectData(p);
                      return (
                        <div key={p._id || idx} className="p-4 rounded-2xl glass border border-theme space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-bold text-sm text-text">{p.title}</h4>
                            <span className="text-xs font-mono text-tertiary">{p.date}</span>
                          </div>
                          {data.cleanStack && (
                            <p className="text-xs font-mono font-semibold text-primary">Stack: {data.cleanStack}</p>
                          )}
                          <p className="text-xs text-secondary leading-relaxed">{data.overview}</p>
                          {data.highlights.length > 0 && (
                            <ul className="list-disc list-inside space-y-0.5 text-tertiary text-xs">
                              {data.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                          <div className="flex items-center gap-3 pt-1 text-xs">
                            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-secondary hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Live Demo</a>}
                            {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-tertiary hover:text-text flex items-center gap-1"><Github className="w-3 h-3" /> Code</a>}
                          </div>
                        </div>
                      );
                    })}
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
                  <div className="space-y-2.5">
                    {resumeProjects.map((p, idx) => {
                      const data = parseProjectData(p);
                      return (
                        <div key={idx} className="text-xs space-y-1 p-3 rounded bg-gray-50 border border-gray-200">
                          <div className="flex justify-between items-baseline font-bold text-black">
                            <span>{p.title}</span>
                            <span className="font-mono text-[10px] text-gray-600">{p.date}</span>
                          </div>
                          {data.cleanStack && (
                            <p className="text-[10px] font-mono text-indigo-700 font-semibold">
                              Stack: {data.cleanStack}
                            </p>
                          )}
                          <p className="text-gray-700 leading-relaxed">{data.overview}</p>
                          {data.highlights.length > 0 && (
                            <ul className="list-disc list-inside text-gray-600 text-[10.5px] space-y-0.5">
                              {data.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
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
