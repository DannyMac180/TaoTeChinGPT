import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextType {
  user: User | undefined;
}

export const UserContext = createContext<UserContextType>({ user: undefined });
