import { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useGetAllRelationsQuery } from "../../../../DamageRelations/query";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { overviewRowsService } from "../../../services/overviewRows/overviewRowsService";
import { OverviewRowData, OverviewRowType } from "../../../services/overviewRows/types";
import { teamRelationsService } from "../../../services/teamRelationsService/teamRelationsService";
import { TeamRelationsResult } from "../../../services/teamRelationsService/types";
import { defensiveStatsService } from "../../../services/teamStats/defensiveStatsService";
import { offensiveStatsService } from "../../../services/teamStats/offensiveStatsService";
import { DefensiveStats, OffensiveStats } from "../../../services/teamStats/types";
import { TeamMemberModel } from "../../../types";
import { MoreDetails } from "./MoreDetails";
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

  const rowData: OverviewRowData[] = useMemo(() => {
    const service = overviewRowsService(teamStats, pokeTypes.data ?? [], currentTeam);

    return service.getRowData();
  }, [currentTeam, pokeTypes.data, teamStats]);

  return (
    <View style={[styles.overviewLayout, style]}>
      <WeaknessesContainer
        weaknessRowData={rowData.filter(
          (rowData) => rowData.type === OverviewRowType.Weakness,
        )}
      ></WeaknessesContainer>
      <MoreDetails teamRelatons={teamStats.relations}></MoreDetails>
    </View>
  );
};

const styles = StyleSheet.create({
  overviewLayout: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 6,
  },
  container: {},
  strengths: {},
  weaknesses: {},
});
