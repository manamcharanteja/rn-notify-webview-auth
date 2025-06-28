import { useState, useEffect, useCallback } from 'react';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

const useNotifications = () => {
  const [latestNotification, setLatestNotification] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Initialize push notifications
  const initializeNotifications = useCallback(() => {
    // Configure push notification
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
        setDeviceToken(token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        setLatestNotification(notification);
      },

      // (optional) Called when the user fails to register for remote notifications
      onRegistrationError: function (err) {
        console.error('Registration error:', err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - false: it will not be called if the app was opened by a push notification
       */
      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Default channel',
          channelDescription: 'A default channel for notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
          vibration: 300,
        },
        (created) => console.log(`Channel created: ${created}`)
      );
    }
  }, []);

  // Request notification permissions
  const requestPermissions = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await PushNotification.requestPermissions();
        setIsPermissionGranted(authStatus);
        return authStatus;
      } else {
        // Android permissions are handled automatically
        setIsPermissionGranted(true);
        return true;
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }, []);

  // Send local notification (for testing)
  const sendLocalNotification = useCallback((title, message, data = {}) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      vibration: 300,
      data: data,
      smallIcon: 'ic_notification',
      largeIcon: '',
      bigText: message,
      subText: '',
      color: '#007AFF',
      number: 1,
    });
  }, []);

  // Schedule local notification
  const scheduleLocalNotification = useCallback((title, message, date, data = {}) => {
    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      date: date,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      vibration: 300,
      data: data,
      smallIcon: 'ic_notification',
      largeIcon: '',
      bigText: message,
      subText: '',
      color: '#007AFF',
      number: 1,
    });
  }, []);

  // Cancel all notifications
  const cancelAllNotifications = useCallback(() => {
    PushNotification.cancelAllLocalNotifications();
  }, []);

  // Get badge count
  const getBadgeCount = useCallback(() => {
    return PushNotification.getApplicationIconBadgeNumber();
  }, []);

  // Set badge count
  const setBadgeCount = useCallback((count) => {
    PushNotification.setApplicationIconBadgeNumber(count);
  }, []);

  // Clear latest notification
  const clearLatestNotification = useCallback(() => {
    setLatestNotification(null);
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeNotifications();
    requestPermissions();
  }, [initializeNotifications, requestPermissions]);

  return {
    // State
    latestNotification,
    deviceToken,
    isPermissionGranted,
    
    // Actions
    sendLocalNotification,
    scheduleLocalNotification,
    cancelAllNotifications,
    clearLatestNotification,
    requestPermissions,
    
    // Getters
    getBadgeCount,
    setBadgeCount,
  };
};

export default useNotifications; 