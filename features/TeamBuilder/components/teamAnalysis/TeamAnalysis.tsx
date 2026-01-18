import { StyleSheet, View, ViewStyle } from "react-native";

import { TeamOverview } from "./teamOverview/TeamOverview";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const TeamAnalysis = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TeamOverview></TeamOverview>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
