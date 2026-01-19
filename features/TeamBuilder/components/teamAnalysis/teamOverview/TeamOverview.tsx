import { StyleSheet, View, ViewStyle } from "react-native";

import { OverviewContainer } from "./OverviewContainer";
import {
  TEAM_OVERVIEW_STRENGHTS_TEXTS,
  TEAM_OVERVIEW_WEAKNESSES_TEXTS,
} from "../../../../../constants";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const TeamOverview = ({ style }: Props) => {
  return (
    <View style={[styles.overviewLayout, style]}>
      <OverviewContainer
        overViewRowTextData={TEAM_OVERVIEW_WEAKNESSES_TEXTS}
        type="weaknesses"
      ></OverviewContainer>
      <OverviewContainer
        overViewRowTextData={TEAM_OVERVIEW_STRENGHTS_TEXTS}
        type="strenghts"
      ></OverviewContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewLayout: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 6,
  },
  container: {},
  strengths: {},
  weaknesses: {},
});
