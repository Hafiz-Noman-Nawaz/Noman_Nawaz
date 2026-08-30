import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Command,
  Sun,
  Moon,
  Zap,
  FolderGit2,
  Mail,
  Phone,
  FileText,
  Shield,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';

export const CommandPalette = ({ isOpen, onClose, onOpenResume, onOpenTerminal, projects = [], settings }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const { theme, setTheme } = useTheme();
  const { playClick, playWhoosh } = useSound();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      playWhoosh();
    }
  }, [isOpen]);

  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';

  const actions = [
    {
      category: 'Navigation',
      id: 'nav-hero',
      label: 'Go to Hero & About',
      icon: Sparkles,
      perform: () => {
        window.location.hash = '#hero';
        onClose();
      },
    },
    {
      category: 'Navigation',
      id: 'nav-skills',
      label: 'Go to Skills Wheel',
      icon: Zap,
      perform: () => {
        window.location.hash = '#skills';
        onClose();
      },
    },
    {
      category: 'Navigation',
      id: 'nav-projects',
      label: 'Go to Projects Gallery',
      icon: FolderGit2,
      perform: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      category: 'Navigation',
      id: 'nav-testimonials',
      label: 'Go to Testimonials & Endorsements',
      icon: Sparkles,
      perform: () => {
        window.location.hash = '#testimonials';
        onClose();
      },
    },
    {
      category: 'Navigation',
      id: 'nav-contact',
      label: 'Go to Contact',
      icon: Mail,
      perform: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },
    {
      category: 'Theme',
      id: 'theme-dark',
      label: 'Switch to Dark Mode',
      icon: Moon,
      perform: () => {
        setTheme('dark');
        onClose();
      },
    },
    {
      category: 'Theme',
      id: 'theme-light',
      label: 'Switch to Light Mode',
      icon: Sun,
      perform: () => {
        setTheme('light');
        onClose();
      },
    },
    {
      category: 'Theme',
      id: 'theme-contrast',
      label: 'Switch to High-Contrast Mode',
      icon: Zap,
      perform: () => {
        setTheme('contrast');
        onClose();
      },
    },
    {
      category: 'Actions',
      id: 'act-resume',
      label: 'View / Download Resume (CV)',
      icon: FileText,
      perform: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      category: 'Actions',
      id: 'act-terminal',
      label: 'Open Interactive CLI Terminal (~)',
      icon: Command,
      perform: () => {
        onClose();
        if (onOpenTerminal) onOpenTerminal();
      },
    },
    {
      category: 'Actions',
      id: 'act-copy-email',
      label: `Copy Email (${email})`,
      icon: Mail,
      perform: () => {
        navigator.clipboard.writeText(email);
        setCopiedText('Email copied!');
        setTimeout(() => setCopiedText(''), 2000);
      },
    },
    {
      category: 'Actions',
      id: 'act-copy-phone',
      label: `Copy Phone (${phone})`,
      icon: Phone,
      perform: () => {
        navigator.clipboard.writeText(phone);
        setCopiedText('Phone copied!');
        setTimeout(() => setCopiedText(''), 2000);
      },
    },
    {
      category: 'Admin',
      id: 'adm-portal',
      label: 'Open Admin CMS Panel',
      icon: Shield,
      perform: () => {
        window.location.href = '/admin';
        onClose();
      },
    },
    ...projects.map((p) => ({
      category: 'Projects',
      id: `proj-${p._id}`,
      label: `Open: ${p.title}`,
      icon: FolderGit2,
      perform: () => {
        window.location.hash = '#projects';
        onClose();
      },
    })),
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          playClick();
          filtered[selectedIndex].perform();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/80 backdrop-blur-md z-40"
        />

        {/* Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-50 w-full max-w-xl rounded-3xl glass bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-theme bg-surface/60">
            <Search className="w-5 h-5 text-primary" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command, search projects, switch themes..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-transparent text-sm sm:text-base text-text placeholder:text-tertiary focus:outline-none"
            />
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-lg text-[10px] font-mono bg-bg text-tertiary border border-theme">
              ESC
            </span>
          </div>

          {copiedText && (
            <div className="px-5 py-2 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{copiedText}</span>
            </div>
          )}

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClick();
                      item.perform();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'text-secondary hover:text-text hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'text-tertiary'
                      }`}
                    >
                      {item.category}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center text-xs text-secondary">
                No matching actions found for "{query}"
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-5 py-3 border-t border-theme bg-surface/40 flex items-center justify-between text-[11px] text-tertiary">
            <div className="flex items-center gap-3">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
            </div>
            <span>Press Cmd+K anytime</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
