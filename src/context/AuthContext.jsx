import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Dr. Alex Vance',
    email: 'alex.vance@analytics.ai',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const login = (email, password) => {
    const namePart = email.includes('@') ? email.split('@')[0] : 'User';
    setUser({
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email: email,
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      reducedMotion,
      setReducedMotion
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
