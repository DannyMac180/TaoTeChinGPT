import { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';
import { useUserData } from '@/lib/hooks';

interface UserContextType {
  user: User | null | undefined;
  credits: number | undefined;
  updateUser: (newData: Partial<User>) => void;
}

interface UserContextProviderProps {
  children: React.ReactNode;
  updateUser: (newData: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType>({ user: undefined, credits: undefined, updateUser: () => { } });

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const { user } = useUserData();
  const [userData, setUserData] = useState<any>(null);

  const updateUser = (newData: Partial<User>) => {
    if (!user) return;
    setUserData({ ...user, ...newData });
  };

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userRef = firestore.collection('users').doc(user.uid);
          const userData = await userRef.get();
          if (userData.exists) {
            setUserData(userData.data());
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          // Handle or display the error to the user as appropriate for your app
        }
      };

      fetchUserData();
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, credits: userData?.credits, updateUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;