import * as admin from 'firebase-admin';

// Function to decrement credits for a user
async function decrementCredits(userId: string) {
  const userRef = admin.firestore().collection('users').doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const credits = userDoc.data()?.credits;
  if (credits === undefined || credits <= 0) {
    throw new Error(`User with ID ${userId} has no credits`);
  }
  await userRef.update({ credits: credits - 1 });
}

export default decrementCredits;