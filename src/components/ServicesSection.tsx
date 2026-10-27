import React, { useState } from 'react';
import { ServiceItem } from '../types/portfolio';
import {
  Table,
  BarChart3,
  Calendar,
  Wallet,
  Presentation,
  FileText,
  ArrowRight,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  whatsappNumber: string;
  currentLang: 'en' | 'ur';
  onTrackAction?: (actionName: string) => void;
  quickEditMode?: boolean;
  onQuickEdit?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  whatsappNumber,
  currentLang,
  onTrackAction,
  quickEditMode,
  onQuickEdit
}) => {
  const [metric, setMetric] = useState<'sales' | 'guests' | 'avg'>('sales');

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'chart':
        return <BarChart3 className="w-7 h-7 text-[#19e05f] mb-3" />;
      case 'cal':
        return <Calendar className="w-7 h-7 text-[#19e05f] mb-3" />;
      case 'wallet':
        return <Wallet className="w-7 h-7 text-[#19e05f] mb-3" />;
      case 'slides':
        return <Presentation className="w-7 h-7 text-[#19e05f] mb-3" />;
      case 'doc':
        return <FileText className="w-7 h-7 text-[#19e05f] mb-3" />;
      default:
        return <Table className="w-7 h-7 text-[#19e05f] mb-3" />;
    }
  };

  // Demo KPI data for the interactive sample dashboard
  const demoData = {
    sales: {
      v: [182, 165, 170, 198, 260, 342, 315],
      prev: [170, 160, 168, 185, 245, 320, 300],
      unit: 'PKR k',
      isSum: true
    },
    guests: {
      v: [96, 88, 91, 104, 138, 176, 168],
      prev: [92, 85, 90, 98, 130, 168, 160],
      unit: '',
      isSum: true
    },
    avg: {
      v: [1895, 1875, 1868, 1903, 1884, 1943, 1875],
      prev: [1847, 1882, 1866, 1887, 1884, 1904, 1875],
      unit: 'PKR',
      isSum: false
    }
  };

  const currentData = demoData[metric];
  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
  const total = currentData.isSum ? sum(currentData.v) : Math.round(sum(currentData.v) / currentData.v.length);
  const prevTotal = currentData.isSum ? sum(currentData.prev) : Math.round(sum(currentData.prev) / currentData.prev.length);
  const diffPct = (((total - prevTotal) / prevTotal) * 100).toFixed(1);
  const maxVal = Math.max(...currentData.v);
  const minVal = Math.min(...currentData.v);
  const bestDayIdx = currentData.v.indexOf(maxVal);
  const lowDayIdx = currentData.v.indexOf(minVal);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleServiceClick = (svcTitle: string) => {
    if (onTrackAction) onTrackAction(`Inquiry for ${svcTitle}`);
  };

  return (
    <section id="services" className="py-20 relative">
      {quickEditMode && (
        <button
          onClick={onQuickEdit}
          className="absolute top-4 right-8 z-10 px-2.5 py-1 rounded-full bg-[#19e05f] text-[#031007] text-[11px] font-bold shadow-md hover:scale-105"
        >
          Edit Services
        </button>
      )}

      <div className="max-w-[1080px] mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-normal text-center mb-2">
          Excel, Dashboards &amp; <span className="text-[#19e05f]">Office Documents</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#9aaaa0] max-w-2xl mx-auto mb-12 leading-relaxed">
          I transform raw data into meaningful insights, create professional Excel spreadsheets, design interactive KPI dashboards, prepare staff duty rosters, and develop well-structured budget sheets.
        </p>

        {/* 6 Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => {
            const prompt =
              currentLang === 'ur'
                ? `السلام علیکم پیر بخش، مجھے آپ کی ${svc.promptUrdu || svc.title} سروس کے بارے میں پوچھنا ہے۔`
                : `Hello Pir Bux, I would like to ask about your ${svc.whatsappPrompt || svc.title} service.`;

            return (
              <article
                key={svc.id}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#0f1d15] to-[#060d09] border border-[#16271c] hover:border-[#1d5a35] transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {getServiceIcon(svc.icon)}
                  <h3 className="text-lg font-medium text-white mb-2">{svc.title}</h3>
                  <p className="text-xs text-[#9aaaa0] leading-relaxed mb-6">{svc.description}</p>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleServiceClick(svc.title)}
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#19e05f] hover:text-[#7cf0a3]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ur' ? 'اس بارے میں پوچھیں ←' : 'Ask about this →'}</span>
                </a>
              </article>
            );
          })}
        </div>

        {/* Business Mission Quote */}
        <blockquote className="max-w-2xl mx-auto my-14 text-center text-sm sm:text-base leading-relaxed text-[#f2f7f4] p-6 sm:p-8 border border-[#1d5a35] rounded-3xl bg-[radial-gradient(circle_at_50%_120%,#19e05f22,transparent_70%)] shadow-xl">
          &quot;My goal is to help businesses improve productivity, simplify reporting, and make better decisions through organized data, smart formulas, and professional document design.&quot;
        </blockquote>

        {/* Interactive Sample KPI Dashboard */}
        <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-gradient-to-br from-[#0f1d15] to-[#060d09] border border-[#16271c] shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-[#16271c] pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-white">Sample KPI Dashboard Demo</h3>
              <small className="text-xs text-[#9aaaa0]">
                Interactive demo showing automated KPI calculations &amp; variance tracking
              </small>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#19e05f] border border-[#1d5a35] bg-[#0a180f] px-2.5 py-1 rounded-full">
              Live Demo
            </span>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex gap-2 my-4">
            {[
              { id: 'sales', label: 'Sales Revenue' },
              { id: 'guests', label: 'Guest Covers' },
              { id: 'avg', label: 'Average Check' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMetric(t.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  metric === t.id
                    ? 'bg-[#19e05f] text-[#031007] font-semibold shadow-md shadow-[#19e05f33]'
                    : 'bg-[#0a130d] border border-[#1d3a28] text-gray-300 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* KPI Stats Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-[#0a130d] border border-[#16271c]">
              <small className="block text-gray-400 text-[11px]">
                {currentData.isSum ? 'Week Total' : 'Week Average'}
              </small>
              <b className="block text-base font-semibold text-white mt-1">
                {total.toLocaleString()} {currentData.unit}
              </b>
            </div>

            <div className="p-3 rounded-2xl bg-[#0a130d] border border-[#16271c]">
              <small className="block text-gray-400 text-[11px]">Best Day</small>
              <b className="block text-base font-semibold text-[#19e05f] mt-1">
                {days[bestDayIdx]} · {maxVal.toLocaleString()}
              </b>
            </div>

            <div className="p-3 rounded-2xl bg-[#0a130d] border border-[#16271c]">
              <small className="block text-gray-400 text-[11px]">Lowest Day</small>
              <b className="block text-base font-semibold text-gray-300 mt-1">
                {days[lowDayIdx]} · {minVal.toLocaleString()}
              </b>
            </div>

            <div className="p-3 rounded-2xl bg-[#0a130d] border border-[#16271c]">
              <small className="block text-gray-400 text-[11px]">vs Last Week</small>
              <b className="block text-base font-semibold text-[#19e05f] mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +{diffPct}%
              </b>
            </div>
          </div>

          {/* Vertical Bar Chart */}
          <div className="h-44 flex items-end gap-2.5 pt-6 pb-2 border-b border-[#16271c]">
            {currentData.v.map((val, idx) => {
              const hPct = Math.max(15, Math.round((val / maxVal) * 85));
              const isBest = idx === bestDayIdx;
              return (
                <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group">
                  <span className="text-[10px] text-gray-400 group-hover:text-white font-mono">
                    {val}
                  </span>
                  <div
                    style={{ height: `${hPct}%` }}
                    className={`w-full max-w-[44px] rounded-t-lg transition-all duration-700 ${
                      isBest
                        ? 'bg-gradient-to-t from-[#16a34a] to-[#19e05f] shadow-[0_0_18px_#19e05f88]'
                        : 'bg-gradient-to-t from-[#0e3b1c] to-[#16a34a]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Days */}
          <div className="flex gap-2.5 mt-2 text-center text-xs text-[#9aaaa0]">
            {days.map((day, idx) => (
              <span key={idx} className="flex-1 font-medium text-gray-300">
                {day}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#19e05f] text-[#031007] font-semibold text-xs sm:text-sm shadow-lg shadow-[#19e05f33] hover:shadow-[#19e05f55] hover:-translate-y-0.5 transition-all"
          >
            <span>Discuss your project →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
