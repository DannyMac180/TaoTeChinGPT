import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';

const AuthListener: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect to the homepage if the user is logged in
        router.push('/');
      }
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [router]);

  return null;
};

export default AuthListener;
