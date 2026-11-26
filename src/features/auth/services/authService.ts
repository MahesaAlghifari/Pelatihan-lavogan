import { User, Role } from '../types/auth.types';

// Mock API Call - Nanti ganti dengan pemanggilan ke Laravel API (misal: axios.post('/api/login'))
export const loginUser = async (role: Role, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulasi validasi dari backend
      if (password === 'admin123' && role === 'admin') {
        resolve({
          id: 'admin-1',
          name: 'Admin LearnHub',
          email: email,
          role: 'admin',
        });
      } else if (password === 'peserta123' && role === 'participant') {
        resolve({
          id: 'user-1',
          name: 'John Doe',
          email: email,
          role: 'participant',
        });
      } else {
        reject(new Error('Email atau password salah'));
      }
    }, 1000); // Delay 1 detik untuk mensimulasikan network request
  });
};