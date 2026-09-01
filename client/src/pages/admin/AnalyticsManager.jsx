import React, { useState, useEffect } from 'react';
import { getAnalyticsStats, resetAnalytics } from '../../services/api';
import {
  BarChart3,
  Eye,
  Users,
  FileDown,
  TrendingUp,
  RefreshCw,
  Clock,
  Laptop,
  FolderGit2,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowUpRight,
  Shield,
} from 'lucide-react';

export const AnalyticsManager = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await getAnalyticsStats();
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all visitor logs? This cannot be undone.')) {
      try {
        await resetAnalytics();
        setStatusMessage('Analytics logs reset successfully.');
        fetchStats();
        setTimeout(() => setStatusMessage(''), 3000);
      } catch {
        alert('Failed to reset analytics.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-28 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <p className="text-secondary text-xs font-mono">Aggregating Visitor Intelligence...</p>
      </div>
    );
  }

  const maxDailyViews = Math.max(
    ...(stats?.viewsLast7Days?.map((d) => d.count) || [1]),
    1
  );

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-theme-glow text-[11px] font-bold text-primary mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>100% Self-Hosted & Privacy Friendly</span>
          </div>
          <h2 className="text-2xl font-bold text-text">Visitor Intelligence & Lead Analytics</h2>
          <p className="text-secondary text-xs sm:text-sm">
            Real-time telemetry on recruiter views, resume downloads, case study interest, and lead conversion rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass hover:bg-surface text-xs font-bold text-text transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Logs</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 4 Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="p-5 rounded-3xl glass border border-theme bg-surface/60 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Total Views</span>
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-text">{stats?.totalPageViews || 0}</p>
          <p className="text-[11px] text-secondary font-mono">Page impression telemetry</p>
        </div>

        {/* Unique Visitors */}
        <div className="p-5 rounded-3xl glass border border-theme bg-surface/60 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Unique Visitors</span>
            <div className="p-2.5 rounded-xl bg-secondary/20 text-secondary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-text">{stats?.uniqueVisitors || 0}</p>
          <p className="text-[11px] text-secondary font-mono">Anonymous daily hashes</p>
        </div>

        {/* Resume Downloads */}
        <div className="p-5 rounded-3xl glass border border-theme bg-surface/60 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Resume Downloads</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <FileDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-emerald-400">{stats?.resumeDownloads || 0}</p>
          <p className="text-[11px] text-secondary font-mono">PDFs saved by recruiters</p>
        </div>

        {/* Conversion Rate */}
        <div className="p-5 rounded-3xl glass border border-theme bg-surface/60 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Lead Conversion</span>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-amber-400">{stats?.conversionRate || '0.0'}%</p>
          <p className="text-[11px] text-secondary font-mono">{stats?.inquiriesCount || 0} total inquiries</p>
        </div>
      </div>

      {/* 7-Day Velocity Chart & Top Projects Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass border border-theme bg-surface/40 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-text flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> 7-Day Traffic Velocity
              </h3>
              <p className="text-xs text-secondary">Daily page views over the last 7 calendar days</p>
            </div>
          </div>

          <div className="pt-4 flex items-end justify-between gap-2 h-48 border-b border-theme pb-2">
            {stats?.viewsLast7Days?.map((d, i) => {
              const heightPercent = Math.max(Math.round((d.count / maxDailyViews) * 100), 8);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-tertiary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {d.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[36px] rounded-t-xl bg-gradient-to-t from-primary/40 to-primary hover:to-secondary transition-all shadow-md group-hover:scale-105"
                  />
                  <span className="text-[10px] font-mono text-secondary font-semibold">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Projects Leaderboard (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass border border-theme bg-surface/40 space-y-4">
          <div>
            <h3 className="text-base font-bold text-text flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-secondary" /> Most Viewed Projects
            </h3>
            <p className="text-xs text-secondary">Ranked by case study modal engagement</p>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {stats?.topProjects && stats.topProjects.length > 0 ? (
              stats.topProjects.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl glass border border-theme text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-5 h-5 rounded-lg bg-surface flex items-center justify-center font-mono font-bold text-primary text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-text truncate">{p.title}</span>
                  </div>
                  <span className="font-mono font-bold text-secondary px-2 py-0.5 rounded-md bg-surface">
                    {p.views} view{p.views !== 1 ? 's' : ''}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-tertiary text-xs">
                No project views recorded yet. Telemetry will populate as visitors explore your case studies!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Event Stream */}
      <div className="p-6 rounded-3xl glass border border-theme bg-surface/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" /> Recent Live Activity Log
            </h3>
            <p className="text-xs text-secondary">Latest 25 user interaction events</p>
          </div>
          <span className="text-[10px] font-mono text-tertiary font-bold uppercase">
            Total Logged: {stats?.recentEvents?.length || 0}
          </span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1 font-mono text-xs">
          {stats?.recentEvents && stats.recentEvents.length > 0 ? (
            stats.recentEvents.map((evt, idx) => {
              const dateFormatted = new Date(evt.createdAt).toLocaleString();
              let badgeColor = 'bg-primary/20 text-primary border-primary/40';
              let label = evt.eventType;

              if (evt.eventType === 'resume_download') {
                badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
                label = 'Resume Downloaded';
              } else if (evt.eventType === 'project_click') {
                badgeColor = 'bg-secondary/20 text-secondary border-secondary/40';
                label = 'Project Opened';
              } else if (evt.eventType === 'pageview') {
                badgeColor = 'bg-surface text-tertiary border-theme';
                label = 'Page View';
              }

              return (
                <div
                  key={evt._id || idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl glass border border-theme gap-2 text-[11px]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded-md border font-bold ${badgeColor}`}>
                      {label}
                    </span>
                    <span className="text-text font-sans font-semibold">
                      {evt.target || evt.path}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-tertiary text-[10px]">
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3 h-3" /> {evt.deviceType}
                    </span>
                    <span>{dateFormatted}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-tertiary text-xs">
              No recent events logged yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsManager;
