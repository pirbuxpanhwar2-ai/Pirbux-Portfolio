import React from 'react';
import { SkillCategory } from '../types/portfolio';
import { Grid, Shield, Award, Globe, ExternalLink, Edit2 } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  onSelectExperienceCard?: (index: number) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories,
  onSelectExperienceCard,
  quickEditMode,
  onQuickEdit
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="w-5 h-5 text-[#19e05f] shrink-0" />;
      case 'cap':
        return <Award className="w-5 h-5 text-[#19e05f] shrink-0" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-[#19e05f] shrink-0" />;
      default:
        return <Grid className="w-5 h-5 text-[#19e05f] shrink-0" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Skills
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-2">
          My <span className="text-[#19e05f]">Skills</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-xl mx-auto mb-2">
          What I’ve learned and developed over six years in restaurants.
        </p>
        <p className="text-xs text-center text-[#19e05f] font-medium mb-10">
          Tap a highlighted skill to see the proof.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0b160f] via-[#07100b] to-[#0e2a18] border border-[#16271c] hover:border-[#1d5a35] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <h3 className="flex items-center gap-3 font-medium text-lg text-white">
                {getIcon(cat.icon)}
                <span>{cat.name}</span>
              </h3>

              <div className="flex flex-wrap gap-2 sm:justify-end text-xs">
                {cat.skills.map((skill) => {
                  if (skill.linkTarget) {
                    return (
                      <a
                        key={skill.id}
                        href={skill.linkTarget}
                        onClick={() => {
                          if (skill.cardIndex !== undefined && onSelectExperienceCard) {
                            onSelectExperienceCard(skill.cardIndex);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1a11] border border-[#1d5a35] text-[#d8e6dd] hover:border-[#19e05f] hover:bg-[#0f2a18] transition-all"
                      >
                        <span>{skill.name}</span>
                        <span className="text-[#19e05f] text-xs">↗</span>
                      </a>
                    );
                  }
                  return (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1a11] border border-[#1d5a35] text-[#d8e6dd]"
                    >
                      <span>{skill.name}</span>
                      {skill.level && (
                        <em className="text-[#19e05f] not-italic text-[11px] font-semibold">{skill.level}</em>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
