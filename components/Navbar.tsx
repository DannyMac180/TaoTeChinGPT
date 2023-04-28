import Link from 'next/link';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { auth, googleProvider, serverTimestamp } from '../lib/firebase';
import { UserContext } from '@/contexts/UserContext';
import { firestore } from '@/lib/firebase';

export default function Navbar() {
  const { user } = useContext(UserContext);

  const router = useRouter();

  async function createUserDocument(user: User | undefined ) {
    if (!user) return;

    const { uid, email, displayName, photoURL } = user;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      try {
        await userRef.set({
          uid,
          email,
          displayName,
          photoURL,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }
  }

  const signIn =  () => {
    auth.signInWithPopup(googleProvider);
    createUserDocument(user);
  }

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">TAO TE CHINGPT</button>
          </Link>
        </li>

        {/* user is signed-in */}
        {user && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/profile/[user]">
                <img src={ user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!user && (
          <li>
              <button className="btn-blue" onClick={signIn}>Log in</button>
          </li>
        )}
      </ul>
    </nav>
  );
}