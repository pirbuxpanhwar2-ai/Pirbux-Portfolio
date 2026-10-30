import React, { useState } from 'react';
import {
  Users,
  Eye,
  TrendingUp,
  MessageCircle,
  Download,
  Mail,
  Clock,
  Smartphone,
  Globe,
  Activity,
  ArrowUpRight,
  Filter,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { AnalyticsData } from '../../../types/portfolio';

interface AnalyticsDashboardTabProps {
  analytics: AnalyticsData;
  onRefreshMetrics?: () => void;
}

export const AnalyticsDashboardTab: React.FC<AnalyticsDashboardTabProps> = ({
  analytics,
  onRefreshMetrics
}) => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'all'>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'visitors' | 'engagement'>('views');

  const { summary, dailyTraffic, sources, devices, locations, actions, recentActivity } = analytics;

  // Real analytics metrics (no mock multipliers)
  const displayViews = summary.totalPageViews;
  const displayVisitors = summary.uniqueVisitors;
  const displayEngagement = summary.engagementActions;
  const displayWhatsapp = summary.whatsappInquiries;
  const displayDownloads = summary.downloads;

  const maxTrafficVal =
    dailyTraffic.length > 0
      ? Math.max(
          ...dailyTraffic.map((d) =>
            selectedMetric === 'views' ? d.pageViews : selectedMetric === 'visitors' ? d.uniqueVisitors : d.engagement
          ),
          1
        )
      : 1;

  return (
    <div className="space-y-6 text-[#f2f7f4]">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0a180f] border border-[#16271c] rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Site Traffic &amp; Engagement Stats</h3>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#19e05f] bg-[#19e05f]/15 px-2 py-0.5 rounded-full border border-[#19e05f]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19e05f] animate-pulse"></span>
              Live Tracking
            </span>
          </div>
          <p className="text-xs text-[#9aaaa0] mt-0.5">
            Monitor real-time visitors, conversion channels, and recruiter interaction
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#050e09] border border-[#1d4029] rounded-xl p-1 text-xs">
            {(['today', '7d', '30d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg transition-all capitalize ${
                  timeRange === range
                    ? 'bg-[#19e05f] text-[#031007] font-semibold shadow-sm shadow-[#19e05f33]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range}
              </button>
            ))}
          </div>

          {onRefreshMetrics && (
            <button
              onClick={onRefreshMetrics}
              title="Refresh Analytics"
              className="p-2 rounded-xl bg-[#0b1b11] border border-[#1d4029] hover:border-[#19e05f] text-gray-300 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Page Views */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0f2316] to-[#07110b] border border-[#1d5a35]/60 hover:border-[#19e05f] transition-all">
          <div className="flex items-center justify-between text-[#9aaaa0] text-xs">
            <span>Total Page Views</span>
            <span className="p-1.5 rounded-lg bg-[#19e05f]/10 text-[#19e05f]">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {displayViews.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {displayViews > 0 ? 'Live Tracking' : 'Active'}
            </span>
          </div>
          <p className="text-[11px] text-[#9aaaa0] mt-1">Across all devices and sources</p>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0f2316] to-[#07110b] border border-[#1d5a35]/60 hover:border-[#19e05f] transition-all">
          <div className="flex items-center justify-between text-[#9aaaa0] text-xs">
            <span>Unique Visitors</span>
            <span className="p-1.5 rounded-lg bg-[#19e05f]/10 text-[#19e05f]">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {displayVisitors.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {displayVisitors > 0 ? 'Live Tracking' : 'Active'}
            </span>
          </div>
          <p className="text-[11px] text-[#9aaaa0] mt-1">Hiring managers &amp; peers</p>
        </div>

        {/* Card 3: WhatsApp Inquiries */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0f2316] to-[#07110b] border border-[#1d5a35]/60 hover:border-[#19e05f] transition-all">
          <div className="flex items-center justify-between text-[#9aaaa0] text-xs">
            <span>WhatsApp Leads</span>
            <span className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-[#19e05f] tracking-tight">
              {displayWhatsapp.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {displayWhatsapp > 0 ? 'Active' : 'Ready'}
            </span>
          </div>
          <p className="text-[11px] text-[#9aaaa0] mt-1">Direct recruitment chats initiated</p>
        </div>

        {/* Card 4: Resume & File Downloads */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0f2316] to-[#07110b] border border-[#1d5a35]/60 hover:border-[#19e05f] transition-all">
          <div className="flex items-center justify-between text-[#9aaaa0] text-xs">
            <span>CV &amp; File Downloads</span>
            <span className="p-1.5 rounded-lg bg-[#19e05f]/10 text-[#19e05f]">
              <Download className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {displayDownloads.toLocaleString()}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {displayDownloads > 0 ? 'Active' : 'Ready'}
            </span>
          </div>
          <p className="text-[11px] text-[#9aaaa0] mt-1">Resumes and files downloaded</p>
        </div>
      </div>

      {/* Interactive Daily Traffic Chart */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base">Traffic &amp; Engagement Activity</h4>
            <span className="text-xs text-[#9aaaa0]">Visual breakdown of visitors by day</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#050e09] p-1 rounded-xl border border-[#1d4029] text-xs">
            {(['views', 'visitors', 'engagement'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  selectedMetric === m
                    ? 'bg-[#19e05f] text-[#031007] font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {m === 'views' ? 'Page Views' : m === 'visitors' ? 'Visitors' : 'Actions'}
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart visualization */}
        {dailyTraffic.length === 0 ? (
          <div className="h-44 sm:h-52 flex flex-col items-center justify-center text-center text-gray-500 text-xs border-b border-[#16271c] py-6">
            <Activity className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-gray-300 font-medium">No visitor traffic recorded yet</p>
            <p className="text-[11px] text-gray-500 max-w-sm mt-1">
              Your portfolio is clean and ready. Once you publish and share your link, real daily traffic charts will display here.
            </p>
          </div>
        ) : (
          <>
            <div className="h-44 sm:h-52 flex items-end gap-2 sm:gap-4 pt-6 pb-2 border-b border-[#16271c]">
              {dailyTraffic.map((point, idx) => {
                const val =
                  selectedMetric === 'views'
                    ? point.pageViews
                    : selectedMetric === 'visitors'
                    ? point.uniqueVisitors
                    : point.engagement;
                const pct = Math.max(12, Math.round((val / maxTrafficVal) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#050e09] border border-[#19e05f]/40 text-white text-[11px] font-medium py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {val.toLocaleString()} {selectedMetric}
                    </div>
                    <div
                      style={{ height: `${pct}%` }}
                      className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-[#0e5c2b] to-[#19e05f] hover:brightness-125 transition-all shadow-sm group-hover:shadow-[#19e05f55]"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between gap-2 sm:gap-4 mt-2 text-center text-xs text-[#9aaaa0]">
              {dailyTraffic.map((point, idx) => (
                <div key={idx} className="flex-1">
                  <span className="font-medium text-gray-300">{point.day}</span>
                  <span className="block text-[10px] text-gray-500">{point.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Grid: Traffic Sources & User Engagement Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traffic Sources */}
        <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white text-sm">Traffic Acquisition Channels</h4>
            <span className="text-xs text-[#9aaaa0]">Traffic origins</span>
          </div>

          {sources.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs bg-[#050e09] rounded-xl border border-[#16271c]">
              No referral sources logged yet. Channels (WhatsApp, LinkedIn, Search, Direct) will log automatically as people visit.
            </div>
          ) : (
            <div className="space-y-3">
              {sources.map((src, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300 font-medium">{src.name}</span>
                    <span className="text-white font-semibold">
                      {src.percentage}% <span className="text-gray-500 font-normal">({src.count})</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#050e09] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${src.percentage}%`, backgroundColor: src.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Engagement Actions Breakdown */}
        <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white text-sm">Key Engagement Events</h4>
            <span className="text-xs text-[#9aaaa0]">Recruiter actions taken</span>
          </div>

          {actions.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs bg-[#050e09] rounded-xl border border-[#16271c]">
              No visitor events recorded yet. Button clicks, CV downloads, and WhatsApp queries will show here.
            </div>
          ) : (
            <div className="space-y-2.5">
              {actions.map((act, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#050e09] border border-[#16271c] text-xs hover:border-[#1d5a35] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#19e05f]" />
                    <span className="text-gray-200">{act.action}</span>
                  </div>
                  <span className="font-semibold text-[#19e05f] bg-[#19e05f]/10 px-2 py-0.5 rounded-md">
                    {act.count} times
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid: Visitor Locations & Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Locations */}
        <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#19e05f]" />
            <h4 className="font-semibold text-white text-sm">Top Visitor Locations</h4>
          </div>

          {locations.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs bg-[#050e09] rounded-xl border border-[#16271c]">
              Geographic visitor demographics will be displayed once visitors access your live portfolio.
            </div>
          ) : (
            <div className="space-y-2.5">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#14231a] last:border-0">
                  <div>
                    <span className="text-white font-medium">{loc.city}</span>
                    <span className="text-gray-500 text-[11px] ml-1.5">{loc.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{loc.count} visits</span>
                    <span className="font-semibold text-white w-10 text-right">{loc.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Devices Breakdown */}
        <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-4 h-4 text-[#19e05f]" />
            <h4 className="font-semibold text-white text-sm">Device &amp; Platform Breakdown</h4>
          </div>

          {devices.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs bg-[#050e09] rounded-xl border border-[#16271c]">
              Device and browser platform distribution will be reported as visitors browse your site.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                {devices.map((dev, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#050e09] border border-[#16271c]">
                    <span className="block text-xl font-bold text-white">{dev.percentage}%</span>
                    <span className="text-xs text-[#9aaaa0]">{dev.device}</span>
                    <span className="block text-[10px] text-gray-500 mt-1">{dev.count} sessions</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#050e09] rounded-xl border border-[#16271c] text-xs text-[#9aaaa0]">
                <p>
                  💡 <span className="text-white font-medium">Insights:</span> Portfolio is optimized for mobile, tablet, and desktop viewing.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Real-time Activity Stream */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-[#16271c]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#19e05f]" />
            <h4 className="font-semibold text-white text-sm">Real-time Visitor Activity Log</h4>
          </div>
          <span className="text-xs text-[#9aaaa0]">Live page events</span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs bg-[#050e09] rounded-xl border border-[#16271c]">
            No activity logged yet. When visitors open your pages or click on actions, live events will appear here in real time.
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivity.slice(0, 8).map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-[#050e09] border border-[#16271c] text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-[#19e05f] shrink-0" />
                  <div>
                    <span className="font-semibold text-white mr-2">{act.action}</span>
                    <span className="text-[#9aaaa0]">{act.details}</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-500 whitespace-nowrap shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
