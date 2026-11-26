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
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

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
        badgeClass: DASHBOARD_TOKENS.badgeNeutral,
        Icon: Clock,
      }
    : submittedTask.status === 'approved'
      ? {
          label: 'Disetujui',
          badgeClass: DASHBOARD_TOKENS.badgeSuccess,
          Icon: CheckCircle2,
        }
      : {
          label:
            submittedTask.status === 'revision'
              ? 'Perlu Revisi'
              : 'Menunggu Penilaian',
          badgeClass: DASHBOARD_TOKENS.badgeWarning,
          Icon: Clock,
        };

  const StatusIcon = statusConfig.Icon;

  return (
    <div className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-5`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <span className={DASHBOARD_TOKENS.sectionLabel}>
              Penugasan Praktik Modul
            </span>
            <h2 className="text-lg font-semibold text-[#171C2B] tracking-tight mt-0.5">
              {material.name}
            </h2>
            <p className="text-xs sm:text-sm font-normal text-[#667085] mt-1 leading-relaxed">
              {material.assignment?.description ??
                material.description ??
                'Kerjakan tugas praktik sesuai materi modul ini lalu kumpulkan tautan repositori/dokumen atau file hasil pengerjaan Anda.'}
            </p>
          </div>
        </div>

        <span className={`${statusConfig.badgeClass} shrink-0 self-start`}>
          <StatusIcon className="w-3 h-3" />
          {statusConfig.label}
        </span>
      </div>

      {/* Assignment Guidelines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className={`${DASHBOARD_TOKENS.subcard} p-3.5`}>
          <p className="text-[11px] font-normal text-[#667085]">
            Format Pengumpulan
          </p>
          <p className="text-sm font-semibold text-[#171C2B] mt-1">
            URL (GitHub/Drive) atau PDF/ZIP
          </p>
        </div>
        <div className={`${DASHBOARD_TOKENS.subcard} p-3.5`}>
          <p className="text-[11px] font-normal text-[#667085]">
            Estimasi Pengerjaan
          </p>
          <p className="text-sm font-semibold text-[#171C2B] mt-1">
            {material.duration ?? '45 Menit'}
          </p>
        </div>
        <div className={`${DASHBOARD_TOKENS.subcard} p-3.5`}>
          <p className="text-[11px] font-normal text-[#667085]">
            Penilai
          </p>
          <p className="text-sm font-semibold text-[#171C2B] mt-1">
            {material.instructor ?? 'Instruktur MagangHub'}
          </p>
        </div>
      </div>

      {/* Submission details when submitted */}
      {submittedTask && (
        <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-2`}>
          <p className={DASHBOARD_TOKENS.mutedMetaLabel}>
            Riwayat Pengumpulan Terakhir
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#667085]">
            <span>Dikumpulkan: {submittedTask.submittedAt}</span>
            {submittedTask.fileName && (
              <span className="inline-flex items-center gap-1 font-semibold text-[#171C2B]">
                <FileText className="w-3.5 h-3.5 text-[#1677F9]" />
                {submittedTask.fileName}
              </span>
            )}
            {submittedTask.link && (
              <a
                href={submittedTask.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#1677F9] hover:underline truncate max-w-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                {submittedTask.link}
              </a>
            )}
          </div>
          {submittedTask.feedback && (
            <p className="text-xs font-normal text-[#667085]">
              {submittedTask.feedback}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end pt-3 border-t border-[#E7ECF3]">
        <button
          type="button"
          onClick={onOpenSubmitModal}
          className={DASHBOARD_TOKENS.btnPrimary}
        >
          {submittedTask ? (
            <>
              <RefreshCw className="w-3.5 h-3.5" /> Perbarui Tugas
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" /> Kumpulkan Tugas
            </>
          )}
        </button>
      </div>
    </div>
  );
}
