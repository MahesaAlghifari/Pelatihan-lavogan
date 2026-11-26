import { Check } from 'lucide-react';
import { QuizQuestion } from '../types/learning.types';

interface QuizCardProps {
  question: QuizQuestion;
  currentNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function QuizCard({
  question,
  currentNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}: QuizCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs">
      <div className="px-5 py-4 sm:px-6 border-b border-border bg-muted/60">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
              Pertanyaan {currentNumber} dari {totalQuestions}
            </p>
            <h3
              className="mt-1 text-base sm:text-lg font-bold leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              {question.question}
            </h3>
          </div>

          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap self-start"
            style={{
              backgroundColor:
                selectedAnswer !== null
                  ? 'var(--success-light)'
                  : 'var(--warning-light)',
              color:
                selectedAnswer !== null ? 'var(--success)' : 'var(--warning)',
            }}
          >
            {selectedAnswer !== null ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Terjawab
              </>
            ) : (
              '○ Belum Dijawab'
            )}
          </span>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={question.question}
        className="p-5 sm:p-6 space-y-3"
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const letter = OPTION_LETTERS[index] ?? String(index + 1);

          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3.5 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-xs'
                  : 'border-border bg-white hover:bg-muted/40'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-muted text-slate-600'
                }`}
              >
                {letter}
              </span>
              <span
                className="text-sm sm:text-base font-medium leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
