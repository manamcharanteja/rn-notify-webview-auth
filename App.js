/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { 
  StatusBar, 
  StyleSheet, 
  useColorScheme, 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import WebViewComponent from './src/components/WebViewComponent';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showWebView, setShowWebView] = useState(false);

  const handleShowWebView = () => {
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };

  if (showWebView) {
    return <WebViewComponent onClose={handleCloseWebView} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>RN Notify WebView Auth</Text>
        <Text style={styles.subtitle}>Welcome to your app!</Text>
        
        <TouchableOpacity 
          style={styles.webViewButton} 
          onPress={handleShowWebView}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Web View</Text>
        </TouchableOpacity>
        
        <Text style={styles.description}>
          Tap the button above to open a WebView with example.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  webViewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
});

export default App; 