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
    <div className="w-full space-y-6">
      <button
        type="button"
        onClick={() => navigate('/participant/schemes')}
        className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Program Pelatihan
      </button>

      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: isAvailable
                  ? 'var(--success-light)'
                  : 'var(--warning-light)',
                color: isAvailable ? 'var(--success)' : 'var(--warning)',
              }}
            >
              {isAvailable ? 'Program Tersedia' : 'Segera Hadir'}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-muted" style={{ color: 'var(--text-secondary)' }}>
              <Clock className="w-3.5 h-3.5 text-primary" /> {duration}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-muted" style={{ color: 'var(--text-secondary)' }}>
              <BarChart className="w-3.5 h-3.5 text-primary" /> {level}
            </span>
            {participantsCount !== undefined && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-muted" style={{ color: 'var(--text-secondary)' }}>
                <Users className="w-3.5 h-3.5 text-primary" /> {participantsCount} Peserta
              </span>
            )}
          </div>

          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
          {isLockedToOther ? (
            <>
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold bg-muted text-slate-500 border border-border cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                Terkunci (Terdaftar di {currentEnrolledName})
              </button>
              <button
                type="button"
                onClick={() => navigate('/participant/schemes')}
                className="text-xs font-semibold text-primary hover:underline"
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
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              {!isAvailable
                ? 'Belum Tersedia'
                : isLockedToThis
                  ? 'Lanjut Belajar'
                  : matchedScheme
                    ? 'Pilih & Mulai Program'
                    : 'Mulai Belajar'}
              {isAvailable && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Syllabus / Learning Path */}
      {syllabus.length > 0 && (
        <div className="bg-card p-6 rounded-2xl border border-border space-y-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              Kurikulum & Learning Path ({syllabus.length} Tahap)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {syllabus.map((item, idx) => (
              <div
                key={item.id ?? idx}
                className="p-4 rounded-xl bg-muted/40 border border-border flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </span>
                </div>
                <span className="text-xs font-medium shrink-0" style={{ color: 'var(--text-secondary)' }}>
                  {item.modules} Modul
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border">
          <Target className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
            Tujuan Pembelajaran
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              Memahami konsep fundamental pada skema {title}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              Mampu menerapkan standar industri melalui praktik langsung
            </li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <BookOpen className="w-8 h-8 text-warning mb-4" />
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
            Aturan Pelatihan
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <span className="text-warning shrink-0 mt-0.5">•</span>
              Menyelesaikan seluruh materi video dan modul dokumen
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning shrink-0 mt-0.5">•</span>
              Lulus semua quiz evaluasi modul
            </li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <FileCheck className="w-8 h-8 text-success mb-4" />
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
            Syarat Sertifikat
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <span className="text-success shrink-0 mt-0.5">•</span>
              Progres pembelajaran mencapai 100%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success shrink-0 mt-0.5">•</span>
              Seluruh tugas praktik & quiz dinyatakan lulus
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
