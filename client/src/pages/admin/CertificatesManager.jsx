import React, { useState, useEffect } from 'react';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/api';
import { Plus, Edit2, Trash2, Award, Upload, Save, X, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

export const CertificatesManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form fields
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('2025');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [badgeColor, setBadgeColor] = useState('emerald');
  const [order, setOrder] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await getCertificates();
      if (res.data.success) {
        setCertificates(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load certificates' });
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setCurrentCert(null);
    setTitle('');
    setIssuer('');
    setIssueDate(new Date().getFullYear().toString());
    setCredentialUrl('');
    setBadgeColor('emerald');
    setOrder(certificates.length + 1);
    setImageFile(null);
    setImagePreview('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80');
    setIsEditing(true);
  };

  const openEditForm = (cert) => {
    setCurrentCert(cert);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setIssueDate(cert.issueDate || '2025');
    setCredentialUrl(cert.credentialUrl || '');
    setBadgeColor(cert.badgeColor || 'emerald');
    setOrder(cert.order || 0);
    setImageFile(null);
    setImagePreview(cert.image);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('title', title);
      data.append('issuer', issuer);
      data.append('issueDate', issueDate);
      data.append('credentialUrl', credentialUrl);
      data.append('badgeColor', badgeColor);
      data.append('order', order);

      if (imageFile) {
        data.append('image', imageFile);
      } else if (imagePreview) {
        data.append('imageUrl', imagePreview);
      }

      if (currentCert) {
        await updateCertificate(currentCert._id, data);
        setStatus({ type: 'success', message: 'Certificate updated' });
      } else {
        await createCertificate(data);
        setStatus({ type: 'success', message: 'Certificate created' });
      }

      setIsEditing(false);
      fetchCertificates();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save certificate' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await deleteCertificate(id);
        setStatus({ type: 'success', message: 'Certificate deleted' });
        fetchCertificates();
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
            Certifications & Accreditations CMS
          </h2>
          <p className="text-sm text-secondary mt-1">
            Manage your verified degrees, cloud certs, hackathon awards, and credential badges.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
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
              {currentCert ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="p-2 rounded-xl glass hover:bg-surface text-text">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Certification Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meta Certified Full-Stack Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meta / AWS / MongoDB"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Issue Date / Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Verification URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Holographic Badge Accent
                </label>
                <select
                  value={badgeColor}
                  onChange={(e) => setBadgeColor(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                >
                  <option value="emerald" className="bg-bg text-text">Emerald Green</option>
                  <option value="blue" className="bg-bg text-text">Royal Blue</option>
                  <option value="purple" className="bg-bg text-text">Electric Purple</option>
                  <option value="amber" className="bg-bg text-text">Amber Orange</option>
                  <option value="cyan" className="bg-bg text-text">Cyan Neon</option>
                </select>
              </div>
            </div>

            {/* Badge Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                Certificate Badge Image (Cloudinary)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden glass border-2 border-theme-glow bg-bg flex-shrink-0">
                  <img src={imagePreview} alt="Cert" className="w-full h-full object-cover" />
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-surface cursor-pointer text-xs font-semibold text-text">
                  <Upload className="w-4 h-4 text-primary" />
                  <span>Choose Badge Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
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
                <span>Save Certificate</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="p-6 rounded-3xl glass border border-theme flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="text-xs font-mono font-bold text-tertiary">{cert.issueDate}</span>
                </div>
                <h4 className="text-base font-bold text-text">{cert.title}</h4>
                <p className="text-xs text-secondary">{cert.issuer}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-theme">
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary flex items-center gap-1">
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : <span className="text-xs text-tertiary">Direct Certified</span>}

                <div className="flex items-center gap-2">
                  <button onClick={() => openEditForm(cert)} className="p-1.5 rounded-lg glass hover:text-primary transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cert._id)} className="p-1.5 rounded-lg glass hover:text-rose-400 transition-colors">
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

export default CertificatesManager;
