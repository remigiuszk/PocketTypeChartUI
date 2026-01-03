import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ACCENT } from "../../constants";

type Props = {
  onPress: () => void;
  children: any;
  style?: StyleProp<ViewStyle>;
};

const DefaultButton = ({ onPress, children, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={styles.pressable}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ACCENT,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    height: 40,
    width: "40%",
  },
  pressable: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DefaultButton;
