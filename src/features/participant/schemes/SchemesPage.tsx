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
import { useSchemeEnrollment } from './schemeEnrollmentStorage';

type StatusFilter = 'all' | 'available' | 'coming-soon';
type LevelFilter = 'all' | 'Intermediate' | 'Advanced';

const SCHEME_COVERS: Record<string, { image: string; gradient: string }> = {
  'full-stack': {
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    gradient: 'from-blue-600 to-teal-500',
  },
  'data-science': {
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    gradient: 'from-indigo-600 to-cyan-500',
  },
  'cloud-devops': {
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    gradient: 'from-slate-700 to-blue-600',
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
    <div className="w-full space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Program Pelatihan
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Setiap peserta hanya dapat memilih 1 program pelatihan yang akan
            terkunci setelah dipilih.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pelatihan..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-white hover:bg-muted'
            }`}
            style={
              showFilters || activeFilterCount > 0
                ? undefined
                : { color: 'var(--text-primary)' }
            }
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Filter</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Status Pilihan & Kunci Program */}
      {!enrollment ? (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Pilih 1 Program Pelatihan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Anda belum memilih program pelatihan. Setelah memilih 1 program,
              pilihan akan <strong>terkunci otomatis</strong> dan perubahan hanya
              dapat diajukan melalui persetujuan Admin.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-primary/30 p-5 space-y-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary">
                    Program Terkunci (Maks. 1 Program)
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Dipilih {formatDateId(enrollment.lockedAt)}
                  </span>
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {enrolledScheme?.name ?? enrollment.schemeId}
                </h2>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                <PlayCircle className="w-4 h-4" />
                Buka Materi Belajar
              </button>
              <button
                type="button"
                disabled={Boolean(pendingRequest) || alternativeSchemes.length === 0}
                onClick={() => openChangeRequestModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ color: 'var(--text-primary)' }}
              >
                <RefreshCw className="w-4 h-4 text-primary" />
                {pendingRequest
                  ? 'Pengajuan Sedang Diproses'
                  : 'Ajukan Perubahan ke Admin'}
              </button>
            </div>
          </div>

          {latestRequest && (
            <div
              className="rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{
                backgroundColor:
                  latestRequest.status === 'pending'
                    ? 'var(--warning-light)'
                    : latestRequest.status === 'approved'
                      ? 'var(--success-light)'
                      : 'var(--error-light)',
                borderColor:
                  latestRequest.status === 'pending'
                    ? 'var(--warning)'
                    : latestRequest.status === 'approved'
                      ? 'var(--success)'
                      : 'var(--error)',
              }}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {latestRequest.status === 'approved' ? (
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: 'var(--success)' }}
                  />
                ) : (
                  <AlertCircle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{
                      color:
                        latestRequest.status === 'pending'
                          ? 'var(--warning)'
                          : 'var(--error)',
                    }}
                  />
                )}
                <div className="text-xs sm:text-sm space-y-0.5">
                  <p
                    className="font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {latestRequest.status === 'pending'
                      ? `Menunggu Persetujuan Admin: Pindah ke "${latestRequest.requestedSchemeName}"`
                      : latestRequest.status === 'approved'
                        ? `Pengajuan Disetujui: Program berpindah ke "${latestRequest.requestedSchemeName}"`
                        : `Pengajuan Ditolak: Permintaan pindah ke "${latestRequest.requestedSchemeName}"`}
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Alasan: {latestRequest.reason}
                    {latestRequest.adminNote
                      ? ` • Catatan Admin: ${latestRequest.adminNote}`
                      : ''}
                  </p>
                </div>
              </div>
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/80 shrink-0 self-start sm:self-center"
                style={{ color: 'var(--text-primary)' }}
              >
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
        <div className="bg-card rounded-2xl border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
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
                      ? 'bg-primary text-white'
                      : 'bg-muted text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-secondary)' }}
              >
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
                      ? 'bg-primary text-white'
                      : 'bg-muted text-slate-700 hover:bg-slate-200'
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Scheme Cards or Empty State */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground opacity-60" />
          <h3
            className="text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Program Pelatihan Tidak Ditemukan
          </h3>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tidak ada skema pelatihan yang sesuai dengan pencarian atau filter
            yang dipilih.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 mt-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Pencarian & Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const cover = SCHEME_COVERS[scheme.id] ?? {
              image:
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
              gradient: 'from-blue-600 to-teal-500',
            };
            const isBroken = failedImages[scheme.id];
            const isSelected = enrollment?.schemeId === scheme.id;
            const isLockedOther = Boolean(
              enrollment && !isSelected && scheme.available
            );

            return (
              <div
                key={scheme.id}
                className={`bg-card rounded-2xl border overflow-hidden transition-all flex flex-col ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 shadow-md'
                    : 'border-border hover:shadow-lg'
                }`}
              >
                <div
                  className={`h-48 relative bg-gradient-to-br ${cover.gradient}`}
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
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold shadow-sm bg-blue-600 text-white">
                        <Lock className="w-3.5 h-3.5" />
                        Program Dipilih • Terkunci
                      </span>
                    </div>
                  )}

                  {isLockedOther && (
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold shadow-sm bg-slate-900/80 text-white">
                        <Lock className="w-3.5 h-3.5" />
                        Terkunci
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3.5 right-3.5">
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-bold shadow-sm"
                      style={{
                        backgroundColor: scheme.available
                          ? 'var(--success)'
                          : 'var(--warning)',
                        color: '#FFFFFF',
                      }}
                    >
                      {scheme.available ? 'Tersedia' : 'Segera Hadir'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {scheme.name}
                  </h3>
                  <p
                    className="text-sm mb-5 flex-1 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {scheme.description}
                  </p>

                  <div
                    className="flex items-center justify-between text-xs font-medium mb-5 pb-4 border-b border-border gap-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />{' '}
                      {formatDuration(scheme.duration)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart className="w-4 h-4 text-primary" />{' '}
                      {LEVEL_LABELS[scheme.level] ?? scheme.level}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" />{' '}
                      {scheme.participants} peserta
                    </div>
                  </div>

                  {!scheme.available ? (
                    <button
                      type="button"
                      disabled
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--muted)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Belum Tersedia
                    </button>
                  ) : !enrollment ? (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setConfirmSchemeId(scheme.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-opacity hover:opacity-90"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                        }}
                      >
                        Pilih Program Ini
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/participant/schemes/${scheme.id}`)
                        }
                        className="px-4 py-3 rounded-xl font-semibold border border-border bg-white hover:bg-muted transition-colors text-sm"
                        style={{ color: 'var(--text-primary)' }}
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
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-opacity hover:opacity-90"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                        }}
                      >
                        Lanjut Belajar <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/participant/schemes/${scheme.id}`)
                        }
                        className="px-4 py-3 rounded-xl font-semibold border border-border bg-white hover:bg-muted transition-colors text-sm"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Detail
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        disabled
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border border-border bg-muted text-slate-500 cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />
                        Terkunci (Hanya 1 Program)
                      </button>
                      <button
                        type="button"
                        disabled={Boolean(pendingRequest)}
                        onClick={() => openChangeRequestModal(scheme.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-scheme-title"
        >
          <div className="bg-white text-slate-900 rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3
                  id="confirm-scheme-title"
                  className="font-bold text-base sm:text-lg"
                >
                  Konfirmasi Pilihan Program
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup konfirmasi"
                onClick={() => setConfirmSchemeId(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Program yang Dipilih
                </p>
                <p className="font-bold text-base text-slate-900">
                  {confirmScheme.name}
                </p>
                <p className="text-xs text-slate-600">
                  Durasi {formatDuration(confirmScheme.duration)} • Level{' '}
                  {LEVEL_LABELS[confirmScheme.level] ?? confirmScheme.level}
                </p>
              </div>

              <div
                className="p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-2.5"
                style={{
                  backgroundColor: 'var(--warning-light)',
                  borderColor: 'var(--warning)',
                  color: 'var(--text-primary)',
                }}
              >
                <AlertCircle
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: 'var(--warning)' }}
                />
                <span>
                  Setiap peserta hanya dapat memilih{' '}
                  <strong>1 program pelatihan</strong>. Setelah dikonfirmasi,
                  pilihan akan <strong>langsung terkunci</strong> dan perubahan
                  hanya dapat dilakukan melalui pengajuan ke Admin.
                </span>
              </div>
            </div>

            <div className="p-5 border-t border-border flex items-center justify-end gap-2.5 bg-muted/20">
              <button
                type="button"
                onClick={() => setConfirmSchemeId(null)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-muted transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmSelect}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                <Lock className="w-4 h-4" />
                Konfirmasi & Kunci Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pengajuan Perubahan Program ke Admin */}
      {showRequestModal && enrollment && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-scheme-title"
        >
          <div className="bg-white text-slate-900 rounded-2xl border border-border max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h3
                  id="request-scheme-title"
                  className="font-bold text-base sm:text-lg"
                >
                  Ajukan Perubahan Program ke Admin
                </h3>
              </div>
              <button
                type="button"
                aria-label="Tutup pengajuan perubahan"
                onClick={() => setShowRequestModal(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitChangeRequest} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Program Saat Ini (Terkunci)
                </label>
                <div className="px-3.5 py-2.5 rounded-xl border border-border bg-muted/60 text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary shrink-0" />
                  <span>{enrolledScheme?.name ?? enrollment.schemeId}</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="requested-scheme-select"
                  className="block text-sm font-semibold text-slate-900 mb-1.5"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                  className="block text-sm font-semibold text-slate-900 mb-1.5"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {requestError && (
                  <p className="text-xs font-medium text-red-600 mt-1.5">
                    {requestError}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-muted transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <Send className="w-4 h-4" />
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
