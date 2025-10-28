import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const firebaseConfig = Constants.expoConfig?.extra?.firebaseConfig;

if (!firebaseConfig) {
  throw new Error('Missing Firebase configuration. Check your environment variables.');
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(app, { persistence: indexedDBLocalPersistence });
  } catch (error) {
    return getAuth(app);
  }
})();

export const firestore = getFirestore(app);
export const storage = getStorage(app);
