import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../Store";

// Define the theme mode type
type ThemeMode = "light" | "dark";

// Define the theme state interface
interface ThemeState {
  mode: ThemeMode;
  system: boolean;
}

// Define the theme payload interface
interface ThemePayload {
  mode: ThemeMode;
  system: boolean;
}

const initialState: ThemeState = {
  mode: "light",
  system: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePayload>) => {
      state.mode = action.payload.mode;
      state.system = action.payload.system;
      // store theme locally
      AsyncStorage.setItem("APP_THEME", JSON.stringify(action.payload));
    },
  },
});

export const themeActions = themeSlice.actions;

// Selectors with proper typing
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
