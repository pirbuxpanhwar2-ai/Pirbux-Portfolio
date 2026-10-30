import React from 'react';
import { CertificateItem } from '../types/portfolio';
import { ZoomIn, Award } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  onOpenLightbox: (cert: CertificateItem) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  onOpenLightbox,
  quickEditMode,
  onQuickEdit
}) => {
  return (
    <section id="certificates" className="py-8 sm:py-10 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-2 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Certificates
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-1.5">
          Certificates &amp; <span className="text-[#19e05f]">Awards</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-xl mx-auto mb-6 sm:mb-8 leading-normal">
          Recognition from my workplace and courses I’ve completed. Tap a certificate to see it larger.
        </p>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certificates.map((cert) => (
            <article
              key={cert.id}
              id={cert.id}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f1d15] to-[#060d09] border border-[#16271c] hover:border-[#1d5a35] transition-all flex flex-col group hover:-translate-y-1 shadow-lg"
            >
              {/* Thumbnail with zoom hover */}
              <button
                type="button"
                onClick={() => onOpenLightbox(cert)}
                className="relative block w-full aspect-[4/3] p-0 border-0 bg-[#0a120d] overflow-hidden cursor-zoom-in group/img"
                aria-label={`View certificate larger: ${cert.title}`}
              >
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-semibold backdrop-blur-[2px]">
                  <ZoomIn className="w-4 h-4 text-[#19e05f]" />
                  <span>Tap to Enlarge</span>
                </div>
              </button>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className={`inline-block text-[10px] tracking-widest uppercase font-semibold rounded-full px-2.5 py-0.5 mb-2 border ${
                      cert.tag === 'Award'
                        ? 'bg-[#19e05f] text-[#031007] border-[#19e05f]'
                        : 'border-[#1d5a35] text-[#19e05f] bg-[#07110b]'
                    }`}
                  >
                    {cert.tag}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-1 leading-snug">{cert.title}</h3>
                  <p className="text-xs text-[#c9d6cd] font-medium">{cert.issuer}</p>
                </div>

                <small className="block mt-3 text-[11px] text-[#9aaaa0] border-t border-[#14231a] pt-2 leading-relaxed">
                  {cert.description}
                </small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
