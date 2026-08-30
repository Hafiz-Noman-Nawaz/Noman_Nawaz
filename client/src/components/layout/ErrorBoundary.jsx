import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090a0f] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 max-w-lg mb-6">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold font-display text-white mb-2">Something went wrong</h2>
            <p className="text-xs text-white/70 font-mono text-left bg-black/50 p-3 rounded-xl overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-2xl bg-primary text-white font-bold flex items-center gap-2 text-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
