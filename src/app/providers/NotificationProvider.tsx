import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useNotificationStore } from '../../store/useNotificationStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setPushToken = useNotificationStore((state) => state.setPushToken);

  useEffect(() => {
    const registerAsync = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== 'granted') {
        const permission = await Notifications.requestPermissionsAsync();
        finalStatus = permission.status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Notification permissions not granted');
        return;
      }

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        console.warn('Missing EAS project ID, skipping push token registration');
        return;
      }

      const tokenResponse = await Notifications.getExpoPushTokenAsync({ projectId });
      setPushToken(tokenResponse.data);

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(
          Constants.expoConfig?.extra?.expoNotificationsChannel || 'crewstay-default',
          {
            name: 'CrewStay Alerts',
            importance: Notifications.AndroidImportance.DEFAULT
          }
        );
      }
    };

    registerAsync();
  }, [setPushToken]);

  return <>{children}</>;
};
