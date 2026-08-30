import React, { useState, useEffect } from 'react';
import { getHero, updateHero } from '../../services/api';
import { Upload, Image as ImageIcon, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const HeroManager = () => {
  const [formData, setFormData] = useState({
    name: 'Noman Nawaz', title: '', subtitle: '', ctaText: '', ctaLink: '',
    resumeUrl: '', availableForHire: true, imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => { fetchHeroData(); }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const res = await getHero();
      if (res.data.success) { setFormData(res.data.data); setImagePreview(res.data.data.imageUrl); }
    } catch { setStatus({ type: 'error', message: 'Failed to load hero data' }); }
    finally { setLoading(false); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const data = new FormData();
      ['name', 'title', 'subtitle', 'ctaText', 'ctaLink'].forEach((k) => data.append(k, formData[k]));
      data.append('resumeUrl', formData.resumeUrl || '');
      data.append('availableForHire', formData.availableForHire);
      if (imageFile) data.append('image', imageFile);
      else if (formData.imageUrl) data.append('imageUrl', formData.imageUrl);

      const res = await updateHero(data);
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Hero section updated' });
        setFormData(res.data.data);
        setImagePreview(res.data.data.imageUrl);
        setImageFile(null);
      }
    } catch (err) { setStatus({ type: 'error', message: err.response?.data?.message || 'Save failed' }); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><RefreshCw className="w-6 h-6 text-accent animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-text">Hero Section</h2>
        <p className="text-sm text-secondary mt-1">Update the main headline, intro, and profile photo.</p>
      </div>

      {status.message && (
        <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
          status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image */}
          <div className="lg:col-span-4 space-y-3">
            <label className="block text-xs font-medium text-secondary">Profile Photo</label>
            <div className="relative rounded-2xl overflow-hidden border border-theme aspect-[3/4] bg-surface flex items-center justify-center group">
              {imagePreview ? (
                <img src={imagePreview} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4 text-tertiary">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-40" />
                  <p className="text-xs">No photo</p>
                </div>
              )}
              <label className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-opacity">
                <Upload className="w-6 h-6 text-accent" />
                <span className="text-xs text-text font-medium">Choose photo</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Fields */}
          <div className="lg:col-span-8 space-y-4">
            {[
              { label: 'Display Name', key: 'name' },
              { label: 'Title / Tagline', key: 'title' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-secondary mb-1">{f.label}</label>
                <input type="text" required value={formData[f.key]}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-hover" />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-secondary mb-1">Subtitle / Bio</label>
              <textarea rows={3} required value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-hover resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">CTA Button Text</label>
                <input type="text" value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-hover" />
              </div>
              <div>
                <label className="block text-xs font-medium text-secondary mb-1">CTA Link</label>
                <input type="text" value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-theme text-sm text-text focus:outline-none focus:border-theme-hover" />
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer pt-1">
              <input type="checkbox" checked={formData.availableForHire}
                onChange={(e) => setFormData({ ...formData, availableForHire: e.target.checked })}
                className="w-4 h-4 accent-accent rounded" />
              <span className="text-sm text-text font-medium">Show "Open to work" badge</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-theme">
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-text text-bg text-xs font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save hero
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroManager;
