import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { BG_LAYOUT, BORDER_INTERNAL, TEXT_100 } from "../../constants";
import { APP_AD_TAGLINE, APP_STORE_URL, PLAY_STORE_URL } from "../../constants/strings";
import { WEB_GUTTER, WEB_MAX_WIDTH } from "../../constants/style";
import { IS_WEB } from "../layout/platform";

type BadgeProps = {
  icon: keyof typeof Ionicons.glyphMap;
  topLabel: string;
  mainLabel: string;
  url: string;
};

const StoreBadge = ({ icon, topLabel, mainLabel, url }: BadgeProps) => (
  <Pressable
    style={({ pressed }) => [styles.badge, pressed && styles.badgePressed]}
    onPress={() => Linking.openURL(url)}
  >
    <Ionicons name={icon} size={26} color="#ffffff" />
    <View>
      <Text style={styles.badgeTop}>{topLabel}</Text>
      <Text style={styles.badgeMain}>{mainLabel}</Text>
    </View>
  </Pressable>
);

// Web-only footer promoting the native app. Renders nothing on native.
export const WebFooter = () => {
  if (!IS_WEB) return null;

  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <Text style={styles.tagline}>{APP_AD_TAGLINE}</Text>
        <View style={styles.badges}>
          <StoreBadge
            icon="logo-apple"
            topLabel="Download on the"
            mainLabel="App Store"
            url={APP_STORE_URL}
          />
          <StoreBadge
            icon="logo-google-playstore"
            topLabel="GET IT ON"
            mainLabel="Google Play"
            url={PLAY_STORE_URL}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    marginTop: 28,
    paddingVertical: 28,
    paddingHorizontal: WEB_GUTTER,
    backgroundColor: BG_LAYOUT,
    borderTopWidth: 1,
    borderTopColor: BORDER_INTERNAL,
  },
  inner: {
    width: "100%",
    maxWidth: WEB_MAX_WIDTH,
    alignSelf: "center",
    alignItems: "center",
    gap: 14,
  },
  tagline: {
    color: TEXT_100,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
  badges: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  badgePressed: {
    opacity: 0.85,
  },
  badgeTop: {
    color: "#cfcfcf",
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    letterSpacing: 0.5,
  },
  badgeMain: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
});
