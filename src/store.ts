import { create } from 'zustand';
import type { DataPoint } from './types';

interface DashboardState {
  points: DataPoint[];
  isPaused: boolean;
  togglePause: () => void;
  addBatch: (newPoints: DataPoint[]) => void;
}

export const useDataStore = create<DashboardState>((set) => ({
  points: [],
  isPaused: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  addBatch: (newPoints) => set((state) => ({
    // MAINTAIN MEMORY: Keep only the last 60 points to prevent browser lag
    points: [...state.points, ...newPoints].slice(-60)
  })),
}));