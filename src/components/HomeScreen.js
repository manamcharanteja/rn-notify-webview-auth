import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Memoized Header Component
const Header = React.memo(({ user, onViewProfile }) => (
  <View style={styles.header}>
    <View style={styles.userInfo}>
      <Text style={styles.greeting}>Good morning, {user?.given_name}!</Text>
      <Text style={styles.subtitle}>Welcome to your dashboard</Text>
    </View>
    <TouchableOpacity style={styles.profileButton} onPress={onViewProfile}>
      <Text style={styles.profileButtonText}>👤</Text>
    </TouchableOpacity>
  </View>
));

// Memoized Stats Component
const StatsSection = React.memo(() => (
  <View style={styles.statsContainer}>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>1</Text>
      <Text style={styles.statLabel}>Active Session</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>✓</Text>
      <Text style={styles.statLabel}>Authenticated</Text>
    </View>
  </View>
));

// Memoized Action Card Component
const ActionCard = React.memo(({ icon, title, description, onPress }) => (
  <TouchableOpacity 
    style={styles.actionCard} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.actionIcon}>{icon}</View>
    <View style={styles.actionContent}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
    </View>
    <Text style={styles.actionArrow}>→</Text>
  </TouchableOpacity>
));

// Memoized Actions Section
const ActionsSection = React.memo(({ onOpenWebView, onViewProfile, onOpenNotificationTest }) => {
  const actions = useMemo(() => [
    {
      icon: '🌐',
      title: 'Open Web View',
      description: 'Browse Google in the app',
      onPress: onOpenWebView,
    },
    {
      icon: '👤',
      title: 'View Profile',
      description: 'See your account details',
      onPress: onViewProfile,
    },
    {
      icon: '🔔',
      title: 'Test Notifications',
      description: 'Send and manage push notifications',
      onPress: onOpenNotificationTest,
    },
  ], [onOpenWebView, onViewProfile, onOpenNotificationTest]);

  return (
    <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      {actions.map((action, index) => (
        <ActionCard key={index} {...action} />
      ))}
    </View>
  );
});

// Memoized User Info Card Component
const UserInfoCard = React.memo(({ user }) => (
  <View style={styles.userCard}>
    <Text style={styles.sectionTitle}>Account Information</Text>
    <View style={styles.userDetail}>
      <Text style={styles.userDetailLabel}>Email:</Text>
      <Text style={styles.userDetailValue}>{user?.email}</Text>
    </View>
    <View style={styles.userDetail}>
      <Text style={styles.userDetailLabel}>Name:</Text>
      <Text style={styles.userDetailValue}>{user?.name}</Text>
    </View>
    <View style={styles.userDetail}>
      <Text style={styles.userDetailLabel}>Status:</Text>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>
          {user?.email_verified ? '✓ Verified' : '✗ Not Verified'}
        </Text>
      </View>
    </View>
  </View>
));

// Memoized Logout Section
const LogoutSection = React.memo(({ onLogout }) => (
  <View style={styles.logoutSection}>
    <TouchableOpacity 
      style={styles.logoutButton} 
      onPress={onLogout}
      activeOpacity={0.8}
    >
      <Text style={styles.logoutButtonText}>Sign Out</Text>
    </TouchableOpacity>
  </View>
));

// Main HomeScreen Component
const HomeScreen = React.memo(({ user, onOpenWebView, onViewProfile, onLogout, onOpenNotificationTest }) => {
  // Memoized props to prevent unnecessary re-renders
  const headerProps = useMemo(() => ({
    user,
    onViewProfile,
  }), [user, onViewProfile]);

  const actionsProps = useMemo(() => ({
    onOpenWebView,
    onViewProfile,
    onOpenNotificationTest,
  }), [onOpenWebView, onViewProfile, onOpenNotificationTest]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header {...headerProps} />
        <StatsSection />
        <ActionsSection {...actionsProps} />
        <UserInfoCard user={user} />
        <LogoutSection onLogout={onLogout} />
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  actionArrow: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  userDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userDetailLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  userDetailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen; 