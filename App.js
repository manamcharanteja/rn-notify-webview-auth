/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView 
} from 'react-native';
import WebViewComponent from './src/components/WebViewComponent';
import LoginScreen from './src/components/LoginScreen';
import UserProfile from './src/components/UserProfile';
import HomeScreen from './src/components/HomeScreen';
import { AuthProvider, useAuthContext } from './src/context/AuthContext';

// Main App Component
const AppContent = () => {
  const [showWebView, setShowWebView] = useState(false);
  const { 
    isAuthenticated, 
    user, 
    isLoading, 
    login, 
    logout 
  } = useAuthContext();

  const handleLoginSuccess = (userData) => {
    // Login is handled by the auth context
  };

  const handleLogout = () => {
    logout();
  };

  const handleShowWebView = () => {
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (showWebView === 'profile') {
    return <UserProfile user={user} onLogout={handleLogout} onBack={() => setShowWebView(false)} />;
  }

  if (showWebView) {
    return <WebViewComponent onClose={handleCloseWebView} />;
  }

  return (
    <HomeScreen 
      user={user}
      onOpenWebView={handleShowWebView}
      onViewProfile={() => setShowWebView('profile')}
      onLogout={handleLogout}
    />
  );
};

// Root App Component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
  },
});

export default App; 