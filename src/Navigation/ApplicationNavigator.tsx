import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocationTracker } from "../Screens";
import { useSelector } from "react-redux";
import { selectTheme } from "../Redux/Slices/Theme.Slice";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { DarkTheme, LightTheme } from "../Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppHeader } from "../Components";
import { Platform, StatusBar } from "react-native";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  const { mode } = useSelector(selectTheme);

  useEffect(() => {
    StatusBar.setBarStyle(mode === "dark" ? "light-content" : "dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }
  }, [mode]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={mode === "dark" ? DarkTheme : LightTheme}>
        <NavigationContainer
          theme={mode === "dark" ? NavigationDarkTheme : NavigationLightTheme}
        >
          <Stack.Navigator
            initialRouteName="LocationTracker"
            screenOptions={{
              header: ({ navigation, route, options }) => (
                <AppHeader
                  title={options.title || route.name}
                  showBack={navigation.canGoBack()}
                  onBackPress={navigation.goBack}
                />
              ),
            }}
          >
            <Stack.Screen
              name="LocationTracker"
              component={LocationTracker}
              options={{ title: "Location Tracker" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
