import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Zap,
  Menu,
  X,
  Search,
  Volume2,
  VolumeX,
  FileText,
  Shield,
  ArrowUpRight,
  Terminal,
  Globe,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ onOpenCommand, onOpenResume, onOpenTerminal, onOpenHireMe }) => {
  const { theme, cycleTheme } = useTheme();
  const { soundEnabled, toggleSound, ambientPlaying, toggleAmbient, playClick } = useSound();
  const { lang, changeLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.work, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.experience, href: '#timeline' },
    { name: t.nav.certifications, href: '#certificates' },
    { name: t.nav.testimonials, href: '#testimonials' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    if (theme === 'contrast') return <Zap className="w-4 h-4 text-[#00ff66]" />;
    return <Moon className="w-4 h-4 text-primary" />;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-3 rounded-full transition-all duration-300 w-full ${
            scrolled
              ? 'glass bg-bg-secondary/95 shadow-2xl border-theme-glow backdrop-blur-xl'
              : 'glass bg-surface/80 border-theme backdrop-blur-lg'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={playClick}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <span className="text-base sm:text-lg font-display font-black tracking-tight text-text">
              noman<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {isHomePage && (
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={playClick}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-secondary hover:text-text hover:bg-surface transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Desktop Action Center */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {/* Quick Search */}
            <button
              onClick={() => {
                playClick();
                if (onOpenCommand) onOpenCommand();
              }}
              title="Open Command Palette (Cmd + K)"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-semibold text-secondary hover:text-text transition-all"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px]">⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClick();
                if (onOpenResume) onOpenResume();
              }}
              title="View / Download Resume"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-semibold text-text hover:text-primary transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-secondary" />
              <span>{t.nav.resume}</span>
            </button>

            {/* Terminal Trigger */}
            <button
              onClick={() => {
                playClick();
                if (onOpenTerminal) onOpenTerminal();
              }}
              title="Open Interactive Terminal (~)"
              className="p-2 rounded-full glass hover:border-theme-glow text-secondary hover:text-primary transition-all"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Ambient Drone Sound Toggle */}
            <button
              onClick={() => {
                playClick();
                toggleAmbient();
              }}
              title={`Cosmic Ambient Sound: ${ambientPlaying ? 'ON' : 'OFF'}`}
              className={`p-2 rounded-full glass hover:border-theme-glow transition-all ${
                ambientPlaying ? 'text-secondary bg-secondary/15 animate-pulse' : 'text-tertiary opacity-70'
              }`}
            >
              <Radio className="w-4 h-4" />
            </button>

            {/* UI Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              title={`UI Sound FX: ${soundEnabled ? 'Enabled' : 'Muted'}`}
              className={`p-2 rounded-full glass hover:border-theme-glow transition-all ${
                soundEnabled ? 'text-primary' : 'text-tertiary opacity-70'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
            </button>

            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  playClick();
                  setLangMenuOpen(!langMenuOpen);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-bold text-text uppercase font-mono"
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{lang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-2xl glass bg-bg-secondary/95 border-2 border-theme-glow p-1.5 shadow-2xl space-y-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        playClick();
                        changeLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        lang === l.code
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-secondary hover:bg-surface hover:text-text'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playClick();
                cycleTheme();
              }}
              title="Switch Theme"
              className="p-2 rounded-full glass hover:border-theme-glow transition-all"
            >
              {getThemeIcon()}
            </button>

            {/* ⚡ Hire Me CTA Button */}
            <button
              onClick={() => {
                playClick();
                if (onOpenHireMe) onOpenHireMe();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white text-xs font-bold shadow-md shadow-primary/25 transition-all hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{t.nav.hireMe}</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Lang Button */}
            <button
              onClick={() => {
                playClick();
                const nextLang = lang === 'en' ? 'ur' : lang === 'ur' ? 'de' : lang === 'de' ? 'es' : 'en';
                changeLanguage(nextLang);
              }}
              className="p-2 rounded-xl glass text-xs font-mono font-bold text-text uppercase"
            >
              {lang}
            </button>

            <button
              onClick={() => {
                playClick();
                cycleTheme();
              }}
              aria-label="Switch Theme"
              className="p-2 rounded-xl glass text-text hover:bg-surface transition-colors"
            >
              {getThemeIcon()}
            </button>

            {isHomePage && (
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-xl text-text glass hover:bg-surface transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-3 mt-2 p-5 rounded-3xl glass border-2 border-theme-glow bg-bg-secondary/98 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Quick Hire CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenHireMe) onOpenHireMe();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>⚡ Fast-Track Hire Inquiry</span>
            </button>

            {/* Quick Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-theme">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCommand) onOpenCommand();
                }}
                className="p-2.5 rounded-2xl glass hover:bg-surface text-xs font-bold text-text flex items-center justify-center gap-2 border border-theme"
              >
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Search (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                className="p-2.5 rounded-2xl glass hover:bg-surface text-xs font-bold text-text flex items-center justify-center gap-2 border border-theme"
              >
                <FileText className="w-3.5 h-3.5 text-secondary" />
                <span>View CV</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-2xl text-sm font-bold text-secondary hover:text-text hover:bg-surface transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </div>

            {/* Terminal & Audio & CMS */}
            <div className="pt-3 border-t border-theme space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTerminal) onOpenTerminal();
                  }}
                  className="p-2.5 rounded-2xl glass hover:bg-surface text-xs font-bold text-text flex items-center justify-center gap-2 border border-theme"
                >
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  <span>CLI Terminal</span>
                </button>

                <button
                  onClick={toggleAmbient}
                  className={`p-2.5 rounded-2xl glass hover:bg-surface text-xs font-bold flex items-center justify-center gap-2 border border-theme ${
                    ambientPlaying ? 'text-secondary border-secondary' : 'text-text'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Space Synth: {ambientPlaying ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-primary/15 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin CMS Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
