import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.body;
  const userRef = admin.firestore().collection('users').doc(uid);

  try {
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userData = userDoc.data() as { credits: number }; // add type assertion
    const { credits } = userData;
    await userRef.update({ credits: credits - 1 });

    res.status(200).json({ message: 'Credits decremented successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}