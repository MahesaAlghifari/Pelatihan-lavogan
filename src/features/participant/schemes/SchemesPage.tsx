import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BarChart,
  BookOpen,
  CheckCircle2,
  Clock,
  Filter,
  Lock,
  PlayCircle,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Users,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { schemes } from '@/data/datadummy';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useParticipantProfile } from '@/features/participant/profile/profileStorage';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';
import { useSchemeEnrollment } from './schemeEnrollmentStorage';

type StatusFilter = 'all' | 'available' | 'coming-soon';
type LevelFilter = 'all' | 'Intermediate' | 'Advanced';

const SCHEME_COVERS: Record<string, { image: string; gradient: string }> = {
  'full-stack': {
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    gradient: 'from-[#156EF5] via-[#2180FA] to-[#4CA3F7]',
  },
  'data-science': {
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gradient: 'from-[#4338CA] to-[#1677F9]',
  },
  'cloud-devops': {
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-[#1E3A8A] to-[#1677F9]',
  },
};

const LEVEL_LABELS: Record<string, string> = {
  Intermediate: 'Menengah',
  Advanced: 'Lanjutan',
  Beginner: 'Dasar',
};

function formatDuration(duration: string) {
  return duration.replace(/\bmonths?\b/gi, 'Bulan');
}

function formatDateId(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function SchemesPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const profile = useParticipantProfile();
  const {
    enrollment,
    pendingRequest,
    latestRequest,
    selectScheme,
    submitChangeRequest,
  } = useSchemeEnrollment();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Confirmation modal before locking 1 chosen scheme
  const [confirmSchemeId, setConfirmSchemeId] = useState<string | null>(null);

  // Admin change request modal
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestedSchemeId, setRequestedSchemeId] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [requestError, setRequestError] = useState('');

  const enrolledScheme = useMemo(
    () => schemes.find((s) => s.id === enrollment?.schemeId) ?? null,
    [enrollment]
  );

  const alternativeSchemes = useMemo(
    () =>
      schemes.filter((s) => s.available && s.id !== enrollment?.schemeId),
    [enrollment]
  );

  const confirmScheme = useMemo(
    () => schemes.find((s) => s.id === confirmSchemeId) ?? null,
    [confirmSchemeId]
  );

  useEffect(() => {
    if (!confirmSchemeId && !showRequestModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirmSchemeId(null);
        setShowRequestModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmSchemeId, showRequestModal]);

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + (levelFilter !== 'all' ? 1 : 0);

  const filteredSchemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return schemes.filter((scheme) => {
      const matchesQuery =
        !q ||
        scheme.name.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && scheme.available) ||
        (statusFilter === 'coming-soon' && !scheme.available);
      const matchesLevel =
        levelFilter === 'all' || scheme.level === levelFilter;
      return matchesQuery && matchesStatus && matchesLevel;
    });
  }, [searchQuery, statusFilter, levelFilter]);

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setLevelFilter('all');
  };

  const handleConfirmSelect = () => {
    if (!confirmScheme) return;
    const res = selectScheme(confirmScheme.id);
    if (!res.ok) {
      toast.error(res.error);
      setConfirmSchemeId(null);
      return;
    }
    toast.success(
      `Program "${confirmScheme.name}" berhasil dipilih dan terkunci.`
    );
    setConfirmSchemeId(null);
  };

  const openChangeRequestModal = (targetSchemeId?: string) => {
    if (pendingRequest) {
      toast.info(
        'Pengajuan perubahan Anda masih menunggu persetujuan Admin.'
      );
      return;
    }
    const defaultTarget =
      targetSchemeId && targetSchemeId !== enrollment?.schemeId
        ? targetSchemeId
        : alternativeSchemes[0]?.id ?? '';
    setRequestedSchemeId(defaultTarget);
    setRequestReason('');
    setRequestError('');
    setShowRequestModal(true);
  };

  const handleSubmitChangeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitChangeRequest({
      requestedSchemeId,
      reason: requestReason,
      participantName: currentUser?.fullName || profile.name,
      participantEmail: currentUser?.email || profile.email,
    });
    if (!res.ok) {
      setRequestError(res.error);
      return;
    }
    toast.success('Pengajuan perubahan program berhasil dikirim ke Admin.');
    setShowRequestModal(false);
    setRequestReason('');
    setRequestError('');
  };

  return (
    <div className="w-full space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={DASHBOARD_TOKENS.pageTitle}>Program Pelatihan</h1>
          <p className={`${DASHBOARD_TOKENS.pageSubtitle} mt-0.5`}>
            Setiap peserta hanya dapat memilih 1 program pelatihan yang akan
            terkunci setelah dipilih.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pelatihan..."
              className={`${DASHBOARD_TOKENS.inputWithIcon} h-9 pr-9`}
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-[#171C2B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            aria-label="Filter program pelatihan"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((prev) => !prev)}
            className={`relative h-9 inline-flex items-center gap-2 px-3.5 rounded-xl border text-xs font-semibold transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-[#1677F9] bg-[#EAF3FF] text-[#1677F9]'
                : 'border-[#E7ECF3] bg-white text-[#171C2B] hover:bg-[#F3F6FB]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1677F9] text-white leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Status Pilihan & Kunci Program */}
      {!enrollment ? (
        <div className="bg-[#EAF3FF] border border-[#BFDBFE] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#1677F9] text-white flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#171C2B] tracking-tight">
              Pilih 1 Program Pelatihan
            </h2>
            <p className="text-xs sm:text-sm font-normal text-[#475467] leading-relaxed">
              Anda belum memilih program pelatihan. Setelah memilih 1 program,
              pilihan akan <strong className="font-semibold text-[#171C2B]">terkunci otomatis</strong> dan perubahan hanya
              dapat diajukan melalui persetujuan Admin.
            </p>
          </div>
        </div>
      ) : (
        <div className={`${DASHBOARD_TOKENS.card} p-4 sm:p-5 space-y-4 border-[#BFDBFE]`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={DASHBOARD_TOKENS.badgeBlue}>
                    Program Terkunci (Maks. 1 Program)
                  </span>
                  <span className="text-xs font-normal text-[#667085]">
                    Dipilih {formatDateId(enrollment.lockedAt)}
                  </span>
                </div>
                <h2 className={DASHBOARD_TOKENS.cardTitle}>
                  {enrolledScheme?.name ?? enrollment.schemeId}
                </h2>
                <p className="text-xs font-normal text-[#667085]">
                  Pilihan program Anda sudah terkunci. Jika ingin mengganti
                  program pelatihan, ajukan permintaan perubahan ke Admin.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  navigate(`/participant/learning?scheme=${enrollment.schemeId}`)
                }
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Buka Materi Belajar
              </button>
              <button
                type="button"
                disabled={Boolean(pendingRequest) || alternativeSchemes.length === 0}
                onClick={() => openChangeRequestModal()}
                className={DASHBOARD_TOKENS.btnOutline}
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#1677F9]" />
                {pendingRequest
                  ? 'Pengajuan Sedang Diproses'
                  : 'Ajukan Perubahan ke Admin'}
              </button>
            </div>
          </div>

          {latestRequest && (
            <div
              className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                latestRequest.status === 'pending'
                  ? 'bg-[#FEF3C7]/60 border-[#FCD34D]'
                  : latestRequest.status === 'approved'
                    ? 'bg-[#ECFDF3] border-[#BBF7D0]'
                    : 'bg-[#FEF2F2] border-[#FECACA]'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {latestRequest.status === 'approved' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#16A34A]" />
                ) : (
                  <AlertCircle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      latestRequest.status === 'pending'
                        ? 'text-[#B45309]'
                        : 'text-[#DC2626]'
                    }`}
                  />
                )}
                <div className="text-xs sm:text-sm space-y-0.5">
                  <p className="font-semibold text-[#171C2B]">
                    {latestRequest.status === 'pending'
                      ? `Menunggu Persetujuan Admin: Pindah ke "${latestRequest.requestedSchemeName}"`
                      : latestRequest.status === 'approved'
                        ? `Pengajuan Disetujui: Program berpindah ke "${latestRequest.requestedSchemeName}"`
                        : `Pengajuan Ditolak: Permintaan pindah ke "${latestRequest.requestedSchemeName}"`}
                  </p>
                  <p className="text-xs font-normal text-[#667085]">
                    Alasan: {latestRequest.reason}
                    {latestRequest.adminNote
                      ? ` • Catatan Admin: ${latestRequest.adminNote}`
                      : ''}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-[#171C2B] shrink-0 self-start sm:self-center">
                {latestRequest.status === 'pending'
                  ? 'Pending Review'
                  : latestRequest.status === 'approved'
                    ? 'Disetujui'
                    : 'Ditolak'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className={`${DASHBOARD_TOKENS.card} p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={DASHBOARD_TOKENS.mutedMetaLabel}>
                Status:
              </span>
              {(
                [
                  { id: 'all', label: 'Semua' },
                  { id: 'available', label: 'Tersedia' },
                  { id: 'coming-soon', label: 'Segera Hadir' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStatusFilter(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    statusFilter === opt.id
                      ? 'bg-[#1677F9] text-white'
                      : 'bg-[#F3F6FB] text-[#475467] hover:bg-[#E7ECF3]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className={DASHBOARD_TOKENS.mutedMetaLabel}>
                Level:
              </span>
              {(
                [
                  { id: 'all', label: 'Semua' },
                  { id: 'Intermediate', label: 'Menengah' },
                  { id: 'Advanced', label: 'Lanjutan' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLevelFilter(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    levelFilter === opt.id
                      ? 'bg-[#1677F9] text-white'
                      : 'bg-[#F3F6FB] text-[#475467] hover:bg-[#E7ECF3]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1677F9] hover:underline self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Scheme Cards or Empty State */}
      {filteredSchemes.length === 0 ? (
        <div className={`${DASHBOARD_TOKENS.card} p-12 text-center space-y-3`}>
          <BookOpen className="w-12 h-12 mx-auto text-[#98A2B3]" />
          <h3 className={DASHBOARD_TOKENS.cardTitle}>
            Program Pelatihan Tidak Ditemukan
          </h3>
          <p className="text-sm font-normal text-[#667085] max-w-md mx-auto">
            Tidak ada skema pelatihan yang sesuai dengan pencarian atau filter
            yang dipilih.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={`${DASHBOARD_TOKENS.btnPrimary} mt-2`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Pencarian & Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchemes.map((scheme) => {
            const cover = SCHEME_COVERS[scheme.id] ?? {
              image:
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
              gradient: 'from-[#156EF5] via-[#2180FA] to-[#4CA3F7]',
            };
            const isBroken = failedImages[scheme.id];
            const isSelected = enrollment?.schemeId === scheme.id;
            const isLockedOther = Boolean(
              enrollment && !isSelected && scheme.available
            );

            return (
              <div
                key={scheme.id}
                className={`${DASHBOARD_TOKENS.card} overflow-hidden transition-all flex flex-col ${
                  isSelected
                    ? 'border-[#1677F9] ring-2 ring-[#1677F9]/20'
                    : 'hover:border-[#CBD5E1]'
                }`}
              >
                <div
                  className={`h-44 relative bg-gradient-to-br ${cover.gradient}`}
                >
                  {!isBroken ? (
                    <img
                      src={cover.image}
                      alt={scheme.name}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [scheme.id]: true,
                        }))
                      }
                      className={`w-full h-full object-cover ${
                        isLockedOther ? 'grayscale-[25%] opacity-90' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/90">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm bg-[#1677F9] text-white">
                        <Lock className="w-3 h-3" />
                        Program Dipilih • Terkunci
                      </span>
                    </div>
                  )}

                  {isLockedOther && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm bg-[#171C2B]/85 text-white">
                        <Lock className="w-3 h-3" />
                        Terkunci
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm ${
                        scheme.available
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}
                    >
                      {scheme.available ? 'Tersedia' : 'Segera Hadir'}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-base text-[#171C2B] tracking-tight mb-1.5">
                    {scheme.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-normal text-[#667085] mb-4 flex-1 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-normal text-[#667085] mb-4 pb-3.5 border-b border-[#E7ECF3] gap-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1677F9]" />{' '}
                      {formatDuration(scheme.duration)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-3.5 h-3.5 text-[#1677F9]" />{' '}
                      {LEVEL_LABELS[scheme.level] ?? scheme.level}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#1677F9]" />{' '}
                      {scheme.participants} peserta
                    </div>
                  </div>

                  {!scheme.available ? (
                    <button
                      type="button"
                      disabled
                      className="w-full h-9 px-4 rounded-xl bg-[#F3F6FB] text-[#667085] text-xs font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      Belum Tersedia
                    </button>
                  ) : !enrollment ? (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setConfirmSchemeId(scheme.id)}
                        className={`${DASHBOARD_TOKENS.btnPrimary} flex-1`}
                      >
                        Pilih Program Ini
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/participant/schemes/${scheme.id}`)
                        }
                        className={DASHBOARD_TOKENS.btnOutline}
                      >
                        Detail
                      </button>
                    </div>
                  ) : isSelected ? (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/participant/learning?scheme=${scheme.id}`)
                        }
                        className={`${DASHBOARD_TOKENS.btnPrimary} flex-1`}
                      >
                        Lanjut Belajar <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/participant/schemes/${scheme.id}`)
                        }
                        className={DASHBOARD_TOKENS.btnOutline}
                      >
                        Detail
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        disabled
                        className="w-full h-9 px-4 rounded-xl text-xs font-semibold border border-[#E7ECF3] bg-[#F3F6FB] text-[#667085] inline-flex items-center justify-center gap-1.5 cursor-not-allowed"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Terkunci (Hanya 1 Program)
                      </button>
                      <button
                        type="button"
                        disabled={Boolean(pendingRequest)}
                        onClick={() => openChangeRequestModal(scheme.id)}
                        className={`${DASHBOARD_TOKENS.btnSoftBlue} w-full`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {pendingRequest
                          ? 'Menunggu Persetujuan Admin'
                          : 'Ajukan Pindah ke Program Ini'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Konfirmasi Pilihan Program */}
      {confirmScheme && (
        <div
          className="fixed inset-0 z-[100] bg-[#171C2B]/45 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-scheme-title"
        >
          <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-lg w-full shadow-xl overflow-hidden">
            <div className="p-5 border-b border-[#E7ECF3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={DASHBOARD_TOKENS.iconBox}>
                  <Lock className="w-4 h-4" />
                </div>
                <h3
                  id="confirm-scheme-title"
                  className={DASHBOARD_TOKENS.cardTitle}
                >
                  Konfirmasi Pilihan Program
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup konfirmasi"
                onClick={() => setConfirmSchemeId(null)}
                className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-1`}>
                <p className={DASHBOARD_TOKENS.sectionLabel}>
                  Program yang Dipilih
                </p>
                <p className="font-semibold text-base text-[#171C2B]">
                  {confirmScheme.name}
                </p>
                <p className="text-xs font-normal text-[#667085]">
                  Durasi {formatDuration(confirmScheme.duration)} • Level{' '}
                  {LEVEL_LABELS[confirmScheme.level] ?? confirmScheme.level}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[#FCD34D] bg-[#FEF3C7]/60 text-[#171C2B] text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
                <span>
                  Setiap peserta hanya dapat memilih{' '}
                  <strong>1 program pelatihan</strong>. Setelah dikonfirmasi,
                  pilihan akan <strong>langsung terkunci</strong> dan perubahan
                  hanya dapat dilakukan melalui pengajuan ke Admin.
                </span>
              </div>
            </div>

            <div className="p-5 border-t border-[#E7ECF3] flex items-center justify-end gap-2.5 bg-[#F9FBFE]">
              <button
                type="button"
                onClick={() => setConfirmSchemeId(null)}
                className={DASHBOARD_TOKENS.btnOutline}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmSelect}
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                <Lock className="w-3.5 h-3.5" />
                Konfirmasi & Kunci Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pengajuan Perubahan Program ke Admin */}
      {showRequestModal && enrollment && (
        <div
          className="fixed inset-0 z-[100] bg-[#171C2B]/45 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-scheme-title"
        >
          <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-lg w-full shadow-xl overflow-hidden">
            <div className="p-5 border-b border-[#E7ECF3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={DASHBOARD_TOKENS.iconBox}>
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h3
                  id="request-scheme-title"
                  className={DASHBOARD_TOKENS.cardTitle}
                >
                  Ajukan Perubahan Program ke Admin
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup pengajuan perubahan"
                onClick={() => setShowRequestModal(false)}
                className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitChangeRequest} className="p-5 space-y-4">
              <div>
                <label className={`block ${DASHBOARD_TOKENS.mutedMetaLabel} mb-1.5`}>
                  Program Saat Ini (Terkunci)
                </label>
                <div className={`${DASHBOARD_TOKENS.subcard} px-3.5 py-2.5 text-sm font-semibold text-[#171C2B] flex items-center gap-2`}>
                  <Lock className="w-4 h-4 text-[#1677F9] shrink-0" />
                  <span>{enrolledScheme?.name ?? enrollment.schemeId}</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="requested-scheme-select"
                  className="block text-xs font-semibold text-[#171C2B] mb-1.5"
                >
                  Program Tujuan yang Diajukan
                </label>
                <select
                  id="requested-scheme-select"
                  value={requestedSchemeId}
                  onChange={(e) => {
                    setRequestedSchemeId(e.target.value);
                    setRequestError('');
                  }}
                  className={DASHBOARD_TOKENS.input}
                >
                  {alternativeSchemes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({formatDuration(s.duration)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="scheme-change-reason"
                  className="block text-xs font-semibold text-[#171C2B] mb-1.5"
                >
                  Alasan Pengajuan Perubahan
                </label>
                <textarea
                  id="scheme-change-reason"
                  rows={4}
                  value={requestReason}
                  onChange={(e) => {
                    setRequestReason(e.target.value);
                    setRequestError('');
                  }}
                  placeholder="Jelaskan alasan Anda mengajukan pindah program pelatihan kepada Admin (minimal 10 karakter)..."
                  className={DASHBOARD_TOKENS.input}
                />
                {requestError && (
                  <p className="text-xs font-medium text-[#DC2626] mt-1.5">
                    {requestError}
                  </p>
                )}
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-[#E7ECF3]">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className={DASHBOARD_TOKENS.btnOutline}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Pengajuan ke Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
