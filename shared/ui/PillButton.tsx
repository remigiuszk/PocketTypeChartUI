import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { Subtitle } from "../typohraphy/Subtitle";

export type PillTint = {
  bgIdle: string;
  bgActive: string;
  border: string;
  content: string;
  glow: string;
};

export const CONFIRM_TINT: PillTint = {
  bgIdle: "rgba(27,197,190,0.12)",
  bgActive: "rgba(27,197,190,0.22)",
  border: "#1BC5BE",
  content: "#bff0ed",
  glow: "#1BC5BE",
};

export const CANCEL_TINT: PillTint = {
  bgIdle: "rgba(255,107,107,0.10)",
  bgActive: "rgba(255,107,107,0.18)",
  border: "rgba(255,107,107,0.55)",
  content: "#ffb3b3",
  glow: "#ff6b6b",
};

export const PillButton = ({
  label,
  icon,
  tint,
  onPress,
  disabled = false,
}: {
  label: string;
  icon: "check" | "x" | "trash-2";
  tint: PillTint;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const [active, setActive] = useState(false);
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onHoverIn={() => !disabled && setActive(true)}
      onHoverOut={() => setActive(false)}
      onPressIn={() => !disabled && setActive(true)}
      onPressOut={() => setActive(false)}
      style={[
        styles.pill,
        {
          backgroundColor: active ? tint.bgActive : tint.bgIdle,
          borderColor: tint.border,
          shadowColor: tint.glow,
          shadowOpacity: active ? 0.5 : 0,
          shadowRadius: active ? 10 : 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: active ? 6 : 0,
          opacity: disabled ? 0.4 : 1,
        },
      ]}
    >
      <Feather name={icon} size={18} color={tint.content} />
      <Subtitle style={{ fontSize: 14, color: tint.content }}>{label}</Subtitle>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: "40%",
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 999,
    borderWidth: 1.5,
  },
});
