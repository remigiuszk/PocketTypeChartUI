import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import {
  ERROR_BG,
  ERROR_BORDER,
  INFO_BG,
  INFO_BORDER,
  OPTIONS_BG,
  OPTIONS_BORDER,
} from "../../constants";

export const OPTION_BUTTON_TYPE = {
  Options: "options",
  Error: "error",
  Info: "info",
} as const;

export type OptionButtonType =
  (typeof OPTION_BUTTON_TYPE)[keyof typeof OPTION_BUTTON_TYPE];

type Props = {
  type: OptionButtonType;
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

type OptionButtonConfig = {
  label: string;
  style: ViewStyle;
};

export const OptionButton = ({ type, onPress, children, style, disabled }: Props) => {
  const config = OPTION_BUTTON_CONFIG[type];
  return (
    <Pressable
      disabled={disabled ?? false}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        config.style,
        pressed && styles.pressed,
        style,
      ]}
      hitSlop={8}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
  },
  options: {
    backgroundColor: OPTIONS_BG,
    borderColor: OPTIONS_BORDER,
  },
  error: {
    backgroundColor: ERROR_BG,
    borderColor: ERROR_BORDER,
  },
  info: {
    backgroundColor: INFO_BG,
    borderColor: INFO_BORDER,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});

const OPTION_BUTTON_CONFIG: Record<OptionButtonType, OptionButtonConfig> = {
  options: {
    label: "Options",
    style: styles.options,
  },
  error: {
    label: "Retry",
    style: styles.error,
  },
  info: {
    label: "Info",
    style: styles.info,
  },
};
