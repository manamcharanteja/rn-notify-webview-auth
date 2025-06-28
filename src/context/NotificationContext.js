import React, { createContext, useContext, useMemo } from 'react';
import useNotifications from '../hooks/useNotifications';

// Create Notification Context
const NotificationContext = createContext();

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const notifications = useNotifications();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => notifications, [notifications]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}; 