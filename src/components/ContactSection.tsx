import React, { useState } from 'react';
import { ContactInfo } from '../types/portfolio';
import {
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  MapPin,
  ArrowUpRight,
  ZoomIn
} from 'lucide-react';

interface ContactSectionProps {
  contact: ContactInfo;
  onTrackAction?: (actionName: string) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  onTrackAction,
  quickEditMode,
  onQuickEdit
}) => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <section id="contact" className="py-8 sm:py-10 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-2 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Contact Info
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-1.5">
          Contact <span className="text-[#19e05f]">Me</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-xl mx-auto mb-6 sm:mb-8 leading-normal">
          Get in touch directly for restaurant management roles, shift leadership, or consultation.
        </p>

        {/* Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 max-w-3xl mx-auto text-xs">
          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            onClick={() => onTrackAction && onTrackAction('Email Click')}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group shadow-md"
          >
            <div className="w-11 h-11 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <small className="block text-gray-500 text-[11px]">Email</small>
              <strong className="text-white font-medium text-xs sm:text-sm truncate block">
                {contact.email}
              </strong>
            </div>
            <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${contact.phone}`}
            onClick={() => onTrackAction && onTrackAction('Phone Call Click')}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group shadow-md"
          >
            <div className="w-11 h-11 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <small className="block text-gray-500 text-[11px]">Phone number</small>
              <strong className="text-white font-medium text-xs sm:text-sm">
                {contact.phone}
              </strong>
            </div>
            <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackAction && onTrackAction('WhatsApp Connect Click')}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group shadow-md"
          >
            <div className="w-11 h-11 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <small className="block text-gray-500 text-[11px]">WhatsApp</small>
              <strong className="text-white font-medium text-xs sm:text-sm">
                Message on WhatsApp
              </strong>
            </div>
            <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackAction && onTrackAction('LinkedIn Visit')}
            className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group shadow-md"
          >
            <div className="w-11 h-11 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#0077b5] shrink-0">
              <Linkedin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <small className="block text-gray-500 text-[11px]">LinkedIn</small>
              <strong className="text-white font-medium text-xs truncate block">
                {contact.linkedinUrl.replace('https://www.', '')}
              </strong>
            </div>
            <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Location */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] shadow-md">
            <div className="w-11 h-11 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <small className="block text-gray-500 text-[11px]">Location</small>
              <strong className="text-white font-medium text-xs sm:text-sm">
                {contact.locationAddress}
              </strong>
            </div>
          </div>

          {/* QR Code Card */}
          {contact.qrCodeDataUrl && (
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0d1511] border border-[#14231a] shadow-md">
              <button
                type="button"
                onClick={() => {
                  setShowQrModal(true);
                  if (onTrackAction) onTrackAction('QR Code Enlarge Viewed');
                }}
                className="p-1 rounded-xl bg-white shrink-0 hover:scale-105 transition-transform cursor-zoom-in"
                title="Click to enlarge QR Code"
              >
                <img
                  src={contact.qrCodeDataUrl}
                  alt="Portfolio QR Code"
                  className="w-14 h-14 object-contain rounded-lg"
                />
              </button>
              <div className="flex-1 min-w-0">
                <strong className="block text-white font-medium text-xs sm:text-sm">
                  Scan to open my portfolio
                </strong>
                <small className="text-gray-400 text-[11px] leading-relaxed block mt-0.5">
                  Tap to view larger or save for CV.
                </small>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Lightbox Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 bg-[#07110b] border border-[#1d5a35] rounded-3xl text-center space-y-4 max-w-sm"
          >
            <h4 className="text-base font-semibold text-white">Scan Portfolio QR Code</h4>
            <div className="p-3 bg-white rounded-2xl inline-block shadow-2xl">
              <img src={contact.qrCodeDataUrl} alt="QR Code" className="w-56 h-56 object-contain" />
            </div>
            <p className="text-xs text-[#9aaaa0]">
              Scan with your phone camera to open Pir Bux’s portfolio instantly.
            </p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-[#143320] text-white hover:bg-[#19e05f] hover:text-[#031007] font-semibold text-xs rounded-xl transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
