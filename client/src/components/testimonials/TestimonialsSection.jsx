import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import LeaveReviewModal from './LeaveReviewModal';
import { useSound } from '../../context/SoundContext';
import { useLanguage } from '../../context/LanguageContext';

const TestimonialCard = ({ item, index }) => {
  const { ref, style, glare, onMouseMove, onMouseLeave } = useTilt(10, 1000, 1.02);

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
        onMouseLeave={onMouseLeave}
        className="relative h-full flex flex-col justify-between p-7 rounded-3xl glass-card border border-theme hover:border-theme-glow shadow-xl"
      >
        {/* Dynamic Light Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.8}), transparent 60%)`,
          }}
        />

        <div className="space-y-4">
          {/* Star rating */}
          <div className="flex items-center gap-1">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="text-sm sm:text-base text-secondary leading-relaxed font-sans italic">
            "{item.content}"
          </p>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-theme">
          <img
            src={item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={item.name}
            className="w-11 h-11 rounded-full object-cover border border-theme-glow flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-display font-bold text-text truncate">{item.name}</h4>
            <p className="text-xs text-tertiary truncate">
              {item.role} {item.company ? `· ${item.company}` : ''}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = ({ testimonials = [] }) => {
  const { t } = useLanguage();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [localTestimonials, setLocalTestimonials] = useState(testimonials);
  const { playClick } = useSound();

  useEffect(() => {
    setLocalTestimonials(testimonials);
  }, [testimonials]);

  const handleTestimonialAdded = (newTestimonial) => {
    setLocalTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const displayList = localTestimonials || [];

  return (
    <section id="testimonials" className="relative py-28 z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-secondary mb-3 shadow-sm"
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{t.testimonials.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
            >
              {t.testimonials.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-secondary text-sm sm:text-base font-sans"
            >
              {t.testimonials.desc}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => {
                playClick();
                setIsReviewModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300"
            >
              <span>{t.testimonials.leaveReview}</span>
            </button>
          </motion.div>
        </div>

        {/* Display Testimonials or Clean Invitation State */}
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayList.map((item, idx) => (
              <TestimonialCard key={item._id || idx} item={item} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 glass rounded-3xl border border-theme max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary">
              <Star className="w-6 h-6 fill-primary" />
            </div>
            <h3 className="text-lg font-display font-bold text-text">Be the First to Endorse</h3>
            <p className="text-xs sm:text-sm text-secondary font-sans">
              Have we built a project or collaborated together? Click the button above to leave a recommendation.
            </p>
          </div>
        )}
      </div>

      {/* Leave Review Modal */}
      <LeaveReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSuccess={handleTestimonialAdded}
      />
    </section>
  );
};

export default TestimonialsSection;
