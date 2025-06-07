# Location Tracker App

A React Native application that tracks and displays user location on a map, with search functionality and theme support.

## Demo

Try the app live on Expo Snack:
[![Open in Expo Snack](https://img.shields.io/badge/Open%20in-Expo%20Snack-blue)](https://snack.expo.dev/@abdalla-suliman/github.com-suliman-a-location-tracker)

<img src="https://github.com/user-attachments/assets/17a7ad5b-c345-4b20-8101-c290d574b49f" width="400" alt="App Walkthrough">


 
## Features

- 📍 Real-time location tracking
- 🗺️ Interactive map display
- 🔍 Location search functionality
- 🌓 Light/dark theme support
- 📱 Cross-platform (iOS & Android)
- 🎯 "My Location" button for quick re-centering
- 📝 Detailed address information
- ⚡ Performance optimized with location caching

## Tech Stack

- React Native
- Expo
- React Native Maps
- React Native Paper (UI components)
- Redux Toolkit (State Management)
- TypeScript
- Jest & React Testing Library

## Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Setup Instructions

1. Clone the repository:

```bash
git clone [repository-url]
cd native-map
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Project Structure

```
src/
├── Components/         # Reusable UI components
├── Hooks/             # Custom React hooks
├── Screens/           # Screen components
├── Navigation/        # Navigation configuration
├── Redux/             # State management
├── Theme/             # Theme configuration
├── Types/             # TypeScript type definitions
├── Utils/             # Utility functions
└── Constants/         # App constants
```

## Design Choices

### Location Services

- Used Expo Location for cross-platform compatibility
- Implemented location caching for better performance
- Balanced accuracy settings for optimal battery usage
- Comprehensive error handling for all location scenarios
