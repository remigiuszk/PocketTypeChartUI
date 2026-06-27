import { StyleSheet, Text, View } from "react-native";

import { ACCENT, BG_ROOT, test, TEXT_100, TEXT_300 } from "../../constants";
import { IS_WEB } from "../layout/platform";

type Props = {
  title: string;
  subtitle?: string;
};

export const TeamBuilderHeader = ({ title, subtitle }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, IS_WEB && styles.titleWeb]}>{title}</Text>

      {subtitle && (
        <Text style={[styles.subtitle, IS_WEB && styles.subtitleWeb]}>{subtitle}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_ROOT,
    borderWidth: 1,
    borderColor: ACCENT,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,

    // lekki "glow"
    shadowColor: ACCENT,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },

    // Android glow
    elevation: 4,
  },

  title: {
    color: TEXT_300,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 2.5,
    textAlign: "center",

    textShadowColor: test,
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },

  subtitle: {
    marginTop: 4,
    color: TEXT_100 + "AA",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  titleWeb: { fontFamily: "Inter_600SemiBold" },
  subtitleWeb: { fontFamily: "Inter_400Regular" },
});
