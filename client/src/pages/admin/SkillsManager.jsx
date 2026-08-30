import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '../../services/api';
import {
  Zap,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Layers,
  Check,
  RotateCcw,
} from 'lucide-react';

export const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [batchInput, setBatchInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Popular tech presets for 1-click addition
  const presets = [
    'React 19', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
    'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'GraphQL', 'Redis',
    'Docker', 'AWS Cloud', 'Three.js', 'Framer Motion', 'GSAP',
    'Python', 'Prisma', 'WebSockets', 'JWT Auth', 'Cloudinary',
    'Git', 'CI/CD', 'Firebase', 'REST APIs', 'Zustand', 'React Query'
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      if (res.data.success) {
        setSkills(res.data.data?.skills || []);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load skills from database' });
    } finally {
      setLoading(false);
    }
  };

  const saveSkillsToDB = async (updatedSkills) => {
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await updateSettings({ skills: updatedSkills });
      if (res.data.success) {
        setSkills(updatedSkills);
        setStatus({ type: 'success', message: 'Skills updated and synced with portfolio!' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save skills' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e) e.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setStatus({ type: 'error', message: `"${trimmed}" is already in your skills list.` });
      return;
    }

    const updated = [...skills, trimmed];
    setNewSkill('');
    saveSkillsToDB(updated);
  };

  const handleAddBatch = (e) => {
    if (e) e.preventDefault();
    if (!batchInput.trim()) return;

    const items = batchInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const uniqueNew = items.filter(
      (item) => !skills.some((existing) => existing.toLowerCase() === item.toLowerCase())
    );

    if (uniqueNew.length === 0) {
      setStatus({ type: 'error', message: 'All entered skills already exist in list.' });
      return;
    }

    const updated = [...skills, ...uniqueNew];
    setBatchInput('');
    saveSkillsToDB(updated);
  };

  const handleAddPreset = (preset) => {
    if (skills.includes(preset)) return;
    const updated = [...skills, preset];
    saveSkillsToDB(updated);
  };

  const handleDeleteSkill = (skillToDelete) => {
    const updated = skills.filter((s) => s !== skillToDelete);
    saveSkillsToDB(updated);
  };

  const startEditing = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = editingValue.trim();
    if (!trimmed) return;

    const updated = [...skills];
    updated[editingIndex] = trimmed;
    setEditingIndex(null);
    setEditingValue('');
    saveSkillsToDB(updated);
  };

  const moveSkill = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= skills.length) return;

    const updated = [...skills];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    saveSkillsToDB(updated);
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset skills list to the recommended full-stack presets?')) {
      saveSkillsToDB(presets);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-text flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-primary" /> Skills & Tech Stack CMS
          </h2>
          <p className="text-sm text-secondary mt-1">
            Add, remove, reorder, or batch import technologies. These update both the **Infinite Skills Wheel** and the **Interactive Gravity Physics Sandbox** instantly!
          </p>
        </div>

        <button
          onClick={resetToDefaults}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-surface text-xs font-semibold text-secondary hover:text-text transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Status Alerts */}
      {status.message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold transition-all ${
            status.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Add New Skill Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Single Add */}
        <div className="p-6 rounded-3xl glass border border-theme space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Add Individual Skill
          </h3>
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Next.js 15, Docker, Three.js"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text placeholder:text-tertiary focus:outline-none focus:border-theme-glow"
            />
            <button
              type="submit"
              disabled={saving || !newSkill.trim()}
              className="px-5 py-3 rounded-2xl bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/30 hover:scale-105 transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Batch Add (Comma-separated) */}
        <div className="p-6 rounded-3xl glass border border-theme space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text flex items-center gap-2">
            <Layers className="w-4 h-4 text-secondary" /> Batch Add Multiple Skills
          </h3>
          <form onSubmit={handleAddBatch} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Redis, GraphQL, Kubernetes, Svelte"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              className="flex-grow px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text placeholder:text-tertiary focus:outline-none focus:border-theme-glow"
            />
            <button
              type="submit"
              disabled={saving || !batchInput.trim()}
              className="px-5 py-3 rounded-2xl bg-secondary text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-secondary/30 hover:scale-105 transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Import</span>
            </button>
          </form>
        </div>
      </div>

      {/* Quick-Add Popular Presets */}
      <div className="p-6 rounded-3xl glass border border-theme space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tertiary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> 1-Click Quick Add Suggestions:
          </h3>
          <span className="text-[11px] text-tertiary">Click any chip to add</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((preset) => {
            const isAdded = skills.includes(preset);
            return (
              <button
                key={preset}
                onClick={() => handleAddPreset(preset)}
                disabled={isAdded || saving}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isAdded
                    ? 'bg-primary/20 text-primary border border-primary/40 opacity-70 cursor-default'
                    : 'glass hover:border-theme-glow text-text hover:scale-105 cursor-pointer'
                }`}
              >
                {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 text-tertiary" />}
                <span>{preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Skills List with Reorder, Edit, & Delete */}
      <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text">
              Active Skills ({skills.length})
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              Click the arrows to reorder, pencil to rename, or trash to remove.
            </p>
          </div>

          {saving && (
            <span className="text-xs text-primary font-mono flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill, index) => {
            const isBeingEdited = editingIndex === index;

            return (
              <div
                key={`${skill}-${index}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-theme hover:border-theme-glow transition-all group"
              >
                {isBeingEdited ? (
                  <div className="flex items-center gap-2 flex-grow mr-2">
                    <input
                      type="text"
                      autoFocus
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      className="flex-grow px-2.5 py-1.5 rounded-lg bg-bg text-xs font-bold text-text border border-primary focus:outline-none"
                    />
                    <button
                      onClick={saveEdit}
                      className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 min-w-0 flex-grow">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-text truncate font-sans">{skill}</span>
                  </div>
                )}

                {!isBeingEdited && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Move Up */}
                    <button
                      onClick={() => moveSkill(index, -1)}
                      disabled={index === 0 || saving}
                      title="Move Left / Up"
                      className="p-1 rounded-lg text-tertiary hover:text-text disabled:opacity-20 transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => moveSkill(index, 1)}
                      disabled={index === skills.length - 1 || saving}
                      title="Move Right / Down"
                      className="p-1 rounded-lg text-tertiary hover:text-text disabled:opacity-20 transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => startEditing(index, skill)}
                      disabled={saving}
                      title="Edit skill name"
                      className="p-1 rounded-lg text-tertiary hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      disabled={saving}
                      title="Remove skill"
                      className="p-1 rounded-lg text-tertiary hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-theme rounded-2xl">
            <p className="text-secondary text-sm">No skills added yet.</p>
            <button
              onClick={resetToDefaults}
              className="mt-3 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
            >
              Add Default Full-Stack Stack
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
