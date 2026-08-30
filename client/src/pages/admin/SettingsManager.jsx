import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings, updatePassword } from '../../services/api';
import { Save, Lock, CheckCircle2, AlertCircle, RefreshCw, User, Globe, Github, Linkedin, Twitter, Instagram, Plus, X, Zap, Radio, Code2, Headphones } from 'lucide-react';

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
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.trim().replace(',', '');
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await updateSettings({ ...formData, skills });
      if (res.data.success) {
        setStatus({ type: 'success', message: 'All settings and live statuses saved successfully!' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save' });
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: '', message: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.data.success) {
        setPasswordStatus({ type: 'success', message: 'Admin password updated successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setPasswordStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update password',
      });
    } finally {
      setSavingPassword(false);
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
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-display font-bold text-text">Portfolio Settings & Live Status</h2>
        <p className="text-sm text-secondary mt-1">
          Manage contact info, social links, dynamic skill tags, live status widget, and security.
        </p>
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

      <form onSubmit={handleSettingsSubmit} className="space-y-8">
        {/* Live Status Widget Configuration */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-6">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" /> Live Status Dynamic Island Widget
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">
                Headline Status (e.g. Crafting Next-Gen Systems)
              </label>
              <input
                type="text"
                value={formData.statusText}
                onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">
                Current Stack / Activity Focus
              </label>
              <input
                type="text"
                value={formData.currentActivity}
                onChange={(e) => setFormData({ ...formData, currentActivity: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-secondary mb-1">
                Soundtrack / Music Track Vibe
              </label>
              <input
                type="text"
                value={formData.musicTrack}
                onChange={(e) => setFormData({ ...formData, musicTrack: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm text-text font-semibold">Available for Contract / Full-Time Work</span>
              </label>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
          <h3 className="text-base font-bold text-text flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'fullName', type: 'text' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Phone', key: 'phone', type: 'text' },
              { label: 'Location', key: 'location', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold uppercase text-secondary mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            ))}
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

          <p className="text-xs text-tertiary font-mono">{skills.length} skills total</p>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={savingSettings}
            className="px-8 py-3.5 rounded-2xl bg-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs disabled:opacity-50"
          >
            {savingSettings ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Settings
          </button>
        </div>
      </form>

      {/* Password Change */}
      <div className="p-6 sm:p-8 rounded-3xl glass border border-theme space-y-5">
        <h3 className="text-base font-bold text-text flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" /> Change Admin Password
        </h3>

        {passwordStatus.message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
              passwordStatus.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {passwordStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <label className="block text-xs font-bold uppercase text-secondary mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-glow"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingPassword}
              className="px-6 py-3 rounded-2xl glass hover:bg-surface text-xs font-bold text-text transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {savingPassword ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;
