import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { UserContext } from '@/contexts/UserContext';
import { useUserData } from '@/lib/hooks';

export default function Navbar() {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const signIn =  () => {
    auth.signInWithPopup(googleProvider);
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
                <img src={ user?.photoURL } />
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