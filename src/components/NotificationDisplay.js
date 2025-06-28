import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNotificationContext } from '../context/NotificationContext';

const { width } = Dimensions.get('window');

const NotificationDisplay = () => {
  const { latestNotification, clearLatestNotification } = useNotificationContext();

  if (!latestNotification) {
    return null;
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNotificationType = (notification) => {
    if (notification.foreground) return 'Foreground';
    if (notification.userInteraction) return 'Tapped';
    return 'Background';
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.notificationCard}>
        <View style={styles.header}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {getNotificationType(latestNotification)}
            </Text>
          </View>
          <Text style={styles.timeText}>
            {formatTime(latestNotification.date)}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {latestNotification.title || 'Notification'}
          </Text>
          <Text style={styles.message}>
            {latestNotification.message || 'No message'}
          </Text>
        </View>

        {latestNotification.data && Object.keys(latestNotification.data).length > 0 && (
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Additional Data:</Text>
            <Text style={styles.dataText}>
              {JSON.stringify(latestNotification.data, null, 2)}
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearLatestNotification}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  dataSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dataTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  dataText: {
    fontSize: 11,
    color: '#666666',
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default NotificationDisplay; 