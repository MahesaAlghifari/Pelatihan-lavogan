import { create } from "zustand";

import type { Training } from "../types";

interface TrainingState {
  /**
   * Training List
   */
  trainings: Training[];

  /**
   * Selected Training
   */
  currentTraining: Training | null;

  /**
   * Loading
   */
  isLoading: boolean;

  /**
   * Actions
   */
  setTrainings: (trainings: Training[]) => void;

  setCurrentTraining: (
    training: Training | null
  ) => void;

  addTraining: (
    training: Training
  ) => void;

  updateTraining: (
    training: Training
  ) => void;

  removeTraining: (
    id: string
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  reset: () => void;
}

const initialState = {
  trainings: [],
  currentTraining: null,
  isLoading: false,
};

export const useTrainingStore =
  create<TrainingState>((set) => ({
    ...initialState,

    setTrainings: (trainings) =>
      set({
        trainings,
      }),

    setCurrentTraining: (
      currentTraining
    ) =>
      set({
        currentTraining,
      }),

    addTraining: (training) =>
      set((state) => ({
        trainings: [
          ...state.trainings,
          training,
        ],
      })),

    updateTraining: (training) =>
      set((state) => ({
        trainings:
          state.trainings.map((item) =>
            item.id === training.id
              ? training
              : item
          ),

        currentTraining:
          state.currentTraining?.id ===
          training.id
            ? training
            : state.currentTraining,
      })),

    removeTraining: (id) =>
      set((state) => ({
        trainings:
          state.trainings.filter(
            (item) => item.id !== id
          ),

        currentTraining:
          state.currentTraining?.id === id
            ? null
            : state.currentTraining,
      })),

    setLoading: (loading) =>
      set({
        isLoading: loading,
      }),

    reset: () =>
      set(initialState),
  }));