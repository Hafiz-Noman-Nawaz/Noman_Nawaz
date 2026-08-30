import React, { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import InteractiveBackground from '../components/layout/InteractiveBackground';
import HeroSection from '../components/hero/HeroSection';
import SkillsWheel from '../components/skills/SkillsWheel';
import PhysicsSandbox from '../components/skills/PhysicsSandbox';
import ProjectsGallery from '../components/projects/ProjectsGallery';
import TimelineSection from '../components/timeline/TimelineSection';
import CertificatesSection from '../components/certificates/CertificatesSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import ContactSection from '../components/contact/ContactSection';
import Footer from '../components/layout/Footer';
import StatusWidget from '../components/layout/StatusWidget';
import { getHero, getProjects, getSettings, getTestimonials, getTimeline, getCertificates } from '../services/api';

// Lazy load modals for maximum initial load performance & minimal bundle weight
const CommandPalette = lazy(() => import('../components/layout/CommandPalette'));
const ResumeModal = lazy(() => import('../components/layout/ResumeModal'));
const InteractiveTerminal = lazy(() => import('../components/layout/InteractiveTerminal'));

export const Home = () => {
  const [heroData, setHeroData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // Modals state
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [heroRes, projectsRes, settingsRes, testimonialsRes, timelineRes, certsRes] = await Promise.allSettled([
          getHero(),
          getProjects(),
          getSettings(),
          getTestimonials(),
          getTimeline(),
          getCertificates(),
        ]);

        if (heroRes.status === 'fulfilled' && heroRes.value.data.success) {
          setHeroData(heroRes.value.data.data);
        }
        if (projectsRes.status === 'fulfilled' && projectsRes.value.data.success) {
          setProjects(projectsRes.value.data.data);
        }
        if (settingsRes.status === 'fulfilled' && settingsRes.value.data.success) {
          setSettings(settingsRes.value.data.data);
        }
        if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value.data.success) {
          setTestimonials(testimonialsRes.value.data.data);
        }
        if (timelineRes.status === 'fulfilled' && timelineRes.value.data.success) {
          setTimeline(timelineRes.value.data.data);
        }
        if (certsRes.status === 'fulfilled' && certsRes.value.data.success) {
          setCertificates(certsRes.value.data.data);
        }
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      }
    };

    fetchPortfolioData();
  }, []);

  // Global keyboard shortcuts: Cmd+K for Command Palette, ` (backtick) for Terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-400 relative selection:bg-primary/40 selection:text-white">
      {/* 3D Interactive Particle Background */}
      <InteractiveBackground />

      {/* Navigation Header */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        <HeroSection heroData={heroData} />
        <SkillsWheel skills={settings?.skills || []} />
        <PhysicsSandbox skills={settings?.skills || []} />
        <ProjectsGallery projects={projects} />
        <TimelineSection milestones={timeline} />
        <CertificatesSection certificates={certificates} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Live Status Dynamic Island Widget */}
      <StatusWidget settings={settings} />

      {/* Lazy Loaded Modals */}
      <Suspense fallback={null}>
        {isCommandOpen && (
          <CommandPalette
            isOpen={isCommandOpen}
            onClose={() => setIsCommandOpen(false)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            projects={projects}
            settings={settings}
          />
        )}

        {isTerminalOpen && (
          <InteractiveTerminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            skills={settings?.skills || []}
            projects={projects}
            settings={settings}
          />
        )}

        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            settings={settings}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Home;
