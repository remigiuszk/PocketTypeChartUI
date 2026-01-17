import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { BG_500 } from "./constants/colors";
import { TeamBuilder } from "./screens/TeamBuilder";
import { Typing } from "./screens/Typing";
import { store } from "./state/store";

export default function App() {
  useEffect(() => {
    if (Platform.OS !== "android") return;

    (async () => {
      await NavigationBar.setButtonStyleAsync("light");
    })();
  }, []);

  const [teamBuilderOpen, setTeamBuilderOpen] = useState<boolean>(false);
  const switchViews = () => {
    setTeamBuilderOpen(!teamBuilderOpen);
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent={false} backgroundColor={BG_500} />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_500,
  },
});
