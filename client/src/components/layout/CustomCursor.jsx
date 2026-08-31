import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export const CustomCursor = () => {
  const { theme } = useTheme();
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  // Motion values for ultra-smooth fluid spring trailing
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner snappy pointer dot
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 600, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 600, mass: 0.1 });

  // Outer smooth trailing aura ring
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 220, mass: 0.3 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 220, mass: 0.3 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const onMove = (e) => {
      if (!e) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      if (!target || !target.tagName) {
        setHovering(false);
        return;
      }

      const tagName = target.tagName.toUpperCase();
      const isClickable =
        tagName === 'BUTTON' ||
        tagName === 'A' ||
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer') ||
        (target.closest && (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer'))) ||
        (target.getAttribute && target.getAttribute('role') === 'button');

      setHovering(!!isClickable);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, mouseX, mouseY]);

  if (!visible) return null;

  // Theme-specific styles & color schemes
  const getThemeCursorConfig = () => {
    if (theme === 'light') {
      return {
        dotBg: 'bg-indigo-600',
        ringBorder: hovering ? 'border-teal-500 shadow-teal-500/30' : 'border-indigo-600/40',
        ringBg: hovering ? 'bg-indigo-500/10' : 'bg-transparent',
        glowAura: 'shadow-lg shadow-indigo-500/20',
      };
    }
    if (theme === 'contrast') {
      return {
        dotBg: 'bg-[#00ff66] shadow-[0_0_8px_#00ff66]',
        ringBorder: hovering ? 'border-[#facc15] shadow-[0_0_15px_#facc15]' : 'border-[#00ff66]/70 shadow-[0_0_10px_#00ff66]/40',
        ringBg: hovering ? 'bg-[#00ff66]/15' : 'bg-transparent',
        glowAura: 'shadow-[0_0_20px_#00ff66]',
      };
    }
    // Default Dark Theme (Cyberpunk Violet & Cyan Glow)
    return {
      dotBg: 'bg-gradient-to-tr from-primary to-secondary shadow-md shadow-primary/50',
      ringBorder: hovering ? 'border-accent shadow-accent/40' : 'border-primary/50 shadow-primary/20',
      ringBg: hovering ? 'bg-primary/10 backdrop-blur-[1px]' : 'bg-transparent',
      glowAura: 'shadow-xl shadow-primary/25',
    };
  };

  const config = getThemeCursorConfig();

  return (
    <>
      {/* Outer Smooth Trailing Magnetic Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 transition-colors duration-300 flex items-center justify-center ${
          hovering ? 'w-10 h-10' : 'w-8 h-8'
        } ${config.ringBorder} ${config.ringBg} ${config.glowAura}`}
      >
        {/* Subtle decorative crosshair dots in High-Contrast theme */}
        {theme === 'contrast' && hovering && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
        )}
      </motion.div>

      {/* Inner Precision Pointer Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 1.25 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500 }}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-colors duration-200 ${
          hovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
        } ${config.dotBg}`}
      />
    </>
  );
};

export default CustomCursor;
