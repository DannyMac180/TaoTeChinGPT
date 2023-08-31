import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { UserContext } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [credits, setCredits] = useState(0);

  const router = useRouter();

  const signIn = () => {
    auth.signInWithPopup(googleProvider);
  }

  const signOut = () => {
    auth.signOut();
    router.reload();
  }

  useEffect(() => {
    if (user) {
      const docRef = firestore.collection('users').doc(user.uid);
      const unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          setCredits(doc.data()?.credits);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

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
                <img src={user?.photoURL ?? undefined} />
              </Link>
            </li>
            <li>
                <span className="credits">{credits ?? undefined} TAO</span>
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