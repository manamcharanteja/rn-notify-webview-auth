import { useState, useCallback } from 'react';

// Simulated OIDC Authentication Hook
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate OIDC login process
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Dummy user validation
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: 'user_123',
          email: 'user@example.com',
          name: 'John Doe',
          given_name: 'John',
          family_name: 'Doe',
          picture: 'https://via.placeholder.com/150/007AFF/FFFFFF?text=JD',
          email_verified: true,
          sub: 'user_123'
        };

        const tokens = {
          access_token: 'dummy_access_token_' + Date.now(),
          refresh_token: 'dummy_refresh_token_' + Date.now(),
          expires_in: 3600,
          token_type: 'Bearer'
        };

        setIsAuthenticated(true);
        setUser(userData);
        setAccessToken(tokens.access_token);
        setRefreshToken(tokens.refresh_token);

        // Store in AsyncStorage (simulated)
        storeTokens(tokens);
        storeUser(userData);

        return {
          success: true,
          user: userData,
          tokens
        };
      } else {
        throw new Error('Invalid credentials. Use user@example.com / password');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simulate OIDC logout
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      // Clear stored data (simulated)
      clearStoredData();

      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get current user info
  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  // Check if user is authenticated
  const isUserAuthenticated = useCallback(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  // Get access token
  const getAccessToken = useCallback(() => {
    return accessToken;
  }, [accessToken]);

  // Simulate token refresh
  const refreshAccessToken = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newToken = 'dummy_access_token_refreshed_' + Date.now();
      setAccessToken(newToken);
      storeTokens({ access_token: newToken });
      
      return newToken;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simulate checking for existing session
  const checkExistingSession = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate finding existing session
      const hasStoredSession = Math.random() > 0.5; // 50% chance
      
      if (hasStoredSession) {
        const userData = {
          id: 'user_123',
          email: 'user@example.com',
          name: 'John Doe',
          given_name: 'John',
          family_name: 'Doe',
          picture: 'https://via.placeholder.com/150/007AFF/FFFFFF?text=JD',
          email_verified: true,
          sub: 'user_123'
        };

        setIsAuthenticated(true);
        setUser(userData);
        setAccessToken('dummy_access_token_existing_' + Date.now());
        
        return { success: true, user: userData };
      }
      
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper functions
  const storeTokens = (tokens) => {
    // In real app, this would use AsyncStorage
    console.log('Storing tokens:', tokens);
  };

  const storeUser = (userData) => {
    // In real app, this would use AsyncStorage
    console.log('Storing user:', userData);
  };

  const clearStoredData = () => {
    // In real app, this would clear AsyncStorage
    console.log('Clearing stored data');
  };

  return {
    // State
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    isLoading,
    
    // Actions
    login,
    logout,
    refreshAccessToken,
    checkExistingSession,
    
    // Getters
    getCurrentUser,
    isUserAuthenticated,
    getAccessToken,
  };
};

export default useAuth; 