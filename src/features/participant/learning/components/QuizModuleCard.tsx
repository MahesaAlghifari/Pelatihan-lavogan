import { Award, CheckCircle, ClipboardCheck, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import type { Material, QuizResultInfo } from '../types/learning.types';

interface QuizModuleCardProps {
  material: Material;
  result?: QuizResultInfo;
  onStartQuiz: () => void;
}

export function QuizModuleCard({ material, result, onStartQuiz }: QuizModuleCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Evaluasi Modul
            </span>
            <h2 className="text-xl font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
              {material.name}
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {material.description ??
                'Uji pemahaman Anda terhadap seluruh materi pada modul ini.'}
            </p>
          </div>
        </div>

        {result && (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0"
            style={{
              backgroundColor: result.passed ? 'var(--success-light)' : 'var(--warning-light)',
              color: result.passed ? 'var(--success)' : 'var(--warning)',
            }}
          >
            <CheckCircle className="w-4 h-4" />
            {result.passed
              ? `Lulus (${result.score}/${result.total})`
              : `Skor Terakhir: ${result.score}/${result.total}`}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Jumlah Soal</p>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {material.questionCount ?? 5} Pilihan Ganda
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Durasi</p>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {material.duration ?? '10 Menit'}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
          <Award className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Syarat Lulus</p>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Semua Benar (100%)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2 border-t border-border">
        <button
          type="button"
          onClick={onStartQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          {result ? 'Kerjakan Ulang Quiz' : 'Mulai Quiz Sekarang'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
