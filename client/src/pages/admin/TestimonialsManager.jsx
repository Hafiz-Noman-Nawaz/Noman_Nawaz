import React, { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services/api';
import { Plus, Edit2, Trash2, Star, Save, X, CheckCircle2, AlertCircle, RefreshCw, MessageSquareQuote, Upload } from 'lucide-react';

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [order, setOrder] = useState(0);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getTestimonials();
      if (res.data.success) {
        setTestimonials(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load testimonials' });
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setCurrentTestimonial(null);
    setName('');
    setRole('');
    setCompany('');
    setContent('');
    setRating(5);
    setOrder(testimonials.length + 1);
    setAvatarFile(null);
    setAvatarPreview('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
    setIsEditing(true);
  };

  const openEditForm = (item) => {
    setCurrentTestimonial(item);
    setName(item.name);
    setRole(item.role);
    setCompany(item.company || '');
    setContent(item.content);
    setRating(item.rating || 5);
    setOrder(item.order || 0);
    setAvatarFile(null);
    setAvatarPreview(item.avatar);
    setIsEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('role', role);
      data.append('company', company);
      data.append('content', content);
      data.append('rating', rating);
      data.append('order', order);

      if (avatarFile) {
        data.append('avatar', avatarFile);
      } else if (avatarPreview) {
        data.append('avatarUrl', avatarPreview);
      }

      if (currentTestimonial) {
        await updateTestimonial(currentTestimonial._id, data);
        setStatus({ type: 'success', message: 'Testimonial updated' });
      } else {
        await createTestimonial(data);
        setStatus({ type: 'success', message: 'Testimonial created' });
      }

      setIsEditing(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save testimonial' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recommendation?')) {
      try {
        await deleteTestimonial(id);
        setStatus({ type: 'success', message: 'Testimonial deleted' });
        fetchTestimonials();
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to delete' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-text">
            Testimonials & Endorsements CMS
          </h2>
          <p className="text-sm text-secondary mt-1">
            Manage client reviews, quotes, and social proof displayed on the portfolio.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
            status.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{status.message}</span>
        </div>
      )}

      {isEditing ? (
        <div className="p-6 sm:p-8 rounded-3xl glass bg-bg-secondary/95 border-2 border-theme-glow shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-theme mb-6">
            <h3 className="text-lg font-bold text-text">
              {currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl glass hover:bg-surface text-text"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Author Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Head of Product"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. HyperScale AI"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Recommendation Quote / Feedback *
              </label>
              <textarea
                rows={4}
                required
                placeholder="What did they say about your work and engineering skills?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-theme-glow bg-bg flex-shrink-0">
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-surface cursor-pointer text-xs font-semibold text-text">
                  <Upload className="w-4 h-4 text-primary" />
                  <span>Upload Avatar Photo</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              {/* Rating & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-theme flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 rounded-2xl glass hover:bg-surface text-text text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-2xl bg-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs disabled:opacity-50"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Testimonial</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item._id} className="p-6 rounded-3xl glass border border-theme flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-secondary italic line-clamp-3">"{item.content}"</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-theme">
                <div className="flex items-center gap-2.5">
                  <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-text">{item.name}</h4>
                    <p className="text-[10px] text-tertiary">{item.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="p-1.5 rounded-lg glass hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg glass hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
