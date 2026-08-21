import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { BG_ROOT } from "./constants/colors";
import { useGetAllPokeTypesQuery } from "./features/TypeSelection/query";
import { RootTabs } from "./navigation/RootTabs";
import { AppSplash } from "./shared/components/AppSplash";
import { IS_WEB } from "./shared/layout/platform";
import { store } from "./state/store";

SplashScreen.preventAutoHideAsync();

// DEBUG ONLY — forces AppSplash to stay on screen so it can be designed
// without racing real font/network loads. Set back to false before shipping.
const DEBUG_ALWAYS_SHOW_SPLASH = false;

// Rendered inside <Provider> so it can warm the poketypes cache before
// anything else mounts — the add-member flow has no loading state of its
// own and renders an empty type list if poketypes haven't arrived yet.
const AppContent = () => {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const { isSuccess: typesLoaded, error: typesError } = useGetAllPokeTypesQuery();

  const appReady = fontsLoaded && (typesLoaded || !!typesError);

  useEffect(() => {
    // Hand off to the custom (animated) splash as soon as JS has mounted,
    // rather than waiting for appReady — the native splash is static and
    // AppSplash doesn't depend on the fonts/data we're still loading.
    SplashScreen.hideAsync();

    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  if (DEBUG_ALWAYS_SHOW_SPLASH || !appReady) {
    return <AppSplash />;
  }

  return (
    <>
      <StatusBar translucent={false} backgroundColor={BG_ROOT} />
      <SafeAreaView edges={["top", "left", "right", "bottom"]} style={[styles.container]}>
        <NavigationContainer>
          <RootTabs />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

if (IS_WEB) {
  document.documentElement.style.backgroundColor = BG_ROOT;
  document.body.style.backgroundColor = BG_ROOT;
}

export const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_ROOT,
  },
});
