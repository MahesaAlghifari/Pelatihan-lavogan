import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { PASSING_PERCENTAGE, useQuiz } from './hooks/useQuiz';
import { QUIZ_RESULTS_STORAGE_KEY } from './hooks/useLearningProgress';
import { QuizCard } from './components/QuizCard';
import { quizzes } from '@/data/datadummy';
import type { QuizQuestion, QuizResultInfo } from './types/learning.types';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

export function QuizPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const requestedQuiz = id ? quizzes[id] : quizzes['html-intro-video'];
  const quizId = id ?? 'html-intro-video';
  const questions: QuizQuestion[] = requestedQuiz?.questions ?? [];

  const {
    currentQuestionIdx,
    goToQuestion,
    answers,
    answeredCount,
    timeLeft,
    isFinished,
    isTimeUp,
    correctCount,
    scorePercentage,
    isPassed,
    validationError,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuiz(questions, 600, quizId);

  useEffect(() => {
    if (!isFinished || !requestedQuiz || questions.length === 0) return;
    try {
      const raw = localStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
      const existing = raw
        ? (JSON.parse(raw) as Record<string, QuizResultInfo>)
        : {};
      const previous = existing[quizId];

      // Preserve prior pass status if participant casually retakes a passed quiz
      if (previous?.passed && !isPassed) {
        return;
      }

      existing[quizId] = {
        quizId,
        score: correctCount,
        total: questions.length,
        passed: isPassed,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(QUIZ_RESULTS_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }
  }, [
    isFinished,
    requestedQuiz,
    quizId,
    correctCount,
    questions.length,
    isPassed,
  ]);

  if (!requestedQuiz || questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto w-full py-6">
        <div className={`${DASHBOARD_TOKENS.card} p-6 sm:p-8 space-y-4`}>
          <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h1 className={DASHBOARD_TOKENS.cardTitle}>
            Quiz Tidak Ditemukan
          </h1>
          <p className="text-sm font-normal text-[#667085]">
            Maaf, quiz yang Anda cari tidak tersedia atau sudah dipindahkan.
          </p>
          <button
            type="button"
            onClick={() => navigate('/participant/learning')}
            className={DASHBOARD_TOKENS.btnPrimary}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Materi Belajar
          </button>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 60;
  const currentQuestion = questions[currentQuestionIdx];

  const handleSubmit = () => {
    const result = submitQuiz();
    if (!result.ok) {
      toast.error(
        `Masih ada ${result.unansweredCount} soal yang belum dijawab.`
      );
      return;
    }
    toast.success('Quiz berhasil dikumpulkan.');
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto w-full space-y-5 py-2">
        <div className={`${DASHBOARD_TOKENS.card} p-6 sm:p-8 space-y-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7ECF3] pb-5">
            <div className="flex items-start gap-4">
              {isPassed ? (
                <div className="w-12 h-12 rounded-2xl bg-[#ECFDF3] text-[#16A34A] flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
              )}

              <div>
                <p className={DASHBOARD_TOKENS.sectionLabel}>
                  {requestedQuiz.title}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#171C2B] tracking-tight mt-0.5">
                  {isPassed ? 'Selamat, Anda Lulus!' : 'Maaf, Anda Belum Lulus'}
                </h2>
                <p className="text-xs sm:text-sm font-normal text-[#667085] mt-1">
                  {isTimeUp
                    ? 'Waktu pengerjaan habis dan jawaban terakhir dikumpulkan otomatis.'
                    : `Syarat kelulusan minimal ${PASSING_PERCENTAGE}%.`}
                </p>
              </div>
            </div>

            <div className={`${DASHBOARD_TOKENS.subcard} px-4 py-3 text-left sm:text-right shrink-0`}>
              <p className="text-xs font-normal text-[#667085]">
                Skor Akhir
              </p>
              <p className="text-2xl font-bold text-[#1677F9] tabular-nums">
                {scorePercentage}%
              </p>
              <p className="text-xs font-normal text-[#667085]">
                {correctCount} dari {questions.length} benar
              </p>
            </div>
          </div>

          {/* Ringkasan Jawaban */}
          <div className="space-y-3">
            <h3 className={DASHBOARD_TOKENS.mutedMetaLabel}>
              Ringkasan Jawaban
            </h3>
            <div className="space-y-2.5">
              {questions.map((q, idx) => {
                const chosen = answers[idx];
                const isCorrect =
                  chosen !== null && chosen === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border text-sm space-y-1 ${
                      isCorrect
                        ? 'border-[#BBF7D0] bg-[#ECFDF3]/60'
                        : 'border-[#FECACA] bg-[#FEF2F2]/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#171C2B]">
                        {idx + 1}. {q.question}
                      </p>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs font-normal text-[#667085]">
                      Jawaban Anda:{' '}
                      <strong
                        className={
                          isCorrect ? 'text-[#16A34A]' : 'text-[#DC2626]'
                        }
                      >
                        {chosen !== null && chosen !== undefined
                          ? q.options[chosen]
                          : 'Tidak dijawab'}
                      </strong>
                      {!isCorrect && (
                        <>
                          {' '}
                          • Kunci Jawaban:{' '}
                          <strong className="text-[#16A34A]">
                            {q.options[q.correctAnswer]}
                          </strong>
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E7ECF3]">
            <button
              type="button"
              onClick={resetQuiz}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#1677F9]" />
              Ulangi Quiz
            </button>

            <button
              type="button"
              onClick={() => navigate('/participant/learning')}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              Kembali ke Materi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4 py-2">
      {/* Top Back Navigation */}
      <button
        type="button"
        onClick={() => navigate('/participant/learning')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#667085] hover:text-[#1677F9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Materi Belajar
      </button>

      {/* Quiz Header & Timer */}
      <div className={`${DASHBOARD_TOKENS.card} p-4 sm:p-5 space-y-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <p className={DASHBOARD_TOKENS.sectionLabel}>
              {requestedQuiz.materialName ?? 'Evaluasi Materi'} • Minimal Lulus{' '}
              {PASSING_PERCENTAGE}%
            </p>
            <h1 className="font-semibold text-base sm:text-lg text-[#171C2B] tracking-tight mt-0.5">
              {requestedQuiz.title}
            </h1>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-base font-bold shrink-0 self-start sm:self-center ${
              isLowTime
                ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                : 'bg-[#F3F6FB] text-[#171C2B] border border-[#E7ECF3]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#1677F9]" />
            <span>
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Question Number Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#E7ECF3]">
          <div className="flex flex-wrap items-center gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIdx;
              const isAnswered = answers[idx] !== null;
              return (
                <button
                  key={q.id}
                  type="button"
                  aria-label={`Soal nomor ${idx + 1}`}
                  onClick={() => goToQuestion(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors border ${
                    isCurrent
                      ? 'bg-[#1677F9] text-white border-[#1677F9]'
                      : isAnswered
                        ? 'bg-[#ECFDF3] text-[#16A34A] border-[#BBF7D0] hover:bg-[#DCFCE7]'
                        : 'bg-white text-[#667085] border-[#E7ECF3] hover:bg-[#F3F6FB]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <span className="text-xs font-normal text-[#667085]">
            Terjawab {answeredCount} dari {questions.length} soal
          </span>
        </div>
      </div>

      {/* Inline Validation Alert (replaces browser alert()) */}
      {validationError && (
        <div
          role="alert"
          className="rounded-xl border border-[#FCD34D] bg-[#FEF3C7]/60 px-4 py-3 text-xs sm:text-sm font-medium text-[#171C2B] flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Question Card */}
      {currentQuestion && (
        <QuizCard
          question={currentQuestion}
          currentNumber={currentQuestionIdx + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestionIdx] ?? null}
          onAnswerSelect={answerQuestion}
        />
      )}

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={currentQuestionIdx === 0}
          className={DASHBOARD_TOKENS.btnOutline}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Sebelumnya
        </button>

        <div className="flex items-center gap-2.5">
          {currentQuestionIdx < questions.length - 1 ? (
            <button
              type="button"
              onClick={nextQuestion}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              Selanjutnya
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Kumpulkan Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
