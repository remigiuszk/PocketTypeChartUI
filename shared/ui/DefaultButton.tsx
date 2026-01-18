import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { PRIMARY } from "../../constants";

type Props = {
  click: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DefaultButton = ({ click, children, style }: Props) => {
  return (
    <Pressable
      onPress={click}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: PRIMARY,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

export default DefaultButton;
