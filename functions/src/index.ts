import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const notifyNewStay = functions.firestore
  .document('stays/{stayId}')
  .onCreate(async (snapshot) => {
    const stay = snapshot.data();
    functions.logger.info('New stay created', stay);
    // TODO: lookup crew by base and send Expo push notifications via external service
    return null;
  });

export const notifyVerificationUpdate = functions.firestore
  .document('crewProfiles/{userId}')
  .onUpdate(async (change) => {
    const beforeStatus = change.before.data().verification?.verificationStatus;
    const afterStatus = change.after.data().verification?.verificationStatus;

    if (beforeStatus !== afterStatus) {
      functions.logger.info('Verification status changed', { userId: change.after.id, afterStatus });
    }

    return null;
  });

export const futurePaymentIntent = functions.https.onCall(async () => {
  throw new functions.https.HttpsError(
    'failed-precondition',
    'In-app payments are unavailable (future update once native payments are supported).'
  );
});
