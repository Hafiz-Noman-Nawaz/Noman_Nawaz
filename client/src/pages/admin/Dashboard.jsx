import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import HeroManager from './HeroManager';
import SkillsManager from './SkillsManager';
import ProjectsManager from './ProjectsManager';
import SettingsManager from './SettingsManager';
import MessagesManager from './MessagesManager';
import TestimonialsManager from './TestimonialsManager';
import TimelineManager from './TimelineManager';
import CertificatesManager from './CertificatesManager';
import { getMessages } from '../../services/api';
import {
  Sparkles,
  Zap,
  FolderGit2,
  Settings,
  Mail,
  MessageSquareQuote,
  Clock,
  Award,
  LogOut,
  ArrowUpRight,
  Sun,
  Moon,
} from 'lucide-react';

export const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { theme, cycleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      getMessages()
        .then((res) => {
          if (res.data.success) {
            setUnreadCount(res.data.unreadCount || 0);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'skills', label: 'Skills & Tech Stack', icon: Zap },
    { id: 'projects', label: 'Projects & Work', icon: FolderGit2 },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'timeline', label: 'Career Timeline', icon: Clock },
    { id: 'certificates', label: 'Certifications', icon: Award },
    { id: 'messages', label: 'Messages Inbox', icon: Mail, badge: unreadCount },
    { id: 'settings', label: 'Settings & Status', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-theme flex flex-col justify-between p-5 flex-shrink-0 bg-bg-secondary">
        <div className="space-y-6">
          <div>
            <span className="text-sm font-display font-bold text-text">
              noman<span className="text-primary">.</span>cms
            </span>
            <p className="text-[11px] text-tertiary mt-0.5 truncate">{user?.email}</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'text-secondary hover:text-text hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-accent text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-theme">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-secondary hover:text-text hover:bg-surface transition-colors font-medium"
          >
            <span>Live Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={cycleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-secondary hover:text-text hover:bg-surface transition-colors font-medium"
          >
            <span>Theme: {theme}</span>
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-grow p-6 sm:p-10 max-w-5xl overflow-y-auto">
        {activeTab === 'hero' && <HeroManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
        {activeTab === 'timeline' && <TimelineManager />}
        {activeTab === 'certificates' && <CertificatesManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
};

export default Dashboard;
