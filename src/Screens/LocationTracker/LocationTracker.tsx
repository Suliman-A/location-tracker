import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { IconButton, useTheme } from "react-native-paper";
import useLocationService from "../../Hooks/useLocationService";
import { SearchBar, LocationDetails } from "../../Components";
import { MapStyles } from "../../Theme";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Redux/Slices/Theme.Slice";

const LocationTracker = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const theme = useTheme();
  const { mode } = useSelector(selectTheme);
  const {
    location,
    address,
    isSearching,
    searchQuery,
    setSearchQuery,
    getCurrentLocation,
    searchPlace,
  } = useLocationService();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const animateToLocation = (latitude: number, longitude: number) => {
    const newRegion: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
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
    try {
      await searchPlace();
    } catch (error) {
      console.error("Search error:", error);
    }
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
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Location"
            description={
              address
                ? `${address.street}, ${address.city}`
                : "Loading address..."
            }
          />
        )}
      </MapView>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isSearching}
      />

      {/* Location Details with My Location Button */}
      <View style={styles.bottomContainer}>
        <IconButton
          icon="crosshairs-gps"
          mode="contained"
          size={24}
          onPress={handleGetCurrentLocation}
          style={[
            styles.myLocationButton,
            { backgroundColor: theme.colors.surface },
          ]}
          iconColor={theme.colors.primary}
        />
        <View style={styles.locationDetailsContainer}>
          <LocationDetails location={location} address={address} />
        </View>
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
  locationDetailsContainer: {
    width: "100%",
    marginTop: 16,
  },
  myLocationButton: {
    // marginBottom: 10,
  },
});

export default LocationTracker;
