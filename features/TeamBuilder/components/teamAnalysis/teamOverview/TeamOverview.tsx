import { StyleSheet, View, ViewStyle } from "react-native";

import { OverviewContainer } from "./OverviewContainer";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const TeamOverview = ({ style }: Props) => {
  return (
    <View style={[styles.overviewLayout, style]}>
      <OverviewContainer type="weaknesses"></OverviewContainer>
      <OverviewContainer type="strenghts"></OverviewContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewLayout: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  container: {},
  strengths: {},
  weaknesses: {},
});
