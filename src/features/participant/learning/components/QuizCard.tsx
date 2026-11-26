import { Check } from 'lucide-react';
import { QuizQuestion } from '../types/learning.types';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

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
    <div className={`${DASHBOARD_TOKENS.card} overflow-hidden`}>
      <div className="px-5 py-4 sm:px-6 border-b border-[#E7ECF3] bg-[#F9FBFE]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={DASHBOARD_TOKENS.mutedMetaLabel}>
              Question {currentNumber} of {totalQuestions}
            </p>
            <h3 className="mt-1 text-base font-semibold text-[#171C2B] leading-snug">
              {question.question}
            </h3>
          </div>

          <span
            className={
              selectedAnswer !== null
                ? DASHBOARD_TOKENS.badgeSuccess
                : DASHBOARD_TOKENS.badgeWarning
            }
          >
            {selectedAnswer !== null ? (
              <>
                <Check className="w-3 h-3" />
                Answered
              </>
            ) : (
              '○ Unanswered'
            )}
          </span>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={question.question}
        className="p-5 sm:p-6 space-y-2.5"
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
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                isSelected
                  ? 'border-[#1677F9] bg-[#EAF3FF]/60 ring-1 ring-[#1677F9]/30'
                  : 'border-[#E7ECF3] bg-white hover:bg-[#F9FBFE]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#1677F9] text-white'
                    : 'bg-[#F3F6FB] text-[#667085]'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm font-medium text-[#171C2B] leading-snug">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
