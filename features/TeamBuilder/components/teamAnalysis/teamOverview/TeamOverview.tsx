import { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  TEAM_OVERVIEW_STRENGHTS_TEXTS,
  TEAM_OVERVIEW_SUGGESTIONS_TEXTS,
  TEAM_OVERVIEW_WEAKNESSES_TEXTS,
} from "../../../../../constants";
import { useGetAllRelationsQuery } from "../../../../DamageRelations/query";
import { teamRelationsService } from "../../../services/teamRelationsService";
import { TeamMemberModel } from "../../../types";
import { MoreDetails } from "./MoreDetails";
import { OverviewContainer } from "./OverviewContainer";

type Props = {
  style?: ViewStyle | ViewStyle[];
  currentTeam: TeamMemberModel[];
};

export const TeamOverview = ({ style, currentTeam }: Props) => {
  const { data } = useGetAllRelationsQuery();

  const teamRelations = useMemo(() => {
    const service = teamRelationsService();

    return service.calculateTeamRelations(data ?? [], currentTeam);
  }, [currentTeam, data]);

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
      <MoreDetails teamRelatons={teamRelations}></MoreDetails>
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
