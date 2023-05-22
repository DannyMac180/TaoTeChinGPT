import { User } from 'firebase/auth';
import { createContext } from 'react';

interface UserContextType {
  user: User | undefined;
  credits: number | undefined;
}

export const UserContext = createContext<UserContextType>({ user: undefined, credits: undefined });
