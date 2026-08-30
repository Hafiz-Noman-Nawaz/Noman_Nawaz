import React, { useState, useEffect } from 'react';
import { getTimeline, createTimeline, updateTimeline, deleteTimeline } from '../../services/api';
import { Plus, Edit2, Trash2, Calendar, Briefcase, GraduationCap, Trophy, Save, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const TimelineManager = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form fields
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('work');
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const res = await getTimeline();
      if (res.data.success) {
        setMilestones(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load timeline milestones' });
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setCurrentMilestone(null);
    setYear(new Date().getFullYear().toString() + ' — Present');
    setTitle('');
    setCompany('');
    setDescription('');
    setType('work');
    setOrder(milestones.length + 1);
    setIsEditing(true);
  };

  const openEditForm = (item) => {
    setCurrentMilestone(item);
    setYear(item.year);
    setTitle(item.title);
    setCompany(item.company || '');
    setDescription(item.description);
    setType(item.type || 'work');
    setOrder(item.order || 0);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = { year, title, company, description, type, order };

      if (currentMilestone) {
        await updateTimeline(currentMilestone._id, payload);
        setStatus({ type: 'success', message: 'Milestone updated' });
      } else {
        await createTimeline(payload);
        setStatus({ type: 'success', message: 'Milestone created' });
      }

      setIsEditing(false);
      fetchTimeline();
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this career milestone?')) {
      try {
        await deleteTimeline(id);
        setStatus({ type: 'success', message: 'Milestone deleted' });
        fetchTimeline();
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
            Career Timeline & Milestones CMS
          </h2>
          <p className="text-sm text-secondary mt-1">
            Manage your work history, education milestones, promotions, and achievements.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
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
              {currentMilestone ? 'Edit Milestone' : 'Add Career Milestone'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl glass hover:bg-surface text-text">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Period / Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024 — Present"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Milestone Title / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Full-Stack Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. HyperScale Systems"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Description of Impact & Responsibilities *
              </label>
              <textarea
                rows={3}
                required
                placeholder="What systems did you build, lead, or architect during this milestone?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Milestone Category
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                >
                  <option value="work" className="bg-bg text-text">Work Experience</option>
                  <option value="education" className="bg-bg text-text">Education & Degree</option>
                  <option value="award" className="bg-bg text-text">Award / Hackathon</option>
                  <option value="project" className="bg-bg text-text">Major Project Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
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
                <span>Save Milestone</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {milestones.map((item) => (
            <div key={item._id} className="p-6 rounded-3xl glass border border-theme flex items-center justify-between">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">{item.year}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-surface text-secondary border border-theme">
                    {item.type}
                  </span>
                </div>
                <h4 className="text-base font-bold text-text">{item.title}</h4>
                {item.company && <p className="text-xs text-secondary">{item.company}</p>}
                <p className="text-xs text-tertiary line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEditForm(item)}
                  className="p-2 rounded-xl glass hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-xl glass hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineManager;
