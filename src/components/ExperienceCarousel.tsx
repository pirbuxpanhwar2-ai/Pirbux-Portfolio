import React, { useState, useEffect, useRef } from 'react';
import { ExperienceItem } from '../types/portfolio';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

interface ExperienceCarouselProps {
  experience: ExperienceItem[];
  selectedIndex?: number;
  onSelectIndex?: (index: number) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const ExperienceCarousel: React.FC<ExperienceCarouselProps> = ({
  experience,
  selectedIndex,
  onSelectIndex,
  quickEditMode,
  onQuickEdit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeIdx = selectedIndex !== undefined ? selectedIndex : currentIndex;

  const scrollToCard = (idx: number) => {
    const nextIdx = (idx + experience.length) % experience.length;
    setCurrentIndex(nextIdx);
    if (onSelectIndex) onSelectIndex(nextIdx);

    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.xp-card');
      const targetCard = cards[nextIdx] as HTMLElement;
      if (targetCard) {
        trackRef.current.scrollTo({
          left: targetCard.offsetLeft - (trackRef.current.clientWidth - targetCard.offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex !== currentIndex) {
      scrollToCard(selectedIndex);
    }
  }, [selectedIndex]);

  // Auto advance every 6 seconds
  useEffect(() => {
    if (isPaused || experience.length <= 1) return;
    const interval = setInterval(() => {
      scrollToCard(activeIdx + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused, experience.length]);

  return (
    <section id="experience" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Experience
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5 text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-normal mb-2">
          My <span className="text-[#19e05f]">Experience</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#9aaaa0] max-w-xl mx-auto">
          Where I’ve worked and what I’ve run, from assistant manager to business owner.
        </p>
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-[10vw] scrollbar-none [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        {experience.map((item, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <article
              key={item.id || idx}
              onClick={() => scrollToCard(idx)}
              className={`xp-card shrink-0 w-[min(380px,82vw)] snap-center rounded-[28px] p-6 sm:p-8 cursor-pointer transition-all duration-500 border ${
                isSelected
                  ? 'bg-gradient-to-br from-[#12241b] to-[#07100b] border-[#1d5a35] scale-100 opacity-100 shadow-[0_20px_50px_rgba(25,224,95,0.14)]'
                  : 'bg-gradient-to-br from-[#0f1d15] to-[#060d09] border-[#16271c] scale-95 opacity-55 hover:opacity-80'
              }`}
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#19e05f] mb-2 leading-none font-mono">
                {item.number || `0${idx + 1}`}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{item.role}</h3>

              <table className="w-full border-collapse text-xs leading-relaxed text-left">
                <tbody>
                  <tr className="border-t border-[#16271c]">
                    <th className="py-2.5 pr-2.5 w-16 text-[#19e05f] uppercase tracking-wider font-semibold text-[10px] align-top">
                      Period
                    </th>
                    <td className="py-2.5 text-gray-300">{item.period}</td>
                  </tr>
                  <tr className="border-t border-[#16271c]">
                    <th className="py-2.5 pr-2.5 w-16 text-[#19e05f] uppercase tracking-wider font-semibold text-[10px] align-top">
                      Company
                    </th>
                    <td className="py-2.5 text-gray-300 font-medium">{item.company}</td>
                  </tr>
                  <tr className="border-t border-[#16271c]">
                    <th className="py-2.5 pr-2.5 w-16 text-[#19e05f] uppercase tracking-wider font-semibold text-[10px] align-top">
                      Details
                    </th>
                    <td className="py-2.5 text-gray-300 leading-relaxed">{item.details}</td>
                  </tr>
                </tbody>
              </table>
            </article>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => scrollToCard(activeIdx - 1)}
          className="w-10 h-10 rounded-full border border-[#1d3a28] bg-[#0a1510] text-white hover:border-[#19e05f] flex items-center justify-center transition-colors"
          aria-label="Previous experience"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {experience.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIdx ? 'w-6 bg-[#19e05f]' : 'w-2 bg-[#24402e] hover:bg-[#1d5a35]'
              }`}
              aria-label={`Go to experience ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToCard(activeIdx + 1)}
          className="w-10 h-10 rounded-full border border-[#1d3a28] bg-[#0a1510] text-white hover:border-[#19e05f] flex items-center justify-center transition-colors"
          aria-label="Next experience"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
