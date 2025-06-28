import React, { createContext, useContext, useEffect, useMemo } from 'react';
import useAuth from '../hooks/useAuth';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  // Check for existing session on app start
  useEffect(() => {
    auth.checkExistingSession();
  }, [auth.checkExistingSession]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => auth, [auth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 