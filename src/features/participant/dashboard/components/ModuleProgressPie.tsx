import React, { useMemo, useState } from 'react';
import { Layers } from 'lucide-react';

export interface ModuleProgressItem {
  code: string;
  title: string;
  percentage: number;
  status: 'completed' | 'in_progress' | 'coming_soon';
}

export const DEFAULT_MODULE_ITEMS: ModuleProgressItem[] = [
  { code: '01', title: 'Program Orientation', percentage: 100, status: 'completed' },
  { code: '02', title: 'Leadership Fundamentals', percentage: 80, status: 'in_progress' },
  { code: '03', title: 'Leadership Strategy', percentage: 75, status: 'in_progress' },
  { code: '04', title: 'Digital Transformation', percentage: 43, status: 'in_progress' },
  { code: '05', title: 'Capstone Project', percentage: 0, status: 'coming_soon' },
];

interface ModuleCompletionStatusChartProps {
  items?: ModuleProgressItem[];
}

interface StatusConfig {
  key: ModuleProgressItem['status'];
  label: string;
  color: string;
  dotColor: string;
  labelColor: string;
}

const STATUS_CONFIGS: StatusConfig[] = [
  {
    key: 'completed',
    label: 'Completed',
    color: '#16A34A',
    dotColor: '#16A34A',
    labelColor: '#FFFFFF',
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    color: '#1677F9',
    dotColor: '#1677F9',
    labelColor: '#FFFFFF',
  },
  {
    key: 'coming_soon',
    label: 'Not Started',
    color: '#CBD5E1',
    dotColor: '#94A3B8',
    labelColor: '#171C2B',
  },
];

const VIEWBOX_SIZE = 200;
const CENTER = VIEWBOX_SIZE / 2;
const PIE_RADIUS = 88;
const HALF_GAP = 2.4;
const OUTER_CORNER_RADIUS = 10;

interface Point {
  x: number;
  y: number;
}

function fmt(p: Point): string {
  return `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
}

function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

function scale(v: Point, s: number): Point {
  return { x: v.x * s, y: v.y * s };
}

function radialUnit(angle: number): Point {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function normalUnit(angle: number): Point {
  return { x: -Math.sin(angle), y: Math.cos(angle) };
}

/**
 * Builds a solid pie slice with uniform parallel gaps, smoothly rounded outer corners,
 * and a softly rounded center junction so no sharp or pointed edges appear.
 */
function buildRoundedPieSlicePath(
  cx: number,
  cy: number,
  radius: number,
  startRad: number,
  endRad: number,
  halfGap: number,
  cornerRadius: number
): string {
  const c: Point = { x: cx, y: cy };
  const span = endRad - startRad;
  const midRad = (startRad + endRad) / 2;

  const u0 = radialUnit(startRad);
  const n0 = normalUnit(startRad);
  const u1 = radialUnit(endRad);
  const n1 = normalUnit(endRad);

  const rOuterSide = Math.sqrt(radius * radius - halfGap * halfGap);
  const phi = Math.asin(Math.min(0.95, halfGap / radius));
  const alpha = cornerRadius / radius;

  // Outer corner vertices on the circle perimeter along shifted rays
  const v0 = add(add(c, scale(u0, rOuterSide)), scale(n0, halfGap));
  const v1 = add(add(c, scale(u1, rOuterSide)), scale(n1, -halfGap));

  const pEdge0 = add(v0, scale(u0, -cornerRadius));
  const pArc0 = add(c, scale(radialUnit(startRad + phi + alpha), radius));

  const pArc1 = add(c, scale(radialUnit(endRad - phi - alpha), radius));
  const pEdge1 = add(v1, scale(u1, -cornerRadius));

  const arcSpan = endRad - phi - alpha - (startRad + phi + alpha);
  const largeArc = arcSpan > Math.PI ? 1 : 0;

  let pIn0: Point;
  let pIn1: Point;
  let apexCtrl: Point;

  if (span < Math.PI) {
    const rMeet = halfGap / Math.tan(span / 2);
    const rIn = rMeet + 6.5;
    pIn0 = add(add(c, scale(u0, rIn)), scale(n0, halfGap));
    pIn1 = add(add(c, scale(u1, rIn)), scale(n1, -halfGap));
    apexCtrl = add(c, scale(radialUnit(midRad), halfGap / Math.sin(span / 2)));
  } else {
    const rIn = 7;
    pIn0 = add(add(c, scale(u0, rIn)), scale(n0, halfGap));
    pIn1 = add(add(c, scale(u1, rIn)), scale(n1, -halfGap));
    apexCtrl = add(c, scale(radialUnit(midRad), halfGap * 0.75));
  }

  return [
    `M ${fmt(pIn0)}`,
    `L ${fmt(pEdge0)}`,
    `Q ${fmt(v0)} ${fmt(pArc0)}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${fmt(pArc1)}`,
    `Q ${fmt(v1)} ${fmt(pEdge1)}`,
    `L ${fmt(pIn1)}`,
    `Q ${fmt(apexCtrl)} ${fmt(pIn0)}`,
    'Z',
  ].join(' ');
}

export const ModuleCompletionStatusChart: React.FC<ModuleCompletionStatusChartProps> = ({
  items = DEFAULT_MODULE_ITEMS,
}) => {
  const [hoveredKey, setHoveredKey] = useState<ModuleProgressItem['status'] | null>(null);

  const totalModules = items.length;

  const statusMetrics = useMemo(() => {
    const raw = STATUS_CONFIGS.map((cfg) => {
      const count = items.filter((item) => item.status === cfg.key).length;
      const percentage = totalModules > 0 ? Math.round((count / totalModules) * 100) : 0;
      return {
        ...cfg,
        count,
        percentage,
      };
    });

    const activeSegments = raw.filter((seg) => seg.count > 0);
    const totalActiveCount = activeSegments.reduce((acc, seg) => acc + seg.count, 0);
    const isSingle = activeSegments.length === 1;

    let angleCursor = -Math.PI / 2;

    return raw.map((seg) => {
      if (seg.count === 0 || totalActiveCount === 0) {
        return {
          ...seg,
          path: '',
          isSingle: false,
          labelX: CENTER,
          labelY: CENTER,
        };
      }

      const portion = seg.count / totalActiveCount;
      const span = portion * Math.PI * 2;
      const startRad = angleCursor;
      const endRad = startRad + span;
      const midRad = (startRad + endRad) / 2;
      angleCursor = endRad;

      const labelRadius = span > Math.PI ? PIE_RADIUS * 0.52 : PIE_RADIUS * 0.58;
      const labelX = isSingle ? CENTER : CENTER + labelRadius * Math.cos(midRad);
      const labelY = isSingle ? CENTER : CENTER + labelRadius * Math.sin(midRad);

      const path = isSingle
        ? ''
        : buildRoundedPieSlicePath(
            CENTER,
            CENTER,
            PIE_RADIUS,
            startRad,
            endRad,
            HALF_GAP,
            OUTER_CORNER_RADIUS
          );

      return {
        ...seg,
        path,
        isSingle,
        labelX,
        labelY,
      };
    });
  }, [items, totalModules]);

  return (
    <section
      aria-label="Module Completion Status"
      className="w-full h-full bg-white rounded-2xl border border-[#E7ECF3] p-4 sm:p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] flex flex-col justify-between min-h-0"
    >
      {/* Card Header */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
          <Layers className="w-4 h-4" />
        </span>
        <h2 className="text-base font-semibold text-[#171C2B] tracking-tight whitespace-nowrap">
          Module Completion Status
        </h2>
      </div>

      {/* Main Content: Solid Rounded Pie Chart + Compact Legend (Status Name & Module Count Only) */}
      <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2.5">
        {/* Pie Visualization */}
        <div className="relative w-[150px] h-[150px] xl:w-[162px] xl:h-[162px] shrink-0 flex items-center justify-center">
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className="w-full h-full overflow-visible"
            role="img"
            aria-label={`Module completion status: ${totalModules} total modules`}
          >
            {statusMetrics.map((seg) => {
              if (seg.count === 0) return null;
              const isHovered = hoveredKey === seg.key;
              const isDimmed = hoveredKey !== null && !isHovered;

              return (
                <g
                  key={seg.key}
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: isDimmed ? 0.35 : 1 }}
                  onMouseEnter={() => setHoveredKey(seg.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {seg.isSingle ? (
                    <circle cx={CENTER} cy={CENTER} r={PIE_RADIUS} fill={seg.color} />
                  ) : (
                    <path d={seg.path} fill={seg.color} />
                  )}

                  <text
                    x={seg.labelX}
                    y={seg.labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={seg.labelColor}
                    fontSize={seg.percentage >= 50 ? '13' : '12'}
                    fontWeight="600"
                    className="pointer-events-none select-none tabular-nums"
                  >
                    {seg.percentage}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Compact Status Legend (No Percentage Labels) */}
        <div className="w-full sm:w-auto sm:min-w-[186px] flex flex-col justify-center gap-2 shrink-0">
          {statusMetrics.map((seg) => {
            const isHovered = hoveredKey === seg.key;
            const unitLabel = seg.count === 1 ? 'module' : 'modules';

            return (
              <div
                key={seg.key}
                onMouseEnter={() => setHoveredKey(seg.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className={`flex items-center justify-between gap-4 px-3 py-2 rounded-xl border transition-colors cursor-default ${
                  isHovered
                    ? 'bg-[#F8FAFC] border-[#D0D9E8]'
                    : 'bg-[#FAFCFF] border-[#EFF3F8]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.dotColor }}
                  />
                  <span className="text-xs font-medium text-[#171C2B] whitespace-nowrap">
                    {seg.label}
                  </span>
                </div>

                <span className="text-xs font-normal text-[#667085] tabular-nums whitespace-nowrap shrink-0">
                  {seg.count} {unitLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ModuleProgressPie = ModuleCompletionStatusChart;
export default ModuleCompletionStatusChart;
