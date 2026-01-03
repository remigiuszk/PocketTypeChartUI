import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { TEXT_100 } from "../../constants/colors";
import { SUBTITLE_FONT_SIZE } from "../../constants";

type Props = {
  children: any;
  style?: StyleProp<TextStyle>;
};

export const Subtitle = ({ children, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontWeight: "400",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_100,
    fontSize: SUBTITLE_FONT_SIZE,
    letterSpacing: 1.5,
  },
});
