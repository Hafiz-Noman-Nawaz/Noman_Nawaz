import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote, Sparkles } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';

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
            src={item.avatar}
            alt={item.name}
            className="w-11 h-11 rounded-full object-cover border border-theme-glow"
          />
          <div>
            <h4 className="text-sm font-display font-bold text-text">{item.name}</h4>
            <p className="text-xs text-tertiary">
              {item.role} {item.company ? `· ${item.company}` : ''}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = ({ testimonials = [] }) => {
  const fallbackTestimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Head of Product',
      company: 'HyperScale AI',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      content: 'Noman is one of the rare full-stack developers who truly understands the nuance of motion design and performance. He turned our complex dashboard into a work of art that our customers love.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'CTO & Co-Founder',
      company: 'AuraPay Global',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      content: 'Working with Noman was an absolute pleasure. His MERN stack mastery, attention to code quality, and proactive communication made our product launch effortless and fast.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Design Director',
      company: 'Vortex Interactive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content: 'High-contrast typography, silky smooth micro-interactions, and pristine backend architecture. Noman delivers top-tier engineering every single time.',
      rating: 5,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section id="testimonials" className="relative py-28 z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-secondary mb-3 shadow-sm"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Social Proof & Endorsements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
          >
            Client & Collaborator Feedback
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-secondary text-sm sm:text-base font-sans"
          >
            What founders, engineering leaders, and product directors say about working together.
          </motion.p>
        </div>

        {/* Grid of 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <TestimonialCard key={item._id || idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
