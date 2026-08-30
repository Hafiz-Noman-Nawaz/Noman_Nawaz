import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Page visibility check to pause RAF when tab is in background
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Mouse coordinates with easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 160,
    };

    let mouseMoved = false;
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouseMoved = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Theme color palette
    const getColors = () => {
      if (theme === 'light') {
        return {
          particle: 'rgba(99, 102, 241, 0.4)',
          particleHighlight: 'rgba(13, 148, 136, 0.65)',
          line: 'rgba(99, 102, 241, 0.08)',
        };
      }
      if (theme === 'contrast') {
        return {
          particle: 'rgba(0, 255, 102, 0.6)',
          particleHighlight: 'rgba(250, 204, 21, 0.8)',
          line: 'rgba(0, 255, 102, 0.18)',
        };
      }
      // Dark theme default
      return {
        particle: 'rgba(139, 92, 246, 0.45)',
        particleHighlight: 'rgba(6, 182, 212, 0.7)',
        line: 'rgba(139, 92, 246, 0.12)',
      };
    };

    // Optimized particle count (capped at 42 max for smooth 60fps)
    const particleCount = Math.min(Math.floor((width * height) / 25000), 42);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1,
      });
    }

    // High performance animation loop (Zero shadowBlur, lightweight line drawing)
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (mouseMoved) {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      }

      ctx.clearRect(0, 0, width, height);
      const colors = getColors();

      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = mouse.radius * mouse.radius;

        const isNear = distSq < radiusSq;
        if (isNear) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouse.radius) * 4;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw Particle Node (Pure canvas arc without expensive shadow convolution)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? colors.particleHighlight : colors.particle;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const distX = p.x - p2.x;
          const distY = p.y - p2.y;
          const dSq = distX * distX + distY * distY;
          const maxConnectSq = 130 * 130;

          if (dSq < maxConnectSq) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};

export default InteractiveBackground;
