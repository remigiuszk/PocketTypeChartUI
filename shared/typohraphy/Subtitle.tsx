import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

import { SUBTITLE_FONT_SIZE } from "../../constants";
import { TEXT_100 } from "../../constants/colors";
import { IS_WEB } from "../layout/platform";

type Props = {
  children: any;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
};

export const Subtitle = ({ children, style, numberOfLines }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.text, IS_WEB && styles.textWeb, style]}
        numberOfLines={numberOfLines}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: "Inter_200ExtraLight",
    textAlign: "center",
    color: TEXT_100,
    fontSize: SUBTITLE_FONT_SIZE,
    letterSpacing: 1.5,
  },
  textWeb: { fontFamily: "Inter_300Light" },
});
