import { useState } from 'react';
import {
  Compass,
  Cpu,
  Flag,
  Layers,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface ModuleDonutItem {
  id: string;
  title: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Coming Soon';
  color: string;
  icon: LucideIcon;
}

const MODULE_DONUT_ITEMS: ModuleDonutItem[] = [
  {
    id: 'mod-1',
    title: '01. Program Orientation',
    progress: 100,
    status: 'Completed',
    color: '#16A34A',
    icon: Compass,
  },
  {
    id: 'mod-2',
    title: '02. Leadership Fundamentals',
    progress: 80,
    status: 'In Progress',
    color: '#1677F9',
    icon: Users,
  },
  {
    id: 'mod-3',
    title: '03. Leadership Strategy',
    progress: 75,
    status: 'In Progress',
    color: '#0EA5E9',
    icon: Target,
  },
  {
    id: 'mod-4',
    title: '04. Digital Transformation',
    progress: 43,
    status: 'In Progress',
    color: '#6366F1',
    icon: Cpu,
  },
  {
    id: 'mod-5',
    title: '05. Capstone Project',
    progress: 0,
    status: 'Coming Soon',
    color: '#98A2B3',
    icon: Flag,
  },
];

interface ModuleProgressDonutProps {
  onViewAll: () => void;
  onSelectModule: () => void;
}

const SIZE = 180;
const CENTER = SIZE / 2;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2; // 77
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SEGMENT_COUNT = MODULE_DONUT_ITEMS.length;
const SLOT_SPAN = CIRCUMFERENCE / SEGMENT_COUNT;
const VISIBLE_GAP = 6;
const DASH_LENGTH = SLOT_SPAN - VISIBLE_GAP - STROKE;

const COMPUTED_SEGMENTS = MODULE_DONUT_ITEMS.map((item, idx) => {
  const geomStart = idx * SLOT_SPAN + VISIBLE_GAP / 2 + STROKE / 2;
  const midAngleDeg = -90 + (idx + 0.5) * (360 / SEGMENT_COUNT);
  const midAngleRad = (midAngleDeg * Math.PI) / 180;
  const iconX = CENTER + RADIUS * Math.cos(midAngleRad);
  const iconY = CENTER + RADIUS * Math.sin(midAngleRad);

  return {
    item,
    geomStart,
    iconX,
    iconY,
  };
});

export function ModuleProgressDonut({
  onViewAll,
  onSelectModule,
}: ModuleProgressDonutProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const overallCompletion = Math.round(
    MODULE_DONUT_ITEMS.reduce((acc, m) => acc + m.progress, 0) /
      MODULE_DONUT_ITEMS.length
  );

  const activeModule = hoveredId
    ? MODULE_DONUT_ITEMS.find((m) => m.id === hoveredId) ?? null
    : null;

  return (
    <section className="w-full h-full bg-white rounded-2xl border border-[#E7ECF3] p-4 xl:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between min-h-0 gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#171C2B] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </span>
          <h2 className="text-base font-semibold text-[#171C2B]">
            Module Progress
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#1677F9] hover:underline shrink-0"
        >
          View all modules &rarr;
        </button>
      </div>

      {/* Icon-Based Segmented Donut + Compact Legend */}
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
        <div className="relative shrink-0 w-[166px] h-[166px] sm:w-[174px] sm:h-[174px] aspect-square flex items-center justify-center">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width={SIZE}
            height={SIZE}
            className="w-full h-full"
            role="img"
            aria-label="Module completion donut chart"
          >
            {/* Unfilled neutral light gray circular track */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#EEF2F7"
              strokeWidth={STROKE}
            />

            {/* 5 Symmetrical Rounded Circular Arc Segments */}
            <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
              {COMPUTED_SEGMENTS.map(({ item, geomStart }) => {
                const isDimmed = hoveredId !== null && hoveredId !== item.id;
                return (
                  <circle
                    key={item.id}
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={`${DASH_LENGTH} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-geomStart}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={onSelectModule}
                    className={`cursor-pointer transition-opacity duration-200 ${
                      isDimmed ? 'opacity-35' : 'opacity-100'
                    }`}
                  />
                );
              })}
            </g>

            {/* Centered Minimal White Icons Inside Each Module Segment */}
            <g className="pointer-events-none">
              {COMPUTED_SEGMENTS.map(({ item, iconX, iconY }) => {
                const Icon = item.icon;
                const isDimmed = hoveredId !== null && hoveredId !== item.id;
                return (
                  <g
                    key={`${item.id}-icon`}
                    transform={`translate(${iconX - 7}, ${iconY - 7})`}
                    className={`transition-opacity duration-200 ${
                      isDimmed ? 'opacity-35' : 'opacity-100'
                    }`}
                  >
                    <Icon
                      width={14}
                      height={14}
                      strokeWidth={2.2}
                      color="#FFFFFF"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Centered Completion Percentage + Supporting Label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold leading-none tracking-tight text-[#171C2B] tabular-nums">
              {activeModule
                ? `${activeModule.progress}%`
                : `${overallCompletion}%`}
            </span>
            <span className="text-[11px] font-medium text-[#667085] leading-none mt-1.5">
              {activeModule ? activeModule.status : 'Completed'}
            </span>
          </div>
        </div>

        {/* Compact Legend */}
        <div className="w-full flex-1 min-w-0 divide-y divide-[#E7ECF3]/60">
          {MODULE_DONUT_ITEMS.map((item) => {
            const isHighlighted = hoveredId === item.id;
            const statusClass =
              item.status === 'Completed'
                ? 'bg-[#ECFDF3] text-[#16A34A]'
                : item.status === 'Coming Soon'
                  ? 'bg-[#F2F4F7] text-[#667085]'
                  : 'bg-[#EAF3FF] text-[#1677F9]';

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={onSelectModule}
                className={`w-full py-1.5 px-2 rounded-lg flex items-center justify-between gap-2 text-left transition-colors ${
                  isHighlighted ? 'bg-[#F3F6FB]' : 'hover:bg-[#F9FBFE]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-[#171C2B] truncate">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-[#171C2B] tabular-nums w-8 text-right">
                    {item.progress}%
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${statusClass}`}
                  >
                    {item.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
