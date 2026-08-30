import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Zap, Menu, X, Search, Volume2, VolumeX, FileText, Shield, ArrowUpRight, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = ({ onOpenCommand, onOpenResume, onOpenTerminal }) => {
  const { theme, cycleTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#timeline' },
    { name: 'Certifications', href: '#certificates' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'glass bg-bg-secondary/90 shadow-2xl border-theme-glow backdrop-blur-xl'
              : 'glass bg-surface/60 border-theme'
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
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={playClick}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-secondary hover:text-text hover:bg-surface transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Action Center: Quick Search, Sound, Theme, Terminal, Mobile toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Quick Search */}
            <button
              onClick={() => {
                playClick();
                if (onOpenCommand) onOpenCommand();
              }}
              title="Open Command Palette (Cmd + K)"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-semibold text-secondary hover:text-text transition-all"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="hidden lg:inline-block text-[11px]">Search</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono bg-bg text-tertiary border border-theme">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClick();
                if (onOpenResume) onOpenResume();
              }}
              title="View / Download Resume"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-semibold text-text hover:text-primary transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-secondary" />
              <span>Resume</span>
            </button>

            {/* Terminal Trigger */}
            <button
              onClick={() => {
                playClick();
                if (onOpenTerminal) onOpenTerminal();
              }}
              title="Open Interactive Terminal (~ / Backtick)"
              className="p-1.5 sm:p-2 rounded-full glass hover:border-theme-glow text-secondary hover:text-primary transition-all hidden sm:inline-flex"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Sound FX Audio Toggle */}
            <button
              onClick={() => {
                toggleSound();
              }}
              title={`UI Sound Effects: ${soundEnabled ? 'Enabled' : 'Muted'}`}
              className={`p-1.5 sm:p-2 rounded-full glass hover:border-theme-glow transition-all ${
                soundEnabled ? 'text-primary' : 'text-tertiary opacity-70'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playClick();
                cycleTheme();
              }}
              title="Switch Theme (Dark / Light / High-Contrast)"
              className="p-1.5 sm:p-2 rounded-full glass hover:border-theme-glow transition-all"
            >
              {getThemeIcon()}
            </button>

            {/* CMS Portal Shortcut */}
            <Link
              to="/admin"
              onClick={playClick}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary text-xs font-bold transition-all"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>

            {/* Mobile Menu Button */}
            {isHomePage && (
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="md:hidden p-1.5 rounded-xl text-text hover:bg-surface transition-colors"
                aria-label="Toggle menu"
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
            className="md:hidden mx-4 mt-2 p-5 rounded-3xl glass border-theme-glow bg-bg-secondary/95 shadow-2xl space-y-3"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-secondary hover:text-text hover:bg-surface transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-theme grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                className="px-3 py-2 rounded-xl glass hover:bg-surface text-xs font-bold text-text flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTerminal) onOpenTerminal();
                }}
                className="px-3 py-2 rounded-xl glass hover:bg-surface text-xs font-bold text-text flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-secondary" />
                <span>CLI Terminal</span>
              </button>
            </div>

            <div className="pt-2">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-primary/15 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin CMS Panel</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
