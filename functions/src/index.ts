import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
  const userRef = admin.firestore().doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    const createdAt = new Date();
    const credits = 10;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        credits
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  }
});