import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Headphones, Code2, Sparkles, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const StatusWidget = ({ settings }) => {
  const [expanded, setExpanded] = useState(false);
  const { soundEnabled, toggleSound, playClick } = useSound();

  const statusText = settings?.statusText || 'Crafting Next-Gen Web Systems';
  const currentActivity = settings?.currentActivity || 'Coding in React 19, Motion & Three.js';
  const musicTrack = settings?.musicTrack || 'Lofi Cyberpunk Coding Beats';
  const isAvailable = settings?.isAvailable !== false;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        layout
        className="glass border-2 border-theme-glow shadow-2xl rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300"
      >
        {/* Collapsed Pill */}
        <div
          onClick={() => {
            playClick();
            setExpanded(!expanded);
          }}
          className="flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none hover:bg-surface-hover transition-colors"
        >
          {/* Pulsing Status Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isAvailable ? 'bg-emerald-400' : 'bg-amber-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
            }`} />
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text truncate max-w-[150px] sm:max-w-[200px]">
              {statusText}
            </span>

            {/* Equalizer animation */}
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-1 bg-primary rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-1 bg-secondary rounded-full animate-bounce [animation-delay:150ms] h-2/3" />
              <span className="w-1 bg-accent rounded-full animate-bounce [animation-delay:300ms] h-4/5" />
            </div>
          </div>

          <button className="text-secondary hover:text-text ml-1">
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Details Tray */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pb-5 pt-2 border-t border-theme space-y-3.5 text-xs w-72 sm:w-80"
            >
              {/* Activity */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-tertiary flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-primary" /> Current Focus
                </span>
                <p className="font-semibold text-text">{currentActivity}</p>
              </div>

              {/* Music */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-tertiary flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-secondary" /> Soundtrack Vibe
                </span>
                <p className="font-semibold text-secondary">{musicTrack}</p>
              </div>

              {/* Status Action */}
              <div className="pt-2 border-t border-theme flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready for Contracts
                </span>

                <button
                  onClick={toggleSound}
                  className="px-3 py-1 rounded-xl glass hover:bg-surface text-[10px] font-bold text-text"
                >
                  Sound FX: {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default StatusWidget;
