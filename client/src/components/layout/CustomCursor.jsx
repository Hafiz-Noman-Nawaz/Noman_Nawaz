import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      if (!e) return;
      setPos({ x: e.clientX, y: e.clientY });
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
        (target.closest && (target.closest('button') || target.closest('a'))) ||
        (target.getAttribute && target.getAttribute('role') === 'button');

      setHovering(!!isClickable);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[999] mix-blend-difference bg-white"
      animate={{
        x: pos.x - (hovering ? 20 : 4),
        y: pos.y - (hovering ? 20 : 4),
        width: hovering ? 40 : 8,
        height: hovering ? 40 : 8,
        opacity: hovering ? 0.6 : 0.8,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.15 }}
    />
  );
};

export default CustomCursor;
