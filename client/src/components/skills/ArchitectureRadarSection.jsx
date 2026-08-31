import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Gauge,
  ShieldCheck,
  Zap,
  Server,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const ArchitectureRadarSection = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const { playClick, playHover } = useSound();

  const metrics = [
    {
      name: 'Full-Stack MERN Architecture',
      score: 98,
      icon: Layers,
      color: '#8b5cf6',
      details: 'Modular controller patterns, scalable folder structures, and high-frequency reactive state handling.',
    },
    {
      name: '60FPS UI/UX & WebGL Physics',
      score: 96,
      icon: Sparkles,
      color: '#06b6d4',
      details: 'Verlet collision integration, GPU-accelerated motion transforms, and zero layout thrashing.',
    },
    {
      name: 'High-Throughput REST & WebSockets',
      score: 95,
      icon: Server,
      color: '#00ff66',
      details: 'Stateless JWT validation, multipart buffer streams, real-time bi-directional sockets, and sub-40ms latency.',
    },
    {
      name: 'MongoDB Aggregations & Atlas',
      score: 92,
      icon: Zap,
      color: '#facc15',
      details: 'Multi-stage aggregation pipelines, compound indexing, cluster sharding, and ACID transaction safety.',
    },
    {
      name: 'Cloudinary CDN & DevOps CI/CD',
      score: 90,
      icon: Gauge,
      color: '#f43f5e',
      details: 'Automated asset compression pipelines, WebP conversion, Docker builds, and zero-downtime Vercel/Render deploys.',
    },
    {
      name: 'Stateless Security & RBAC Guards',
      score: 97,
      icon: ShieldCheck,
      color: '#38bdf8',
      details: 'HMAC SHA-256 cryptographic signatures, rate limiting, sanitization guards, and CORS whitelisting.',
    },
  ];

  const lighthouseScores = [
    { label: 'Performance', score: 99, color: 'text-emerald-400', stroke: '#10b981' },
    { label: 'Accessibility', score: 100, color: 'text-emerald-400', stroke: '#10b981' },
    { label: 'Best Practices', score: 100, color: 'text-emerald-400', stroke: '#10b981' },
    { label: 'SEO Optimization', score: 100, color: 'text-emerald-400', stroke: '#10b981' },
  ];

  // Calculate SVG Radar points
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = metrics.length;

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = metrics
    .map((m, i) => {
      const pt = getPoint(i, m.score);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <section id="architecture-radar" className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-primary mb-3 shadow-sm"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Empirical Engineering Benchmarks</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Architecture & Performance Radar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            A multi-dimensional evaluation of full-stack scalability, real-time throughput, and production engineering rigor.
          </motion.p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: SVG Radar Chart */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl glass border-2 border-theme-glow bg-bg-secondary/70 relative">
            <div className="relative w-[320px] h-[320px] max-w-full">
              <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {/* Background Concentric Radar Rings */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                  <polygon
                    key={i}
                    points={metrics
                      .map((_, idx) => {
                        const pt = getPoint(idx, 100 * scale);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                    strokeDasharray={scale < 1 ? '3 3' : 'none'}
                  />
                ))}

                {/* Radar Axis Spokes */}
                {metrics.map((_, idx) => {
                  const outerPt = getPoint(idx, 100);
                  return (
                    <line
                      key={idx}
                      x1={center}
                      y1={center}
                      x2={outerPt.x}
                      y2={outerPt.y}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Filled Radar Data Polygon */}
                <motion.polygon
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  points={polygonPoints}
                  fill="url(#radarGradient)"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                />

                {/* Vertex Dots */}
                {metrics.map((m, idx) => {
                  const pt = getPoint(idx, m.score);
                  const isSelected = activeMetric === idx;
                  return (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 4}
                      fill={m.color}
                      className="cursor-pointer transition-all duration-300 hover:scale-150"
                      onClick={() => {
                        playClick();
                        setActiveMetric(idx);
                      }}
                    />
                  );
                })}

                {/* Gradients */}
                <defs>
                  <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <p className="text-[11px] text-tertiary mt-2 font-mono">
              ⚡ Click any node to inspect architectural metrics
            </p>
          </div>

          {/* Right: Active Metric Card & Lighthouse Badges */}
          <div className="lg:col-span-6 space-y-6">
            {/* Active Metric Insight Card */}
            <motion.div
              key={activeMetric}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl glass border-2 border-theme-glow bg-bg-secondary/90 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                    style={{ backgroundColor: `${metrics[activeMetric].color}25` }}
                  >
                    {React.createElement(metrics[activeMetric].icon, {
                      className: 'w-5 h-5',
                      style: { color: metrics[activeMetric].color },
                    })}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-text">
                      {metrics[activeMetric].name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-primary">
                      Proficiency Rating: {metrics[activeMetric].score}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans pt-1">
                {metrics[activeMetric].details}
              </p>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-surface overflow-hidden pt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metrics[activeMetric].score}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </motion.div>

            {/* Google Lighthouse 100/100 Benchmark Badges */}
            <div className="p-6 rounded-3xl glass border border-theme bg-surface/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" /> Google Lighthouse Score
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Green Certified</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {lighthouseScores.map((lh, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl glass border border-theme flex flex-col items-center justify-center text-center space-y-1"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center font-display font-bold text-emerald-400 text-sm">
                      {lh.score}
                    </div>
                    <span className="text-[11px] font-bold text-secondary">{lh.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureRadarSection;
