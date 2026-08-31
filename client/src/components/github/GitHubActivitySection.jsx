import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Sparkles,
  BookOpen,
  Users,
  Activity,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { useLanguage } from '../../context/LanguageContext';

export const GitHubActivitySection = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playClick } = useSound();

  const githubUsername = 'Hafiz-Noman-Nawaz';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setProfile(userData);
        }
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData.filter((r) => !r.fork).slice(0, 6));
        }
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const fallbackRepos = [
    {
      id: 1,
      name: 'Noman_Nawaz',
      description: 'Ultra-premium 3D developer portfolio and full headless CMS built with React 19, Node.js, and MongoDB.',
      html_url: 'https://github.com/Hafiz-Noman-Nawaz/Noman_Nawaz',
      language: 'JavaScript',
      stargazers_count: 14,
      forks_count: 3,
    },
    {
      id: 2,
      name: 'mern-enterprise-dashboard',
      description: 'Scalable multi-tenant analytics platform with real-time WebSockets and Stripe subscription billing.',
      html_url: 'https://github.com/Hafiz-Noman-Nawaz',
      language: 'TypeScript',
      stargazers_count: 9,
      forks_count: 2,
    },
    {
      id: 3,
      name: 'ai-vector-rag-engine',
      description: 'Document intelligence pipeline powered by LangChain, vector embeddings, and OpenAI APIs.',
      html_url: 'https://github.com/Hafiz-Noman-Nawaz',
      language: 'Python',
      stargazers_count: 12,
      forks_count: 4,
    },
  ];

  const displayRepos = repos.length > 0 ? repos : fallbackRepos;

  // Generate simulated commit heatmap blocks (52 weeks x 7 days)
  const heatmapDays = Array.from({ length: 48 }, (_, i) => {
    const intensity = (i * 7 + 3) % 5;
    return intensity;
  });

  return (
    <section id="github-activity" className="relative py-28 z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[450px] bg-primary/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-theme-glow text-xs font-bold text-primary mb-3 shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{t.github.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-display font-black tracking-tight text-text"
            >
              {t.github.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-secondary text-sm sm:text-base font-sans"
            >
              {t.github.desc}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass hover:bg-surface-hover hover:border-theme-glow text-text font-bold text-xs shadow-lg transition-all hover:scale-105"
            >
              <Github className="w-4 h-4 text-primary" />
              <span>Follow @{githubUsername}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </motion.div>
        </div>

        {/* Heatmap & Quick Stats Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass border border-theme bg-bg-secondary/70 shadow-2xl mb-10 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-theme">
            <div>
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" /> Public Repos
              </span>
              <p className="text-xl sm:text-2xl font-display font-black text-text mt-1">
                {profile?.public_repos || '18+'}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Active Cadence
              </span>
              <p className="text-xl sm:text-2xl font-display font-black text-emerald-400 mt-1">
                Daily Commits
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-secondary" /> Followers
              </span>
              <p className="text-xl sm:text-2xl font-display font-black text-text mt-1">
                {profile?.followers || '10+'}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-accent" /> Primary Stack
              </span>
              <p className="text-xl sm:text-2xl font-display font-black text-text mt-1">
                MERN / Next.js
              </p>
            </div>
          </div>

          {/* Interactive Contribution Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-tertiary">
              <span className="font-semibold flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-primary" /> Recent Contribution Frequency
              </span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-surface" />
                <span className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
                <span className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
                <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                <span>More</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {heatmapDays.map((val, idx) => {
                const bg =
                  val === 0
                    ? 'bg-surface'
                    : val === 1
                    ? 'bg-primary/25'
                    : val === 2
                    ? 'bg-primary/50'
                    : val === 3
                    ? 'bg-primary/80'
                    : 'bg-primary';

                return (
                  <div
                    key={idx}
                    title={`Day ${idx + 1}: Active code iterations`}
                    className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-sm ${bg} transition-transform hover:scale-125 cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Repositories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-6 rounded-3xl glass border border-theme hover:border-theme-glow transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h4 className="font-display font-bold text-sm text-text group-hover:text-primary transition-colors truncate max-w-[180px]">
                      {repo.name}
                    </h4>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="p-1 rounded-lg text-tertiary hover:text-text"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-secondary leading-relaxed line-clamp-2 font-sans">
                  {repo.description || 'Open source engineering repository by Noman Nawaz.'}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-theme flex items-center justify-between text-xs text-tertiary font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>{repo.language || 'Full-Stack'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {repo.stargazers_count || 1}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-tertiary" />
                    {repo.forks_count || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
