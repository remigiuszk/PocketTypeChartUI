import { StyleSheet, Text, View } from "react-native";

import { TITLE_FONT_SIZE } from "../../constants";
import { TEXT_500 } from "../../constants/colors";
import { IS_WEB } from "../layout/platform";

export const Title = ({ children }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, IS_WEB && styles.textWeb]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontWeight: "600",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_500,
    fontSize: TITLE_FONT_SIZE,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  textWeb: { fontFamily: "Inter_600SemiBold" },
});
