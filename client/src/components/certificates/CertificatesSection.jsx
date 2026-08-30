import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { useSound } from '../../context/SoundContext';

const CertificateCard = ({ cert, index }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(14, 1000, 1.03);
  const { playClick, playHover } = useSound();

  const getBadgeGradient = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-indigo-600';
      case 'amber': return 'from-amber-500 to-orange-600';
      case 'purple': return 'from-purple-500 to-pink-600';
      case 'cyan': return 'from-cyan-400 to-blue-500';
      default: return 'from-emerald-500 to-teal-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      className="h-full"
    >
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseEnter={playHover}
        onMouseLeave={onMouseLeave}
        className="group relative h-full flex flex-col justify-between rounded-3xl glass-card border border-theme hover:border-theme-glow p-6 shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Holographic metallic glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.9}), transparent 60%)`,
          }}
        />

        {/* Top Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl bg-gradient-to-tr ${getBadgeGradient(cert.badgeColor)} text-white shadow-lg`}>
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-tertiary px-2.5 py-1 rounded-full bg-surface border border-theme">
              {cert.issueDate || '2025'}
            </span>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold text-text group-hover:text-primary transition-colors">
              {cert.title}
            </h4>
            <p className="text-xs font-semibold text-secondary mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Verification Link */}
        <div className="pt-6 mt-6 border-t border-theme flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Verified Credential
          </span>

          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
            >
              <span>Verify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-tertiary">Direct Certified</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const CertificatesSection = ({ certificates = [] }) => {
  const fallbackCertificates = [
    {
      title: 'Meta Certified Full-Stack Developer',
      issuer: 'Meta / Coursera',
      issueDate: '2025',
      credentialUrl: 'https://coursera.org/verify/meta-fullstack',
      badgeColor: 'blue',
    },
    {
      title: 'MongoDB Certified Node.js Developer',
      issuer: 'MongoDB University',
      issueDate: '2024',
      credentialUrl: 'https://university.mongodb.com/credentials',
      badgeColor: 'emerald',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      credentialUrl: 'https://aws.amazon.com/verification',
      badgeColor: 'amber',
    },
  ];

  const items = certificates.length > 0 ? certificates : fallbackCertificates;

  return (
    <section id="certificates" className="relative py-28 z-10 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-accent mb-3 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Verified Accreditations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            Industry certifications from Meta, MongoDB, and AWS validating architectural expertise.
          </motion.p>
        </div>

        {/* 3D Holographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((cert, idx) => (
            <CertificateCard key={cert._id || idx} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
