import { OVERVIEW_STRINGS } from "../../../../constants";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { Stats } from "../../components/teamAnalysis/teamOverview/TeamOverview";
import { TeamMemberModel } from "../../types";
import { TypeId } from "../__tests__/__fixtures__/types.fixture";
import { OverviewRowDataBuilder } from "./OverviewRowDataBuilder";
import { OverviewRowData, OverviewRowType } from "./types";

export const overviewRowsService = (
  stats: Stats,
  allTypes: PokeTypeModel[],
  members: TeamMemberModel[],
) => {
  function getRowData(): OverviewRowData[] {
    const result: OverviewRowData[] = [];

    result.push(immunities());

    return result;
  }

  function immunities(): OverviewRowData {
    const typesWithImmunity = allTypes.filter((type) =>
      new Set([
        TypeId.Normal,
        TypeId.Fighting,
        TypeId.Flying,
        TypeId.Ghost,
        TypeId.Ground,
        TypeId.Steel,
        TypeId.Dark,
        TypeId.Fairy,
      ]).has(type.id),
    );

    const teamImmunities = stats.relations.defensiveRelations.immunities;
    const row = new OverviewRowDataBuilder()
      .setHeader(OVERVIEW_STRINGS.immunities.header(teamImmunities.length))
      .setHintText(OVERVIEW_STRINGS.immunities.hintText);

    switch (teamImmunities.length) {
      case 0:
        row
          .setType(OverviewRowType.Weakness)
          .setSuggestedTypes(typesWithImmunity, members)
          .setSubText(OVERVIEW_STRINGS.immunities.lowSubText);
        break;
      case 1:
        row
          .setType(OverviewRowType.Suggestion)
          .setSuggestedTypes(typesWithImmunity, members)
          .setSubText(OVERVIEW_STRINGS.immunities.suggestionText);
        break;
      default:
        row
          .setType(OverviewRowType.Strength)
          .setSubText(OVERVIEW_STRINGS.immunities.highSubText);
    }
    return row.build();
  }

  return {
    getRowData,
  };
};
