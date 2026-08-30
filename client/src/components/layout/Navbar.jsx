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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-4 h-4 text-purple-400" />;
    if (theme === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    return <Zap className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'glass shadow-xl border-theme-glow/40 backdrop-blur-xl'
              : 'bg-surface/40 backdrop-blur-md border border-theme'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={playClick}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-secondary to-accent p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-primary/20">
              <div className="w-full h-full bg-bg rounded-[10px] flex items-center justify-center font-display font-black text-text text-sm">
                NN
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-tight hidden sm:inline-block">
              Noman<span className="text-primary">.</span>Nawaz
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {isHomePage && (
            <div className="hidden md:flex items-center gap-1 bg-bg/60 px-4 py-1.5 rounded-full border border-theme">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={playClick}
                  className="px-3.5 py-1 text-xs font-semibold text-secondary hover:text-text hover:bg-surface rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Action Center: Cmd+K, Sound, Theme, Resume, Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playClick();
                if (onOpenCommand) onOpenCommand();
              }}
              title="Open Command Palette (Cmd + K / Ctrl + K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:border-theme-glow text-xs font-semibold text-secondary hover:text-text transition-all"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span className="hidden lg:inline-block">Quick Search</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-bg text-tertiary border border-theme">
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
              className="p-2 rounded-full glass hover:border-theme-glow text-secondary hover:text-primary transition-all hidden sm:inline-flex"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Sound FX Audio Toggle */}
            <button
              onClick={() => {
                toggleSound();
              }}
              title={`UI Sound Effects: ${soundEnabled ? 'Enabled' : 'Muted'}`}
              className={`p-2 rounded-full glass hover:border-theme-glow transition-all ${
                soundEnabled ? 'text-primary' : 'text-tertiary'
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
              className="p-2 rounded-full glass hover:border-theme-glow transition-all"
            >
              {getThemeIcon()}
            </button>

            {/* CMS Portal Shortcut */}
            <Link
              to="/admin"
              onClick={playClick}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary text-xs font-bold transition-all hover:scale-105"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>CMS</span>
            </Link>

            {/* Mobile Menu Button */}
            {isHomePage && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-text hover:bg-surface transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-6 mt-2 p-4 rounded-3xl glass border-theme-glow bg-bg-secondary/95 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
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
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-primary hover:bg-surface text-left flex items-center justify-between"
              >
                <span>View Resume</span>
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
