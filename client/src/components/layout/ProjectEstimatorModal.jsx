import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  X,
  Sparkles,
  Layers,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Send,
  Cpu,
  Shield,
  CreditCard,
  MessageSquare,
  Cloud,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../../context/SoundContext';

export const ProjectEstimatorModal = ({ isOpen, onClose, onPreFillContact }) => {
  const [projectType, setProjectType] = useState('saas');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'database', 'responsive']);
  const [timeline, setTimeline] = useState('standard');
  const [step, setStep] = useState(1);
  const { playClick, playWhoosh } = useSound();

  if (!isOpen) return null;

  const projectTypes = [
    { id: 'saas', name: 'Full-Stack SaaS Platform', desc: 'Subscription web application with dashboard and database', baseWeeks: 3, icon: Layers },
    { id: 'ai-app', name: 'AI / LLM Web Application', desc: 'Custom chatbot, vector embeddings, or intelligent pipeline', baseWeeks: 3, icon: Cpu },
    { id: 'ecommerce', name: 'Modern E-Commerce Store', desc: 'Catalog, shopping cart, Stripe payments, and admin order panel', baseWeeks: 2.5, icon: CreditCard },
    { id: 'portfolio-agency', name: '3D Interactive Portfolio / Landing', desc: 'Awwwards-tier 60fps animations, WebGL, and custom CMS', baseWeeks: 2, icon: Sparkles },
    { id: 'custom-api', name: 'Custom Backend API & Microservices', desc: 'REST / GraphQL endpoints, Docker containerization, auth', baseWeeks: 2, icon: Cloud },
  ];

  const featuresList = [
    { id: 'auth', name: 'JWT & OAuth Authentication', desc: 'Secure login, sign-up, password reset, role permissions', weeks: 0.5, icon: Shield },
    { id: 'database', name: 'MongoDB / PostgreSQL Schema', desc: 'Indexed clustering, data modeling, automated backups', weeks: 0.5, icon: Layers },
    { id: 'responsive', name: 'Ultra-Responsive UI & 3D Motion', desc: 'Mobile first, Framer Motion, 60fps interactions', weeks: 0.5, icon: Smartphone },
    { id: 'payments', name: 'Stripe / Payment Gateway', desc: 'Checkout sessions, webhooks, recurring subscriptions', weeks: 0.5, icon: CreditCard },
    { id: 'realtime', name: 'Real-Time WebSockets / Chat', desc: 'Live notifications, instant messaging, presence indicators', weeks: 0.5, icon: MessageSquare },
    { id: 'cms', name: 'Custom Headless Admin CMS', desc: 'Full CRUD portal with Cloudinary media management', weeks: 0.5, icon: Zap },
  ];

  const timelineOptions = [
    { id: 'express', name: '⚡ Accelerated / Sprint', desc: 'Dedicated focus for rapid launch in 1-2 weeks', multiplier: 0.7 },
    { id: 'standard', name: '🎯 Standard Milestones', desc: 'Thorough QA testing, design iterations, and staging', multiplier: 1.0 },
    { id: 'flexible', name: '🌱 Flexible Phased Roadmap', desc: 'Multi-phase feature release with ongoing iterations', multiplier: 1.2 },
  ];

  const toggleFeature = (id) => {
    playClick();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Calculate estimated timeframe
  const selectedTypeObj = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const featuresTotalWeeks = selectedFeatures.reduce((acc, fId) => {
    const f = featuresList.find((item) => item.id === fId);
    return acc + (f ? f.weeks : 0);
  }, 0);

  const timelineObj = timelineOptions.find((t) => t.id === timeline) || timelineOptions[1];
  const rawWeeks = (selectedTypeObj.baseWeeks + featuresTotalWeeks) * timelineObj.multiplier;
  const estimatedWeeksMin = Math.max(1, Math.round(rawWeeks * 0.85));
  const estimatedWeeksMax = Math.max(2, Math.round(rawWeeks * 1.15));

  const handleFinishAndTransfer = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    if (playWhoosh) playWhoosh();

    const brief = `Project Type: ${selectedTypeObj.name}
Key Features: ${selectedFeatures.map((fId) => featuresList.find((f) => f.id === fId)?.name).join(', ')}
Timeline: ${timelineObj.name} (Estimated ${estimatedWeeksMin}-${estimatedWeeksMax} Weeks)

Hi Noman, I used your Project Architecture Estimator and would like to collaborate on this!`;

    if (onPreFillContact) onPreFillContact(brief);
    onClose();

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-50 w-full max-w-2xl rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-surface/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/15 text-primary border border-primary/30">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-text">
                  Project Scope & Architecture Estimator
                </h3>
                <p className="text-[11px] text-secondary">
                  Step {step} of 3 • Custom Technical Blueprint
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full glass hover:bg-surface text-secondary hover:text-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text">1. Select Your Project Archetype</h4>
                  <p className="text-xs text-secondary mt-0.5">What category of web system are you looking to engineer?</p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = projectType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => {
                          playClick();
                          setProjectType(type.id);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-primary/10 border-primary shadow-md shadow-primary/20 scale-[1.01]'
                            : 'glass border-theme hover:border-theme-glow'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-surface text-secondary'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-text">{type.name}</h5>
                            <p className="text-[11px] text-secondary">{type.desc}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-theme'}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Feature Modules */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-text">2. Select Required Core Modules</h4>
                  <p className="text-xs text-secondary mt-0.5">Choose the architectural features needed for your launch:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featuresList.map((feature) => {
                    const Icon = feature.icon;
                    const isSelected = selectedFeatures.includes(feature.id);
                    return (
                      <div
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-primary/10 border-primary shadow-sm'
                            : 'glass border-theme hover:border-theme-glow'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-surface text-secondary'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-theme'}`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-text">{feature.name}</h5>
                          <p className="text-[10px] text-secondary mt-0.5 leading-tight">{feature.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Blueprint Summary */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-text">3. Desired Launch Velocity</h4>
                  <p className="text-xs text-secondary mt-0.5">Select your deployment timeline urgency:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {timelineOptions.map((t) => {
                    const isSelected = timeline === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          playClick();
                          setTimeline(t.id);
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-center ${
                          isSelected
                            ? 'bg-primary/15 border-primary shadow-sm scale-105'
                            : 'glass border-theme hover:border-theme-glow'
                        }`}
                      >
                        <h5 className="text-xs font-bold text-text">{t.name}</h5>
                        <p className="text-[10px] text-secondary mt-1">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Generated Architecture Blueprint Card */}
                <div className="p-5 rounded-3xl glass border-2 border-primary/40 bg-surface/60 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-theme pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Architectural Estimation
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      ~{estimatedWeeksMin} to {estimatedWeeksMax} Weeks
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-tertiary uppercase font-bold">Recommended Stack</span>
                      <p className="font-bold text-text mt-0.5 font-mono">React 19 • Node.js • MongoDB • Tailwind v4</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-tertiary uppercase font-bold">Selected Features</span>
                      <p className="font-bold text-secondary mt-0.5">{selectedFeatures.length} Core Modules</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-secondary font-sans leading-relaxed">
                    Includes clean component architecture, responsive mobile testing, JWT security, and 60fps micro-interactions.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-4 border-t border-theme bg-surface/80 backdrop-blur-md flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                onClick={() => {
                  playClick();
                  setStep((s) => s - 1);
                }}
                className="px-4 py-2.5 rounded-xl glass hover:bg-surface text-xs font-bold text-secondary"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => {
                  playClick();
                  setStep((s) => s + 1);
                }}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/30 hover:scale-105 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishAndTransfer}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary/40 hover:scale-105 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Blueprint to Noman</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectEstimatorModal;
