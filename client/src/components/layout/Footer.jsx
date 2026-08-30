import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = ({ settings }) => {
  return (
    <footer className="border-t border-theme">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-tertiary">
            © {new Date().getFullYear()} Noman Nawaz
          </span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-tertiary hover:text-text transition-colors flex items-center gap-1.5"
          >
            Back to top
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
