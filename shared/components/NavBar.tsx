import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_ROOT } from "../../constants";
import { MutedText } from "../typohraphy/MutedText";

type Props = {
  teamBuilderOpen: boolean;
  switchViews: () => void;
};

export const NavBar = ({ teamBuilderOpen, switchViews }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          !teamBuilderOpen && styles.selected,
          pressed && styles.pressed,
        ]}
        onPress={teamBuilderOpen ? switchViews : null}
      >
        <FontAwesome6
          name="fire-flame-curved"
          size={16}
          color={!teamBuilderOpen ? ACCENT : "#555"}
        />
        <MutedText style={[styles.label, !teamBuilderOpen && styles.labelActive]}>
          Type Chart
        </MutedText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          teamBuilderOpen && styles.selected,
          pressed && styles.pressed,
        ]}
        onPress={!teamBuilderOpen ? switchViews : null}
      >
        <FontAwesome6 name="users" size={16} color={teamBuilderOpen ? ACCENT : "#555"} />
        <MutedText style={[styles.label, teamBuilderOpen && styles.labelActive]}>
          Team Builder
        </MutedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_ROOT,
    borderTopWidth: 1,
    borderTopColor: "#2a2a3a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 6,
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },
  selected: {
    backgroundColor: "#22223a",
    borderTopColor: ACCENT,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 10,
    color: "#555",
  },
  labelActive: {
    color: ACCENT,
  },
});
