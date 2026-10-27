import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  currentLang: 'en' | 'ur';
  onTrackClick?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappNumber,
  currentLang,
  onTrackClick
}) => {
  const prompt =
    currentLang === 'ur'
      ? 'السلام علیکم پیر بخش، میں نے آپ کا پورٹ فولیو دیکھا ہے اور آپ سے رابطہ کرنا چاہتا ہوں۔'
      : 'Hello Pir Bux, I saw your portfolio and would like to connect.';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prompt)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onTrackClick}
      className="fixed right-5 bottom-6 z-30 flex items-center h-14 rounded-full bg-[#19e05f] text-[#031007] font-semibold text-xs sm:text-sm shadow-xl shadow-[#19e05f55] group overflow-hidden transition-all hover:pr-4"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-14 h-14 flex items-center justify-center shrink-0">
        <MessageCircle className="w-7 h-7 text-[#031007]" />
      </div>
      <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 pr-1">
        {currentLang === 'ur' ? 'واٹس ایپ پر بات کریں' : 'Chat on WhatsApp'}
      </span>
      <span className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none" />
    </a>
  );
};
