import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Address, LocationCoords } from "../../Types/location";
import { formatAddress } from "../../Utils/Utils";

interface LocationDetailsProps {
  location: LocationCoords | null;
  address: Address | null;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  location,
  address,
}) => {
  const theme = useTheme();

  if (!location) {
    return (
      <Card>
        <Card.Content>
          <Text variant="bodyLarge">Loading location...</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={[styles.locationTypeText, { color: theme.colors.primary }]}
        >
          Location Details
        </Text>
        {address && (
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
            {formatAddress(address)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  locationTypeText: {
    marginBottom: 8,
    fontWeight: "600",
  },
});

export default LocationDetails;
