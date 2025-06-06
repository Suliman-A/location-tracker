import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, themeActions } from "../../Redux/Slices/Theme.Slice";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mode } = useSelector(selectTheme);

  const handleThemeToggle = () => {
    dispatch(
      themeActions.setTheme({
        mode: mode === "light" ? "dark" : "light",
        system: false,
      })
    );
  };

  return (
    <Appbar.Header>
      {showBack && (
        <Appbar.BackAction
          onPress={onBackPress}
          color={theme.colors.onSurface}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={{ color: theme.colors.onSurface }}
      />
      <Appbar.Action
        icon={mode === "light" ? "weather-night" : "weather-sunny"}
        onPress={handleThemeToggle}
        color={theme.colors.primary}
      />
    </Appbar.Header>
  );
};

export default AppHeader;
