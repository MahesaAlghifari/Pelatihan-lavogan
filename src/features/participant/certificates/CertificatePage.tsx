import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { moduleMaterials, schemes } from '@/data/datadummy';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useParticipantProfile } from '@/features/participant/profile/profileStorage';
import { useSchemeEnrollment } from '@/features/participant/schemes/schemeEnrollmentStorage';
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
  const { enrollment } = useSchemeEnrollment();
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

  const totalRequirements =
    requiredMaterialIds.length + REQUIRED_QUIZ_IDS.length;
  const fulfilledRequirements = completedCount + passedQuizCount;
  const graduationPercent =
    totalRequirements === 0
      ? 0
      : Math.round((fulfilledRequirements / totalRequirements) * 100);
  const isEligible =
    completedCount === requiredMaterialIds.length &&
    passedQuizCount === REQUIRED_QUIZ_IDS.length;

  const enrolledScheme = useMemo(
    () => schemes.find((s) => s.id === enrollment?.schemeId) ?? null,
    [enrollment]
  );

  const activeSchemeTitle = enrolledScheme
    ? enrolledScheme.name
    : 'Full Stack Web Development — HTML & CSS Fundamentals';

  // Satu peserta hanya memiliki satu sertifikat resmi untuk program ini
  const claimedCertificate = useMemo(
    () =>
      claimedCerts.find((c) => c.scheme === activeSchemeTitle) ??
      claimedCerts[0] ??
      null,
    [claimedCerts, activeSchemeTitle]
  );

  const participantName = currentUser?.fullName || profile.name;

  const programCertificate: CertificateItem = useMemo(() => {
    if (claimedCertificate) {
      return {
        ...claimedCertificate,
        participantName,
        status: 'issued',
      };
    }

    return {
      id: 'official-program-certificate',
      participantName,
      scheme: activeSchemeTitle,
      issueDate: isEligible
        ? 'Ready to issue upon claim'
        : 'Pending program completion',
      certificateNumber: 'Issued upon claim',
      status: 'pending',
    };
  }, [claimedCertificate, participantName, activeSchemeTitle, isEligible]);

  const isIssued = programCertificate.status === 'issued';

  const handleClaimCertificate = () => {
    if (!isEligible || isIssued) return;

    const newCert: CertificateItem = {
      id: 'official-program-certificate',
      participantName,
      scheme: activeSchemeTitle,
      issueDate: new Date().toISOString().slice(0, 10),
      certificateNumber: 'CERT-FSW-2026-101',
      status: 'issued',
    };

    const nextClaimed = [newCert];
    setClaimedCerts(nextClaimed);
    try {
      localStorage.setItem(CLAIMED_CERTS_KEY, JSON.stringify(nextClaimed));
    } catch {
      // ignore storage error
    }
    toast.success('Congratulations! Your completion certificate has been issued.');
    setPreviewCert(newCert);
  };

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <h1 className={DASHBOARD_TOKENS.pageTitle}>Program Certificate</h1>
        <p className={DASHBOARD_TOKENS.pageSubtitle}>
          Access your official program completion certificate, monitor graduation
          requirements, and download your PDF copy.
        </p>
      </div>

      {/* Main Visual Focus: Single Official Program Certificate */}
      <section
        aria-label="Official program certificate"
        className={`${DASHBOARD_TOKENS.card} overflow-hidden`}
      >
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5 min-w-0 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#156EF5] via-[#2180FA] to-[#4CA3F7] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(22,119,249,0.2)]">
              <Award className="w-8 h-8" />
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={DASHBOARD_TOKENS.sectionLabel}>
                    Program Completion Certificate
                  </span>
                  {isIssued ? (
                    <span className={DASHBOARD_TOKENS.badgeSuccess}>
                      <ShieldCheck className="w-3 h-3" /> Issued & Verified
                    </span>
                  ) : isEligible ? (
                    <span className={DASHBOARD_TOKENS.badgeBlue}>
                      <Sparkles className="w-3 h-3" /> Ready to Claim
                    </span>
                  ) : (
                    <span className={DASHBOARD_TOKENS.badgeWarning}>
                      <Clock className="w-3 h-3" /> Requirements Incomplete
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.015em] leading-[1.3] text-[#171C2B]">
                  {programCertificate.scheme}
                </h2>
                <p className={DASHBOARD_TOKENS.description}>
                  Official MagangHub program completion certificate issued to
                  enrolled participants.
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#E7ECF3]">
                <div>
                  <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>Recipient</dt>
                  <dd className={`${DASHBOARD_TOKENS.subheading} mt-1`}>
                    {programCertificate.participantName}
                  </dd>
                </div>
                <div>
                  <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                    Certificate Number
                  </dt>
                  <dd
                    className={`mt-1 text-sm ${
                      isIssued
                        ? 'font-mono font-medium text-[#171C2B]'
                        : 'font-normal text-[#667085]'
                    }`}
                  >
                    {programCertificate.certificateNumber}
                  </dd>
                </div>
                <div>
                  <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                    Issue Date
                  </dt>
                  <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-normal text-[#475467]">
                    <Calendar className="w-3.5 h-3.5 text-[#98A2B3] shrink-0" />
                    <span>{programCertificate.issueDate}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-2.5 shrink-0 lg:min-w-[210px]">
            {isIssued ? (
              <>
                <button
                  type="button"
                  onClick={() => printCertificatePdf(programCertificate)}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCert(programCertificate)}
                  className={DASHBOARD_TOKENS.btnSuccessPill}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Certificate Claimed • View
                </button>
              </>
            ) : isEligible ? (
              <button
                type="button"
                onClick={handleClaimCertificate}
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Claim Certificate Now
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => navigate('/participant/learning')}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  Continue Learning <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled
                  className={DASHBOARD_TOKENS.btnOutline}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Graduation Requirements */}
      <section className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className={DASHBOARD_TOKENS.iconBox}>
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className={DASHBOARD_TOKENS.sectionHeading}>
                  Certificate Eligibility Requirements
                </h2>
                <span
                  className={
                    isEligible
                      ? DASHBOARD_TOKENS.badgeSuccess
                      : DASHBOARD_TOKENS.badgeWarning
                  }
                >
                  {isEligible ? 'Eligible' : `${graduationPercent}% Complete`}
                </span>
              </div>
              <p className={DASHBOARD_TOKENS.description}>
                Complete all learning materials and evaluation quizzes in{' '}
                <span className="font-medium text-[#171C2B]">
                  {activeSchemeTitle}
                </span>
                .
              </p>
            </div>
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
          <div
            className={`${DASHBOARD_TOKENS.subcard} p-4 flex items-center justify-between gap-3`}
          >
            <div className="flex items-start gap-3 min-w-0">
              {completedCount === requiredMaterialIds.length ? (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              ) : (
                <Clock className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5 min-w-0">
                <p className={DASHBOARD_TOKENS.subheading}>
                  Learning Material Completion
                </p>
                <p className={DASHBOARD_TOKENS.metaText}>
                  Complete all videos & documents in Learning Materials
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#1677F9] tabular-nums shrink-0">
              {completedCount} / {requiredMaterialIds.length}
            </span>
          </div>

          <div
            className={`${DASHBOARD_TOKENS.subcard} p-4 flex items-center justify-between gap-3`}
          >
            <div className="flex items-start gap-3 min-w-0">
              {passedQuizCount === REQUIRED_QUIZ_IDS.length ? (
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              ) : (
                <Clock className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5 min-w-0">
                <p className={DASHBOARD_TOKENS.subheading}>
                  Module Evaluation Quizzes
                </p>
                <p className={DASHBOARD_TOKENS.metaText}>
                  Pass the HTML Basics & CSS Styling evaluation quizzes
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#1677F9] tabular-nums shrink-0">
              {passedQuizCount} / {REQUIRED_QUIZ_IDS.length}
            </span>
          </div>
        </div>
      </section>

      {previewCert && (
        <CertificatePreviewModal
          certificate={previewCert}
          onClose={() => setPreviewCert(null)}
        />
      )}
    </div>
  );
}
