import { useCallback, useEffect, useState } from 'react';
import { QuizQuestion } from '../types/learning.types';

export const PASSING_PERCENTAGE = 70;

export interface SubmitQuizResult {
  ok: boolean;
  unansweredCount: number;
  firstUnansweredIndex: number;
}

export const useQuiz = (
  questions: QuizQuestion[],
  durationInSeconds: number = 600,
  quizKey?: string
) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIdx(0);
    setAnswers(new Array(questions.length).fill(null));
    setTimeLeft(durationInSeconds);
    setIsFinished(false);
    setIsTimeUp(false);
    setValidationError(null);
  }, [questions.length, durationInSeconds]);

  // Reset state whenever route quizKey or question set changes
  useEffect(() => {
    resetQuiz();
  }, [quizKey, resetQuiz]);

  // Single stable interval while active
  useEffect(() => {
    if (isFinished || questions.length === 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsTimeUp(true);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isFinished, questions.length, quizKey]);

  const answerQuestion = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestionIdx] = optionIndex;
      return next;
    });
    setValidationError(null);
  };

  const nextQuestion = () => {
    setCurrentQuestionIdx((prev) =>
      prev < questions.length - 1 ? prev + 1 : prev
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIdx(index);
    }
  };

  const submitQuiz = (): SubmitQuizResult => {
    const unansweredIndices = answers.reduce<number[]>((acc, ans, idx) => {
      if (ans === null) acc.push(idx);
      return acc;
    }, []);

    if (unansweredIndices.length > 0) {
      const firstUnansweredIndex = unansweredIndices[0]!;
      setValidationError(
        `There are still ${unansweredIndices.length} unanswered questions (see question #${firstUnansweredIndex + 1}).`
      );
      setCurrentQuestionIdx(firstUnansweredIndex);
      return {
        ok: false,
        unansweredCount: unansweredIndices.length,
        firstUnansweredIndex,
      };
    }

    setValidationError(null);
    setIsFinished(true);
    return {
      ok: true,
      unansweredCount: 0,
      firstUnansweredIndex: -1,
    };
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const correctCount = answers.filter(
    (ans, idx) => ans !== null && ans === questions[idx]?.correctAnswer
  ).length;
  const scorePercentage =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;
  const isPassed =
    questions.length > 0 && scorePercentage >= PASSING_PERCENTAGE;

  return {
    currentQuestionIdx,
    setCurrentQuestionIdx,
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
  };
};
