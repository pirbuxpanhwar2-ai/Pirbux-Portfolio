import React, { useState } from 'react';
import { Mail, MessageCircle, CheckCircle2, Trash2, Reply, Star, User, Calendar, ExternalLink } from 'lucide-react';
import { InboxMessage, RecommendationItem } from '../../../types/portfolio';

interface InboxTabProps {
  messages: InboxMessage[];
  onMarkStatus: (id: string, status: InboxMessage['status']) => void;
  onDeleteMessage: (id: string) => void;
  onApproveAsRecommendation: (rec: RecommendationItem, messageId: string) => void;
}

export const InboxTab: React.FC<InboxTabProps> = ({
  messages,
  onMarkStatus,
  onDeleteMessage,
  onApproveAsRecommendation
}) => {
  const [filter, setFilter] = useState<'all' | 'contact' | 'recommendation'>('all');
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);

  const filtered = messages.filter((m) => filter === 'all' || m.type === filter);
  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const handleApprove = (msg: InboxMessage) => {
    const initials = msg.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newRec: RecommendationItem = {
      id: 'rec-' + Date.now(),
      name: msg.name,
      role: msg.roleAndCompany || 'Hospitality Colleague',
      context: msg.relationship || 'Colleague recommendation · 2026',
      quote: msg.message,
      avatarInitials: initials || 'PB',
      isApproved: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onApproveAsRecommendation(newRec, msg.id);
  };

  return (
    <div className="space-y-6 text-[#f2f7f4]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#0a180f] border border-[#16271c] rounded-2xl text-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Inquiries &amp; Testimonials Inbox</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[11px] border border-amber-500/40">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-[#9aaaa0] mt-0.5">
            Recruiter messages and peer recommendations received through your site forms
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#050e09] border border-[#1d4029] p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Messages' },
            { id: 'contact', label: 'Contact Leads' },
            { id: 'recommendation', label: 'Recommendations' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                filter === f.id
                  ? 'bg-[#19e05f] text-[#031007] font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Message list */}
        <div className="lg:col-span-5 space-y-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs bg-[#09150d] border border-[#16271c] rounded-2xl">
              No messages found in this category.
            </div>
          ) : (
            filtered.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') {
                      onMarkStatus(msg.id, 'read');
                    }
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? 'bg-[#102718] border-[#19e05f] shadow-md shadow-[#19e05f15]'
                      : msg.status === 'unread'
                      ? 'bg-[#09150d] border-[#1d5a35] hover:border-[#19e05f]'
                      : 'bg-[#060e08] border-[#16271c] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-white truncate">{msg.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">{msg.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        msg.type === 'recommendation'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-[#19e05f]/15 text-[#19e05f] border border-[#19e05f]/30'
                      }`}
                    >
                      {msg.type === 'recommendation' ? 'Peer Recommendation' : 'Job / Project Inquiry'}
                    </span>
                    {msg.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-[#19e05f] animate-pulse" />
                    )}
                  </div>

                  <p className="text-gray-300 font-medium truncate mb-1">{msg.subject}</p>
                  <p className="text-gray-400 line-clamp-2 text-[11px]">{msg.message}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Message Detail */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c] space-y-4 text-xs">
              {/* Header info */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#16271c] pb-4">
                <div>
                  <h4 className="text-base font-semibold text-white">{selectedMessage.subject}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-gray-400 text-xs">
                    <span className="text-white font-medium flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#19e05f]" />
                      {selectedMessage.name}
                    </span>
                    <span>•</span>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-[#19e05f] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-gray-500 text-[11px]">
                      <Calendar className="w-3 h-3" />
                      {selectedMessage.createdAt}
                    </span>
                  </div>

                  {selectedMessage.roleAndCompany && (
                    <div className="mt-2 text-[11px] text-gray-300">
                      <span className="text-gray-500">Role &amp; Organization:</span>{' '}
                      {selectedMessage.roleAndCompany}
                    </div>
                  )}

                  {selectedMessage.relationship && (
                    <div className="text-[11px] text-gray-300">
                      <span className="text-gray-500">Connection:</span> {selectedMessage.relationship}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteMessage(selectedMessage.id)}
                    className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/30"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-xl bg-[#050e09] border border-[#16271c] text-gray-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#143320] text-white hover:bg-[#19e05f] hover:text-[#031007] font-semibold transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Hello ${selectedMessage.name}, thank you for reaching out regarding "${selectedMessage.subject}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f2d1a] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black font-semibold transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Reply on WhatsApp</span>
                  </a>
                </div>

                {/* If recommendation: 1-click Approve to live site */}
                {selectedMessage.type === 'recommendation' && (
                  <button
                    onClick={() => handleApprove(selectedMessage)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold hover:brightness-110 shadow-md shadow-amber-500/20"
                  >
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span>Publish as Live Recommendation</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 text-xs bg-[#09150d] border border-[#16271c] rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Mail className="w-8 h-8 text-gray-600" />
              <span>Select any message from the list to view details and respond</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
