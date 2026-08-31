import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext({
  soundEnabled: false,
  soundProfile: 'cyberpunk', // 'cyberpunk', 'acoustic', 'mechanical'
  ambientPlaying: false,
  volume: 0.5,
  toggleSound: () => {},
  setSoundProfile: () => {},
  toggleAmbient: () => {},
  setVolume: () => {},
  playClick: () => {},
  playHover: () => {},
  playWhoosh: () => {},
  playSuccess: () => {},
  playChime: () => {},
});

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('noman_portfolio_sound') === 'true';
    } catch {
      return false;
    }
  });

  const [soundProfile, setSoundProfileState] = useState(() => {
    try {
      return localStorage.getItem('noman_sound_profile') || 'cyberpunk';
    } catch {
      return 'cyberpunk';
    }
  });

  const [volume, setVolumeState] = useState(0.5);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const ambientNodesRef = useRef(null);
  const stopTimerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('noman_portfolio_sound', soundEnabled);
    } catch {}
  }, [soundEnabled]);

  const setSoundProfile = (profile) => {
    setSoundProfileState(profile);
    try {
      localStorage.setItem('noman_sound_profile', profile);
    } catch {}
  };

  const setVolume = (val) => {
    setVolumeState(val);
  };

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

  // Motion-Driven Mouse Move Ambient Controller
  useEffect(() => {
    if (!ambientPlaying) return;

    const onMouseMove = () => {
      const ctx = audioCtx;
      if (!ctx || !ambientNodesRef.current) return;

      const { gain } = ambientNodesRef.current;
      const targetGain = 0.016 * volume;

      // Smoothly fade in when mouse moves
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.08);

      // Debounce fade-out when mouse stops moving
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(() => {
        if (ambientNodesRef.current && ctx) {
          ambientNodesRef.current.gain.gain.linearRampToValueAtTime(0.00001, ctx.currentTime + 0.35);
        }
      }, 200);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, [ambientPlaying, audioCtx, volume]);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (soundProfile === 'mechanical') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.025);
        gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.025);
      } else if (soundProfile === 'acoustic') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.06 * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(820, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.07 * volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch (e) {}
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      // When hovering over interactive elements, swell the ambient hum slightly
      if (ambientPlaying && ambientNodesRef.current) {
        const { gain, osc1 } = ambientNodesRef.current;
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.028 * volume, ctx.currentTime + 0.06);
        osc1.frequency.linearRampToValueAtTime(118, ctx.currentTime + 0.06);

        setTimeout(() => {
          if (ambientNodesRef.current && ctx) {
            ambientNodesRef.current.gain.gain.linearRampToValueAtTime(0.016 * volume, ctx.currentTime + 0.2);
            ambientNodesRef.current.osc1.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.2);
          }
        }, 120);
      }

      // Discrete hover tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      gain.gain.setValueAtTime(0.03 * volume, ctx.currentTime);
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const playSuccess = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.05 * volume, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.2);
      });
    } catch (e) {}
  };

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = initAudio();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  const toggleAmbient = () => {
    const ctx = initAudio();
    if (!ctx) return;

    if (ambientPlaying) {
      if (ambientNodesRef.current) {
        ambientNodesRef.current.gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        setTimeout(() => {
          if (ambientNodesRef.current) {
            try {
              ambientNodesRef.current.osc1.stop();
              ambientNodesRef.current.osc2.stop();
            } catch (e) {}
            ambientNodesRef.current = null;
          }
        }, 300);
      }
      setAmbientPlaying(false);
    } else {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 fundamental

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3 warm harmonic

      // Starts silent and responds to mouse movement
      gain.gain.setValueAtTime(0.00001, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ambientNodesRef.current = { osc1, osc2, gain };
      setAmbientPlaying(true);
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!next && ambientPlaying) {
      toggleAmbient();
    }
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        soundProfile,
        ambientPlaying,
        volume,
        toggleSound,
        setSoundProfile,
        toggleAmbient,
        setVolume,
        playClick,
        playHover,
        playWhoosh,
        playSuccess,
        playChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
export default SoundContext;
