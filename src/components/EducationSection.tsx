import React from 'react';
import { EducationItem } from '../types/portfolio';
import { GraduationCap, Edit2 } from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  quickEditMode,
  onQuickEdit
}) => {
  return (
    <section id="education" className="py-8 sm:py-10 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-2 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Education
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-5 sm:mb-6">
          <span className="text-[#19e05f]">Education</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-3">
          {education.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0b160f] via-[#07100b] to-[#0e2a18] border border-[#16271c] hover:border-[#1d5a35] transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#09180f] border border-[#19e05f]/30 flex items-center justify-center text-[#19e05f] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base leading-snug">{item.institution}</h3>
                  <p className="text-xs sm:text-sm text-[#9aaaa0]">{item.degree}</p>
                </div>
              </div>

              <span className="text-xs sm:text-sm font-semibold text-[#19e05f] whitespace-nowrap px-3 py-1 rounded-full bg-[#19e05f]/10 border border-[#19e05f]/20">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
