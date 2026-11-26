import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, AuthContextType } from '../types/auth.types';
import { loginUser } from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek sesi login setiap kali aplikasi dimuat ulang
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (role: Role, email: string, password: string) => {
    // Memanggil service API
    const loggedInUser = await loginUser(role, email, password);
    
    // Simpan ke state dan localStorage
    setUser(loggedInUser);
    localStorage.setItem('authUser', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    // Jika nanti pakai token JWT, tambahkan: localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};