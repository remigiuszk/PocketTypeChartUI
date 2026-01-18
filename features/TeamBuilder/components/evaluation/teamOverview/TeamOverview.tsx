import { StyleSheet, View, ViewStyle } from "react-native";

import { PADDING } from "../../../../../constants";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const TeamOverview = ({ style }: Props) => {
  return (
    <View style={[styles.overviewLayout, style]}>
      <View style={[styles.container, styles.weaknesses]}></View>
      <View style={[styles.container, styles.strengths]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewLayout: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
    padding: PADDING,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
  },
  strengths: {},
  weaknesses: {},
});
