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

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  const theme = useSelector(selectTheme);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme.mode === "dark" ? DarkTheme : LightTheme}>
        <NavigationContainer
          theme={
            theme.mode === "dark" ? NavigationDarkTheme : NavigationLightTheme
          }
        >
          <Stack.Navigator initialRouteName="LocationTracker">
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
