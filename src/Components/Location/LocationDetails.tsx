import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Address } from "../../Types/Location.Types";
import { formatAddress } from "../../Utils/Utils";

interface LocationDetailsProps {
  address: Address | null;
  isLoading: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  address,
  isLoading,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Card
        style={styles.card}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <Card.Content style={styles.cardContent}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text variant="bodyLarge">Loading location...</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card
      style={styles.card}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Card.Content>
        <Text
          variant="titleMedium"
          style={[styles.locationText, { color: theme.colors.primary }]}
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
  card: {
    width: "100%",
    marginTop: 16,
  },
  locationText: {
    marginBottom: 8,
    fontWeight: "600",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});

export default LocationDetails;
