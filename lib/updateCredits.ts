import { firestore, increment } from '@/lib/firebase';

export const decrementCredits = async (uid: string, decrementValue: number) => {
  const userRef = firestore.collection('users').doc(uid);
  await userRef.update({
    credits: increment(-decrementValue)
  });
};

export const incrementCredits = async (uid: string, incrementValue: number) => {
  const userRef = firestore.collection('users').doc(uid);
  await userRef.update({
    credits: increment(incrementValue)
  });
};
