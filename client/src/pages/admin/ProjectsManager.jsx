import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import { Plus, Edit2, Trash2, Image, Layers, Save, X, CheckCircle2, AlertCircle, RefreshCw, Zap, Video } from 'lucide-react';

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [caseStudy, setCaseStudy] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [metricsInput, setMetricsInput] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load projects' });
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setCurrentProject(null);
    setTitle('');
    setDate(new Date().getFullYear().toString());
    setDescription('');
    setCaseStudy('');
    setLiveUrl('');
    setGithubUrl('');
    setPreviewVideo('');
    setTechStack(['React', 'Node.js', 'Tailwind CSS']);
    setMetrics(['⚡ 99/100 Lighthouse', '<30ms Latency']);
    setThumbnailFile(null);
    setThumbnailPreview('');
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
    setFeatured(false);
    setOrder(projects.length + 1);
    setIsEditing(true);
  };

  const openEditForm = (proj) => {
    setCurrentProject(proj);
    setTitle(proj.title);
    setDate(proj.date);
    setDescription(proj.description);
    setCaseStudy(proj.caseStudy || '');
    setLiveUrl(proj.liveUrl || '');
    setGithubUrl(proj.githubUrl || '');
    setPreviewVideo(proj.previewVideo || '');
    setTechStack(proj.techStack || []);
    setMetrics(proj.metrics || []);
    setThumbnailFile(null);
    setThumbnailPreview(proj.thumbnail);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery(proj.gallery || []);
    setFeatured(proj.featured || false);
    setOrder(proj.order || 0);
    setIsEditing(true);
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = techStackInput.trim().replace(',', '');
      if (val && !techStack.includes(val)) {
        setTechStack([...techStack, val]);
        setTechStackInput('');
      }
    }
  };

  const removeTech = (item) => {
    setTechStack(techStack.filter((t) => t !== item));
  };

  const handleAddMetric = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = metricsInput.trim().replace(',', '');
      if (val && !metrics.includes(val)) {
        setMetrics([...metrics, val]);
        setMetricsInput('');
      }
    }
  };

  const removeMetric = (item) => {
    setMetrics(metrics.filter((m) => m !== item));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles(files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews(previews);
    }
  };

  const removeExistingGalleryImage = (index) => {
    setExistingGallery(existingGallery.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('title', title);
      data.append('date', date);
      data.append('description', description);
      data.append('caseStudy', caseStudy);
      data.append('liveUrl', liveUrl);
      data.append('githubUrl', githubUrl);
      data.append('previewVideo', previewVideo);
      data.append('techStack', JSON.stringify(techStack));
      data.append('metrics', JSON.stringify(metrics));
      data.append('featured', featured);
      data.append('order', order);

      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      } else if (thumbnailPreview) {
        data.append('thumbnailUrl', thumbnailPreview);
      }

      if (galleryFiles.length > 0) {
        galleryFiles.forEach((f) => data.append('gallery', f));
      }
      data.append('existingGallery', JSON.stringify(existingGallery));

      if (currentProject) {
        await updateProject(currentProject._id, data);
        setStatus({ type: 'success', message: 'Project updated successfully!' });
      } else {
        await createProject(data);
        setStatus({ type: 'success', message: 'New project created successfully!' });
      }

      setIsEditing(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save project' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        setStatus({ type: 'success', message: 'Project deleted' });
        fetchProjects();
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to delete project' });
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-text">Projects & Case Studies CMS</h2>
          <p className="text-sm text-secondary mt-1">
            Manage your showcase projects, tech stacks, performance metrics, and in-depth case study markdown.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
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

      {/* Editor Form */}
      {isEditing ? (
        <div className="p-6 sm:p-8 rounded-3xl glass bg-bg-secondary/95 border-2 border-theme-glow shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-theme mb-6">
            <h3 className="text-lg font-bold text-text">
              {currentProject ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl glass hover:bg-surface text-text"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NexusAI Automation Platform"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Date / Period *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2025 - Present"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Short Description (Grid Card View) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="A concise synopsis of the project and its core impact..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow resize-none"
              />
            </div>

            {/* Tech Stack Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Tech Stack (Type and press Enter)
              </label>
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl glass border border-theme">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/15 text-primary text-xs font-mono border border-primary/30"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add tech (e.g. Redis) + Enter..."
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  className="flex-grow bg-transparent text-sm text-text focus:outline-none min-w-[200px]"
                />
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary" /> Key Impact Numbers & Metrics (Type and press Enter)
              </label>
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl glass border border-theme">
                {metrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary/15 text-secondary text-xs font-mono border border-secondary/30 font-bold"
                  >
                    {metric}
                    <button
                      type="button"
                      onClick={() => removeMetric(metric)}
                      className="hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add metric (e.g. ⚡ 99/100 Lighthouse) + Enter..."
                  value={metricsInput}
                  onChange={(e) => setMetricsInput(e.target.value)}
                  onKeyDown={handleAddMetric}
                  className="flex-grow bg-transparent text-sm text-text focus:outline-none min-w-[200px]"
                />
              </div>
            </div>

            {/* Links & Video Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-secondary" /> Hover Video Preview URL (Optional MP4/WebM)
                </label>
                <input
                  type="url"
                  placeholder="https://...video.mp4"
                  value={previewVideo}
                  onChange={(e) => setPreviewVideo(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl glass text-sm text-text focus:outline-none focus:border-theme-glow"
                />
              </div>
            </div>

            {/* Thumbnail & Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-theme">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  Thumbnail Image * (Cloudinary)
                </label>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass border-2 border-theme-glow flex items-center justify-center group bg-bg">
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Thumb" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-tertiary">
                      <Image className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <p className="text-xs">No thumbnail chosen</p>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 cursor-pointer transition-opacity">
                    <Image className="w-6 h-6 text-primary" />
                    <span className="text-xs font-semibold text-text">Choose Thumbnail</span>
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  Gallery Screenshots (Cloudinary)
                </label>
                <div className="p-4 rounded-2xl glass border border-theme min-h-[140px] flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {existingGallery.map((img, i) => (
                      <div key={`exist-${i}`} className="relative w-16 h-12 rounded-lg overflow-hidden border border-theme">
                        <img src={img} alt="gal" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryImage(i)}
                          className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-rose-500 text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {galleryPreviews.map((img, i) => (
                      <div key={`new-${i}`} className="w-16 h-12 rounded-lg overflow-hidden border border-primary">
                        <img src={img} alt="new" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <label className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl glass hover:bg-surface cursor-pointer text-xs font-semibold text-text">
                    <Plus className="w-4 h-4 text-secondary" />
                    <span>Add Gallery Screenshots</span>
                    <input type="file" multiple accept="image/*" onChange={handleGalleryChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Markdown Case Study */}
            <div className="pt-4 border-t border-theme">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
                Full Detailed Case Study (Markdown Supported)
              </label>
              <textarea
                rows={8}
                placeholder="## Problem Statement&#10;Describe the challenge...&#10;&#10;## Architecture Decisions&#10;Describe MERN stack decisions...&#10;&#10;## Key Results & Metrics"
                value={caseStudy}
                onChange={(e) => setCaseStudy(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl glass text-sm font-mono text-text focus:outline-none focus:border-theme-glow resize-y"
              />
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-theme flex items-center justify-end gap-3">
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
                className="px-8 py-3.5 rounded-2xl bg-primary text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/30 hover:scale-105 transition-all text-xs disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{currentProject ? 'Save Project Changes' : 'Create Project'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="p-5 rounded-3xl glass bg-bg-secondary/70 border border-theme flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-bg">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold glass text-white">
                    {proj.date}
                  </span>
                </div>
                <h4 className="text-base font-bold text-text line-clamp-1">{proj.title}</h4>
                <p className="text-xs text-secondary mt-1 line-clamp-2">{proj.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-theme flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {proj.techStack?.slice(0, 2).map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-bg text-secondary font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditForm(proj)}
                    className="p-2 rounded-xl glass hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-2 rounded-xl glass hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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

export default ProjectsManager;
