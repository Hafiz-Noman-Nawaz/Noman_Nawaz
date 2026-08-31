import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings, updatePassword } from '../../services/api';
import {
  Save,
  Lock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  User,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Plus,
  X,
  Zap,
  Radio,
  Code2,
  Headphones,
  Briefcase,
  Trash2,
} from 'lucide-react';

export const SettingsManager = () => {
  const [formData, setFormData] = useState({
    fullName: 'Noman Nawaz',
    email: '',
    phone: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    resumeUrl: '',
    statusText: 'Crafting Next-Gen Web Systems',
    currentActivity: 'Building with React 19, Motion & WebGL',
    musicTrack: 'Lofi Cyberpunk Coding Beats',
    isAvailable: true,
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const [hireRoles, setHireRoles] = useState([
    {
      title: 'Full-Time Senior Role',
      desc: 'Lead Full-Stack MERN / React 19 Engineer for global remote teams',
      badge: 'High Priority',
    },
    {
      title: 'Contract / MVP Sprint',
      desc: 'High-velocity architecture, 3D web applications, and headless CMS',
      badge: '2–6 Week Sprints',
    },
    {
      title: 'Technical Advisory & Audit',
      desc: 'Codebase refactoring, performance optimization, and MongoDB scaling',
      badge: 'Advisory',
    },
  ]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      if (res.data.success) {
        const data = res.data.data;
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          bio: data.bio || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
          resumeUrl: data.resumeUrl || '',
          statusText: data.statusText || 'Crafting Next-Gen Web Systems',
          currentActivity: data.currentActivity || 'Building with React 19, Motion & WebGL',
          musicTrack: data.musicTrack || 'Lofi Cyberpunk Coding Beats',
          isAvailable: data.isAvailable !== false,
        });
        setSkills(data.skills || []);
        if (data.hireRoles && data.hireRoles.length > 0) {
          setHireRoles(data.hireRoles);
        }
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      setStatus({ type: '', message: '' });
      const res = await updateSettings({
        ...formData,
        skills,
        hireRoles,
      });
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Settings & Fast-Track Hire Roles updated successfully!' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update settings' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    try {
      setSavingPassword(true);
      setPasswordStatus({ type: '', message: '' });
      const res = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.data.success) {
        setPasswordStatus({ type: 'success', message: 'Password changed successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      console.error(err);
      setPasswordStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to change password',
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addHireRole = () => {
    setHireRoles([
      ...hireRoles,
      {
        title: 'New Service / Role',
        desc: 'Description of your service or engagement terms',
        badge: 'Available',
      },
    ]);
  };

  const updateHireRole = (index, field, value) => {
    const updated = [...hireRoles];
    updated[index][field] = value;
    setHireRoles(updated);
  };

  const removeHireRole = (index) => {
    setHireRoles(hireRoles.filter((_, idx) => idx !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-text">Global Settings & Profile Configuration</h2>
        <p className="text-secondary text-sm">
          Control your contact details, live status widget, Fast-Track Hire services, and admin credentials.
        </p>
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
            status.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{status.message}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Personal & Contact */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Identity & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Location / Availability</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-secondary mb-1">Bio</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow resize-none"
            />
          </div>
        </div>

        {/* ⚡ Fast-Track Hire Roles & Services (Dynamic CMS Module) */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-text flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" /> Fast-Track Hire Roles & Services
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                Add, edit, or customize the exact roles and services clients can select in the "Hire Me" modal.
              </p>
            </div>

            <button
              type="button"
              onClick={addHireRole}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:opacity-90"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
          </div>

          <div className="space-y-3">
            {hireRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass border border-theme space-y-3 bg-surface/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold font-mono text-primary">Role #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeHireRole(idx)}
                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-tertiary mb-1">Title</label>
                    <input
                      type="text"
                      value={role.title}
                      onChange={(e) => updateHireRole(idx, 'title', e.target.value)}
                      placeholder="e.g. Full-Stack Lead Engineer"
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-theme text-xs text-text focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-tertiary mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={role.badge}
                      onChange={(e) => updateHireRole(idx, 'badge', e.target.value)}
                      placeholder="e.g. High Priority / 2-6 Weeks"
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-theme text-xs text-text focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-tertiary mb-1">Description</label>
                  <input
                    type="text"
                    value={role.desc}
                    onChange={(e) => updateHireRole(idx, 'desc', e.target.value)}
                    placeholder="Brief description of what you deliver..."
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-theme text-xs text-text focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Social Profiles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'GitHub', key: 'github', icon: Github },
              { label: 'LinkedIn', key: 'linkedin', icon: Linkedin },
              { label: 'Twitter / X', key: 'twitter', icon: Twitter },
              { label: 'Instagram', key: 'instagram', icon: Instagram },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold uppercase text-secondary mb-1 flex items-center gap-1.5">
                  <field.icon className="w-3.5 h-3.5" /> {field.label}
                </label>
                <input
                  type="url"
                  placeholder={`https://${field.key}.com/...`}
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text placeholder:text-tertiary focus:outline-none focus:border-theme-glow"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Skills Management */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Skills (Marquee & Gravity Physics Sandbox)
          </h3>
          <p className="text-xs text-secondary">
            Type a skill name and press Enter to add. These appear automatically in the Skills Wheel and Physics Gravity Sandbox!
          </p>

          <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-surface border border-theme min-h-[60px]">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/15 text-primary text-xs font-bold border border-primary/30"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Type skill + Enter..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              className="flex-grow bg-transparent text-sm text-text placeholder:text-tertiary focus:outline-none min-w-[200px]"
            />
          </div>
        </div>

        {/* Live Status Widget Settings */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <Radio className="w-4 h-4 text-secondary" /> Live Status Dynamic Island Widget
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Status Headline</label>
              <input
                type="text"
                value={formData.statusText}
                onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Soundtrack Track</label>
              <input
                type="text"
                value={formData.musicTrack}
                onChange={(e) => setFormData({ ...formData, musicTrack: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-secondary mb-1">Current Focus / Activity</label>
            <input
              type="text"
              value={formData.currentActivity}
              onChange={(e) => setFormData({ ...formData, currentActivity: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4 rounded border-theme text-primary focus:ring-primary"
            />
            <label htmlFor="isAvailable" className="text-sm font-semibold text-text cursor-pointer">
              Mark as "Available for Contracts & Roles" (Green pulsing beacon)
            </label>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={savingSettings}
          className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
        >
          {savingSettings ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>Save Global Configuration</span>
        </button>
      </form>

      {/* Password Change Form */}
      <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
        <h3 className="text-base font-bold text-text flex items-center gap-2">
          <Lock className="w-4 h-4 text-accent" /> Change Administrator Password
        </h3>

        {passwordStatus.message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
              passwordStatus.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {passwordStatus.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-secondary mb-1">Current Password</label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="w-full py-3.5 rounded-2xl glass hover:bg-surface-hover border border-theme text-text font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {savingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;
