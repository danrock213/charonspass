'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  unreadMessages: number;
}

interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = () => setUser({ name: 'Jane Doe', unreadMessages: 2 });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
