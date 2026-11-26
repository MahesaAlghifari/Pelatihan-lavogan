export type MaterialType = 'video' | 'pdf' | 'quiz' | 'task';

export interface Assignment {
  title: string;
  description: string;
}

export interface MaterialResource {
  label: string;
  size: string;
  type: string;
  fileName?: string;
  previewContent?: string;
}

export interface Material {
  id: string;
  name: string;
  title?: string;
  type: MaterialType;
  contentUrl: string;
  instructor?: string;
  duration?: string;
  pages?: number;
  status: 'active' | 'locked' | 'completed';
  description?: string;
  keyPoints?: string[];
  resources?: MaterialResource[];
  quizId?: string;
  questionCount?: number;
  assignment?: Assignment;
}

export interface Module {
  id: string;
  title: string;
  modules: Material[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  title: string;
  materialName: string;
  questions: QuizQuestion[];
}

export interface TaskSubmission {
  materialId: string;
  link?: string;
  file?: File;
}

export type TaskReviewStatus = 'pending' | 'approved' | 'revision';

export interface SubmittedTaskInfo {
  materialId: string;
  link?: string;
  fileName?: string;
  submittedAt: string;
  status: TaskReviewStatus;
  feedback?: string;
}

export interface QuizResultInfo {
  quizId: string;
  score: number;
  total: number;
  passed: boolean;
  completedAt: string;
}

export interface DiscussionComment {
  id: string;
  materialId: string;
  author: string;
  role: 'participant' | 'instructor';
  message: string;
  createdAt: string;
}
