export const Constants = {
  Alerts: {
    PermissionDenied: {
      title: "Permission Denied",
      message: "Please enable location services to use this app.",
      buttonText: "OK",
    },
    LocationError: {
      title: "Error",
      message: "Failed to get your current location. Please try again.",
      buttonText: "OK",
    },
    SearchError: {
      title: "Error",
      message: "Please enter an address to search.",
      buttonText: "OK",
    },
    NoResults: {
      title: "Error",
      message: "No results found for this address.",
      buttonText: "OK",
    },
    SearchFailed: {
      title: "Error",
      message: "Failed to search for the address. Please try again.",
      buttonText: "OK",
    },
  },
  // Map zoom level
  LATITUDE_DELTA: 0.005, // Shows about 500 meters vertically
  LONGITUDE_DELTA: 0.005, // Shows about 500 meters horizontally
} as const;
