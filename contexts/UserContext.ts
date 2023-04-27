import { createContext } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  // Add other properties as necessary
}

interface UserContextType {
  user: User | null;
}

export const UserContext = createContext<UserContextType>({ user: null });
