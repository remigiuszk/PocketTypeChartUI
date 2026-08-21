import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet } from "react-native";

import { ACCENT } from "../../constants";
import { MutedText } from "../typohraphy/MutedText";

type Props = {
  icon: keyof typeof FontAwesome6.glyphMap;
  label: string;
  active: boolean;
  onPress?: () => void;
  compact?: boolean;
};

export const WebNavTab = ({ icon, label, active, onPress, compact = false }: Props) => (
  <Pressable
    style={({ pressed }) => [
      styles.webTab,
      compact && styles.webTabCompact,
      active && styles.webTabActive,
      pressed && styles.webTabPressed,
    ]}
    onPress={active ? undefined : onPress}
  >
    <FontAwesome6 name={icon} size={compact ? 12 : 15} color={active ? ACCENT : "#555"} />
    <MutedText
      style={[
        styles.webTabLabel,
        compact && styles.webTabLabelCompact,
        active && styles.webTabLabelActive,
      ]}
    >
      {label}
    </MutedText>
  </Pressable>
);

const styles = StyleSheet.create({
  webTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },
  webTabCompact: {
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  webTabActive: {
    backgroundColor: "#22223a",
    borderTopColor: ACCENT,
  },
  webTabPressed: {
    opacity: 0.85,
  },
  webTabLabel: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  webTabLabelCompact: {
    fontSize: 11,
  },
  webTabLabelActive: {
    color: ACCENT,
  },
});
