import React from 'react';
import { WhyCard } from '../types/portfolio';
import { ArrowUpRight, Award, Trophy, Users } from 'lucide-react';

interface WhyHireMeProps {
  cards: WhyCard[];
  onSelectExperienceCard?: (index: number) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const WhyHireMe: React.FC<WhyHireMeProps> = ({
  cards,
  onSelectExperienceCard,
  quickEditMode,
  onQuickEdit
}) => {
  return (
    <section id="why" className="py-8 sm:py-10 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-2 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit &quot;Why Hire Me&quot;
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-5">
          Why <span className="text-[#19e05f]">Hire Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card) => (
            <article
              key={card.id}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0f1d15] to-[#060d09] border border-[#16271c] hover:border-[#1d5a35] transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <span className="inline-block text-[11px] tracking-widest uppercase font-semibold text-[#19e05f] border border-[#1d5a35] rounded-full px-2.5 py-0.5 mb-2 bg-[#07110b]">
                  {card.tag}
                </span>
                <h3 className="text-lg font-medium text-white mb-1.5 leading-snug">{card.title}</h3>
                <p className="text-xs sm:text-sm text-[#9aaaa0] leading-normal mb-3">{card.description}</p>
              </div>

              <a
                href={card.linkTarget}
                onClick={(e) => {
                  if (card.targetCardIndex !== undefined && onSelectExperienceCard) {
                    onSelectExperienceCard(card.targetCardIndex);
                  }
                }}
                className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[#19e05f] hover:underline"
              >
                <span>{card.linkText}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
