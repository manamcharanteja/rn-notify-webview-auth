import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNotificationContext } from '../context/NotificationContext';

// Memoized Header Component
const TestHeader = React.memo(({ onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
    <View style={styles.headerContent}>
      <Text style={styles.headerTitle}>Notification Test</Text>
      <Text style={styles.headerSubtitle}>Test push notifications</Text>
    </View>
    <View style={styles.placeholder} />
  </View>
));

// Memoized Status Row Component
const StatusRow = React.memo(({ label, value, color }) => (
  <View style={styles.statusRow}>
    <Text style={styles.statusLabel}>{label}:</Text>
    <Text style={[styles.statusValue, color && { color }]} numberOfLines={2}>
      {value}
    </Text>
  </View>
));

// Memoized Status Card Component
const StatusCard = React.memo(({ isPermissionGranted, deviceToken, badgeCount }) => (
  <View style={styles.statusCard}>
    <StatusRow 
      label="Permissions" 
      value={isPermissionGranted ? 'Granted' : 'Denied'}
      color={isPermissionGranted ? '#4CAF50' : '#F44336'}
    />
    <StatusRow 
      label="Device Token" 
      value={deviceToken ? deviceToken.substring(0, 20) + '...' : 'Not available'}
    />
    <StatusRow 
      label="Badge Count" 
      value={badgeCount.toString()}
    />
  </View>
));

// Memoized Test Button Component
const TestButton = React.memo(({ title, onPress, style, textStyle }) => (
  <TouchableOpacity
    style={[styles.testButton, style]}
    onPress={onPress}
  >
    <Text style={[styles.testButtonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
));


// Main NotificationTest Component
const NotificationTest = React.memo(({ onBack }) => {
  const {
    sendLocalNotification,
    scheduleLocalNotification,
    cancelAllNotifications,
    deviceToken,
    isPermissionGranted,
    getBadgeCount,
    setBadgeCount,
  } = useNotificationContext();

  const [badgeCount, setBadgeCountState] = useState(0);

  // Memoized callback functions
  const handleSendTestNotification = useCallback(() => {
    sendLocalNotification(
      'Test Notification',
      'This is a test notification from the app!',
      { type: 'test', timestamp: Date.now() }
    );
    Alert.alert('Success', 'Test notification sent!');
  }, [sendLocalNotification]);


  const handleCancelNotifications = useCallback(() => {
    cancelAllNotifications();
    Alert.alert('Success', 'All notifications cancelled!');
  }, [cancelAllNotifications]);

  const handleUpdateBadgeCount = useCallback(() => {
    const newCount = badgeCount + 1;
    setBadgeCount(newCount);
    setBadgeCountState(newCount);
    Alert.alert('Success', `Badge count updated to ${newCount}`);
  }, [badgeCount, setBadgeCount]);

  const handleResetBadgeCount = useCallback(() => {
    setBadgeCount(0);
    setBadgeCountState(0);
    Alert.alert('Success', 'Badge count reset to 0');
  }, [setBadgeCount]);

  // Memoized status props
  const statusProps = useMemo(() => ({
    isPermissionGranted,
    deviceToken,
    badgeCount,
  }), [isPermissionGranted, deviceToken, badgeCount]);

  return (
    <SafeAreaView style={styles.container}>
      <TestHeader onBack={onBack} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Status</Text>
          <StatusCard {...statusProps} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Notifications</Text>
          
          <TestButton
            title="Send Test Notification"
            onPress={handleSendTestNotification}
          />

          <TestButton
            title="Cancel All Notifications"
            onPress={handleCancelNotifications}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Management</Text>
          
          <TestButton
            title="Increment Badge Count"
            onPress={handleUpdateBadgeCount}
          />

          <TestButton
            title="Reset Badge Count"
            onPress={handleResetBadgeCount}
            style={styles.resetButton}
            textStyle={styles.resetButtonText}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusLabel: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  testButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
  },
  cancelButtonText: {
    color: '#ffffff',
  },
  resetButton: {
    backgroundColor: '#ff9500',
  },
  resetButtonText: {
    color: '#ffffff',
  },
  instructionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default NotificationTest; 