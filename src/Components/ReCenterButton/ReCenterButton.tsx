import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

interface ReCenterButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

const ReCenterButton: React.FC<ReCenterButtonProps> = ({
  onPress,
  isLoading,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        testID="location-button"
        icon={isLoading ? "loading" : "crosshairs-gps"}
        mode="contained"
        size={24}
        onPress={onPress}
        style={{ backgroundColor: theme.colors.surface }}
        iconColor={theme.colors.primary}
        disabled={isLoading}
        accessibilityLabel="Get current location"
        accessibilityHint="Updates the map to show your current location"
        accessibilityState={{ disabled: isLoading }}
      />
      <Text
        variant="labelSmall"
        style={[styles.buttonLabel, { color: theme.colors.primary }]}
      >
        Re-center
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonLabel: {
    marginTop: 4,
  },
});

export default ReCenterButton;
