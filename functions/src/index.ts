import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createUserRecord = functions.auth.user().onCreate((user) => {
    return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
        console.log(`User ${user.uid} added to Firestore`);
        return null;
    })
    .catch(error => {
        console.error('Error adding user to Firestore', error);
        return null;
    });
});
