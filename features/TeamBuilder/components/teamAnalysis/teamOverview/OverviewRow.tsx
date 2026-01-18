import { StyleSheet, View, ViewStyle } from "react-native";

import { TeamOverviewRowTextData } from "../../../../../constants/strings";

type Props = {
  style?: ViewStyle | ViewStyle[];
  texts: TeamOverviewRowTextData;
};

export const OverviewRow = ({ style }: Props) => {
  return <View style={[styles.container, style]}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
