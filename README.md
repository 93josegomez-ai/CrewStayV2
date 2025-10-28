# CrewStay

CrewStay is an Expo (React Native) application for airline crew lodging, built with Expo SDK 54, TypeScript, Zustand state management, and Firebase services. The project emphasizes security, exclusivity, and community.

## Requirements
- Node.js 18.x (`.nvmrc` provided)
- Expo CLI (`npm install -g expo-cli`)
- Firebase project with Auth, Firestore, and Storage enabled

## Getting Started

```bash
# Install Node 18 (if using nvm)
nvm use

# Install dependencies
yarn install # or npm install

# Start Expo in development mode
yarn start
```

On macOS, run `npx expo start` (or `yarn start`) and scan the QR code with Expo Go 54.0.2.

## Environment Variables

Copy `.env.example` to `.env` and provide your Firebase configuration plus the Expo notifications channel name. Variables are injected via `app.config.js`.

```bash
cp .env.example .env
```

## Project Structure

```
.
├── App.tsx
├── app.config.js
├── src
│   ├── app
│   │   ├── navigation
│   │   ├── providers
│   │   └── screens
│   ├── components
│   ├── features (reserved for future vertical slices)
│   ├── lib
│   ├── store
│   └── types
├── functions
│   ├── src
│   └── tsconfig.json
├── firestore.rules
├── __tests__
└── assets (placeholder for branding)
```

## Key Features
- **Authentication & Verification**: Firebase Auth with two-step verification (government ID + airline proof). Unverified users see read-only state with CTAs to verify.
- **Navigation**: React Navigation (stack + tabs) configured for Expo SDK 54.
- **State**: Zustand stores for auth, filters, and notification preferences.
- **Stays**: List/map toggle, amenity and safety tags, booking guardrails.
- **Community**: Crew-only feed, messaging stubs, moderation hooks.
- **Notifications**: Expo Notifications integration with centralized provider and user preferences.
- **Firebase Functions**: Stubs for push notifications and future payment orchestration.
- **Security Rules**: Firestore rules enforcing verification before publishing stays or bookings.
- **Testing**: Jest + React Native Testing Library covering auth guards, booking restrictions, rules expectations, and accessibility basics.

## Scripts
- `yarn start` – Launch Metro bundler.
- `yarn lint` – Run ESLint.
- `yarn test` – Execute Jest test suite.
- `yarn format` – Format code using Prettier.

## Limitations & Next Steps
- **Payments**: In-app payments/Stripe are intentionally disabled for Expo Go compatibility. A Firebase Function (`futurePaymentIntent`) marks the placeholder. Native builds can integrate payments later.
- **Realtime Messaging**: UI stubs exist; wire them to Firestore or a dedicated messaging service.
- **Push Notifications**: Implement server-side Expo push service to deliver alerts triggered by Cloud Functions.

## Deployment
- Configure Firebase project resources (Auth, Firestore, Storage, Functions).
- Deploy security rules: `firebase deploy --only firestore:rules`.
- Deploy Cloud Functions (after filling TODOs): `cd functions && npm install && npm run deploy`.

## Expo Build Configuration
- `app.config.js` includes required plugins (`expo-notifications`, `expo-build-properties`).
- `babel.config.js` registers `react-native-reanimated` plugin per SDK 54 requirements.

## Data Protection
- Sensitive documents are uploaded to Firebase Storage under `/verifications/{uid}/` paths. Access control should be hardened via Storage security rules (not included) and backend review workflows.
