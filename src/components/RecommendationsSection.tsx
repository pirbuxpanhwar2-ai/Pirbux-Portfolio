import React, { useState, useEffect, useRef } from 'react';
import { RecommendationItem, InboxMessage } from '../types/portfolio';
import { ChevronLeft, ChevronRight, Send, CheckCircle2, Linkedin, Edit2 } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [relationship, setRelationship] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const approvedRecs = recommendations.filter((r) => r.isApproved);

  const scrollToCard = (idx: number) => {
    if (approvedRecs.length === 0) return;
    const nextIdx = (idx + approvedRecs.length) % approvedRecs.length;
    setCurrentIndex(nextIdx);

    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.rec-card');
      const targetCard = cards[nextIdx] as HTMLElement;
      if (targetCard) {
        trackRef.current.scrollTo({
          left: targetCard.offsetLeft - (trackRef.current.clientWidth - targetCard.offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  // Auto-advance carousel every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused || approvedRecs.length <= 1) return;
    const interval = setInterval(() => {
      scrollToCard(currentIndex + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, approvedRecs.length]);

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
    <section id="recommendations" className="py-8 sm:py-10 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-2 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Recommendations
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5 text-center mb-5 sm:mb-6">
        <h2 className="text-3xl sm:text-4xl font-normal mb-1.5">
          What They <span className="text-[#19e05f]">Say</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#9aaaa0] max-w-xl mx-auto leading-normal">
          Recommendations from colleagues and managers, as they appear on my LinkedIn profile.
        </p>
      </div>

      {/* Carousel Track: identical options to Experience section */}
      <div
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-[10vw] scrollbar-none [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        {approvedRecs.map((rec, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <figure
              key={rec.id || idx}
              onClick={() => scrollToCard(idx)}
              className={`rec-card shrink-0 w-[min(380px,82vw)] snap-center rounded-[28px] p-6 sm:p-8 cursor-pointer transition-all duration-500 border relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-[#12241b] to-[#07100b] border-[#1d5a35] scale-100 opacity-100 shadow-[0_20px_50px_rgba(25,224,95,0.14)]'
                  : 'bg-gradient-to-br from-[#0f1d15] to-[#060d09] border-[#16271c] scale-95 opacity-55 hover:opacity-80'
              }`}
            >
              {/* Decorative quotation mark */}
              <span className="absolute top-2 right-4 text-7xl font-serif text-[#19e05f]/15 leading-none select-none pointer-events-none">
                “
              </span>

              <blockquote className="mb-6 text-xs sm:text-sm text-[#d3dfd8] leading-relaxed relative z-1">
                <p>{rec.quote}</p>
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-[#16271c]">
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-[#031007] bg-gradient-to-br from-[#19e05f] to-[#7cf0a3] shadow-md shadow-[#19e05f22]">
                  {rec.avatarInitials || 'PB'}
                </div>
                <div className="min-w-0 flex-1 text-xs text-left">
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
          );
        })}
      </div>

      {/* Carousel Controls: identical arrows and dots to Experience section */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scrollToCard(currentIndex - 1)}
          className="w-10 h-10 rounded-full border border-[#1d3a28] bg-[#0a1510] text-white hover:border-[#19e05f] flex items-center justify-center transition-colors"
          aria-label="Previous recommendation"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {approvedRecs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-[#19e05f]' : 'w-2 bg-[#24402e] hover:bg-[#1d5a35]'
              }`}
              aria-label={`Go to recommendation ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToCard(currentIndex + 1)}
          className="w-10 h-10 rounded-full border border-[#1d3a28] bg-[#0a1510] text-white hover:border-[#19e05f] flex items-center justify-center transition-colors"
          aria-label="Next recommendation"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive "Worked with me? Recommend me" Form */}
      <div className="max-w-[1080px] mx-auto px-5 mt-8 sm:mt-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-5 sm:p-6 rounded-3xl bg-[#0a130d] border border-[#16271c] shadow-2xl text-xs space-y-3"
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
