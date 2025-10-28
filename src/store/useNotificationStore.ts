import { create } from 'zustand';

type NotificationType = 'stays' | 'booking' | 'verification';

interface NotificationPreferences {
  stays: boolean;
  booking: boolean;
  verification: boolean;
}

interface NotificationState {
  expoPushToken?: string;
  preferences: NotificationPreferences;
  setPushToken: (token?: string) => void;
  togglePreference: (type: NotificationType) => void;
}

const defaultPreferences: NotificationPreferences = {
  stays: true,
  booking: true,
  verification: true
};

export const useNotificationStore = create<NotificationState>((set) => ({
  expoPushToken: undefined,
  preferences: defaultPreferences,
  setPushToken: (token) => set({ expoPushToken: token }),
  togglePreference: (type) =>
    set((state) => ({
      preferences: { ...state.preferences, [type]: !state.preferences[type] }
    }))
}));
