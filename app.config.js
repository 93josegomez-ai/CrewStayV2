import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: 'CrewStay',
    slug: 'crewstay',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0B2545'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.crewstay.app'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0B2545'
      },
      package: 'com.crewstay.app'
    },
    web: {
      bundler: 'metro',
      output: 'static'
    },
    extra: {
      eas: {
        projectId: '00000000-0000-0000-0000-000000000000'
      },
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      },
      expoNotificationsChannel: process.env.EXPO_NOTIFICATIONS_CHANNEL
    },
    plugins: [
      'expo-notifications',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static'
          }
        }
      ]
    ],
    updates: {
      fallbackToCacheTimeout: 0
    }
  };
};
