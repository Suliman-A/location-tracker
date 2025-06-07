import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useLocationService from "../../Hooks/useLocationService";
import { SearchBar, LocationDetails, ReCenterButton } from "../../Components";
import { MapStyles } from "../../Theme";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Redux/Slices/Theme.Slice";
import { Constants } from "../../Constants/Constants";

const LocationTracker = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const { mode } = useSelector(selectTheme);
  const {
    location,
    address,
    isSearching,
    searchQuery,
    setSearchQuery,
    getCurrentLocation,
    searchPlace,
    isLoadingLocation,
  } = useLocationService();

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const animateToLocation = (latitude: number, longitude: number) => {
    const newRegion: Region = {
      latitude,
      longitude,
      latitudeDelta: Constants.LATITUDE_DELTA,
      longitudeDelta: Constants.LONGITUDE_DELTA,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  useEffect(() => {
    if (location) {
      animateToLocation(location.latitude, location.longitude);
    }
  }, [location]);

  const handleSearch = async () => {
    await searchPlace();
  };

  const handleGetCurrentLocation = async () => {
    await getCurrentLocation();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region || undefined}
        customMapStyle={MapStyles[mode]}
        accessibilityLabel="Map showing your current location"
        accessibilityRole="image"
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description={
              address
                ? `${address.street}, ${address.city}`
                : "Loading address..."
            }
            accessibilityLabel="Your current location marker"
          />
        )}
      </MapView>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isSearching}
        accessibilityLabel="Search for a location"
        accessibilityHint="Enter an address or place name to search"
      />

      <View style={styles.bottomContainer}>
        <ReCenterButton
          onPress={handleGetCurrentLocation}
          isLoading={isLoadingLocation}
        />
        <LocationDetails
          address={address}
          isLoading={isLoadingLocation}
          accessibilityLabel="Location details"
          accessibilityHint="Shows your current address and coordinates"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: "flex-end",
  },
});

export default LocationTracker;
