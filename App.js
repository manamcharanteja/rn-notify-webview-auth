/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback, useMemo } from 'react';
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
import NotificationTest from './src/components/NotificationTest';
import NotificationDisplay from './src/components/NotificationDisplay';
import { AuthProvider, useAuthContext } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';

// Memoized Loading Component
const LoadingScreen = React.memo(() => (
  <SafeAreaView style={styles.container}>
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  </SafeAreaView>
));

// Main App Component
const AppContent = React.memo(() => {
  const [showWebView, setShowWebView] = useState(false);
  const { 
    isAuthenticated, 
    user, 
    isLoading, 
    logout 
  } = useAuthContext();

  // Memoized callback functions to prevent re-renders
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleShowWebView = useCallback(() => {
    setShowWebView(true);
  }, []);

  const handleCloseWebView = useCallback(() => {
    setShowWebView(false);
  }, []);

  const handleViewProfile = useCallback(() => {
    setShowWebView('profile');
  }, []);

  const handleOpenNotificationTest = useCallback(() => {
    setShowWebView('notifications');
  }, []);

  const handleBack = useCallback(() => {
    setShowWebView(false);
  }, []);

  // Memoized user props to prevent unnecessary re-renders
  const userProps = useMemo(() => ({
    user,
    onOpenWebView: handleShowWebView,
    onViewProfile: handleViewProfile,
    onOpenNotificationTest: handleOpenNotificationTest,
    onLogout: handleLogout,
  }), [user, handleShowWebView, handleViewProfile, handleOpenNotificationTest, handleLogout]);

  // Memoized profile props
  const profileProps = useMemo(() => ({
    user,
    onLogout: handleLogout,
    onBack: handleBack,
  }), [user, handleLogout, handleBack]);

  // Memoized notification test props
  const notificationTestProps = useMemo(() => ({
    onBack: handleBack,
  }), [handleBack]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  if (showWebView === 'profile') {
    return <UserProfile {...profileProps} />;
  }

  if (showWebView === 'notifications') {
    return <NotificationTest {...notificationTestProps} />;
  }

  if (showWebView) {
    return <WebViewComponent onClose={handleCloseWebView} />;
  }

  return (
    <>
      <NotificationDisplay />
      <HomeScreen {...userProps} />
    </>
  );
});

// Root App Component with AuthProvider
const App = React.memo(() => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
});

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