import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Play,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Layers,
  Shield,
  Cloud,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const CodePlaygroundSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const { playClick, playWhoosh } = useSound();

  const snippets = [
    {
      title: 'VerletPhysicsEngine.js',
      icon: Sparkles,
      language: 'JavaScript',
      desc: '2D Rigid-body Verlet integration & collision momentum',
      code: `// Verlet Rigid-Body Physics & Momentum Solver
export function updateParticle(p, dt, gravity = 0.32, bounce = 0.6) {
  const vx = (p.x - p.oldX) * 0.985; // Air friction
  const vy = (p.y - p.oldY) * 0.985 + gravity;

  p.oldX = p.x;
  p.oldY = p.y;
  p.x += vx;
  p.y += vy;

  // Screen Boundaries & Elastic Rebound
  if (p.y + p.h / 2 > 420) {
    p.y = 420 - p.h / 2;
    p.oldY = p.y + vy * bounce;
  }
  return { x: p.x.toFixed(1), y: p.y.toFixed(1), vx: vx.toFixed(2), vy: vy.toFixed(2) };
}`,
      output: [
        '⚡ [PhysicsEngine] Initialized 24 skill rigid bodies',
        '🌀 [Verlet] Velocity calculated: vx = 0.82, vy = 2.45',
        '💥 [Collision] Body #4 (React 19) collided with Body #7 (MongoDB)',
        '🎯 [Result] Kinetic momentum transferred at 60.0 FPS. Status: Stable',
      ],
    },
    {
      title: 'JWTMiddleware.js',
      icon: Shield,
      language: 'Node.js',
      desc: 'Stateless cryptographic token validation & RBAC',
      code: `// Express JWT Auth & Role-Based Access Control
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Admin.findById(decoded.id).select('-password');
  next();
};`,
      output: [
        '🔐 [AuthGuard] Incoming request to /api/settings',
        '🔑 [JWT] Bearer token detected and parsed',
        '🛡️ [Verify] Cryptographic signature verified against HMAC SHA-256',
        '✅ [Session] User "nawaznoman7766@gmail.com" granted role: ADMIN',
      ],
    },
    {
      title: 'CloudinaryStreamPipeline.js',
      icon: Cloud,
      language: 'Node.js',
      desc: 'Multipart buffer streaming & WebP optimization',
      code: `// Cloudinary Direct Stream Upload Pipeline
const { cloudinary } = require('../config/cloudinary');

const uploadStream = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, format: 'webp', quality: 'auto:good' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};`,
      output: [
        '📸 [Stream] In-memory buffer received (2.4 MB)',
        '☁️ [Cloudinary] Upload stream opened for "noman_portfolio/projects"',
        '⚡ [Compressor] Converted to WebP • Quality: Auto (Lossless ~180 KB)',
        '🚀 [CDN] Asset live at: https://res.cloudinary.com/.../badge.webp',
      ],
    },
    {
      title: 'MongoAggregateMetrics.js',
      icon: Database,
      language: 'MongoDB',
      desc: 'Multi-stage aggregation pipeline & analytics',
      code: `// MongoDB Aggregation Pipeline for CMS Inquiries
const stats = await Message.aggregate([
  { $match: { createdAt: { $gte: new Date(Date.now() - 30*86400000) } } },
  { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      totalInquiries: { $sum: 1 },
      unread: { $sum: { $cond: [{ $eq: ["$read", false] }, 1, 0] } }
    }
  },
  { $sort: { _id: 1 } }
]);`,
      output: [
        '📊 [Aggregate] Querying cluster shard replica set...',
        '🔍 [Match] 30-day date boundary filter applied',
        '📈 [Group] Grouped by ISO date string (totalInquiries, unreadCount)',
        '⚡ [Execution] Aggregation finished in 4.2ms. Returned 14 buckets.',
      ],
    },
  ];

  const currentSnippet = snippets[activeTab];

  const handleRunSnippet = () => {
    playClick();
    setRunning(true);
    setLogs([]);

    currentSnippet.output.forEach((line, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (index === currentSnippet.output.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  const handleCopyCode = () => {
    playClick();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-playground" className="relative py-28 z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/3 w-[550px] h-[400px] bg-secondary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-accent mb-3 shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Code Execution</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Architecture & Live Code Snippets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            Select a core module below and click <strong>"Run Snippet"</strong> to test live simulated execution in the runtime terminal.
          </motion.p>
        </div>

        {/* Code Editor Container */}
        <div className="rounded-3xl glass bg-[#0c0d14] border-2 border-theme-glow shadow-2xl overflow-hidden">
          {/* Editor Tab Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#13141f] border-b border-white/10 overflow-x-auto select-none no-scrollbar">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {snippets.map((snip, idx) => {
                const Icon = snip.icon;
                const isActive = activeTab === idx;

                return (
                  <button
                    key={snip.title}
                    onClick={() => {
                      playClick();
                      setActiveTab(idx);
                      setLogs([]);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{snip.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pl-3">
              <button
                onClick={handleCopyCode}
                title="Copy snippet code"
                className="p-1.5 rounded-lg glass text-white/70 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleRunSnippet}
                disabled={running}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/25 disabled:opacity-50"
              >
                {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>Run Snippet</span>
              </button>
            </div>
          </div>

          {/* Code Viewer Area */}
          <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm text-white/90 overflow-x-auto bg-[#090a10]">
            <pre className="leading-relaxed font-mono">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

          {/* Execution Console Terminal Output */}
          <div className="px-5 py-4 bg-[#06070a] border-t border-white/10 font-mono text-xs text-white/80 space-y-1.5 min-h-[110px]">
            <div className="flex items-center justify-between text-[11px] text-white/40 pb-1 border-b border-white/5">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-emerald-400" />
                Live Execution Console:
              </span>
              <span>{running ? 'Executing...' : logs.length > 0 ? 'Done (Exit Code 0)' : 'Click "Run Snippet" to execute'}</span>
            </div>

            {logs.map((log, i) => (
              <div key={i} className="text-emerald-400/90 font-mono text-xs flex items-center gap-2">
                <span>›</span>
                <span>{log}</span>
              </div>
            ))}

            {logs.length === 0 && !running && (
              <p className="text-white/30 text-xs italic pt-1">
                Output stream will appear here upon execution...
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePlaygroundSection;
