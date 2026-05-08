import { useMemo } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import { Loading } from "../../../../../shared/components/Loading";
import { useGetAllRelationsQuery } from "../../../../DamageRelations/query";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { overviewRowsService } from "../../../services/overviewRows/overviewRowsService";
import { OverviewRowData, OverviewRowType } from "../../../services/overviewRows/types";
import { teamRelationsService } from "../../../services/teamRelationsService/teamRelationsService";
import { defensiveStatsService } from "../../../services/teamStats/defensiveStatsService";
import { offensiveStatsService } from "../../../services/teamStats/offensiveStatsService";
import { Stats } from "../../../services/teamStats/types";
import { TeamMemberModel } from "../../../types";
import { MoreDetails } from "./MoreDetails";
import { WeaknessesContainer } from "./weaknesses/WeaknessesContainer";

type Props = {
  style?: ViewStyle | ViewStyle[];
  currentTeam: TeamMemberModel[];
};

export const TeamOverview = ({ style, currentTeam }: Props) => {
  const { data, isLoading: relationsLoading } = useGetAllRelationsQuery();
  const { data: pokeTypesData, isLoading: typesLoading } = useGetAllPokeTypesQuery();

  const teamStats: Stats = useMemo(() => {
    const service = teamRelationsService();
    const relations = service.calculateTeamRelations(data ?? [], currentTeam);
    const offService = offensiveStatsService(
      relations.offensiveRelations,
      currentTeam,
      pokeTypesData ?? [],
    );
    const defService = defensiveStatsService(relations.defensiveRelations);

    return {
      relations: relations,
      offensiveStats: offService.calculate(),
      defensiveStats: defService.calculate(),
    };
  }, [currentTeam, data, pokeTypesData]);

  const rowData: OverviewRowData[] = useMemo(() => {
    const service = overviewRowsService(
      teamStats,
      pokeTypesData ?? [],
      currentTeam,
      data ?? [],
    );

    return service.getRowData();
  }, [currentTeam, pokeTypesData, teamStats, data]);

  if (relationsLoading || typesLoading || !data || !pokeTypesData) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={[styles.overviewLayout, style]}>
        {rowData.some((row) => row.type === OverviewRowType.Weakness) && (
          <WeaknessesContainer
            weaknessRowData={rowData.filter(
              (rowData) => rowData.type === OverviewRowType.Weakness,
            )}
          />
        )}
        <MoreDetails teamRelatons={teamStats.relations}></MoreDetails>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  overviewLayout: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 6,
  },
  container: {},
  strengths: {},
  weaknesses: {},
});
