import { useState, useCallback, useRef } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { Address, LocationCoords } from "../Types/location";
import { Constants } from "../Constants/Constants";

const LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.Balanced, // More balanced accuracy
  timeInterval: 5000, // Update every 5 seconds
  distanceInterval: 10, // Update every 10 meters
};

/**
 * A custom hook that provides location services functionality including:
 * - Getting current location
 * - Searching for locations
 * - Managing location permissions
 * - Handling address information
 *
 * @returns {Object} An object containing location state and methods
 * @property {LocationCoords | null} location - Current location coordinates
 * @property {Address | null} address - Current location address details
 * @property {boolean} isSearching - Loading state for search operations
 * @property {boolean} isLoadingLocation - Loading state for location updates
 * @property {string} searchQuery - Current search input value
 * @property {Function} setSearchQuery - Function to update search query
 * @property {Function} getCurrentLocation - Function to get current location
 * @property {Function} searchPlace - Function to search for a location
 */
const useLocationService = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);
  const lastKnownLocationRef = useRef<LocationCoords | null>(null);

  /**
   * Updates the address state based on the provided coordinates.
   *
   * @param {number} latitude - The latitude coordinate
   * @param {number} longitude - The longitude coordinate
   * @returns {Promise<void>} A promise that resolves when the address is updated
   */
  const updateAddress = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    const [addressResult] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addressResult) {
      const formattedAddress: Address = {
        street: addressResult.street || "",
        city: addressResult.city || "",
        region: addressResult.region || "",
        postalCode: addressResult.postalCode || "",
        country: addressResult.country || "",
      };
      setAddress(formattedAddress);
    }
  };

  /**
   * Checks and requests location permission if not already granted.
   * Caches the permission status to avoid repeated permission requests.
   *
   * @returns {Promise<boolean>} A promise that resolves to true if permission is granted, false otherwise
   */
  const checkAndRequestPermission = useCallback(async () => {
    if (hasLocationPermission !== null) {
      return hasLocationPermission;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    const isGranted = status === "granted";
    setHasLocationPermission(isGranted);

    if (!isGranted) {
      Alert.alert(
        Constants.Alerts.PermissionDenied.title,
        Constants.Alerts.PermissionDenied.message,
        [{ text: Constants.Alerts.PermissionDenied.buttonText }]
      );
    }

    return isGranted;
  }, [hasLocationPermission]);

  /**
   * Gets the current location and updates the location and address state.
   * Uses a caching strategy to improve perceived performance:
   * 1. Immediately shows the last known location while fetching new location
   * 2. Updates to fresh location when available
   *
   * @returns {Promise<void>} A promise that resolves when location is updated
   */
  const getCurrentLocation = useCallback(async () => {
    try {
      const hasPermission = await checkAndRequestPermission();
      if (!hasPermission) return;

      setIsLoadingLocation(true);

      // Show cached location immediately for better UX
      if (lastKnownLocationRef.current) {
        setLocation(lastKnownLocationRef.current);
      }

      // Get fresh location
      const location = await Location.getCurrentPositionAsync(LOCATION_OPTIONS);
      const { latitude, longitude } = location.coords;

      // Update both current location and cache
      const newLocation = { latitude, longitude };
      setLocation(newLocation);
      lastKnownLocationRef.current = newLocation;

      await updateAddress(latitude, longitude);
    } catch (error: any) {
      Alert.alert(
        Constants.Alerts.LocationError.title,
        Constants.Alerts.LocationError.message,
        [{ text: Constants.Alerts.LocationError.buttonText }]
      );
    } finally {
      setIsLoadingLocation(false);
    }
  }, [checkAndRequestPermission]);

  /**
   * Searches for a location based on the current search query.
   * Updates location and address state with the search results.
   *
   * @returns {Promise<void>} A promise that resolves when search is complete
   * @throws {Error} If search query is empty or location cannot be found
   */
  const searchPlace = async (): Promise<void> => {
    if (!searchQuery.trim()) {
      Alert.alert(
        Constants.Alerts.SearchError.title,
        Constants.Alerts.SearchError.message,
        [{ text: Constants.Alerts.SearchError.buttonText }]
      );
      return;
    }

    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        setLocation({ latitude, longitude });
        await updateAddress(latitude, longitude);
      } else {
        Alert.alert(
          Constants.Alerts.NoResults.title,
          Constants.Alerts.NoResults.message,
          [{ text: Constants.Alerts.NoResults.buttonText }]
        );
      }
    } catch (error) {
      Alert.alert(
        Constants.Alerts.SearchFailed.title,
        Constants.Alerts.SearchFailed.message,
        [{ text: Constants.Alerts.SearchFailed.buttonText }]
      );
    } finally {
      setIsSearching(false);
    }
  };

  return {
    location,
    address,
    isSearching,
    isLoadingLocation,
    searchQuery,
    setSearchQuery,
    getCurrentLocation,
    searchPlace,
  };
};

export default useLocationService;
