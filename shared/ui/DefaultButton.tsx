import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ACCENT, PRIMARY } from "../../constants";

type Props = {
  click: () => void;
  children: any;
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
