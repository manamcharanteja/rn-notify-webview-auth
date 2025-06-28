import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuthContext } from '../context/AuthContext';

// Memoized Header Component
const ProfileHeader = React.memo(({ onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
    <View style={styles.headerContent}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.subtitle}>OIDC Authentication Success</Text>
    </View>
    <View style={styles.placeholder} />
  </View>
));

// Memoized Profile Card Component
const ProfileCard = React.memo(({ user }) => (
  <View style={styles.profileCard}>
    <View style={styles.avatarContainer}>
      <Image
        source={{ uri: user.picture }}
        style={styles.avatar}
      />
    </View>

    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <View style={styles.verificationBadge}>
        <Text style={styles.verificationText}>
          {user.email_verified ? '✓ Email Verified' : '✗ Email Not Verified'}
        </Text>
      </View>
    </View>
  </View>
));

// Memoized Detail Row Component
const DetailRow = React.memo(({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
));

// Memoized Details Card Component
const DetailsCard = React.memo(({ user }) => {
  const details = useMemo(() => [
    { label: 'User ID', value: user.id },
    { label: 'Given Name', value: user.given_name },
    { label: 'Family Name', value: user.family_name },
    { label: 'Subject (sub)', value: user.sub },
  ], [user]);

  return (
    <View style={styles.detailsCard}>
      <Text style={styles.sectionTitle}>User Details</Text>
      {details.map((detail, index) => (
        <DetailRow key={index} {...detail} />
      ))}
    </View>
  );
});

// Memoized Token Card Component
const TokenCard = React.memo(({ getAccessToken, refreshAccessToken }) => {
  const formatToken = useCallback((token) => {
    if (!token) return 'No token available';
    return token.length > 20 ? `${token.substring(0, 20)}...` : token;
  }, []);

  const handleRefreshToken = useCallback(async () => {
    try {
      await refreshAccessToken();
      Alert.alert('Success', 'Token refreshed successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh token');
    }
  }, [refreshAccessToken]);

  return (
    <View style={styles.tokenCard}>
      <Text style={styles.sectionTitle}>Access Token</Text>
      <Text style={styles.tokenText}>
        {formatToken(getAccessToken())}
      </Text>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={handleRefreshToken}
      >
        <Text style={styles.refreshButtonText}>Refresh Token</Text>
      </TouchableOpacity>
    </View>
  );
});

// Memoized Logout Button Component
const LogoutButton = React.memo(({ onPress, isLoggingOut }) => (
  <TouchableOpacity
    style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
    onPress={onPress}
    disabled={isLoggingOut}
  >
    {isLoggingOut ? (
      <ActivityIndicator color="#ffffff" />
    ) : (
      <Text style={styles.logoutButtonText}>Sign Out</Text>
    )}
  </TouchableOpacity>
));

// Main UserProfile Component
const UserProfile = React.memo(({ user, onLogout, onBack }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, getAccessToken, refreshAccessToken } = useAuthContext();

  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
              onLogout();
            } catch (error) {
              Alert.alert('Logout Error', 'Failed to sign out. Please try again.');
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  }, [logout, onLogout]);

  // Memoized props
  const tokenCardProps = useMemo(() => ({
    getAccessToken,
    refreshAccessToken,
  }), [getAccessToken, refreshAccessToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProfileHeader onBack={onBack} />
        <ProfileCard user={user} />
        <DetailsCard user={user} />
        <LogoutButton onPress={handleLogout} isLoggingOut={isLoggingOut} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  verificationBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  verificationText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
  tokenCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  tokenText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UserProfile; 