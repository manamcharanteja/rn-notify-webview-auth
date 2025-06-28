# RNNotifyWebviewAuth

A React Native app with basic environment setup for notifications and webview authentication.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install iOS dependencies (CocoaPods):**
   ```bash
   npx pod-install
   ```

## Running the App

### iOS
```bash
npm run ios
```
or
```bash
npx react-native run-ios
```

### Android
```bash
npm run android
```
or
```bash
npx react-native run-android
```

### Start Metro Bundler
```bash
npm start
```

## Project Structure

```
RNNotifyWebviewAuth/
├── App.js                 # Main app component
├── index.js              # App entry point
├── package.json          # Dependencies and scripts
├── ios/                  # iOS native code
├── android/              # Android native code
├── __tests__/            # Test files
└── README.md            # This file
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Development

This is a JavaScript-based React Native app (not TypeScript). The main app component is in `App.js`.

## Troubleshooting

### iOS Issues
- Make sure you're using `RNNotifyWebviewAuth.xcworkspace` (not `.xcodeproj`) when opening in Xcode
- If you encounter build issues, try cleaning the build folder in Xcode

### Android Issues
- Make sure you have Android SDK installed and configured
- Ensure ANDROID_HOME environment variable is set

### Metro Bundler Issues
- Clear Metro cache: `npx react-native start --reset-cache`

## Environment Setup

The app is configured with:
- React Native 0.80.0
- React 19.1.0
- JavaScript (no TypeScript)
- ESLint for code linting
- Prettier for code formatting
- Jest for testing

## Next Steps

This is a basic setup. You can now:
1. Add navigation (React Navigation)
2. Implement authentication
3. Add webview functionality
4. Set up push notifications
5. Add state management (Redux, Zustand, etc.)
