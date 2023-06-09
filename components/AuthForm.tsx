import React from 'react';
import { auth, googleProvider } from '../lib/firebase';

const AuthForm: React.FC = () => {
  // ...

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="button">
      {/* ... */}
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default AuthForm;
