import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

interface UserContextType {
  user: User | undefined;
  credits: number | undefined;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({ user: undefined, credits: undefined });

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [credits, setCredits] = useState<number | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUser(user);
      
      const userDocRef = firestore.collection('users').doc(user.uid);

      const fetchUserData = async () => {
        const userDoc = await userDocRef.get();
        const userData = userDoc.data();
        setCredits(userData?.credits);
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, credits }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;