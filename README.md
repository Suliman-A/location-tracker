# Location Tracker App

A React Native application that tracks and displays user location on a map, with search functionality and theme support.

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

### UI/UX

- React Native Paper for consistent, theme-aware components
- Immediate feedback for user actions
- Loading states for async operations
- Clear error messages and alerts

### Performance

- Location caching to show last known location immediately
- Optimized re-renders using React hooks
- Balanced GPS accuracy settings
- Efficient state management

### Testing

- Comprehensive test coverage
- Clear test descriptions
- Proper mocking of dependencies
- Error case handling

## Demo

- Location permission handling
- Map display
- Search functionality
- Theme switching

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
