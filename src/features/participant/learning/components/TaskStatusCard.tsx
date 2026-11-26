import { CheckCircle2, Clock, ExternalLink, FileText, RefreshCw } from 'lucide-react';
import type { SubmittedTaskInfo } from '../types/learning.types';

interface TaskStatusCardProps {
  task: SubmittedTaskInfo;
  onResubmit: () => void;
}

export function TaskStatusCard({ task, onResubmit }: TaskStatusCardProps) {
  const statusConfig =
    task.status === 'approved'
      ? {
          label: 'Disetujui',
          bg: 'var(--success-light)',
          color: 'var(--success)',
          Icon: CheckCircle2,
        }
      : {
          label: task.status === 'revision' ? 'Perlu Revisi' : 'Menunggu Penilaian',
          bg: 'var(--warning-light)',
          color: 'var(--warning)',
          Icon: Clock,
        };

  const StatusIcon = statusConfig.Icon;

  return (
    <div className="bg-card rounded-2xl border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Status Pengumpulan Tugas
          </span>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span>Dikumpulkan: {task.submittedAt}</span>
          {task.fileName && (
            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
              <FileText className="w-3.5 h-3.5 text-primary" />
              {task.fileName}
            </span>
          )}
          {task.link && (
            <a
              href={task.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline truncate max-w-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              {task.link}
            </a>
          )}
        </div>

        {task.feedback && (
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {task.feedback}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onResubmit}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-border hover:bg-muted transition-colors shrink-0"
        style={{ color: 'var(--text-primary)' }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Perbarui Tugas
      </button>
    </div>
  );
}
