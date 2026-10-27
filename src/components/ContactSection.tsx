import React, { useState } from 'react';
import { ContactInfo, InboxMessage } from '../types/portfolio';
import {
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
  ZoomIn,
  QrCode
} from 'lucide-react';

interface ContactSectionProps {
  contact: ContactInfo;
  onSubmitContact: (msg: Omit<InboxMessage, 'id' | 'createdAt' | 'status'>) => void;
  onTrackAction?: (actionName: string) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  onSubmitContact,
  onTrackAction,
  quickEditMode,
  onQuickEdit
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    onSubmitContact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || 'Portfolio Inquiry',
      message: message.trim(),
      type: 'contact'
    });

    if (onTrackAction) onTrackAction('Contact Form Submitted');

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrorMsg('');
  };

  return (
    <section id="contact" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Contact Info
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-12">
          Contact <span className="text-[#19e05f]">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-6 space-y-3.5 text-xs bg-[#09150d] p-6 rounded-3xl border border-[#16271c] shadow-xl"
          >
            <div>
              <h3 className="text-base font-semibold text-white mb-1">Send a Direct Message</h3>
              <p className="text-[#9aaaa0]">Inquiries deliver directly to Pir Bux’s portal inbox.</p>
            </div>

            {submitted && (
              <div className="p-3 bg-[#19e05f]/20 border border-[#19e05f] text-[#19e05f] rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message has been sent to Pir Bux.</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 text-red-200 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
              />
            </div>

            <div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none transition-colors"
              />
            </div>

            <div>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full p-3 bg-[#0d1511] border border-[#14231a] focus:border-[#19e05f] rounded-2xl text-white outline-none resize-y transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#19e05f] to-[#7cf0a3] hover:from-[#16c855] hover:to-[#6ae090] text-[#031007] font-semibold rounded-2xl shadow-lg shadow-[#19e05f33] flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Message →</span>
            </button>
          </form>

          {/* Direct Contact Cards */}
          <div className="lg:col-span-6 space-y-3 text-xs">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              onClick={() => onTrackAction && onTrackAction('Email Click')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <small className="block text-gray-500 text-[11px]">Email</small>
                <strong className="text-white font-medium text-xs sm:text-sm truncate block">
                  {contact.email}
                </strong>
              </div>
              <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contact.phone}`}
              onClick={() => onTrackAction && onTrackAction('Phone Call Click')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <small className="block text-gray-500 text-[11px]">Phone number</small>
                <strong className="text-white font-medium text-xs sm:text-sm">
                  {contact.phone}
                </strong>
              </div>
              <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackAction && onTrackAction('WhatsApp Connect Click')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <small className="block text-gray-500 text-[11px]">WhatsApp</small>
                <strong className="text-white font-medium text-xs sm:text-sm">
                  Message on WhatsApp
                </strong>
              </div>
              <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackAction && onTrackAction('LinkedIn Visit')}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a] hover:border-[#19e05f] hover:translate-x-1 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#0077b5] shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <small className="block text-gray-500 text-[11px]">LinkedIn</small>
                <strong className="text-white font-medium text-xs truncate block">
                  {contact.linkedinUrl.replace('https://www.', '')}
                </strong>
              </div>
              <span className="w-7 h-7 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-gray-400 group-hover:text-[#19e05f]">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a]">
              <div className="w-10 h-10 rounded-full bg-[#05100a] border border-[#1d3a28] flex items-center justify-center text-[#19e05f] shrink-0">
                <MapPin className="w-4 h-4" />
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
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1511] border border-[#14231a]">
                <button
                  type="button"
                  onClick={() => {
                    setShowQrModal(true);
                    if (onTrackAction) onTrackAction('QR Code Enlarge Viewed');
                  }}
                  className="p-1 rounded-xl bg-white shrink-0 hover:scale-105 transition-transform"
                  title="Click to enlarge QR Code"
                >
                  <img
                    src={contact.qrCodeDataUrl}
                    alt="Portfolio QR Code"
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </button>
                <div className="flex-1">
                  <strong className="block text-white font-medium text-xs sm:text-sm">
                    Scan to open my portfolio
                  </strong>
                  <small className="text-gray-400 text-[11px] leading-relaxed block mt-0.5">
                    Use it on your business card or CV. Tap to enlarge or save image.
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Lightbox Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
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
