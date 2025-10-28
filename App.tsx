import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { NotificationProvider } from './src/app/providers/NotificationProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './src/lib/firebase';
import { useAuthStore } from './src/store/useAuthStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { crewProfileConverter } from './src/types/user';

const AuthSync: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setVerification = useAuthStore((state) => state.setVerification);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(true);
    let profileUnsubscribe: (() => void) | undefined;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      profileUnsubscribe?.();
      if (firebaseUser) {
        const profileRef = doc(firestore, 'crewProfiles', firebaseUser.uid).withConverter(crewProfileConverter);
        profileUnsubscribe = onSnapshot(profileRef, (snapshot) => {
          const profile = snapshot.data();
          setVerification(profile?.verification);
          setIsLoading(false);
        });
        return;
      }
      setVerification(undefined);
      setIsLoading(false);
    });

    return () => {
      profileUnsubscribe?.();
      unsubscribe();
    };
  }, [setIsLoading, setUser, setVerification]);

  return null;
};

const App = () => {
  return (
    <NotificationProvider>
      <AuthSync />
      <StatusBar style="auto" />
      <RootNavigator />
    </NotificationProvider>
  );
};

export default App;
