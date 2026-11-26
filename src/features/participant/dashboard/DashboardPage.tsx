import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  HelpCircle,
  Play,
  Trophy,
} from 'lucide-react';
import { toast } from 'sonner';
import { LearningActivityChart } from './components/LearningActivityChart';
import {
  ModuleCompletionStatusChart,
  DEFAULT_MODULE_ITEMS,
} from './components/ModuleProgressPie';

interface ContinueItem {
  id: string;
  index: number;
  title: string;
  module: string;
  typeLabel: string;
  categoryLabel: string;
  hasCertificate: boolean;
  href: string;
}

const CONTINUE_ITEMS: ContinueItem[] = [
  {
    id: 'cl-1',
    index: 1,
    title: '01. Program Orientation Overview.mp4',
    module: 'Program Orientation',
    typeLabel: 'Video',
    categoryLabel: 'Core Module',
    hasCertificate: true,
    href: '/participant/learning',
  },
  {
    id: 'cl-2',
    index: 2,
    title: '02. Leading High-Impact Teams.mp4',
    module: 'Leadership Fundamentals',
    typeLabel: 'Video',
    categoryLabel: 'Core Module',
    hasCertificate: true,
    href: '/participant/learning',
  },
  {
    id: 'cl-3',
    index: 3,
    title: '03. Strategic Decision Making.mp4',
    module: 'Leadership Strategy',
    typeLabel: 'Video',
    categoryLabel: 'Core Module',
    hasCertificate: true,
    href: '/participant/learning',
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [featuredIdx, setFeaturedIdx] = useState(2); // 3 / 3 -> 03. Strategic Decision Making.mp4
  const featuredItem = CONTINUE_ITEMS[featuredIdx] ?? CONTINUE_ITEMS[2]!;

  const handleDownloadCertificate = () => {
    const content = `MAGANGHUB CERTIFICATE OF COMPLETION\nCertificate: Leadership Strategy Certificate\nStatus: Issued\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Leadership-Strategy-Certificate.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Downloading Leadership Strategy Certificate.');
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:h-full lg:min-h-0 lg:overflow-hidden">
      {/* Section 1 — KPI Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
        {/* Card 1: Curriculum Progress */}
        <section className="lg:col-span-5 bg-gradient-to-br from-[#156EF5] via-[#2180FA] to-[#4CA3F7] rounded-2xl p-4 sm:p-5 text-white shadow-[0_2px_10px_rgba(22,119,249,0.22)] flex flex-col justify-between gap-3 relative overflow-hidden">
          {/* Subtle decorative abstract curves & translucent geometric forms */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-8 -top-10 w-36 h-36 rounded-full bg-white/[0.08]" />
            <div className="absolute right-6 -bottom-12 w-28 h-28 rounded-full bg-white/[0.06]" />
            <svg
              viewBox="0 0 220 140"
              fill="none"
              className="absolute right-0 top-0 h-full w-[58%] opacity-90"
              preserveAspectRatio="none"
            >
              <path
                d="M70 -12C112 24 128 52 104 88C84 118 118 142 162 152H228V-12H70Z"
                fill="rgba(255,255,255,0.06)"
              />
              <path
                d="M126 -10C156 20 158 58 134 86C116 108 136 132 184 146"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="188"
                cy="34"
                r="26"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p
                className="text-base font-semibold text-white/95 tracking-tight"
                style={{ color: '#EAF3FF' }}
              >
                Curriculum Progress
              </p>
              <div className="flex flex-wrap items-baseline gap-2.5 mt-0.5">
                <span className="text-3xl font-bold tracking-tight tabular-nums text-white">
                  72%
                </span>
                <span className="text-xs font-normal text-white/85 tabular-nums">
                  18 / 25 items completed
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-2.5 bg-white/30 rounded-full overflow-hidden relative z-10">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: '72%' }}
            />
          </div>
        </section>

        {/* Card 2: Quiz & Assignment Progress */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </span>
            <h2 className="text-base font-semibold text-[#171C2B] tracking-tight">
              Quiz &amp; Assignment Progress
            </h2>
          </div>

          <div className="grid grid-cols-2 divide-x divide-[#E7ECF3]">
            {/* Section 1: Quizzes Passed */}
            <div className="pr-4 flex flex-col justify-between gap-1.5">
              <div>
                <p
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171C2B] tabular-nums leading-none"
                  style={{ color: '#171C2B' }}
                >
                  8{' '}
                  <span className="text-sm font-medium text-[#667085]">
                    / 10
                  </span>
                </p>
                <p className="text-xs font-normal text-[#667085] mt-1">
                  Quizzes Passed
                </p>
              </div>
              <div className="w-full h-1.5 bg-[#E7ECF3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16A34A] rounded-full"
                  style={{ width: '80%' }}
                />
              </div>
            </div>

            {/* Section 2: Assignments Submitted */}
            <div className="pl-4 flex flex-col justify-between gap-1.5">
              <div>
                <p
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171C2B] tabular-nums leading-none"
                  style={{ color: '#171C2B' }}
                >
                  6
                </p>
                <p className="text-xs font-normal text-[#667085] mt-1">
                  Assignments Submitted
                </p>
              </div>
              <div className="w-full h-1.5 bg-[#E7ECF3] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1677F9] rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Card 3: Certificates (Direct Access Card without Numerical Count) */}
        <section className="lg:col-span-3 bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-base font-semibold text-[#171C2B] tracking-tight truncate">
              Certificates
            </h2>
          </div>

          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-semibold text-[#171C2B] truncate leading-snug">
              Leadership Strategy Certificate
            </p>
            <p className="text-xs font-normal text-[#667085] truncate leading-snug">
              Your program completion certificate
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadCertificate}
            className="w-full h-9 px-4 rounded-xl bg-[#1677F9] hover:bg-[#1262D4] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate</span>
          </button>
        </section>
      </div>

      {/* Section 2 & Section 3 Balanced Grid */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {/* Section 2 — Learning Activity (Expanded) & Module Completion Status (Hug Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-4 lg:flex-1 lg:min-h-0">
          <div className="min-w-0 min-h-0 flex">
            <LearningActivityChart />
          </div>

          {/* Right Card: Module Completion Status Rounded Pie Chart */}
          <div className="min-h-0 flex">
            <ModuleCompletionStatusChart items={DEFAULT_MODULE_ITEMS} />
          </div>
        </div>

        {/* Section 3 — Continue Learning (50%) & Quiz & Assignments (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:flex-1 lg:min-h-0">
          {/* Left Card: Continue Learning (Focused Featured Video) */}
          <div className="min-h-0 flex">
            <section className="w-full h-full bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between gap-3 min-h-0">
              <div className="flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
                    <Play className="w-3.5 h-3.5 fill-[#1677F9]" />
                  </span>
                  <h2 className="text-base font-semibold text-[#171C2B] tracking-tight">
                    Continue Learning
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-normal text-[#667085] tabular-nums mr-1">
                    {featuredItem.index} / {CONTINUE_ITEMS.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Previous learning item"
                    onClick={() =>
                      setFeaturedIdx(
                        (prev) =>
                          (prev - 1 + CONTINUE_ITEMS.length) %
                          CONTINUE_ITEMS.length
                      )
                    }
                    className="w-7 h-7 rounded-lg border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-[#667085] flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next learning item"
                    onClick={() =>
                      setFeaturedIdx(
                        (prev) => (prev + 1) % CONTINUE_ITEMS.length
                      )
                    }
                    className="w-7 h-7 rounded-lg border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-[#171C2B] flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                onClick={() => navigate(featuredItem.href)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(featuredItem.href);
                  }
                }}
                className="flex-1 min-h-0 rounded-xl border border-[#EDF1F7] bg-[#FAFCFF] hover:bg-[#F4F8FF] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer group transition-colors"
              >
                <div className="w-full sm:w-44 2xl:w-52 aspect-[16/10] rounded-xl bg-gradient-to-br from-[#1677F9] via-[#2B86FA] to-[#60B0FA] flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden group-hover:opacity-95 transition-opacity">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-5 -bottom-5 w-20 h-20 rounded-full bg-white/15"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-4 -top-4 w-14 h-14 rounded-full bg-white/10"
                  />
                  <span className="w-11 h-11 rounded-full bg-white/95 text-[#1677F9] flex items-center justify-center shadow-sm relative z-10 group-hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 fill-[#1677F9] ml-0.5" />
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <h3 className="text-[15px] 2xl:text-base font-semibold text-[#171C2B] leading-snug group-hover:text-[#1677F9] transition-colors">
                      {featuredItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-normal text-[#667085] truncate mt-0.5">
                      Module: {featuredItem.module}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-[#E7ECF3] bg-white text-[11px] font-medium text-[#667085]">
                      <Play className="w-2.5 h-2.5" />
                      {featuredItem.typeLabel}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#EAF3FF] text-[11px] font-medium text-[#1677F9]">
                      {featuredItem.categoryLabel}
                    </span>
                    {featuredItem.hasCertificate && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#ECFDF3] text-[11px] font-medium text-[#16A34A]">
                        <Award className="w-3 h-3" />
                        Certificate
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Card: Quiz & Assignments (Two Equal Columns) */}
          <section className="w-full h-full bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between min-h-0 gap-3">
            <div className="flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#F3F6FB] border border-[#E7ECF3] text-[#171C2B] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <h2 className="text-base font-semibold text-[#171C2B] tracking-tight">
                  Quiz &amp; Assignments
                </h2>
              </div>

              <span className="text-xs font-normal text-[#667085]">
                Action Required
              </span>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Column: Latest Quiz */}
              <div className="h-full rounded-xl border border-[#E7ECF3] bg-[#F9FBFE] p-3.5 flex flex-col justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#1677F9]">
                    Latest Quiz
                  </span>
                  <h3 className="text-[13px] xl:text-sm font-semibold text-[#171C2B] leading-snug">
                    Quiz 04: Digital Transformation
                  </h3>
                  <p className="text-xs font-normal text-[#667085] truncate">
                    Module: Digital Transformation
                  </p>
                </div>

                {/* CTA Button -> Deadline Row (Relative Badge + Exact Date) */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => navigate('/participant/quiz/css-fund-video')}
                    className="w-full h-9 px-4 rounded-xl bg-[#1677F9] hover:bg-[#1262D4] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Start Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 flex-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] text-[11px] font-medium whitespace-nowrap">
                      <Clock className="w-3 h-3 shrink-0" />
                      Due in 2 days
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-normal text-[#667085] whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-[#98A2B3] shrink-0" />
                      Aug 28, 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Latest Assignment */}
              <div className="h-full rounded-xl border border-[#E7ECF3] bg-[#F9FBFE] p-3.5 flex flex-col justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#1677F9]">
                    Latest Assignment
                  </span>
                  <h3 className="text-[13px] xl:text-sm font-semibold text-[#171C2B] leading-snug">
                    Digital Strategy Case Brief
                  </h3>
                  <p className="text-xs font-normal text-[#667085] truncate">
                    Module: Leadership Strategy
                  </p>
                </div>

                {/* CTA Button -> Deadline Row (Relative Badge + Exact Date) */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => navigate('/participant/learning')}
                    className="w-full h-9 px-4 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Submit Assignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 flex-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] text-[11px] font-medium whitespace-nowrap">
                      <Clock className="w-3 h-3 shrink-0" />
                      Due in 4 days
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-normal text-[#667085] whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-[#98A2B3] shrink-0" />
                      Aug 30, 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
