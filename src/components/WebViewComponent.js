import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

const WEB_URL = 'https://google.com';

// Memoized Header Component
const WebViewHeader = React.memo(({ onClose }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Web View</Text>
    <TouchableOpacity onPress={onClose} accessibilityLabel="Close WebView">
      <Text style={styles.closeButton}>✕</Text>
    </TouchableOpacity>
  </View>
));

// Memoized Loading Component
const LoadingOverlay = React.memo(() => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
));

// Memoized Error Component
const ErrorOverlay = React.memo(({ onRetry }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Failed to load the page</Text>
    <Text style={styles.errorSubText}>Please check your internet connection</Text>
    <TouchableOpacity
      style={styles.retryButton}
      onPress={onRetry}
    >
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
  </View>
));

// Memoized WebView Component
const WebViewContent = React.memo(({ onLoadStart, onLoadEnd, onError }) => (
  <WebView
    source={{ uri: WEB_URL }}
    style={styles.webView}
    onLoadStart={onLoadStart}
    onLoadEnd={onLoadEnd}
    onError={onError}
    javaScriptEnabled
    domStorageEnabled
    startInLoadingState
  />
));

// Main WebViewComponent
const WebViewComponent = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Memoized callback functions
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback((syntheticEvent) => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
  }, []);

  // Memoized webview props
  const webViewProps = useMemo(() => ({
    onLoadStart: handleLoadStart,
    onLoadEnd: handleLoadEnd,
    onError: handleError,
  }), [handleLoadStart, handleLoadEnd, handleError]);

  return (
    <SafeAreaView style={styles.container}>
      <WebViewHeader onClose={onClose} />
      
      <View style={styles.webViewContainer}>
        {!hasError && <WebViewContent {...webViewProps} />}
        
        {isLoading && !hasError && <LoadingOverlay />}
        
        {hasError && <ErrorOverlay onRetry={handleRetry} />}
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WebViewComponent;
