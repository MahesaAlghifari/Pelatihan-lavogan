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
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';
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
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={DASHBOARD_TOKENS.pageTitle}>
            Sertifikat Saya
          </h1>
          <p className={`${DASHBOARD_TOKENS.pageSubtitle} mt-0.5`}>
            Pantau syarat kelulusan, klaim sertifikat resmi, dan unduh PDF sertifikat Anda.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor atau skema sertifikat..."
            className={`${DASHBOARD_TOKENS.inputWithIcon} h-9`}
          />
        </div>
      </div>

      {/* Graduation & Claim Card */}
      <div className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-4`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className={DASHBOARD_TOKENS.cardTitle}>
                  Status Kelulusan & Klaim Sertifikat
                </h2>
                <span
                  className={
                    isEligible
                      ? DASHBOARD_TOKENS.badgeSuccess
                      : DASHBOARD_TOKENS.badgeWarning
                  }
                >
                  {isEligible ? 'Memenuhi Syarat' : `${graduationPercent}% Selesai`}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-normal text-[#667085] mt-0.5">
                Program: <span className="font-semibold text-[#171C2B]">{activeSchemeTitle}</span>
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
                  className={DASHBOARD_TOKENS.btnSuccessPill}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sertifikat Sudah Diklaim • Lihat
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClaimCertificate}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Klaim Sertifikat Sekarang
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={() => navigate('/participant/learning')}
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                Lanjutkan Belajar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={DASHBOARD_TOKENS.progressTrack}>
          <div
            className={DASHBOARD_TOKENS.progressFillBlue}
            style={{ width: `${graduationPercent}%` }}
          />
        </div>

        {/* Requirements Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className={`${DASHBOARD_TOKENS.subcard} p-3.5 flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3">
              {completedCount === requiredMaterialIds.length ? (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-[#B45309] shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold text-[#171C2B]">
                  Penyelesaian Materi Pembelajaran
                </p>
                <p className="text-xs font-normal text-[#667085]">
                  Selesaikan seluruh video & dokumen di Materi Belajar
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#1677F9] tabular-nums shrink-0">
              {completedCount} / {requiredMaterialIds.length}
            </span>
          </div>

          <div className={`${DASHBOARD_TOKENS.subcard} p-3.5 flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3">
              {passedQuizCount === REQUIRED_QUIZ_IDS.length ? (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-[#B45309] shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold text-[#171C2B]">
                  Kelulusan Quiz Evaluasi Modul
                </p>
                <p className="text-xs font-normal text-[#667085]">
                  Lulus Quiz Evaluasi HTML Basics & CSS Styling
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#1677F9] tabular-nums shrink-0">
              {passedQuizCount} / {REQUIRED_QUIZ_IDS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      {filteredCertificates.length === 0 ? (
        <div className={`${DASHBOARD_TOKENS.card} p-12 text-center`}>
          <Award className="w-12 h-12 mx-auto mb-3 text-[#98A2B3]" />
          <h3 className={`${DASHBOARD_TOKENS.cardTitle} mb-1`}>
            {searchQuery ? 'Sertifikat Tidak Ditemukan' : 'Belum Ada Sertifikat'}
          </h3>
          <p className="text-sm font-normal text-[#667085]">
            {searchQuery
              ? 'Coba ubah kata kunci pencarian nomor atau skema sertifikat.'
              : 'Selesaikan program pelatihan untuk mendapatkan sertifikat.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCertificates.map((cert) => {
            const isIssued = cert.status === 'issued';

            return (
              <div
                key={cert.id}
                className={`${DASHBOARD_TOKENS.card} p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
                  <Award className="w-8 h-8" />
                </div>

                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="font-semibold text-base text-[#171C2B] tracking-tight">
                      {cert.scheme}
                    </h3>
                    <span
                      className={
                        isIssued
                          ? DASHBOARD_TOKENS.badgeSuccess
                          : DASHBOARD_TOKENS.badgeWarning
                      }
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

                  <p className="text-xs sm:text-sm font-medium text-[#171C2B] mb-0.5">
                    Penerima: {cert.participantName}
                  </p>
                  <p className="text-xs font-mono text-[#667085] mb-2.5">
                    No. {cert.certificateNumber}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-normal text-[#667085] mb-4">
                    <Calendar className="w-3.5 h-3.5 text-[#98A2B3]" /> Diterbitkan: {cert.issueDate}
                  </div>

                  <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className={DASHBOARD_TOKENS.btnOutline}
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat
                    </button>
                    <button
                      type="button"
                      disabled={!isIssued}
                      onClick={() => printCertificatePdf(cert)}
                      className={DASHBOARD_TOKENS.btnPrimary}
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh PDF
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
