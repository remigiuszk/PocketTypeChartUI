import { StyleSheet, Text, View } from "react-native";
import {  TEXT_100, TEXT_300, TEXT_500 } from "../../constants/colors";
import { TITLE_FONT_SIZE } from "../../constants";

export const Title = ({ children }: any) => {
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
    fontWeight: "600",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_500,
    fontSize: TITLE_FONT_SIZE,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
