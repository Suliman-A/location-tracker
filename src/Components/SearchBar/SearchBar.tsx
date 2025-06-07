import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  isLoading,
}) => {
  const theme = useTheme();

  return (
    <Searchbar
      testID="search-bar"
      placeholder="Enter street address..."
      onChangeText={onChangeText}
      value={value}
      onSubmitEditing={onSearch}
      onIconPress={onSearch}
      loading={isLoading}
      style={[
        styles.searchContainer,
        { backgroundColor: theme.colors.surface },
      ]}
      iconColor={theme.colors.primary}
      inputStyle={{ color: theme.colors.onSurface }}
      placeholderTextColor={theme.colors.onSurfaceVariant}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default SearchBar;
