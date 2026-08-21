import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_HINT, TEXT_500 } from "../constants";
import {
  BUY_ME_A_COFFEE_PROMPT,
  BUY_ME_A_COFFEE_URL,
  DISCORD_URL,
  POKEMON_SEARCH_BODY,
  POKEMON_SEARCH_DISCORD_PROMPT,
  POKEMON_SEARCH_TITLE,
} from "../constants/strings";
import { WEB_CONTENT_WIDTH } from "../constants/style";
import { ContentScroll } from "../shared/components/ContentScroll";
import { Screen } from "../shared/components/Screen";
import { IS_WEB } from "../shared/layout/platform";
import { Subtitle } from "../shared/typohraphy/Subtitle";

type CtaButtonProps = {
  icon: keyof typeof FontAwesome6.glyphMap;
  label: string;
  url: string;
};

const CtaButton = ({ icon, label, url }: CtaButtonProps) => (
  <Pressable
    style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
    onPress={() => Linking.openURL(url)}
  >
    <FontAwesome6 name={icon} size={20} color={ACCENT} />
    <Subtitle style={styles.ctaLabel}>{label}</Subtitle>
  </Pressable>
);

export const PokemonSearch = () => {
  return (
    <Screen>
      <ContentScroll contentContainerStyle={styles.scrollContent}>
        <View style={[styles.content, IS_WEB && styles.contentWeb]}>
          <Subtitle style={styles.header}>{POKEMON_SEARCH_TITLE}</Subtitle>
          <Image
            style={styles.image}
            source={require("../assets/img/construction.jpg")}
          />
          <Subtitle style={styles.body}>{POKEMON_SEARCH_BODY}</Subtitle>

          <View style={styles.ctaGroup}>
            <Subtitle style={styles.ctaPrompt}>{POKEMON_SEARCH_DISCORD_PROMPT}</Subtitle>
            <CtaButton icon="discord" label="Join Discord" url={DISCORD_URL} />
          </View>

          <View style={styles.ctaGroup}>
            <Subtitle style={styles.ctaPrompt}>{BUY_ME_A_COFFEE_PROMPT}</Subtitle>
            <Pressable
              style={({ pressed }) => [styles.coffeeButton, pressed && styles.ctaPressed]}
              onPress={() => Linking.openURL(BUY_ME_A_COFFEE_URL)}
            >
              <Image
                style={styles.coffeeButtonImage}
                source={require("../assets/img/buy-me-a-coffee-button.png")}
              />
            </Pressable>
          </View>
        </View>
      </ContentScroll>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: {
    flex: 1,
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  contentWeb: { maxWidth: WEB_CONTENT_WIDTH, alignSelf: "center", width: "100%" },
  image: {
    width: 280,
    height: 280,
    resizeMode: "contain",
    borderRadius: 16,
  },
  header: { fontSize: 26, color: TEXT_500, marginTop: 8, marginBottom: 4 },
  body: { fontSize: 12 },
  ctaGroup: { alignItems: "center", gap: 10, marginTop: 8 },
  ctaPrompt: { fontSize: 12 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: ACCENT,
    backgroundColor: BG_HINT,
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaLabel: { color: ACCENT, fontSize: 16 },
  coffeeButton: {
    width: 210,
    aspectRatio: 1090 / 306,
  },
  coffeeButtonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
