import { renderHook, act } from "@testing-library/react-hooks";
import * as Location from "expo-location";
import { Alert } from "react-native";
import useLocationService from "../useLocationService";
import { Constants } from "../../Constants/Constants";

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  reverseGeocodeAsync: jest.fn(),
  geocodeAsync: jest.fn(),
  Accuracy: {
    High: "high",
  },
}));

// Mock Alert
jest.mock("react-native", () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

/**
 * Test suite for the useLocationService hook.
 *
 * Success Cases:
 * - should successfully initialize with default values
 * - should successfully request and grant location permission
 * - should successfully fetch and update current location with coordinates and address
 * - should successfully search for a location and update the map with the search results
 *
 * Failure and Edge Cases:
 * - should fail when permission is denied and show an alert with the message 'Permission denied'
 * - should fail to fetch location and show an alert with the message 'Failed to get your current location'
 * - should fail when search query is empty and show an alert with the message 'Please enter an address to search'
 * - should fail when search returns no results and show an alert with the message 'No results found for this address'
 * - should fail when search throws an error and show an alert with the message 'Failed to search for the address'
 */
describe("useLocationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("success cases", () => {
    it("should successfully initialize with default values", () => {
      const { result } = renderHook(() => useLocationService());
      expect(result.current.location).toBeNull();
      expect(result.current.address).toBeNull();
      expect(result.current.isSearching).toBeFalsy();
      expect(result.current.searchQuery).toBe("");
    });

    it("should successfully request and grant location permission", async () => {
      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "granted",
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
      });
      (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
        {
          street: "Test Street",
          city: "Test City",
          region: "Test Region",
          postalCode: "12345",
          country: "Test Country",
        },
      ]);

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        await result.current.getCurrentLocation();
      });

      expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it("should successfully fetch and update current location with coordinates and address", async () => {
      const mockLocation = {
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
      };

      const mockAddress = {
        street: "Test Street",
        city: "Test City",
        region: "Test Region",
        postalCode: "12345",
        country: "Test Country",
      };

      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "granted",
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(
        mockLocation
      );
      (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
        mockAddress,
      ]);

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        await result.current.getCurrentLocation();
      });

      expect(result.current.location).toEqual({
        latitude: mockLocation.coords.latitude,
        longitude: mockLocation.coords.longitude,
      });
      expect(result.current.address).toEqual({
        street: mockAddress.street,
        city: mockAddress.city,
        region: mockAddress.region,
        postalCode: mockAddress.postalCode,
        country: mockAddress.country,
      });
    });

    it("should successfully search for a location and update the map with the search results", async () => {
      const mockSearchResult = {
        latitude: 40.7128,
        longitude: -74.006,
      };

      const mockAddress = {
        street: "Search Street",
        city: "Search City",
        region: "Search Region",
        postalCode: "67890",
        country: "Search Country",
      };

      (Location.geocodeAsync as jest.Mock).mockResolvedValue([
        mockSearchResult,
      ]);
      (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
        mockAddress,
      ]);

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        result.current.setSearchQuery("New York");
      });

      await act(async () => {
        await result.current.searchPlace();
      });

      // Wait for state updates
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(result.current.location).toEqual({
        latitude: mockSearchResult.latitude,
        longitude: mockSearchResult.longitude,
      });
      expect(result.current.address).toEqual({
        street: mockAddress.street,
        city: mockAddress.city,
        region: mockAddress.region,
        postalCode: mockAddress.postalCode,
        country: mockAddress.country,
      });
    });
  });

  describe("failure and edge cases", () => {
    it(`should fail when permission is denied and show an alert with the message '${Constants.Alerts.PermissionDenied.message}'`, async () => {
      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "denied",
      });

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        await result.current.getCurrentLocation();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Constants.Alerts.PermissionDenied.title,
        Constants.Alerts.PermissionDenied.message,
        [{ text: Constants.Alerts.PermissionDenied.buttonText }]
      );
    });

    it(`should fail to fetch location and show an alert with the message '${Constants.Alerts.LocationError.message}'`, async () => {
      (
        Location.requestForegroundPermissionsAsync as jest.Mock
      ).mockResolvedValue({
        status: "granted",
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(
        new Error("Location error")
      );

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        await result.current.getCurrentLocation();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Constants.Alerts.LocationError.title,
        Constants.Alerts.LocationError.message,
        [{ text: Constants.Alerts.LocationError.buttonText }]
      );
    });

    it(`should fail when search query is empty and show an alert with the message '${Constants.Alerts.SearchError.message}'`, async () => {
      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        await result.current.searchPlace();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Constants.Alerts.SearchError.title,
        Constants.Alerts.SearchError.message,
        [{ text: Constants.Alerts.SearchError.buttonText }]
      );
    });

    it(`should fail when search returns no results and show an alert with the message '${Constants.Alerts.NoResults.message}'`, async () => {
      (Location.geocodeAsync as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        result.current.setSearchQuery("Nonexistent Place");
      });

      await act(async () => {
        await result.current.searchPlace();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Constants.Alerts.NoResults.title,
        Constants.Alerts.NoResults.message,
        [{ text: Constants.Alerts.NoResults.buttonText }]
      );
    });

    it(`should fail when search throws an error and show an alert with the message '${Constants.Alerts.SearchFailed.message}'`, async () => {
      (Location.geocodeAsync as jest.Mock).mockRejectedValue(
        new Error("Search failed")
      );

      const { result } = renderHook(() => useLocationService());

      await act(async () => {
        result.current.setSearchQuery("Error Place");
      });

      await act(async () => {
        await result.current.searchPlace();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        Constants.Alerts.SearchFailed.title,
        Constants.Alerts.SearchFailed.message,
        [{ text: Constants.Alerts.SearchFailed.buttonText }]
      );
    });
  });
});
