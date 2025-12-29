import { StyleSheet, Text, View } from "react-native";
import { TEXT_100 } from "../../constants/colors";
import { SUBTITLE_FONT_SIZE } from "../../constants";

export const Subtitle = ({ children }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: {
    fontWeight: "400",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_100,
    fontSize: SUBTITLE_FONT_SIZE,
    letterSpacing: 1.5,
  },
});
