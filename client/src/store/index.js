import { create } from 'zustand'
import { createAuthSlice } from './slices/authSlice.js'
import { createChatSlice } from './slices/chatSlice.js'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createChatSlice(...a),
    }),
    {
      name: 'app-storage', // Key for local storage
      getStorage: () => localStorage, // Use local storage
    }
  )
)