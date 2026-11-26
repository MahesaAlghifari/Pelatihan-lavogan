import {
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  RefreshCw,
  Upload,
} from 'lucide-react';
import type { Material, SubmittedTaskInfo } from '../types/learning.types';

interface TaskModuleCardProps {
  material: Material;
  submittedTask?: SubmittedTaskInfo;
  onOpenSubmitModal: () => void;
}

export function TaskModuleCard({
  material,
  submittedTask,
  onOpenSubmitModal,
}: TaskModuleCardProps) {
  const statusConfig = !submittedTask
    ? {
        label: 'Belum Dikumpulkan',
        bg: 'var(--muted)',
        color: 'var(--text-secondary)',
        Icon: Clock,
      }
    : submittedTask.status === 'approved'
      ? {
          label: 'Disetujui',
          bg: 'var(--success-light)',
          color: 'var(--success)',
          Icon: CheckCircle2,
        }
      : {
          label:
            submittedTask.status === 'revision'
              ? 'Perlu Revisi'
              : 'Menunggu Penilaian',
          bg: 'var(--warning-light)',
          color: 'var(--warning)',
          Icon: Clock,
        };

  const StatusIcon = statusConfig.Icon;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileCheck2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Penugasan Praktik Modul
            </span>
            <h2
              className="text-xl font-bold mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {material.name}
            </h2>
            <p
              className="text-sm mt-1 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {material.assignment?.description ??
                material.description ??
                'Kerjakan tugas praktik sesuai materi modul ini lalu kumpulkan tautan repositori/dokumen atau file hasil pengerjaan Anda.'}
            </p>
          </div>
        </div>

        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 self-start"
          style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {statusConfig.label}
        </span>
      </div>

      {/* Assignment Guidelines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-muted/40 border border-border">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Format Pengumpulan
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
            URL (GitHub/Drive) atau PDF/ZIP
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/40 border border-border">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Estimasi Pengerjaan
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
            {material.duration ?? '45 Menit'}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/40 border border-border">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Penilai
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>
            {material.instructor ?? 'Instruktur MagangHub'}
          </p>
        </div>
      </div>

      {/* Submission details when submitted */}
      {submittedTask && (
        <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Riwayat Pengumpulan Terakhir
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>Dikumpulkan: {submittedTask.submittedAt}</span>
            {submittedTask.fileName && (
              <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                <FileText className="w-3.5 h-3.5 text-primary" />
                {submittedTask.fileName}
              </span>
            )}
            {submittedTask.link && (
              <a
                href={submittedTask.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline truncate max-w-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                {submittedTask.link}
              </a>
            )}
          </div>
          {submittedTask.feedback && (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {submittedTask.feedback}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end pt-3 border-t border-border">
        <button
          type="button"
          onClick={onOpenSubmitModal}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          {submittedTask ? (
            <>
              <RefreshCw className="w-4 h-4" /> Perbarui Tugas
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Kumpulkan Tugas
            </>
          )}
        </button>
      </div>
    </div>
  );
}
