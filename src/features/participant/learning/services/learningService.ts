import { TaskSubmission } from '../types/learning.types';

// Mock API Call: Submit Tugas Praktik
export const submitTaskData = async (submission: TaskSubmission): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Task submitted to backend:', submission);
      resolve({ success: true, message: 'Tugas berhasil dikumpulkan!' });
    }, 1500); // Simulasi delay network
  });
};

// Mock API Call: Submit Nilai Quiz
export const submitQuizScore = async (quizId: string, score: number, totalQuestions: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Quiz ${quizId} submitted with score: ${score}/${totalQuestions}`);
      resolve(true);
    }, 1000);
  });
};

// Mock API Call: Mark Video as Completed
export const markMaterialCompleted = async (materialId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Material ${materialId} marked as completed`);
      resolve(true);
    }, 500);
  });
};