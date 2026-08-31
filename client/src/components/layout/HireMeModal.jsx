import React, { useState, useEffect, useMemo } from 'react';
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
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitMessage } from '../../services/api';
import { useSound } from '../../context/SoundContext';

export const HireMeModal = ({ isOpen, onClose, settings }) => {
  const { playClick, playSuccess, playWhoosh } = useSound();

  const dynamicRoles = useMemo(() => {
    if (settings?.hireRoles && settings.hireRoles.length > 0) {
      return settings.hireRoles.map((r, i) => ({
        id: `role_${i}`,
        title: r.title,
        desc: r.desc,
        badge: r.badge || 'Available',
        icon: i % 3 === 0 ? Briefcase : i % 3 === 1 ? Rocket : ShieldCheck,
      }));
    }
    return [
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
  }, [settings?.hireRoles]);

  const [roleType, setRoleType] = useState(dynamicRoles[0]?.id || 'fulltime');
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

  const calendlyUrl = settings?.calendlyUrl || 'https://calendly.com';
  const rawPhone = (settings?.phone || '+923001234567').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    `Hello Noman! I am interested in collaborating regarding a ${
      dynamicRoles.find((r) => r.id === roleType)?.title || 'project'
    }.`
  )}`;

  useEffect(() => {
    if (dynamicRoles.length > 0 && !dynamicRoles.find((r) => r.id === roleType)) {
      setRoleType(dynamicRoles[0].id);
    }
  }, [dynamicRoles]);

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

    const activeRole = dynamicRoles.find((r) => r.id === roleType);

    const formattedMessage = `
[⚡ FAST-TRACK HIRE INQUIRY]
• Engagement Type: ${activeRole ? activeRole.title : 'General Consultation'}
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
                className="text-center py-8 space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-display font-bold text-text">Inquiry Dispatched & Logged!</h4>
                  <p className="text-secondary text-xs sm:text-sm max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Your briefing has been saved to Noman's inbox and emailed for prompt review within 24 hours.
                  </p>
                </div>

                {/* Instant Action Next Steps */}
                <div className="p-4 rounded-2xl bg-surface border border-theme max-w-md mx-auto space-y-3">
                  <p className="text-xs font-bold text-text uppercase tracking-wider">Want to connect right away?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book on Calendar</span>
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Instant WhatsApp</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  className="px-6 py-2 rounded-xl glass hover:bg-surface text-secondary text-xs font-bold transition-all"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quick Calendar Banner */}
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl glass border border-theme bg-surface/50">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-text">Prefer to schedule a direct video call?</p>
                      <p className="text-[10px] text-secondary">Pick an available time directly on my calendar</p>
                    </div>
                  </div>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0"
                  >
                    <span>Schedule</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* 1. Dynamic Engagement Model Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text flex items-center justify-between">
                    <span>1. Engagement Framework</span>
                    <span className="text-[10px] text-tertiary font-mono">CMS Synchronized</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {dynamicRoles.map((r) => {
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

                {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

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
