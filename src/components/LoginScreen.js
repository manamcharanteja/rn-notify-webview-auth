import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuthContext } from '../context/AuthContext';

// Memoized Header Component
const LoginHeader = React.memo(() => (
  <View style={styles.header}>
    <Text style={styles.title}>Welcome Back</Text>
    <Text style={styles.subtitle}>Sign in to your account</Text>
  </View>
));

// Memoized Input Component
const FormInput = React.memo(({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, editable }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
      editable={editable}
    />
  </View>
));

// Memoized Login Button Component
const LoginButton = React.memo(({ onPress, isLoading }) => (
  <TouchableOpacity
    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
    onPress={onPress}
    disabled={isLoading}
  >
    {isLoading ? (
      <ActivityIndicator color="#ffffff" />
    ) : (
      <Text style={styles.loginButtonText}>Sign In</Text>
    )}
  </TouchableOpacity>
));

// Memoized Demo Button Component
const DemoButton = React.memo(({ onPress, isLoading }) => (
  <TouchableOpacity
    style={styles.demoButton}
    onPress={onPress}
    disabled={isLoading}
  >
    <Text style={styles.demoButtonText}>Use Demo Credentials</Text>
  </TouchableOpacity>
));

// Memoized Help Text Component
const HelpText = React.memo(() => (
  <View style={styles.helpText}>
    <Text style={styles.helpTextContent}>
      Demo credentials: user@example.com / password
    </Text>
  </View>
));

// Main LoginScreen Component
const LoginScreen = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthContext();

  // Memoized callback functions
  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  }, [email, password, login]);

  const handleDemoLogin = useCallback(() => {
    setEmail('user@example.com');
    setPassword('password');
  }, []);

  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
  }, []);

  // Memoized input props
  const emailInputProps = useMemo(() => ({
    label: 'Email',
    value: email,
    onChangeText: handleEmailChange,
    placeholder: 'Enter your email',
    keyboardType: 'email-address',
    editable: !isLoading,
  }), [email, handleEmailChange, isLoading]);

  const passwordInputProps = useMemo(() => ({
    label: 'Password',
    value: password,
    onChangeText: handlePasswordChange,
    placeholder: 'Enter your password',
    secureTextEntry: true,
    editable: !isLoading,
  }), [password, handlePasswordChange, isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <LoginHeader />
          
          <View style={styles.form}>
            <FormInput {...emailInputProps} />
            <FormInput {...passwordInputProps} />
            
            <LoginButton onPress={handleLogin} isLoading={isLoading} />
            <DemoButton onPress={handleDemoLogin} isLoading={isLoading} />
            <HelpText />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  helpText: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  helpTextContent: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen; 