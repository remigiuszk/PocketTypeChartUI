import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Typing } from "./screens/Typing";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BG_100, BG_500 } from "./constants/colors";
import * as NavigationBar from "expo-navigation-bar";
import { TeamBuilder } from "./screens/TeamBuilder";

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
