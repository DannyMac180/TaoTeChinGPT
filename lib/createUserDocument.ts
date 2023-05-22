import { firestore } from './firebase';

export const createUserDocument = async (user: { uid?: any; email?: any; displayName?: any; credits?: any}) => {
    if (!user) return;
  
    // Get a reference to the Firestore document
    const userRef = firestore.doc(`users/${user.uid}`);
  
    // Go and fetch the document from that location
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName } = user;
      const createdAt = new Date();
  
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          credits: 10
        });
      } catch (error) {
        console.error('Error creating user', (error as Error).message);
      }
    }
  }