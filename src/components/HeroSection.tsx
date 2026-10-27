import React, { useState, useEffect } from 'react';
import { ProfileHero } from '../types/portfolio';
import { Edit2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  hero: ProfileHero;
  currentLang: 'en' | 'ur';
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  currentLang,
  quickEditMode,
  onQuickEdit
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
      className="relative pt-32 pb-16 text-center bg-[radial-gradient(ellipse_60%_45%_at_50%_0,#19e05f22,transparent_70%)] overflow-hidden"
    >
      {/* Quick Edit Overlay Button */}
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-24 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#19e05f] text-[#031007] text-xs font-bold shadow-lg shadow-[#19e05f44] hover:scale-105 transition-all"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Hero Content</span>
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        {/* Open to Work Badge */}
        {hero.isOpenToWork && (
          <a
            href="#contact"
            className="inline-flex items-center flex-wrap justify-center gap-2 max-w-full mx-auto mb-6 px-4 py-1.5 border border-[#1d5a35] rounded-full bg-[#07110bcc] text-xs leading-normal hover:border-[#19e05f] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#19e05f] animate-pulse-ring" />
            <span className="text-[#19e05f] font-semibold">{hero.badgeText || 'Open to work'}</span>
            <span className="text-gray-400 font-normal">
              {hero.badgeSub || 'Restaurant Manager · Shift Manager · F&B Operations'}
            </span>
          </a>
        )}

        {/* Greeting */}
        <p className="text-sm sm:text-base text-gray-300 mb-4 font-normal">
          {hero.greeting || 'Hi! I’m Pir Bux · Making Restaurants Run Better'}
        </p>

        {/* Main Headline */}
        <h1 className="font-normal text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] max-w-2xl mx-auto mb-4">
          <span>{hero.titlePrefix || 'Hospitality &'}</span>
          <br />
          <span className="text-[#19e05f] inline-block font-medium">
            {typedText}
            <span className="inline-block w-[3px] h-[0.9em] bg-[#19e05f] ml-1 align-[-0.05em] animate-pulse" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#9aaaa0] max-w-xl mx-auto mb-10 leading-relaxed">
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

          {/* Floating Chip 1: 6 Years in Dining */}
          <div className="absolute -left-8 top-[16%] z-10 bg-[#07110bcc] backdrop-blur-md border border-[#1d5a35] rounded-2xl px-3.5 py-2 text-left text-xs leading-snug animate-bob shadow-lg">
            <b className="block text-[#19e05f] text-sm font-semibold">{hero.diningYears || '6 years'}</b>
            <span className="text-gray-300 text-[11px]">in dining</span>
          </div>

          {/* Floating Chip 2: 4 Years in Management */}
          <div
            className="absolute -right-8 top-[44%] z-10 bg-[#07110bcc] backdrop-blur-md border border-[#1d5a35] rounded-2xl px-3.5 py-2 text-left text-xs leading-snug animate-bob shadow-lg"
            style={{ animationDelay: '-2s' }}
          >
            <b className="block text-[#19e05f] text-sm font-semibold">{hero.mgmtYears || '4 years'}</b>
            <span className="text-gray-300 text-[11px]">in management</span>
          </div>

          {/* Rotating Explore Badge on the corner */}
          <a
            href="#about"
            className="absolute -right-3.5 -bottom-3.5 w-18 h-18 rounded-full bg-[#050b07] border border-[#1d3a28] flex items-center justify-center z-10 group hover:border-[#19e05f] transition-all"
            aria-label="Scroll to about section"
          >
            <svg className="absolute inset-0 w-full h-full animate-rotate" viewBox="0 0 76 76" aria-hidden="true">
              <defs>
                <path id="cp" d="M38 38m-29 0a29 29 0 1 1 58 0a29 29 0 1 1-58 0" />
              </defs>
              <text>
                <textPath href="#cp" fill="#19e05f" fontSize="9.5" letterSpacing="2" fontWeight="600">
                  EXPLORE · MORE · EXPLORE · MORE ·
                </textPath>
              </text>
            </svg>
            <span className="text-[#19e05f] text-lg">↓</span>
          </a>
        </div>

        {/* Slide navigation dots */}
        {hero.slides && hero.slides.length > 1 && (
          <div className="flex gap-2 justify-center mt-8">
            {hero.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex ? 'w-6 bg-[#19e05f]' : 'w-2 bg-[#24402e] hover:bg-[#1d5a35]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick Facts Row */}
        <div className="flex justify-center gap-8 sm:gap-14 flex-wrap mt-14 pt-4 border-t border-[#14231a]">
          <div className="text-center">
            <b className="block text-xl sm:text-2xl font-semibold text-[#19e05f]">{hero.diningYears || '6 years'}</b>
            <span className="text-xs text-[#9aaaa0]">in dining</span>
          </div>
          <div className="text-center">
            <b className="block text-xl sm:text-2xl font-semibold text-[#19e05f]">{hero.mgmtYears || '4 years'}</b>
            <span className="text-xs text-[#9aaaa0]">in management</span>
          </div>
          <div className="text-center">
            <b className="block text-xl sm:text-2xl font-semibold text-[#19e05f]">
              {hero.locationCity || 'Karachi'}
            </b>
            <span className="text-xs text-[#9aaaa0]">{hero.locationCountry || 'Pakistan'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
