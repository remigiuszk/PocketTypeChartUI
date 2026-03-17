import { StyleSheet, View, ViewStyle } from "react-native";

import { PokeTypeModel } from "../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../types";

type Props = {
  style?: ViewStyle | ViewStyle[];
  header: string;
  subText: string;
  hintText: string;
  progressBarTotal?: number;
  progressBarActual?: number;
  color: string;
  leadType?: PokeTypeModel;
  typeList?: PokeTypeModel[];
  affectedMembers?: TeamMemberModel[];
};

export const OverviewRow = (props: Props) => {
  return <View style={[styles.container, props.style]}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
