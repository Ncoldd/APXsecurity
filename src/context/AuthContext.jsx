import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // { username, role }

  const login = (username, password) => {
    // simple hardcoded users
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      navigate('/');
    } else if (username === 'user' && password === 'user123') {
      setUser({ username, role: 'regular' });
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const isAdmin = () => user?.role === 'admin';
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}