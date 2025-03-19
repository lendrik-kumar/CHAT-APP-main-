import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice.js';

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'app-storage', 
      getStorage: () => localStorage, 
    }
  )
);