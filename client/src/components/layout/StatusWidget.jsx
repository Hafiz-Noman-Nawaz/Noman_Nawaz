import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Headphones,
  Code2,
  Sparkles,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Zap,
  Volume2,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const StatusWidget = ({ settings, onOpenHireMe }) => {
  const [expanded, setExpanded] = useState(false);
  const {
    soundEnabled,
    toggleSound,
    soundProfile,
    setSoundProfile,
    ambientPlaying,
    toggleAmbient,
    playClick,
  } = useSound();

  const statusText = settings?.statusText || 'Crafting Next-Gen Web Systems';
  const currentActivity = settings?.currentActivity || 'Coding in React 19, Motion & Three.js';
  const musicTrack = settings?.musicTrack || 'Lofi Cyberpunk Coding Beats';
  const isAvailable = settings?.isAvailable !== false;

  const profiles = [
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'acoustic', label: 'Acoustic' },
    { id: 'mechanical', label: 'Mechanical' },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)]">
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
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isAvailable ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
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

              {/* Sound Profile Selector */}
              <div className="space-y-1.5 pt-1 border-t border-theme">
                <span className="text-[10px] uppercase font-bold tracking-wider text-tertiary flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-accent" /> Audio Synthesizer Profile
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playClick();
                        setSoundProfile(p.id);
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        soundProfile === p.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'glass text-secondary hover:text-text'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Action & Hire CTA */}
              <div className="pt-2 border-t border-theme flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready for Contracts
                  </span>

                  <button
                    onClick={toggleAmbient}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 border transition-all ${
                      ambientPlaying
                        ? 'bg-secondary/20 border-secondary text-secondary'
                        : 'glass border-theme text-tertiary'
                    }`}
                  >
                    <Radio className="w-3 h-3" />
                    <span>Space Drone: {ambientPlaying ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    if (onOpenHireMe) onOpenHireMe();
                  }}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-md shadow-primary/25 hover:opacity-90"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Fast-Track Hire Inquiry</span>
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
