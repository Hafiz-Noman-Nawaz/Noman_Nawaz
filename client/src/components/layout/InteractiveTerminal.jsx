import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Minimize2, Maximize2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';

export const InteractiveTerminal = ({ isOpen, onClose, skills = [], projects = [], settings }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '⚡ Welcome to Noman Nawaz Interactive CLI v2.5.0', type: 'system' },
    { text: 'Type "help" to view all available commands or "hire" to initiate collaboration.', type: 'info' },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { setTheme } = useTheme();
  const { playClick, playWhoosh } = useSound();

  useEffect(() => {
    if (isOpen) {
      playWhoosh();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setCommandList((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const args = raw.split(' ');
    const cmd = args[0].toLowerCase();
    const subArg = args[1]?.toLowerCase();

    const newEntries = [{ text: `noman@portfolio:~$ ${raw}`, type: 'prompt' }];

    switch (cmd) {
      case 'help':
        newEntries.push(
          { text: 'Available commands:', type: 'system' },
          { text: '  skills       - Print core technical proficiencies from CMS', type: 'text' },
          { text: '  projects     - List showcase projects and case studies', type: 'text' },
          { text: '  about        - View developer biography and background', type: 'text' },
          { text: '  contact      - Display direct contact coordinates', type: 'text' },
          { text: '  hire         - Trigger project collaboration inquiry', type: 'text' },
          { text: '  theme <mode> - Switch theme: "theme dark", "theme light", "theme contrast"', type: 'text' },
          { text: '  clear        - Clear the terminal screen', type: 'text' },
          { text: '  sudo         - Execute command with root privileges', type: 'text' },
          { text: '  exit         - Close the terminal window', type: 'text' }
        );
        break;

      case 'skills':
        newEntries.push(
          { text: '🚀 Technical Arsenal (Synced with CMS):', type: 'system' },
          { text: skills.join(' • '), type: 'accent' }
        );
        break;

      case 'projects':
        newEntries.push({ text: '📁 Featured Projects (Synced with CMS):', type: 'system' });
        projects.forEach((p, idx) => {
          newEntries.push({
            text: `  [${idx + 1}] ${p.title} (${p.date}) — ${p.description}`,
            type: 'text',
          });
        });
        break;

      case 'about':
        newEntries.push(
          { text: '👤 About Noman Nawaz:', type: 'system' },
          { text: settings?.bio || 'Full-Stack MERN Developer & UI/UX Motion Designer focused on building dynamic, high-performance web applications and fluid interactive animations.', type: 'text' }
        );
        break;

      case 'contact':
        newEntries.push(
          { text: '📫 Direct Coordinates:', type: 'system' },
          { text: `  Email:    ${settings?.email || 'nawaznoman7766@gmail.com'}`, type: 'text' },
          { text: `  Phone:    ${settings?.phone || '+92 300 1234567'}`, type: 'text' },
          { text: `  Location: ${settings?.location || 'Pakistan (Remote Available)'}`, type: 'text' }
        );
        break;

      case 'hire':
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        newEntries.push(
          { text: '🎉 Thank you! Redirecting to contact inquiry section...', type: 'accent' }
        );
        setTimeout(() => {
          window.location.hash = '#contact';
          onClose();
        }, 1200);
        break;

      case 'theme':
        if (['dark', 'light', 'contrast'].includes(subArg)) {
          setTheme(subArg);
          newEntries.push({ text: `🎨 Theme switched to "${subArg}" mode!`, type: 'accent' });
        } else {
          newEntries.push({ text: 'Usage: theme dark | theme light | theme contrast', type: 'error' });
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        newEntries.push({
          text: '🔒 Nice try! root privileges reserved for Noman Nawaz.',
          type: 'error',
        });
        break;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newEntries.push({
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`,
          type: 'error',
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandList.length) {
          setHistoryIndex(nextIdx);
          setInput(commandList[commandList.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandList[commandList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const possible = ['help', 'skills', 'projects', 'about', 'contact', 'hire', 'theme dark', 'theme light', 'theme contrast', 'clear'];
      const match = possible.find((p) => p.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-md z-40"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-50 w-full max-w-3xl h-[520px] rounded-3xl bg-[#090a0f] border-2 border-primary/50 shadow-2xl overflow-hidden flex flex-col font-mono text-xs sm:text-sm"
        >
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#12131a] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs text-white/70 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                noman@portfolio:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/50 text-[11px]">
              <span>Type "help"</span>
              <button onClick={onClose} className="p-1 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex-grow overflow-y-auto p-5 space-y-2 text-white/90">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={`leading-relaxed ${
                  line.type === 'system'
                    ? 'text-primary font-bold'
                    : line.type === 'prompt'
                    ? 'text-cyan-400 font-bold'
                    : line.type === 'accent'
                    ? 'text-emerald-400 font-bold'
                    : line.type === 'error'
                    ? 'text-rose-400'
                    : 'text-white/80'
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0e0f17] border-t border-white/10">
            <span className="text-cyan-400 font-bold whitespace-nowrap">noman@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent text-white focus:outline-none caret-primary font-mono text-xs sm:text-sm"
              placeholder="type command (e.g. skills, projects, hire)..."
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InteractiveTerminal;
