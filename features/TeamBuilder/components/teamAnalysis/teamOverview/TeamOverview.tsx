import { StyleSheet, View, ViewStyle } from "react-native";

import {
  TEAM_OVERVIEW_STRENGHTS_TEXTS,
  TEAM_OVERVIEW_SUGGESTIONS_TEXTS,
  TEAM_OVERVIEW_WEAKNESSES_TEXTS,
} from "../../../../../constants";
import { MoreDetails } from "./MoreDetails";
import { OverviewContainer } from "./OverviewContainer";

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
      <OverviewContainer
        overViewRowTextData={TEAM_OVERVIEW_SUGGESTIONS_TEXTS}
        type="suggestions"
      ></OverviewContainer>
      <MoreDetails></MoreDetails>
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
