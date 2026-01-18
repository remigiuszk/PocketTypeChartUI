import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { INFO_BG, INFO_BORDER } from "../../constants";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const HintButton = ({ style }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed, style]}
    >
      <FontAwesome5 name="question" size={14} color={INFO_BORDER} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: INFO_BG,
    borderWidth: 1,
    borderColor: INFO_BORDER,
  },
});
