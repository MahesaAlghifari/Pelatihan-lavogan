import { useState } from 'react';
import { BarChart2, Clock, Star } from 'lucide-react';

interface DayActivity {
  day: string;
  minutes: number;
  date: string;
}

const WEEKLY_DATA: DayActivity[] = [
  { day: 'Mon', minutes: 25, date: 'Aug 17, 2025' },
  { day: 'Tue', minutes: 40, date: 'Aug 18, 2025' },
  { day: 'Wed', minutes: 35, date: 'Aug 19, 2025' },
  { day: 'Thu', minutes: 50, date: 'Aug 20, 2025' },
  { day: 'Fri', minutes: 30, date: 'Aug 21, 2025' },
  { day: 'Sat', minutes: 15, date: 'Aug 22, 2025' },
  { day: 'Sun', minutes: 20, date: 'Aug 23, 2025' },
];

const Y_TICKS = ['60m', '50m', '40m', '30m', '20m', '10m', '0m'];
const MAX_MINUTES = 60;

export function LearningActivityChart() {
  const [selectedIdx, setSelectedIdx] = useState(3); // Thu (50m) highlighted by default
  const highlighted = WEEKLY_DATA[selectedIdx] ?? WEEKLY_DATA[3]!;

  return (
    <section className="w-full h-full bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between gap-3 min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
          <BarChart2 className="w-4 h-4" />
        </span>
        <h2 className="text-base font-semibold text-[#171C2B] tracking-tight">
          Learning Activity
        </h2>
      </div>

      {/* Left Stats + Subtle Vertical Divider + Right Weekly Bar Chart */}
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-stretch gap-4">
        {/* Left Stats Column (Total Learning Time + Highlighted Session) */}
        <div className="sm:w-[31%] sm:min-w-[186px] sm:border-r sm:border-[#E7ECF3] sm:pr-4 flex flex-col justify-center gap-2.5 shrink-0">
          <div className="rounded-xl bg-[#F9FBFE] border border-[#E7ECF3] px-3 py-2.5 flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white border border-[#E7ECF3] flex items-center justify-center text-[#667085] shrink-0 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-normal text-[#667085] leading-tight">
                Total Learning Time
              </p>
              <p className="text-lg font-bold text-[#171C2B] tabular-nums leading-tight mt-1">
                12.5 hours
              </p>
              <p className="text-[11px] font-normal text-[#98A2B3] leading-tight mt-0.5">
                This week
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F3F6FB] border border-[#E7ECF3] px-3 py-2.5 flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#EAF3FF] flex items-center justify-center text-[#1677F9] shrink-0 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-[#1677F9]" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-normal text-[#667085] leading-tight">
                Highlighted Session
              </p>
              <p className="text-sm font-bold text-[#171C2B] tabular-nums leading-tight mt-1">
                {highlighted.minutes} minutes
              </p>
              <p className="text-[11px] font-normal text-[#667085] leading-tight mt-0.5">
                {highlighted.date}
              </p>
            </div>
          </div>
        </div>

        {/* Right Weekly Vertical Bar Chart (Compact grouped bars Mon - Sun) */}
        <div className="flex-1 min-w-0 min-h-[150px] flex flex-col justify-end">
          <div className="flex-1 min-h-0 flex items-stretch gap-2">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-[10px] font-medium text-[#98A2B3] tabular-nums py-0.5 select-none shrink-0 text-right w-7">
              {Y_TICKS.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>

            {/* Full-width horizontal guides + Tightly grouped 7 bars */}
            <div className="flex-1 min-w-0 relative flex flex-col justify-end">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-0.5">
                {Y_TICKS.map((tick) => (
                  <div
                    key={tick}
                    className="border-t border-dashed border-[#E7ECF3] w-full"
                  />
                ))}
              </div>

              <div className="relative z-10 h-full w-full grid grid-cols-7 items-end gap-2 sm:gap-3 px-1 sm:px-2 pt-5 pb-0.5">
                {WEEKLY_DATA.map((item, idx) => {
                  const isActive = idx === selectedIdx;
                  const heightPercent = Math.round(
                    (item.minutes / MAX_MINUTES) * 100
                  );

                  return (
                    <button
                      key={item.day}
                      type="button"
                      aria-label={`${item.day}: ${item.minutes} minutes`}
                      onClick={() => setSelectedIdx(idx)}
                      className="group h-full w-full flex flex-col items-center justify-end gap-1 focus:outline-none"
                    >
                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#1677F9] text-white text-[10px] font-semibold tabular-nums shadow-xs">
                          {item.minutes}m
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-[#475467] tabular-nums">
                          {item.minutes}m
                        </span>
                      )}

                      <div
                        className={`w-full max-w-[52px] rounded-t-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-t from-[#1677F9] to-[#55A8F5] shadow-xs'
                            : 'bg-[#DCEAFE] group-hover:bg-[#BFD9FC]'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* X-Axis Day Labels (aligned directly under full-width distributed bars) */}
          <div className="flex items-center gap-2 pt-1.5 shrink-0">
            <span className="w-7 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-full grid grid-cols-7 gap-2 sm:gap-3 px-1 sm:px-2 text-center">
                {WEEKLY_DATA.map((item, idx) => (
                  <span
                    key={item.day}
                    className={`text-[11px] ${
                      idx === selectedIdx
                        ? 'font-semibold text-[#171C2B]'
                        : 'font-normal text-[#667085]'
                    }`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
