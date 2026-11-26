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
        <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-warning/15 text-warning flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1
            className="text-xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Quiz Tidak Ditemukan
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Maaf, quiz yang Anda cari tidak tersedia atau sudah dipindahkan.
          </p>
          <button
            type="button"
            onClick={() => navigate('/participant/learning')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
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
      <div className="max-w-3xl mx-auto w-full space-y-6 py-2">
        <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-start gap-4">
              {isPassed ? (
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-8 h-8" />
                </div>
              )}

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {requestedQuiz.title}
                </p>
                <h2
                  className="text-2xl font-bold mt-0.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {isPassed ? 'Selamat, Anda Lulus!' : 'Maaf, Anda Belum Lulus'}
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {isTimeUp
                    ? 'Waktu pengerjaan habis dan jawaban terakhir dikumpulkan otomatis.'
                    : `Syarat kelulusan minimal ${PASSING_PERCENTAGE}%.`}
                </p>
              </div>
            </div>

            <div className="bg-muted/60 rounded-xl px-4 py-3 text-left sm:text-right shrink-0">
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Skor Akhir
              </p>
              <p className="text-2xl font-extrabold text-primary">
                {scorePercentage}%
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {correctCount} dari {questions.length} benar
              </p>
            </div>
          </div>

          {/* Ringkasan Jawaban */}
          <div className="space-y-3">
            <h3
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: 'var(--text-secondary)' }}
            >
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
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-red-200 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {idx + 1}. {q.question}
                      </p>
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Jawaban Anda:{' '}
                      <strong
                        className={
                          isCorrect ? 'text-emerald-700' : 'text-red-700'
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
                          <strong className="text-emerald-700">
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

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={resetQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-border bg-white hover:bg-muted transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              <RotateCcw className="w-4 h-4 text-primary" />
              Ulangi Quiz
            </button>

            <button
              type="button"
              onClick={() => navigate('/participant/learning')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              Kembali ke Materi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5 py-2">
      {/* Top Back Navigation */}
      <button
        type="button"
        onClick={() => navigate('/participant/learning')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Materi Belajar
      </button>

      {/* Quiz Header & Timer */}
      <div className="bg-card p-4 sm:p-5 rounded-2xl border border-border shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {requestedQuiz.materialName ?? 'Evaluasi Materi'} • Minimal Lulus{' '}
              {PASSING_PERCENTAGE}%
            </p>
            <h1
              className="font-bold text-lg sm:text-xl mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {requestedQuiz.title}
            </h1>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-base sm:text-lg font-bold shrink-0 self-start sm:self-center ${
              isLowTime
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-muted text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Question Number Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/70">
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
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors border ${
                    isCurrent
                      ? 'bg-primary text-white border-primary'
                      : isAnswered
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-white text-slate-600 border-border hover:bg-muted'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Terjawab {answeredCount} dari {questions.length} soal
          </span>
        </div>
      </div>

      {/* Inline Validation Alert (replaces browser alert()) */}
      {validationError && (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs sm:text-sm font-medium text-amber-900 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
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
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={currentQuestionIdx === 0}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border bg-white hover:bg-muted font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        <div className="flex items-center gap-2.5">
          {currentQuestionIdx < questions.length - 1 ? (
            <button
              type="button"
              onClick={nextQuestion}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              Selanjutnya
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              <CheckCircle className="w-4 h-4" />
              Kumpulkan Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
