/**
 * Shared visual tokens mirroring Participant Dashboard (DashboardPage.tsx).
 * Keeps all participant pages cohesive on the #F3F6FB canvas, #FFFFFF card
 * surfaces, #E7ECF3 borders, #171C2B/#667085 ink hierarchy, and #1677F9 accent.
 */

export const DASHBOARD_TOKENS = {
  card: 'bg-white rounded-2xl border border-[#E7ECF3] shadow-[0_1px_3px_rgba(16,24,40,0.04)]',
  subcard: 'rounded-xl border border-[#E7ECF3] bg-[#F9FBFE]',
  subcardHover:
    'rounded-xl border border-[#E7ECF3] bg-[#F9FBFE] hover:bg-[#F3F6FB] transition-colors',

  // Typography hierarchy aligned with Participant Dashboard
  pageTitle:
    'text-[22px] sm:text-2xl font-bold tracking-[-0.02em] leading-[1.25] text-[#171C2B]',
  pageSubtitle:
    'text-sm font-normal leading-[1.6] tracking-[-0.005em] text-[#667085]',
  sectionHeading:
    'text-[15px] sm:text-base font-semibold tracking-[-0.015em] leading-[1.35] text-[#171C2B]',
  cardTitle:
    'text-[15px] font-medium tracking-[-0.01em] leading-[1.4] text-[#171C2B]',
  subheading:
    'text-sm font-medium tracking-[-0.005em] leading-[1.45] text-[#171C2B]',
  bodyText: 'text-sm font-normal leading-[1.6] text-[#475467]',
  description: 'text-[13px] font-normal leading-[1.6] text-[#667085]',
  fieldLabel: 'block text-xs font-medium leading-[1.4] text-[#344054] mb-1.5',
  sectionLabel:
    'text-[11px] font-semibold uppercase tracking-[0.06em] leading-[1.3] text-[#1677F9]',
  mutedMetaLabel:
    'text-[11px] font-medium uppercase tracking-[0.05em] leading-[1.35] text-[#667085]',
  metaText: 'text-xs font-normal leading-[1.5] text-[#667085]',

  iconBox:
    'w-9 h-9 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0',
  iconBoxSm:
    'w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0',

  btnPrimary:
    'h-9 px-4 rounded-xl bg-[#1677F9] hover:bg-[#1262D4] text-white text-xs font-semibold tracking-[-0.005em] inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed',
  btnIndigo:
    'h-9 px-4 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-xs font-semibold tracking-[-0.005em] inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed',
  btnOutline:
    'h-9 px-4 rounded-xl border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-[#171C2B] text-xs font-medium tracking-[-0.005em] inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  btnSoftBlue:
    'h-9 px-4 rounded-xl border border-[#BFDBFE] bg-[#EAF3FF] hover:bg-[#DCEAFE] text-[#1677F9] text-xs font-medium tracking-[-0.005em] inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  btnSuccessPill:
    'h-9 px-4 rounded-xl border border-[#BBF7D0] bg-[#ECFDF3] hover:bg-[#DCFCE7] text-[#16A34A] text-xs font-medium tracking-[-0.005em] inline-flex items-center justify-center gap-1.5 transition-colors',

  input:
    'w-full px-3.5 py-2 rounded-xl border border-[#E7ECF3] bg-white text-sm font-normal text-[#171C2B] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#1677F9]/25 focus:border-[#1677F9] transition-colors',
  inputWithIcon:
    'w-full pl-10 pr-4 py-2 rounded-xl border border-[#E7ECF3] bg-white text-sm font-normal text-[#171C2B] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#1677F9]/25 focus:border-[#1677F9] transition-colors',

  badgeSuccess:
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF3] text-[#16A34A] text-[11px] font-medium tracking-[0.01em] leading-none whitespace-nowrap',
  badgeWarning:
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-[11px] font-medium tracking-[0.01em] leading-none whitespace-nowrap',
  badgeBlue:
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAF3FF] text-[#1677F9] text-[11px] font-medium tracking-[0.01em] leading-none whitespace-nowrap',
  badgeNeutral:
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3F6FB] text-[#667085] text-[11px] font-medium tracking-[0.01em] leading-none whitespace-nowrap',
  badgeDanger:
    'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626] text-[11px] font-medium tracking-[0.01em] leading-none whitespace-nowrap',

  progressTrack: 'w-full h-2 bg-[#E7ECF3] rounded-full overflow-hidden',
  progressFillBlue: 'h-full bg-[#1677F9] rounded-full transition-all duration-300',
  progressFillGreen: 'h-full bg-[#16A34A] rounded-full transition-all duration-300',
} as const;
