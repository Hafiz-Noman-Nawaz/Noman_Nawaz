import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Upload, Sparkles, CheckCircle2, AlertCircle, RefreshCw, MessageSquareQuote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitPublicTestimonial } from '../../services/api';
import { useSound } from '../../context/SoundContext';

export const LeaveReviewModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const { playClick, playWhoosh } = useSound();

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('role', role);
      data.append('company', company);
      data.append('content', content);
      data.append('rating', rating);

      if (imageFile) {
        data.append('avatar', imageFile);
      }

      const res = await submitPublicTestimonial(data);
      if (res.data.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setStatus({ type: 'success', message: 'Thank you so much! Your recommendation has been added.' });
        if (playWhoosh) playWhoosh();
        setTimeout(() => {
          if (onSuccess) onSuccess(res.data.data);
          onClose();
        }, 1600);
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to submit. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg/85 backdrop-blur-md z-40"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-50 w-full max-w-lg rounded-3xl bg-bg-secondary border-2 border-theme-glow shadow-2xl p-6 sm:p-8 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-theme">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-theme-glow text-[11px] font-bold text-accent mb-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>Client & Peer Endorsement</span>
              </div>
              <h3 className="text-xl font-display font-bold text-text">
                Leave a Recommendation
              </h3>
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

          {/* Feedback Status Alert */}
          {status.message && (
            <div
              className={`mb-4 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-semibold ${
                status.type === 'success'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(rating)}
                    onClick={() => {
                      playClick();
                      setRating(star);
                    }}
                    className="p-1 text-amber-400 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-tertiary opacity-40'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-tertiary ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Name & Role Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface border border-theme text-xs sm:text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Your Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Product Lead / Founder"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface border border-theme text-xs sm:text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            {/* Company / Project */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                Company / Project Name
              </label>
              <input
                type="text"
                placeholder="e.g. HyperScale AI / Remote Team"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface border border-theme text-xs sm:text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>

            {/* Recommendation Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                Endorsement Message *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Share your experience working with Noman (e.g. technical delivery, speed, communication, motion quality)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface border border-theme text-xs sm:text-sm text-text focus:outline-none focus:border-theme-glow resize-none"
              />
            </div>

            {/* Avatar Photo Upload (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden glass border border-theme flex-shrink-0 bg-surface">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-tertiary text-xs font-bold font-mono">
                      {name ? name[0].toUpperCase() : '👤'}
                    </div>
                  )}
                </div>

                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl glass hover:bg-surface cursor-pointer text-xs font-semibold text-text">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>Upload Picture</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-theme flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl glass hover:bg-surface text-xs font-bold text-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>Submit Endorsement</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeaveReviewModal;
