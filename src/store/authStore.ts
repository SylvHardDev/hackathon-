// import { create } from 'zustand';
// import { User } from '@/types';

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
//   setUser: (user: User | null) => void;
//   setLoading: (isLoading: boolean) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isLoading: true,
//   setUser: (user) => set({ user }),
//   setLoading: (isLoading) => set({ isLoading }),
// })); 

// store/authStore.ts
import { create } from 'zustand';

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  role: 'admin' | 'employe' | 'client';
}

interface AuthState {
  user: Utilisateur | null;
  setUser: (user: Utilisateur | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
