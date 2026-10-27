import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { CertificateItem } from '../types/portfolio';

interface CertificateLightboxProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({
  certificate,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!certificate) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = certificate.imageUrl;
    a.download = `${certificate.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[92vh] flex flex-col items-center text-center"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full border border-[#1d5a35] bg-[#07110b] text-white hover:text-[#19e05f] flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close certificate viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Image Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1d5a35] shadow-2xl bg-black">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="max-w-[90vw] max-h-[75vh] object-contain rounded-2xl"
          />
        </div>

        {/* Caption & Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-white font-medium text-sm sm:text-base">{certificate.title}</span>
          <span className="text-gray-400">•</span>
          <span className="text-[#19e05f] font-semibold">{certificate.issuer}</span>
          <button
            onClick={handleDownload}
            className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#143320] hover:bg-[#19e05f] hover:text-[#031007] text-white font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
