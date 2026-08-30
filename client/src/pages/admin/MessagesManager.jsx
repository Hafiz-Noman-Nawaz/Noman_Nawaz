import React, { useState, useEffect } from 'react';
import { getMessages, toggleMessageRead, deleteMessage } from '../../services/api';
import { Mail, MailOpen, Trash2, CheckCircle2, AlertCircle, RefreshCw, Calendar, User, Clock } from 'lucide-react';

export const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await getMessages();
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to load inbox messages' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (msg) => {
    try {
      await toggleMessageRead(msg._id, !msg.read);
      setMessages(
        messages.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message from inbox?')) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((m) => m._id !== id));
        setStatus({ type: 'success', message: 'Message deleted' });
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to delete message' });
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

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-display font-bold tracking-tight text-text">
              Inquiry Messages Inbox
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-secondary mt-1">
            Direct messages and project inquiries submitted through your website contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-surface text-xs font-semibold text-text transition-all self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Inbox</span>
        </button>
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

      {/* Messages List */}
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-3xl glass transition-all border ${
                msg.read
                  ? 'border-theme bg-bg-secondary/60'
                  : 'border-primary/40 bg-primary/5 shadow-lg shadow-primary/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-2xl ${
                      msg.read ? 'bg-surface text-tertiary' : 'bg-primary text-white'
                    }`}
                  >
                    {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-text">{msg.name}</h4>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-tertiary">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(msg.createdAt).toLocaleDateString()} at{' '}
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg)}
                    className="p-2 rounded-xl glass hover:bg-surface text-text text-xs font-semibold transition-colors"
                  >
                    {msg.read ? 'Mark Unread' : 'Mark Read'}
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-2 rounded-xl glass hover:text-rose-400 hover:bg-surface text-text transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-text leading-relaxed font-sans whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl glass border border-theme">
          <Mail className="w-12 h-12 text-tertiary mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold text-text">No messages yet</h3>
          <p className="text-xs text-secondary mt-1">
            Inquiries sent from the frontend contact section will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
