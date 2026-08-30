import { useRef, useCallback } from 'react';

/**
 * High-Performance 60FPS 3D Tilt Hook using direct DOM transforms & RAF
 * Zero React re-renders during mouse movement!
 */
export const useTilt = (maxTilt = 12, perspective = 1000, scale = 1.02) => {
  const cardRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateX = (((mouseY / height) * 2 - 1) * -maxTilt).toFixed(2);
      const rotateY = (((mouseX / width) * 2 - 1) * maxTilt).toFixed(2);

      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      cardRef.current.style.transition = 'transform 0.08s ease-out';
    });
  }, [maxTilt, perspective, scale]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
  }, [perspective]);

  return {
    ref: cardRef,
    style: {
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      willChange: 'transform',
    },
    glare: { x: 50, y: 50, opacity: 0.1 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

export default useTilt;
