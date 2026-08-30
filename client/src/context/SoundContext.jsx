import React, { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext({
  soundEnabled: false,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playWhoosh: () => {},
});

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('noman_portfolio_sound') === 'true';
    } catch {
      return false;
    }
  });

  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('noman_portfolio_sound', soundEnabled);
    } catch {}
  }, [soundEnabled]);

  const initAudio = () => {
    try {
      if (typeof window === 'undefined') return null;
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioClass) return null;
        const ctx = new AudioClass();
        setAudioCtx(ctx);
        return ctx;
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    } catch {
      return null;
    }
  };

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}
  };

  const playWhoosh = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => playClick(), 50);
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick, playHover, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  return context || {
    soundEnabled: false,
    toggleSound: () => {},
    playClick: () => {},
    playHover: () => {},
    playWhoosh: () => {},
  };
};
