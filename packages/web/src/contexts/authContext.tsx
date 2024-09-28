import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  FC,
} from 'react';

import { jwtService } from '../services/jwtService';

interface AuthContextType {
  userId: string | null;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const payload = jwtService.getPayload();
    setUserId(payload?.userId ?? null);
  }, []);

  const onLogin = (token: string) => {
    jwtService.store(token);
    const payload = jwtService.getPayload();
    setUserId(payload?.userId ?? null);
  };

  const onLogout = () => {
    jwtService.clear();
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
