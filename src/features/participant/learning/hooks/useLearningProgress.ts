import { useState, useMemo, useEffect, useCallback } from 'react';
import type {
  DiscussionComment,
  Module,
  QuizResultInfo,
  SubmittedTaskInfo,
} from '../types/learning.types';

export const PROGRESS_STORAGE_KEY = 'lavogan_learning_completed';
export const TASKS_STORAGE_KEY = 'lavogan_learning_tasks_v2';
export const NOTES_STORAGE_KEY = 'lavogan_learning_notes';
export const DISCUSSIONS_STORAGE_KEY = 'lavogan_learning_discussions';
export const QUIZ_RESULTS_STORAGE_KEY = 'lavogan_quiz_results';
export const LAST_MATERIAL_STORAGE_KEY = 'lavogan_last_material_id';
export const CLAIMED_CERTS_KEY = 'lavogan_claimed_certificates';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const DEFAULT_DISCUSSIONS: Record<string, DiscussionComment[]> = {
  'html-intro-video': [
    {
      id: 'disc-1',
      materialId: 'html-intro-video',
      author: 'Muhammad Zacky',
      role: 'instructor',
      message:
        'Welcome to the HTML Basics module! Make sure to try writing the basic <!DOCTYPE html> structure directly in your code editor while watching the video.',
      createdAt: '2 days ago',
    },
    {
      id: 'disc-2',
      materialId: 'html-intro-video',
      author: 'Ahmad Sudirman',
      role: 'participant',
      message:
        'Should <header> and <main> tags always be used in HTML5 for better SEO?',
      createdAt: '1 day ago',
    },
  ],
  'css-fund-video': [
    {
      id: 'disc-3',
      materialId: 'css-fund-video',
      author: 'Rizki Darmawan, S.Kom.',
      role: 'instructor',
      message:
        'Use DevTools (Inspect Element) to visually inspect box-model margin, border, and padding while practicing.',
      createdAt: '3 days ago',
    },
  ],
};

export const useLearningProgress = (learningPath: Module[]) => {
  const [completedMaterials, setCompletedMaterials] = useState<string[]>(() =>
    readJson<string[]>(PROGRESS_STORAGE_KEY, [])
  );
  const [submittedTasks, setSubmittedTasks] = useState<
    Record<string, SubmittedTaskInfo>
  >(() => readJson<Record<string, SubmittedTaskInfo>>(TASKS_STORAGE_KEY, {}));
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    readJson<Record<string, string>>(NOTES_STORAGE_KEY, {})
  );
  const [discussions, setDiscussions] = useState<
    Record<string, DiscussionComment[]>
  >(() => readJson<Record<string, DiscussionComment[]>>(DISCUSSIONS_STORAGE_KEY, DEFAULT_DISCUSSIONS));
  const [quizResults, setQuizResults] = useState<Record<string, QuizResultInfo>>(
    () => readJson<Record<string, QuizResultInfo>>(QUIZ_RESULTS_STORAGE_KEY, {})
  );

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedMaterials));
    } catch {
      // ignore storage errors
    }
  }, [completedMaterials]);

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(submittedTasks));
    } catch {
      // ignore storage errors
    }
  }, [submittedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore storage errors
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(DISCUSSIONS_STORAGE_KEY, JSON.stringify(discussions));
    } catch {
      // ignore storage errors
    }
  }, [discussions]);

  const allItems = useMemo(
    () => learningPath.flatMap((section) => section.modules ?? []),
    [learningPath]
  );

  const totalMaterials = allItems.length;

  const isItemCompleted = useCallback(
    (itemId: string, quizId?: string) => {
      if (completedMaterials.includes(itemId)) return true;
      if (quizId && quizResults[quizId]?.passed) return true;
      return false;
    },
    [completedMaterials, quizResults]
  );

  const completedCount = useMemo(
    () => allItems.filter((item) => isItemCompleted(item.id, item.quizId)).length,
    [allItems, isItemCompleted]
  );

  const progressPercentage = useMemo(() => {
    if (totalMaterials === 0) return 0;
    return Math.round((completedCount / totalMaterials) * 100);
  }, [completedCount, totalMaterials]);

  const markAsCompleted = useCallback((materialId: string) => {
    setCompletedMaterials((prev) =>
      prev.includes(materialId) ? prev : [...prev, materialId]
    );
  }, []);

  const recordTaskSubmission = useCallback(
    (materialId: string, payload: { link?: string; fileName?: string }) => {
      const info: SubmittedTaskInfo = {
        materialId,
        link: payload.link || undefined,
        fileName: payload.fileName || undefined,
        submittedAt: new Date().toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'pending',
        feedback: 'Assignment is awaiting review from the instructor.',
      };
      setSubmittedTasks((prev) => ({ ...prev, [materialId]: info }));
      markAsCompleted(materialId);
    },
    [markAsCompleted]
  );

  const saveNote = useCallback((materialId: string, content: string) => {
    setNotes((prev) => ({ ...prev, [materialId]: content }));
  }, []);

  const addDiscussion = useCallback(
    (materialId: string, author: string, message: string) => {
      const entry: DiscussionComment = {
        id: `disc-${Date.now()}`,
        materialId,
        author,
        role: 'participant',
        message,
        createdAt: 'Just now',
      };
      setDiscussions((prev) => ({
        ...prev,
        [materialId]: [...(prev[materialId] ?? []), entry],
      }));
    },
    []
  );

  const refreshQuizResults = useCallback(() => {
    setQuizResults(readJson<Record<string, QuizResultInfo>>(QUIZ_RESULTS_STORAGE_KEY, {}));
  }, []);

  return {
    totalMaterials,
    completedCount,
    completedMaterials,
    submittedTasks,
    notes,
    discussions,
    quizResults,
    progressPercentage,
    isItemCompleted,
    markAsCompleted,
    recordTaskSubmission,
    saveNote,
    addDiscussion,
    refreshQuizResults,
  };
};
