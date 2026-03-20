import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from "@expo-google-fonts/inter";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { BG_ROOT } from "./constants/colors";
import { TeamBuilder } from "./screens/TeamBuilder";
import { Typing } from "./screens/Typing";
import { store } from "./state/store";

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [teamBuilderOpen, setTeamBuilderOpen] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
    }
  }, [fontsLoaded]);

  function switchViews() {
    setTeamBuilderOpen(!teamBuilderOpen);
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent={false} backgroundColor={BG_ROOT} />
        <SafeAreaView
          edges={["top", "left", "right", "bottom"]}
          style={[styles.container]}
        >
          {teamBuilderOpen ? (
            <TeamBuilder switchViews={switchViews}></TeamBuilder>
          ) : (
            <Typing switchViews={switchViews}></Typing>
          )}
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_ROOT,
  },
  appContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
