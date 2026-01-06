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
    <View style={[styles.container, style]}>
      <Pressable
        onPress={click}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    height: 40,
    width: "40%",
  },
  pressable: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

export default DefaultButton;
