import React from 'react';
import { JourneyMilestone } from '../types/portfolio';

interface JourneySectionProps {
  journey: JourneyMilestone[];
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  journey,
  quickEditMode,
  onQuickEdit
}) => {
  return (
    <section id="journey" className="py-16 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Journey
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-2">
          My <span className="text-[#19e05f]">Journey</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-xl mx-auto mb-12">
          How I grew from assistant manager to running my own business.
        </p>

        {/* Timeline Path */}
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 list-none m-0 p-0 relative">
          {journey.map((item, idx) => (
            <li
              key={item.id || idx}
              className={`relative text-left md:text-center pt-0 md:pt-8 pl-9 md:pl-2 pb-6 md:pb-0 ${
                item.isCurrent ? 'font-medium' : ''
              }`}
            >
              {/* Node indicator */}
              <span
                className={`absolute left-0 md:left-1/2 top-1 md:top-0 -translate-x-0 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#19e05f] bg-[#050b07] z-10 ${
                  item.isCurrent ? 'bg-[#19e05f] shadow-[0_0_14px_#19e05f99]' : ''
                }`}
              />

              {/* Connecting line */}
              {idx < journey.length - 1 && (
                <>
                  {/* Desktop horizontal line */}
                  <span className="hidden md:block absolute top-[7px] left-[calc(50%+10px)] w-[calc(100%-20px)] h-[2px] bg-gradient-to-r from-[#19e05f] to-[#1d5a35]" />
                  {/* Mobile vertical line */}
                  <span className="md:hidden absolute top-5 left-[7px] w-[2px] h-[calc(100%-4px)] bg-gradient-to-b from-[#19e05f] to-[#1d5a35]" />
                </>
              )}

              {/* Text info */}
              <time className="block text-[#19e05f] text-xs font-semibold uppercase tracking-wider mb-1">
                {item.time}
              </time>
              <h3 className="text-base font-semibold text-white mb-0.5">{item.role}</h3>
              <p className="text-xs text-[#9aaaa0] leading-snug">{item.company}</p>
              {item.isCurrent && (
                <span className="inline-block mt-2 text-[10px] font-bold text-[#031007] bg-[#19e05f] rounded-full px-2.5 py-0.5 shadow-sm shadow-[#19e05f44]">
                  Current
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
