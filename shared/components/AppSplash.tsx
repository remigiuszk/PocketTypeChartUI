import { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

import { ACCENT, BG_ROOT, TEXT_MUTED } from "../../constants/colors";

export const AppSplash = () => {
  const [pulse] = useState(() => new Animated.Value(0));
  const [spin] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 950,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
  }, [pulse, spin]);

  const logoScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });
  const logoOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] });
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/splash-icon.png")}
        style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
      <Text style={styles.label}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_ROOT,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 260,
    height: 260,
    marginBottom: 36,
  },
  spinner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: ACCENT,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  // No fontFamily here — this renders before Inter is loaded, so it must
  // fall back to the platform's built-in font rather than requesting one.
  label: {
    marginTop: 20,
    fontSize: 13,
    letterSpacing: 0.3,
    color: TEXT_MUTED,
  },
});
