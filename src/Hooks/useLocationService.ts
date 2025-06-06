import { useState, useCallback } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { Address, LocationCoords } from "../Types/location";
import { Constants } from "../Constants/Constants";

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
 * @property {string} searchQuery - Current search input value
 * @property {Function} setSearchQuery - Function to update search query
 * @property {Function} getCurrentLocation - Function to get current location
 * @property {Function} searchPlace - Function to search for a location
 */
const useLocationService = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);

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
   * Handles permission checks and error cases.
   *
   * @returns {Promise<void>} A promise that resolves when location is updated
   * @throws {Error} If location permission is denied or location cannot be obtained
   */
  const getCurrentLocation = useCallback(async () => {
    try {
      const hasPermission = await checkAndRequestPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
      await updateAddress(latitude, longitude);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        Constants.Alerts.LocationError.title,
        Constants.Alerts.LocationError.message,
        [{ text: Constants.Alerts.LocationError.buttonText }]
      );
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
    searchQuery,
    setSearchQuery,
    getCurrentLocation,
    searchPlace,
  };
};

export default useLocationService;
