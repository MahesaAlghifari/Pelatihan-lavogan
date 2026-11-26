import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { certificates as initialCertificates, moduleMaterials } from '@/data/datadummy';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useParticipantProfile } from '@/features/participant/profile/profileStorage';
import {
  PROGRESS_STORAGE_KEY,
  QUIZ_RESULTS_STORAGE_KEY,
} from '@/features/participant/learning/hooks/useLearningProgress';
import type { QuizResultInfo } from '@/features/participant/learning/types/learning.types';
import {
  CertificatePreviewModal,
  printCertificatePdf,
  type CertificateItem,
} from './components/CertificatePreviewModal';

const CLAIMED_CERTS_KEY = 'lavogan_claimed_certificates';
const REQUIRED_MODULES = ['html-basics', 'css-styling'] as const;
const REQUIRED_QUIZ_IDS = ['html-intro-video', 'css-fund-video'] as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CertificatePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const profile = useParticipantProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCert, setPreviewCert] = useState<CertificateItem | null>(null);
  const [claimedCerts, setClaimedCerts] = useState<CertificateItem[]>(() =>
    readJson<CertificateItem[]>(CLAIMED_CERTS_KEY, [])
  );

  const completedMaterialIds = useMemo(
    () => readJson<string[]>(PROGRESS_STORAGE_KEY, []),
    []
  );
  const quizResults = useMemo(
    () => readJson<Record<string, QuizResultInfo>>(QUIZ_RESULTS_STORAGE_KEY, {}),
    []
  );

  const requiredMaterialIds = useMemo(
    () =>
      REQUIRED_MODULES.flatMap((modId) =>
        (moduleMaterials[modId] ?? []).map((m) => m.id)
      ),
    []
  );

  const completedCount = requiredMaterialIds.filter((id) =>
    completedMaterialIds.includes(id)
  ).length;
  const passedQuizCount = REQUIRED_QUIZ_IDS.filter(
    (quizId) => quizResults[quizId]?.passed
  ).length;

  const totalRequirements = requiredMaterialIds.length + REQUIRED_QUIZ_IDS.length;
  const fulfilledRequirements = completedCount + passedQuizCount;
  const graduationPercent =
    totalRequirements === 0
      ? 0
      : Math.round((fulfilledRequirements / totalRequirements) * 100);
  const isEligible =
    completedCount === requiredMaterialIds.length &&
    passedQuizCount === REQUIRED_QUIZ_IDS.length;

  const activeSchemeTitle = 'Full Stack Web Development — HTML & CSS Fundamentals';
  const alreadyClaimedActive = claimedCerts.some(
    (c) => c.scheme === activeSchemeTitle
  );

  const allCertificates: CertificateItem[] = useMemo(() => {
    const baseList: CertificateItem[] = initialCertificates.map((c) => ({
      ...c,
      status: c.status === 'issued' ? 'issued' : 'pending',
    }));
    return [...claimedCerts, ...baseList];
  }, [claimedCerts]);

  const filteredCertificates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allCertificates;
    return allCertificates.filter(
      (cert) =>
        cert.scheme.toLowerCase().includes(q) ||
        cert.certificateNumber.toLowerCase().includes(q) ||
        cert.participantName.toLowerCase().includes(q)
    );
  }, [allCertificates, searchQuery]);

  const handleClaimCertificate = () => {
    if (!isEligible || alreadyClaimedActive) return;

    const newCert: CertificateItem = {
      id: `claimed-${Date.now()}`,
      participantName: currentUser?.fullName || profile.name,
      scheme: activeSchemeTitle,
      issueDate: new Date().toISOString().slice(0, 10),
      certificateNumber: `CERT-FSW-2026-${String(100 + claimedCerts.length + 1).padStart(3, '0')}`,
      status: 'issued',
    };

    const nextClaimed = [newCert, ...claimedCerts];
    setClaimedCerts(nextClaimed);
    try {
      localStorage.setItem(CLAIMED_CERTS_KEY, JSON.stringify(nextClaimed));
    } catch {
      // ignore storage error
    }
    toast.success('Selamat! Sertifikat kelulusan Anda berhasil diterbitkan.');
    setPreviewCert(newCert);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Sertifikat Saya
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Pantau syarat kelulusan, klaim sertifikat resmi, dan unduh PDF sertifikat Anda.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor atau skema sertifikat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Graduation & Claim Card */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Status Kelulusan & Klaim Sertifikat
                </h2>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: isEligible
                      ? 'var(--success-light)'
                      : 'var(--warning-light)',
                    color: isEligible ? 'var(--success)' : 'var(--warning)',
                  }}
                >
                  {isEligible ? 'Memenuhi Syarat' : `${graduationPercent}% Selesai`}
                </span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                Program: <span className="font-semibold text-slate-800">{activeSchemeTitle}</span>
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {isEligible ? (
              alreadyClaimedActive ? (
                <button
                  type="button"
                  onClick={() => {
                    const found = claimedCerts.find(
                      (c) => c.scheme === activeSchemeTitle
                    );
                    if (found) setPreviewCert(found);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--success-light)',
                    color: 'var(--success)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Sertifikat Sudah Diklaim • Lihat
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClaimCertificate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Klaim Sertifikat Sekarang
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={() => navigate('/participant/learning')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                Lanjutkan Belajar <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${graduationPercent}%` }}
          />
        </div>

        {/* Requirements Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {completedCount === requiredMaterialIds.length ? (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-warning shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Penyelesaian Materi Pembelajaran
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Selesaikan seluruh video & dokumen di Materi Belajar
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-primary shrink-0">
              {completedCount} / {requiredMaterialIds.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {passedQuizCount === REQUIRED_QUIZ_IDS.length ? (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-warning shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Kelulusan Quiz Evaluasi Modul
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Lulus Quiz Evaluasi HTML Basics & CSS Styling
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-primary shrink-0">
              {passedQuizCount} / {REQUIRED_QUIZ_IDS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-card p-12 rounded-2xl border border-border text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {searchQuery ? 'Sertifikat Tidak Ditemukan' : 'Belum Ada Sertifikat'}
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {searchQuery
              ? 'Coba ubah kata kunci pencarian nomor atau skema sertifikat.'
              : 'Selesaikan program pelatihan untuk mendapatkan sertifikat.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => {
            const isIssued = cert.status === 'issued';

            return (
              <div
                key={cert.id}
                className="bg-card p-6 rounded-2xl border border-border flex flex-col md:flex-row gap-6 items-center md:items-start"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-primary" />
                </div>

                <div className="flex-1 text-center md:text-left min-w-0">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                    <h3
                      className="font-bold text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cert.scheme}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                      style={{
                        backgroundColor: isIssued
                          ? 'var(--success-light)'
                          : 'var(--warning-light)',
                        color: isIssued ? 'var(--success)' : 'var(--warning)',
                      }}
                    >
                      {isIssued ? (
                        <>
                          <ShieldCheck className="w-3 h-3" /> Terbit
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> Menunggu Verifikasi
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    Penerima: {cert.participantName}
                  </p>
                  <p className="text-xs font-mono mb-3" style={{ color: 'var(--text-secondary)' }}>
                    No. {cert.certificateNumber}
                  </p>

                  <div
                    className="flex items-center justify-center md:justify-start gap-2 text-sm mb-5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Calendar className="w-4 h-4" /> Diterbitkan: {cert.issueDate}
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:bg-muted transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Eye className="w-4 h-4" /> Lihat
                    </button>
                    <button
                      type="button"
                      disabled={!isIssued}
                      onClick={() => printCertificatePdf(cert)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      <Download className="w-4 h-4" /> Unduh PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {previewCert && (
        <CertificatePreviewModal
          certificate={previewCert}
          onClose={() => setPreviewCert(null)}
        />
      )}
    </div>
  );
}
