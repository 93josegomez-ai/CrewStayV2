import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { VerificationStatus } from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  verification?: VerificationStatus;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setVerification: (verification?: VerificationStatus) => void;
  setIsLoading: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      verification: undefined,
      setUser: (user) => set({ user }),
      setVerification: (verification) => set({ verification }),
      setIsLoading: (value) => set({ isLoading: value }),
      reset: () => set({ user: null, verification: undefined })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export const useIsVerified = () => {
  const verification = useAuthStore((state) => state.verification);
  return verification?.verificationStatus === 'approved';
};
