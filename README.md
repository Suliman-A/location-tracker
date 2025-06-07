# Location Tracker

A React Native application that tracks and displays user location on a map with search functionality and theme support.

## Features

- 📍 Real-time location tracking
- 🗺️ Interactive map display with location marker
- 🔍 Place search functionality
- 🌓 Light/Dark theme support
- 📱 Cross-platform (iOS & Android)
- 🔄 "My Location" button for map re-centering
- 📝 Detailed address information

## Tech Stack

- React Native
- Expo
- React Native Maps
- React Native Paper (UI Components)
- Redux Toolkit (State Management)
- React Navigation

## Setup Instructions

1. Clone the repository:

```bash
git clone [repository-url]
cd native-map
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## Design Choices

- **Architecture**: Used a modular approach with separate components and hooks for better maintainability
- **State Management**: Implemented Redux for global state management (theme, location)
- **UI Components**: Used React Native Paper for consistent and accessible UI components
- **Map Integration**: Implemented Google Maps with custom styling for both light and dark themes
- **Error Handling**: Comprehensive error handling for permissions, location services, and API calls

## Libraries Used

- `react-native-maps`: For map display and location markers
- `react-native-paper`: For UI components and theming
- `@reduxjs/toolkit`: For state management
- `react-navigation`: For navigation between screens
- `expo-location`: For location services
- `react-native-maps-directions`: For map directions

## Demo

[Expo Snack Demo Link]

## Testing

The app includes basic functionality tests covering:

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
