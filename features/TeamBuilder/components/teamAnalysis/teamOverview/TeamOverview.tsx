import { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  TEAM_OVERVIEW_STRENGHTS_TEXTS,
  TEAM_OVERVIEW_SUGGESTIONS_TEXTS,
} from "../../../../../constants";
import { useGetAllRelationsQuery } from "../../../../DamageRelations/query";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { teamRelationsService } from "../../../services/teamRelationsService/teamRelationsService";
import { TeamRelationsResult } from "../../../services/teamRelationsService/types";
import { defensiveStatsService } from "../../../services/teamStats/defensiveStatsService";
import { offensiveStatsService } from "../../../services/teamStats/offensiveStatsService";
import { DefensiveStats, OffensiveStats } from "../../../services/teamStats/types";
import { TeamMemberModel } from "../../../types";
import { MoreDetails } from "./MoreDetails";
import { OverviewContainer } from "./OverviewContainer";
import { WeaknessesContainer } from "./weaknesses/WeaknessesContainer";

type Props = {
  style?: ViewStyle | ViewStyle[];
  currentTeam: TeamMemberModel[];
};

export type Stats = {
  relations: TeamRelationsResult;
  offensiveStats: OffensiveStats;
  defensiveStats: DefensiveStats;
};

export const TeamOverview = ({ style, currentTeam }: Props) => {
  const { data } = useGetAllRelationsQuery();
  const pokeTypes = useGetAllPokeTypesQuery();

  const teamStats: Stats = useMemo(() => {
    const service = teamRelationsService();
    const relations = service.calculateTeamRelations(data ?? [], currentTeam);
    const offService = offensiveStatsService(
      relations.offensiveRelations,
      currentTeam,
      pokeTypes.data ?? [],
    );
    const defService = defensiveStatsService(relations.defensiveRelations);

    return {
      relations: relations,
      offensiveStats: offService.calculate(),
      defensiveStats: defService.calculate(),
    };
  }, [currentTeam, data, pokeTypes.data]);

  return (
    <View style={[styles.overviewLayout, style]}>
      <WeaknessesContainer stats={teamStats}></WeaknessesContainer>
      <OverviewContainer
        overViewRowTextData={TEAM_OVERVIEW_STRENGHTS_TEXTS}
        type="strenghts"
      ></OverviewContainer>
      <OverviewContainer
        overViewRowTextData={TEAM_OVERVIEW_SUGGESTIONS_TEXTS}
        type="suggestions"
      ></OverviewContainer>
      <MoreDetails teamRelatons={teamStats}></MoreDetails>
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
