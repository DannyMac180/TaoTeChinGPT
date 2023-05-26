import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
  const userRef = admin.firestore().doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt
      });

      const creditsRef = admin.firestore().doc(`credits/${user.uid}`);
      await creditsRef.set({
        credits: 10
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  }
});