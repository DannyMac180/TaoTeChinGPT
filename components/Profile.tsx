// src/components/Profile.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Profile;
