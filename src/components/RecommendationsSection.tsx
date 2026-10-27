import React, { useState } from 'react';
import { RecommendationItem, InboxMessage } from '../types/portfolio';
import { Star, Send, CheckCircle2, Linkedin, Edit2 } from 'lucide-react';

interface RecommendationsSectionProps {
  recommendations: RecommendationItem[];
  onSubmitRecommendation: (msg: Omit<InboxMessage, 'id' | 'createdAt' | 'status'>) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  onSubmitRecommendation,
  quickEditMode,
  onQuickEdit
}) => {
  const [name, setName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [relationship, setRelationship] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const approvedRecs = recommendations.filter((r) => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !recommendation.trim()) {
      setErrorMsg('Please enter your name and recommendation text.');
      return;
    }

    onSubmitRecommendation({
      name: name.trim(),
      email: 'recruiter@linkedin.com',
      subject: `Colleague Recommendation from ${name.trim()}`,
      message: recommendation.trim(),
      type: 'recommendation',
      roleAndCompany: roleAndCompany.trim(),
      relationship: relationship.trim()
    });

    setSubmitted(true);
    setName('');
    setRoleAndCompany('');
    setRelationship('');
    setRecommendation('');
    setErrorMsg('');
  };

  return (
    <section id="recommendations" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Recommendations
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-2">
          What They <span className="text-[#19e05f]">Say</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-xl mx-auto mb-12">
          Recommendations from colleagues and managers, as they appear on my LinkedIn profile.
        </p>

        {/* Testimonials Masonry / Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {approvedRecs.map((rec) => (
            <figure
              key={rec.id}
              id={rec.id}
              className="break-inside-avoid p-6 rounded-3xl bg-gradient-to-br from-[#0f1d15] to-[#060d09] border border-[#16271c] hover:border-[#1d5a35] transition-all relative overflow-hidden shadow-lg group hover:-translate-y-1"
            >
              {/* Decorative quotation mark */}
              <span className="absolute top-2 right-4 text-7xl font-serif text-[#19e05f]/15 leading-none select-none pointer-events-none">
                “
              </span>

              <blockquote className="mb-4 text-xs sm:text-sm text-[#d3dfd8] leading-relaxed relative z-1">
                <p>{rec.quote}</p>
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-[#16271c]">
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-[#031007] bg-gradient-to-br from-[#19e05f] to-[#7cf0a3] shadow-md shadow-[#19e05f22]">
                  {rec.avatarInitials || 'PB'}
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  {rec.profileUrl ? (
                    <a
                      href={rec.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white hover:text-[#19e05f] flex items-center gap-1 truncate"
                    >
                      <span>{rec.name}</span>
                      <Linkedin className="w-3 h-3 text-[#0077b5]" />
                    </a>
                  ) : (
                    <span className="font-medium text-white block truncate">{rec.name}</span>
                  )}
                  <small className="block text-[11px] text-[#9aaaa0] truncate">{rec.role}</small>
                  {rec.context && (
                    <small className="block text-[10px] text-[#19e05f] mt-0.5">{rec.context}</small>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Interactive "Worked with me? Recommend me" Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto mt-16 p-6 sm:p-8 rounded-3xl bg-[#0a130d] border border-[#16271c] shadow-2xl text-xs space-y-4"
        >
          <div>
            <h3 className="text-xl font-medium text-white mb-1">
              Worked with me? <span className="text-[#19e05f]">Recommend me</span>
            </h3>
            <p className="text-gray-400">
              Write a few lines to submit directly to Pir Bux’s portfolio inbox.
            </p>
          </div>

          {submitted && (
            <div className="p-3 bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Thank you! Your recommendation has been submitted to Pir Bux for approval.
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 text-red-200 rounded-xl">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                value={roleAndCompany}
                onChange={(e) => setRoleAndCompany(e.target.value)}
                placeholder="Your role and company"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="How we know each other (e.g. worked together at Khoj Resorts)"
              className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
            />
          </div>

          <div>
            <textarea
              rows={4}
              required
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Your recommendation text..."
              className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none resize-y transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] hover:from-[#16c855] hover:to-[#6ae090] text-[#031007] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#19e05f33] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send recommendation →</span>
            </button>
            <a
              href="https://www.linkedin.com/in/pir-bux-945b58332"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#0d1a12] border border-[#1d3a28] hover:border-[#19e05f] text-white font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>Recommend on LinkedIn</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};
