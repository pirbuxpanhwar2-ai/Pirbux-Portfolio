import React, { useState, useEffect } from 'react';
import { ProfileHero } from '../types/portfolio';
import { Edit2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  hero: ProfileHero;
  currentLang: 'en' | 'ur';
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
  onNavigate?: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  currentLang,
  quickEditMode,
  onQuickEdit,
  onNavigate
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Slideshow timer
  useEffect(() => {
    if (!hero.slides || hero.slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % hero.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hero.slides]);

  // Typewriter effect
  useEffect(() => {
    const words = hero.typedWords && hero.typedWords.length > 0
      ? hero.typedWords
      : ['Restaurant Management', 'Team Leadership', 'Guest Service'];
    const currentWord = words[typedIndex % words.length];

    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setTypedIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, typedIndex, hero.typedWords]);

  return (
    <section
      id="top"
      className="relative pt-8 pb-6 sm:pt-10 sm:pb-8 text-center bg-[radial-gradient(ellipse_60%_45%_at_50%_0,#19e05f22,transparent_70%)] overflow-hidden"
    >
      {/* Quick Edit Overlay Button */}
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#19e05f] text-[#031007] text-xs font-bold shadow-lg shadow-[#19e05f44] hover:scale-105 transition-all"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Hero Content</span>
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        {/* Open to Work Badge - strictly shows Open to work */}
        {hero.isOpenToWork && (
          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('contact');
              }
            }}
            className="inline-flex items-center justify-center gap-2 max-w-full mx-auto mb-3 px-3.5 py-1 border border-[#1d5a35] rounded-full bg-[#07110bcc] text-xs leading-normal hover:border-[#19e05f] transition-all site-light-badge shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#19e05f] animate-pulse-ring" />
            <span className="text-[#19e05f] font-semibold">{hero.badgeText || 'Open to work'}</span>
          </a>
        )}

        {/* Greeting */}
        <p className="text-sm sm:text-base text-gray-300 mb-2 font-normal">
          {hero.greeting || 'Hi! I’m Pir Bux · Making Restaurants Run Better'}
        </p>

        {/* Main Headline - strictly single line */}
        <h1 className="font-normal text-[clamp(1.15rem,4.4vw,3.25rem)] tracking-tight leading-tight max-w-full w-full mx-auto mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
          <span>{hero.titlePrefix || 'Hospitality &'}</span>{' '}
          <span className="text-[#19e05f] inline-block font-medium whitespace-nowrap">
            {typedText}
            <span className="inline-block w-[3px] h-[0.9em] bg-[#19e05f] ml-1 align-[-0.05em] animate-pulse" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#9aaaa0] max-w-xl mx-auto mb-6 leading-normal sm:leading-relaxed">
          {hero.subtitle ||
            'I lead floor and kitchen teams in busy casual and upscale restaurants, keep service standards high, and make sure every guest has a good meal.'}
        </p>

        {/* Profile Card with Slideshow */}
        <div className="relative w-min(300px,72vw) mx-auto max-w-[300px]">
          {/* Decorative Corner Marks */}
          <div className="absolute -inset-3 z-10 pointer-events-none border border-[#19e05f]/40 rounded-3xl" />
          <div className="absolute -inset-1.5 z-0 bg-[#19e05f3a] blur-2xl rounded-3xl" />

          {/* Slides Container */}
          <div
            className="relative z-1 aspect-[6/7.4] overflow-hidden bg-[#07100b] rounded-2xl"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 36px 100%, 0 calc(100% - 36px))'
            }}
          >
            {/* Scanline beam effect */}
            <div className="absolute left-0 right-0 top-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-[#19e05f] to-transparent shadow-[0_0_14px_#19e05f] animate-scanline" />

            {/* Slides */}
            {hero.slides && hero.slides.length > 0 ? (
              hero.slides.map((slide, idx) => (
                <img
                  key={slide.id || idx}
                  src={slide.url}
                  alt={slide.alt || 'Pir Bux'}
                  style={{ objectPosition: slide.focus || '50% 18%' }}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    idx === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))
            ) : (
              <div className="w-full h-full bg-[#0b1c11] flex items-center justify-center text-gray-500 text-xs">
                No photo uploaded
              </div>
            )}

            {/* Bottom green gradient fade */}
            <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-[#19e05f2e] via-transparent to-transparent" />
          </div>

          {/* Floating Chip: 6 Years in Restaurant Management (positioned at lower section to never cover face) */}
          <div className="absolute -left-4 sm:-left-8 bottom-8 sm:bottom-12 z-10 bg-[#07110bcc] backdrop-blur-md border border-[#1d5a35] rounded-2xl px-3.5 py-2 text-left text-xs leading-snug animate-bob shadow-lg max-w-[190px]">
            <b className="block text-[#19e05f] text-sm font-semibold">{hero.diningYears || '6 years'}</b>
            <span className="text-gray-300 text-[11px] leading-tight block">in restaurant management</span>
          </div>

        </div>

        {/* Slide navigation dots */}
        {hero.slides && hero.slides.length > 1 && (
          <div className="flex gap-2 justify-center mt-5">
            {hero.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlideIndex ? 'w-6 bg-[#19e05f]' : 'w-2 bg-[#24402e] hover:bg-[#1d5a35]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
