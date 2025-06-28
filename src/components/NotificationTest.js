import React, { useState } from 'react';
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

const NotificationTest = ({ onBack }) => {
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

  const handleSendTestNotification = () => {
    sendLocalNotification(
      'Test Notification',
      'This is a test notification from the app!',
      { type: 'test', timestamp: Date.now() }
    );
    Alert.alert('Success', 'Test notification sent!');
  };

  const handleScheduleNotification = () => {
    const futureDate = new Date(Date.now() + 5000); // 5 seconds from now
    scheduleLocalNotification(
      'Scheduled Notification',
      'This notification was scheduled 5 seconds ago!',
      futureDate,
      { type: 'scheduled', timestamp: Date.now() }
    );
    Alert.alert('Success', 'Notification scheduled for 5 seconds from now!');
  };

  const handleCancelNotifications = () => {
    cancelAllNotifications();
    Alert.alert('Success', 'All notifications cancelled!');
  };

  const handleUpdateBadgeCount = () => {
    const newCount = badgeCount + 1;
    setBadgeCount(newCount);
    setBadgeCountState(newCount);
    Alert.alert('Success', `Badge count updated to ${newCount}`);
  };

  const handleResetBadgeCount = () => {
    setBadgeCount(0);
    setBadgeCountState(0);
    Alert.alert('Success', 'Badge count reset to 0');
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Status</Text>
          
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Permissions:</Text>
              <Text style={[styles.statusValue, { color: isPermissionGranted ? '#4CAF50' : '#F44336' }]}>
                {isPermissionGranted ? 'Granted' : 'Denied'}
              </Text>
            </View>
            
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Device Token:</Text>
              <Text style={styles.statusValue} numberOfLines={2}>
                {deviceToken ? deviceToken.substring(0, 20) + '...' : 'Not available'}
              </Text>
            </View>
            
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Badge Count:</Text>
              <Text style={styles.statusValue}>{badgeCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Notifications</Text>
          
          <TouchableOpacity
            style={styles.testButton}
            onPress={handleSendTestNotification}
          >
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.testButton, styles.cancelButton]}
            onPress={handleCancelNotifications}
          >
            <Text style={styles.cancelButtonText}>Cancel All Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badge Management</Text>
          
          <TouchableOpacity
            style={styles.testButton}
            onPress={handleUpdateBadgeCount}
          >
            <Text style={styles.testButtonText}>Increment Badge Count</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.testButton, styles.resetButton]}
            onPress={handleResetBadgeCount}
          >
            <Text style={styles.resetButtonText}>Reset Badge Count</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Test</Text>
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionText}>
              • Tap "Send Test Notification" to send an immediate notification{'\n'}
              • Put the app in background to test background notifications{'\n'}
              • Check the notification display at the top when notifications arrive{'\n'}
              • Use "Cancel All Notifications" to clear scheduled notifications
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  testButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#FF9500',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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