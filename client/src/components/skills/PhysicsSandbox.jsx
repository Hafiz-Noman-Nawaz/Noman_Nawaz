import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Move, Play, Pause, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import { useLanguage } from '../../context/LanguageContext';

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

export const PhysicsSandbox = ({ skills = [] }) => {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const { playClick, playHover } = useSound();
  const [gravityActive, setGravityActive] = useState(true);

  // Fallback skills if none provided
  const fallback = [
    'React 19', 'Node.js', 'Express', 'MongoDB', 'TypeScript',
    'Tailwind', 'Next.js', 'PostgreSQL', 'Redis', 'GraphQL',
    'Docker', 'AWS Cloud', 'Prisma', 'Vite', 'REST APIs',
    'Motion', 'GSAP', 'Figma', 'Git', 'CI/CD',
    'WebSockets', 'JWT Auth', 'Cloudinary', 'Three.js'
  ];

  const activeSkills = useMemo(() => {
    return skills && skills.length > 0 ? skills : fallback;
  }, [skills]);

  const skillsKey = useMemo(() => {
    return activeSkills.join('|');
  }, [activeSkills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isIntersecting = true;

    // Viewport Intersection Observer: Only run physics when sandbox is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let width = (canvas.width = container.clientWidth || 800);
    const isMobile = width < 640;
    let height = (canvas.height = container.clientHeight || (isMobile ? 380 : 420));

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth || 800;
      height = canvas.height = container.clientHeight || (width < 640 ? 380 : 420);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Color theme config
    const isDark = theme !== 'light';
    const pillBg = isDark ? 'rgba(20, 20, 32, 0.95)' : 'rgba(255, 255, 255, 0.96)';
    const pillBorder = isDark ? 'rgba(139, 92, 246, 0.45)' : 'rgba(79, 70, 229, 0.35)';
    const pillText = isDark ? '#ffffff' : '#09090b';

    // Responsive column distribution
    const colWidth = isMobile ? 95 : 130;
    const cols = Math.max(Math.floor(width / colWidth), 2);

    // Create Physics Body for skills with compact responsive sizing
    const bodies = activeSkills.map((skill, index) => {
      const textLen = (skill || '').length;
      const w = isMobile
        ? Math.max(textLen * 7.0 + 20, 58)
        : Math.max(textLen * 9.0 + 26, 80);
      const h = isMobile ? 28 : 34;
      const radius = h / 2;

      const col = index % cols;
      const row = Math.floor(index / cols);
      const colSpacing = width / cols;

      return {
        text: skill || 'Skill',
        x: col * colSpacing + colSpacing / 2 + (Math.random() - 0.5) * 15,
        y: row * (isMobile ? 34 : 44) + 30 + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: Math.random() * 0.8,
        w,
        h,
        radius,
        color: index % 3 === 0 ? '#8b5cf6' : index % 3 === 1 ? '#06b6d4' : '#f43f5e',
        isDragging: false,
      };
    });

    let draggedBody = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseDown = (e) => {
      const { x, y } = getMousePos(e);
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i];
        if (
          x >= b.x - b.w / 2 &&
          x <= b.x + b.w / 2 &&
          y >= b.y - b.h / 2 &&
          y <= b.y + b.h / 2
        ) {
          draggedBody = b;
          b.isDragging = true;
          dragOffsetX = x - b.x;
          dragOffsetY = y - b.y;
          lastMouseX = x;
          lastMouseY = y;
          if (playHover) playHover();
          break;
        }
      }
    };

    const onMouseMove = (e) => {
      if (!draggedBody) return;
      const { x, y } = getMousePos(e);
      draggedBody.x = x - dragOffsetX;
      draggedBody.y = y - dragOffsetY;
      draggedBody.vx = (x - lastMouseX) * 0.75;
      draggedBody.vy = (y - lastMouseY) * 0.75;
      lastMouseX = x;
      lastMouseY = y;
    };

    const onMouseUp = () => {
      if (draggedBody) {
        draggedBody.isDragging = false;
        draggedBody = null;
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    const gravity = gravityActive ? (isMobile ? 0.28 : 0.32) : 0;
    const friction = 0.985;
    const bounce = 0.55;

    const render = () => {
      if (!isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const bLen = bodies.length;
      for (let i = 0; i < bLen; i++) {
        const b = bodies[i];

        if (!b.isDragging) {
          b.vy += gravity;
          b.vx *= friction;
          b.vy *= friction;

          b.x += b.vx;
          b.y += b.vy;

          if (b.y + b.h / 2 > height) {
            b.y = height - b.h / 2;
            b.vy = -b.vy * bounce;
          }
          if (b.y - b.h / 2 < 0) {
            b.y = b.h / 2;
            b.vy = -b.vy * bounce;
          }
          if (b.x - b.w / 2 < 0) {
            b.x = b.w / 2;
            b.vx = -b.vx * bounce;
          }
          if (b.x + b.w / 2 > width) {
            b.x = width - b.w / 2;
            b.vx = -b.vx * bounce;
          }
        }

        // Fast inter-body collision
        for (let j = i + 1; j < bLen; j++) {
          const b2 = bodies[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const minDistX = (b.w + b2.w) / 2.05;
          const minDistY = (b.h + b2.h) / 2.0;

          if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
            const overlapX = minDistX - Math.abs(dx);
            const overlapY = minDistY - Math.abs(dy);

            if (overlapX < overlapY) {
              const sign = dx > 0 ? 1 : -1;
              if (!b.isDragging) b.x -= (overlapX / 2) * sign;
              if (!b2.isDragging) b2.x += (overlapX / 2) * sign;
              const tempVx = b.vx;
              b.vx = b2.vx * bounce;
              b2.vx = tempVx * bounce;
            } else {
              const sign = dy > 0 ? 1 : -1;
              if (!b.isDragging) b.y -= (overlapY / 2) * sign;
              if (!b2.isDragging) b2.y += (overlapY / 2) * sign;
              const tempVy = b.vy;
              b.vy = b2.vy * bounce;
              b2.vy = tempVy * bounce;
            }
          }
        }

        // Draw Rounded Pill
        ctx.save();
        ctx.translate(b.x, b.y);

        const halfW = b.w / 2;
        const halfH = b.h / 2;
        drawRoundedRect(ctx, -halfW, -halfH, b.w, b.h, b.radius);
        ctx.fillStyle = pillBg;
        ctx.fill();
        ctx.lineWidth = b.isDragging ? 2 : 1;
        ctx.strokeStyle = b.isDragging ? b.color : pillBorder;
        ctx.stroke();

        // Accent dot
        ctx.beginPath();
        const dotX = -halfW + (isMobile ? 8 : 11);
        ctx.arc(dotX, 0, isMobile ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Text
        ctx.font = isMobile ? '600 10.5px Satoshi, sans-serif' : '600 12px Satoshi, sans-serif';
        ctx.fillStyle = pillText;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        const textX = -halfW + (isMobile ? 15 : 20);
        ctx.fillText(b.text, textX, 0.5);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [skillsKey, gravityActive, theme]);

  return (
    <section className="relative py-16 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-accent mb-2 shadow-sm">
              <Move className="w-3.5 h-3.5" />
              <span>{t.sandbox.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-text">
              {t.sandbox.title}
            </h3>
            <p className="text-secondary text-xs sm:text-sm mt-1 font-sans">
              {t.sandbox.desc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (playClick) playClick();
                setGravityActive(!gravityActive);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                gravityActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'glass text-secondary hover:text-text'
              }`}
            >
              {gravityActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{gravityActive ? t.sandbox.zeroG : t.sandbox.gravity}</span>
            </button>
          </div>
        </div>

        {/* Physics Canvas Window */}
        <div
          ref={containerRef}
          className="relative rounded-3xl glass bg-bg-secondary/80 border-2 border-theme-glow overflow-hidden shadow-2xl h-[380px] sm:h-[420px]"
        >
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block touch-none" />

          <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl glass border border-theme text-[10px] sm:text-[11px] font-semibold text-tertiary">
            {t.sandbox.hint}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsSandbox;
