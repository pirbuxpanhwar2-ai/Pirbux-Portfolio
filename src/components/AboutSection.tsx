import React from 'react';
import { AboutSection as AboutType } from '../types/portfolio';
import { ArrowRight, Edit2 } from 'lucide-react';

interface AboutSectionProps {
  about: AboutType;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  quickEditMode,
  onQuickEdit
}) => {
  return (
    <section id="about" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit &quot;About Me&quot;
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-snug text-white">
            {about.heading.split('diverse dining').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    <span className="text-[#19e05f]">diverse dining</span>
                  </>
                )}
              </React.Fragment>
            ))}
          </h3>
        </div>

        <div className="lg:col-span-5 space-y-5">
          {about.paragraphs.map((p, idx) => (
            <p key={idx} className="text-sm sm:text-base text-[#9aaaa0] leading-relaxed">
              {p}
            </p>
          ))}

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d1a12] border border-[#1d3a28] hover:border-[#19e05f] text-white text-xs sm:text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-md"
          >
            <span>{about.ctaText || 'Contact me →'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
