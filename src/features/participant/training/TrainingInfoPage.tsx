import {
  ArrowLeft,
  ArrowRight,
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  FileCheck,
  Layers,
  Lock,
  Target,
  Users,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { learningPaths, schemes, trainingsData } from '@/data/datadummy';
import { useSchemeEnrollment } from '@/features/participant/schemes/schemeEnrollmentStorage';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

export function TrainingInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrollment, selectScheme } = useSchemeEnrollment();

  const matchedTraining = trainingsData.find((t) => t.id === id);
  const matchedScheme = schemes.find((s) => s.id === id);

  const title =
    matchedTraining?.title ??
    matchedScheme?.name ??
    trainingsData[0]?.title ??
    'Program Pelatihan';
  const description =
    matchedTraining?.description ??
    matchedScheme?.description ??
    trainingsData[0]?.description ??
    '';
  const duration =
    matchedTraining?.duration ??
    matchedScheme?.duration.replace(/\bmonths?\b/gi, 'Bulan') ??
    '-';
  const level = matchedScheme?.level ?? 'Menengah';
  const participantsCount = matchedScheme?.participants;
  const isAvailable = matchedScheme ? matchedScheme.available : true;
  const isLockedToThis = Boolean(
    matchedScheme && enrollment?.schemeId === matchedScheme.id
  );
  const isLockedToOther = Boolean(
    matchedScheme && enrollment && enrollment.schemeId !== matchedScheme.id
  );
  const currentEnrolledName =
    schemes.find((s) => s.id === enrollment?.schemeId)?.name ??
    enrollment?.schemeId;

  const syllabus =
    (id && learningPaths[id]) ||
    (matchedTraining?.learningPath
      ? matchedTraining.learningPath.map((lp, idx) => ({
          id: idx + 1,
          title: lp.title,
          modules: lp.modules.length,
        }))
      : learningPaths['full-stack'] ?? []);

  return (
    <div className="w-full space-y-4">
      <button
        type="button"
        onClick={() => navigate('/participant/schemes')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#667085] hover:text-[#1677F9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Program Pelatihan
      </button>

      <div className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6`}>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={
                isAvailable
                  ? DASHBOARD_TOKENS.badgeSuccess
                  : DASHBOARD_TOKENS.badgeWarning
              }
            >
              {isAvailable ? 'Program Tersedia' : 'Segera Hadir'}
            </span>
            <span className={DASHBOARD_TOKENS.badgeNeutral}>
              <Clock className="w-3.5 h-3.5 text-[#1677F9]" /> {duration}
            </span>
            <span className={DASHBOARD_TOKENS.badgeNeutral}>
              <BarChart className="w-3.5 h-3.5 text-[#1677F9]" /> {level}
            </span>
            {participantsCount !== undefined && (
              <span className={DASHBOARD_TOKENS.badgeNeutral}>
                <Users className="w-3.5 h-3.5 text-[#1677F9]" /> {participantsCount} Peserta
              </span>
            )}
          </div>

          <h1 className={DASHBOARD_TOKENS.pageTitle}>
            {title}
          </h1>
          <p className={`${DASHBOARD_TOKENS.pageSubtitle} leading-relaxed`}>
            {description}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
          {isLockedToOther ? (
            <>
              <button
                type="button"
                disabled
                className="h-9 px-4 rounded-xl text-xs font-semibold bg-[#F3F6FB] text-[#667085] border border-[#E7ECF3] inline-flex items-center justify-center gap-1.5 cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                Terkunci (Terdaftar di {currentEnrolledName})
              </button>
              <button
                type="button"
                onClick={() => navigate('/participant/schemes')}
                className="text-xs font-semibold text-[#1677F9] hover:underline"
              >
                Ajukan perubahan program ke Admin di Program Pelatihan
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={!isAvailable}
              onClick={() => {
                if (matchedScheme && !enrollment) {
                  const res = selectScheme(matchedScheme.id);
                  if (!res.ok) {
                    toast.error(res.error);
                    return;
                  }
                  toast.success(
                    `Program "${matchedScheme.name}" berhasil dipilih dan terkunci.`
                  );
                }
                navigate(
                  id ? `/participant/learning?scheme=${id}` : '/participant/learning'
                );
              }}
              className={`${DASHBOARD_TOKENS.btnPrimary} shrink-0`}
            >
              {!isAvailable
                ? 'Belum Tersedia'
                : isLockedToThis
                  ? 'Lanjut Belajar'
                  : matchedScheme
                    ? 'Pilih & Mulai Program'
                    : 'Mulai Belajar'}
              {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Syllabus / Learning Path */}
      {syllabus.length > 0 && (
        <div className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-4`}>
          <div className="flex items-center gap-2.5">
            <div className={DASHBOARD_TOKENS.iconBoxSm}>
              <Layers className="w-4 h-4" />
            </div>
            <h2 className={DASHBOARD_TOKENS.cardTitle}>
              Kurikulum & Learning Path ({syllabus.length} Tahap)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {syllabus.map((item, idx) => (
              <div
                key={item.id ?? idx}
                className={`${DASHBOARD_TOKENS.subcard} p-3.5 flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-[#EAF3FF] text-[#1677F9] text-xs font-semibold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#171C2B] truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs font-normal text-[#667085] shrink-0">
                  {item.modules} Modul
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${DASHBOARD_TOKENS.card} p-5`}>
          <div className={`${DASHBOARD_TOKENS.iconBox} mb-3.5`}>
            <Target className="w-4 h-4" />
          </div>
          <h3 className={`${DASHBOARD_TOKENS.cardTitle} mb-3`}>
            Tujuan Pembelajaran
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-normal text-[#667085]">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#1677F9] shrink-0 mt-0.5" />
              Memahami konsep fundamental pada skema {title}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#1677F9] shrink-0 mt-0.5" />
              Mampu menerapkan standar industri melalui praktik langsung
            </li>
          </ul>
        </div>

        <div className={`${DASHBOARD_TOKENS.card} p-5`}>
          <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-3.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className={`${DASHBOARD_TOKENS.cardTitle} mb-3`}>
            Aturan Pelatihan
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-normal text-[#667085]">
            <li className="flex items-start gap-2">
              <span className="text-[#B45309] shrink-0 mt-0.5">•</span>
              Menyelesaikan seluruh materi video dan modul dokumen
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#B45309] shrink-0 mt-0.5">•</span>
              Lulus semua quiz evaluasi modul
            </li>
          </ul>
        </div>

        <div className={`${DASHBOARD_TOKENS.card} p-5`}>
          <div className="w-9 h-9 rounded-lg bg-[#ECFDF3] text-[#16A34A] flex items-center justify-center mb-3.5">
            <FileCheck className="w-4 h-4" />
          </div>
          <h3 className={`${DASHBOARD_TOKENS.cardTitle} mb-3`}>
            Syarat Sertifikat
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-normal text-[#667085]">
            <li className="flex items-start gap-2">
              <span className="text-[#16A34A] shrink-0 mt-0.5">•</span>
              Progres pembelajaran mencapai 100%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#16A34A] shrink-0 mt-0.5">•</span>
              Seluruh tugas praktik & quiz dinyatakan lulus
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
