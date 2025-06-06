import { StyleSheet } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/Redux/Store";
import { ApplicationNavigator } from "./src/Navigation";

export default function App() {
  return (
    <StoreProvider store={store}>
      <ApplicationNavigator />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
