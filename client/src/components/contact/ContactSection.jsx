import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check, Sparkles, Send, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitMessage } from '../../services/api';
import { useSound } from '../../context/SoundContext';

export const ContactSection = ({ settings }) => {
  const [copied, setCopied] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { playClick, playWhoosh } = useSound();

  const handleCopy = (text, id) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitMessage(formData);
      playWhoosh();
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const email = settings?.email || 'nawaznoman7766@gmail.com';
  const phone = settings?.phone || '+92 300 1234567';
  const location = settings?.location || 'Pakistan — Available Worldwide / Remote';

  const socials = [
    settings?.github && { name: 'GitHub', url: settings.github },
    settings?.linkedin && { name: 'LinkedIn', url: settings.linkedin },
    settings?.twitter && { name: 'Twitter / X', url: settings.twitter },
    settings?.instagram && { name: 'Instagram', url: settings.instagram },
  ].filter(Boolean);

  return (
    <section id="contact" className="relative py-28 z-10">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-accent mb-3 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            Looking to engineer a high-performance web platform or interactive experience? Drop a message or connect directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 rounded-3xl glass-card flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary/15 text-primary border border-primary/30 shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-tertiary">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm sm:text-base font-bold text-text hover:text-primary transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(email, 'email')}
                title="Copy Email"
                className="p-2.5 rounded-xl glass hover:bg-surface-hover text-text transition-all"
              >
                {copied === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70" />
                )}
              </button>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 sm:p-6 rounded-3xl glass-card flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-secondary/15 text-secondary border border-secondary/30 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-tertiary">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-sm sm:text-base font-bold text-text hover:text-secondary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(phone, 'phone')}
                title="Copy Phone"
                className="p-2.5 rounded-xl glass hover:bg-surface-hover text-text transition-all"
              >
                {copied === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70" />
                )}
              </button>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 sm:p-6 rounded-3xl glass-card flex items-center gap-4"
            >
              <div className="p-3.5 rounded-2xl bg-accent/15 text-accent border border-accent/30 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-tertiary">
                  Location & Availability
                </span>
                <span className="text-sm sm:text-base font-bold text-text">
                  {location}
                </span>
              </div>
            </motion.div>

            {/* Socials Link Row */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-4 sm:p-6 rounded-3xl glass-card flex flex-wrap items-center justify-between gap-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-tertiary">
                Social Profiles
              </span>
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl glass hover:border-theme-glow hover:text-primary text-xs font-bold transition-all hover:scale-105 flex items-center gap-1 text-text"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-3xl glass bg-bg-secondary/90 border-2 border-theme-glow shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text">Message Received!</h3>
                <p className="text-sm text-secondary max-w-md mx-auto">
                  Thank you for reaching out. Your message has been stored in Noman's inbox and he will reply promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-display font-bold text-text tracking-tight">
                  Send a Direct Inquiry
                </h3>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-tertiary mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-tertiary mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-tertiary mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, goals, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/60 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
