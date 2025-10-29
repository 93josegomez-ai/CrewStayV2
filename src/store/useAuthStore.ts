import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { VerificationStatus } from '../types/user';

type SerializedUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type SerializedVerificationStatus = {
  idVerified: boolean;
  employmentVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  updatedAt: string | null;
};

interface AuthState {
  user: SerializedUser | null;
  verification?: SerializedVerificationStatus;
  isLoading: boolean;
  setUser: (user: User | SerializedUser | null) => void;
  setVerification: (verification?: VerificationStatus | SerializedVerificationStatus) => void;
  setIsLoading: (value: boolean) => void;
  reset: () => void;
}

const serializeUser = (user: User | SerializedUser | null): SerializedUser | null => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null
  };
};

const serializeVerification = (
  verification?: VerificationStatus | SerializedVerificationStatus
): SerializedVerificationStatus | undefined => {
  if (!verification) {
    return undefined;
  }

  const rawUpdatedAt = (verification as { updatedAt?: unknown }).updatedAt;
  let updatedAt: string | null = null;

  if (rawUpdatedAt instanceof Timestamp) {
    updatedAt = rawUpdatedAt.toDate().toISOString();
  } else if (rawUpdatedAt instanceof Date) {
    updatedAt = rawUpdatedAt.toISOString();
  } else if (typeof rawUpdatedAt === 'string') {
    updatedAt = rawUpdatedAt;
  }

  return {
    idVerified: verification.idVerified,
    employmentVerified: verification.employmentVerified,
    verificationStatus: verification.verificationStatus,
    rejectionReason: verification.rejectionReason,
    updatedAt
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      verification: undefined,
      setUser: (user) => set({ user: serializeUser(user) }),
      setVerification: (verification) => set({ verification: serializeVerification(verification) }),
      setIsLoading: (value) => set({ isLoading: value }),
      reset: () => set({ user: null, verification: undefined })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        verification: state.verification
      })
    }
  )
);

export const useIsVerified = () => {
  const verification = useAuthStore((state) => state.verification);
  return verification?.verificationStatus === 'approved';
};
