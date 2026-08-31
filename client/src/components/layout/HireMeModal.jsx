import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Zap,
  Briefcase,
  Rocket,
  ShieldCheck,
  Calendar,
  DollarSign,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitMessage } from '../../services/api';
import { useSound } from '../../context/SoundContext';

export const HireMeModal = ({ isOpen, onClose }) => {
  const { playClick, playSuccess, playWhoosh } = useSound();
  const [roleType, setRoleType] = useState('fulltime'); // 'fulltime', 'contract', 'consulting'
  const [startDate, setStartDate] = useState('immediate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$5k – $15k / Monthly',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      playWhoosh();
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roles = [
    {
      id: 'fulltime',
      title: 'Full-Time Senior Role',
      desc: 'Lead Full-Stack MERN / React 19 Engineer for global remote teams',
      icon: Briefcase,
      badge: 'High Priority',
    },
    {
      id: 'contract',
      title: 'Contract / MVP Sprint',
      desc: 'High-velocity architecture, 3D web applications, and headless CMS',
      icon: Rocket,
      badge: '2–6 Week Sprints',
    },
    {
      id: 'consulting',
      title: 'Technical Advisory & Audit',
      desc: 'Codebase refactoring, performance optimization, and MongoDB scaling',
      icon: ShieldCheck,
      badge: 'Advisory',
    },
  ];

  const timelines = [
    { id: 'immediate', label: '⚡ Immediate (This Week)' },
    { id: '2weeks', label: '🗓️ Within 2 Weeks' },
    { id: 'nextmonth', label: '⏳ Next Month' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in your name and corporate email.');
      return;
    }

    setLoading(true);
    setError('');

    const formattedMessage = `
[⚡ FAST-TRACK HIRE INQUIRY]
• Engagement Type: ${roles.find((r) => r.id === roleType)?.title}
• Desired Start Date: ${timelines.find((t) => t.id === startDate)?.label}
• Company / Organization: ${formData.company || 'Not Specified'}
• Proposed Budget / Range: ${formData.budget}
• Additional Requirements:
${formData.details || 'Standard role briefing.'}
    `.trim();

    try {
      const res = await submitMessage({
        name: formData.name,
        email: formData.email,
        message: formattedMessage,
      });

      if (res.data && res.data.success) {
        setSubmitted(true);
        playSuccess();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#06b6d4', '#00ff66', '#f43f5e'],
        });
      } else {
        setError('Transmission failed. Please try again or email directly.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-xl z-40"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-50 w-full max-w-2xl rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-surface/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-text">Fast-Track Hiring & Discovery</h3>
                <p className="text-[11px] text-secondary">Initiate a formal collaboration or schedule interviews</p>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 rounded-full glass hover:bg-surface text-text"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-bold text-text">Fast-Track Inquiry Received!</h4>
                <p className="text-secondary text-sm max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong>. I have received your briefing and will review your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-lg hover:opacity-90 transition-opacity"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Engagement Model Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                    <span>1. Engagement Framework</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      const isActive = roleType === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            playClick();
                            setRoleType(r.id);
                          }}
                          className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                            isActive
                              ? 'bg-primary/15 border-primary shadow-md shadow-primary/20 text-text'
                              : 'glass border-theme text-secondary hover:border-theme-glow'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-tertiary'}`} />
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface font-mono font-bold text-tertiary">
                              {r.badge}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-text">{r.title}</p>
                            <p className="text-[10px] text-tertiary mt-0.5 line-clamp-2 leading-tight">{r.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Target Start Date */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span>2. Target Onboarding / Start Date</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelines.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          playClick();
                          setStartDate(t.id);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          startDate === t.id
                            ? 'bg-secondary/20 border-secondary text-secondary shadow-sm'
                            : 'glass border-theme text-secondary hover:text-text'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Client & Company Details */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-text">
                    3. Contact & Requirements
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass border border-theme text-xs text-text placeholder:text-tertiary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Corporate Email *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass border border-theme text-xs text-text placeholder:text-tertiary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Company / Startup Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass border border-theme text-xs text-text placeholder:text-tertiary focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Budget / Comp Range (e.g. $8k/mo or $120k/yr)"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass border border-theme text-xs text-text placeholder:text-tertiary focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of role expectations, stack requirements, or project vision..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass border border-theme text-xs text-text placeholder:text-tertiary focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-400 font-medium">{error}</p>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] hover:bg-right text-white font-bold text-xs sm:text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Fast-Track Request...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Submit Fast-Track Application</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HireMeModal;
