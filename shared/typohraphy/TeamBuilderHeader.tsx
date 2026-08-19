import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ACCENT, BG_ROOT, ERROR_CONTENT, test, TEXT_100, TEXT_300 } from "../../constants";
import { IS_WEB } from "../layout/platform";

type Props = {
  title: string;
  subtitle?: string;
  // When both are provided and something's selected, the subtitle is
  // replaced by a selection count + clear pill instead of the static
  // instructional copy. Callers that don't pass these (e.g. TeamBuilder's
  // own header) keep the plain title/subtitle behavior unchanged.
  selectionCount?: number;
  selectionMax?: number;
  selectionLabel?: string;
  clearLabel?: string;
  clearVariant?: "accent" | "danger";
  onClearSelection?: () => void;
};

export const TeamBuilderHeader = ({
  title,
  subtitle,
  selectionCount,
  selectionMax,
  selectionLabel = "selected",
  clearLabel = "Clear selection",
  clearVariant = "accent",
  onClearSelection,
}: Props) => {
  const showClear = !!onClearSelection && !!selectionCount && selectionCount > 0;
  const clearColor = clearVariant === "danger" ? ERROR_CONTENT : ACCENT;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, IS_WEB && styles.titleWeb]}>{title}</Text>

      {showClear ? (
        <View style={styles.clearRow}>
          <Text style={[styles.count, IS_WEB && styles.subtitleWeb]}>
            {selectionCount}
            {selectionMax ? `/${selectionMax}` : ""} {selectionLabel}
          </Text>
          <Pressable
            onPress={onClearSelection}
            style={[
              styles.clearPill,
              { borderColor: clearColor + "73", backgroundColor: clearColor + "1A" },
            ]}
          >
            <Feather name="x" size={11} color={clearColor} />
            <Text
              style={[styles.clearPillText, IS_WEB && styles.subtitleWeb, { color: clearColor }]}
            >
              {clearLabel}
            </Text>
          </Pressable>
        </View>
      ) : (
        subtitle && (
          <Text style={[styles.subtitle, IS_WEB && styles.subtitleWeb]}>{subtitle}</Text>
        )
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
  clearRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  count: {
    fontSize: 13,
    letterSpacing: 0.5,
    color: TEXT_100 + "AA",
  },
  clearPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  clearPillText: {
    fontSize: 13,
    letterSpacing: 0.5,
  },
  titleWeb: { fontFamily: "Inter_600SemiBold" },
  subtitleWeb: { fontFamily: "Inter_400Regular" },
});
