import { OVERVIEW_STRINGS } from "../../../../constants";
import { DamageRelationFullModel } from "../../../DamageRelations/types";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { Stats } from "../../components/teamAnalysis/teamOverview/TeamOverview";
import { TeamMemberModel } from "../../types";
import { OverviewRowDataBuilder } from "./OverviewRowDataBuilder";
import { OverviewRowData, OverviewRowSeverity, OverviewRowType } from "./types";

export const overviewRowsService = (
  stats: Stats,
  allTypes: PokeTypeModel[],
  members: TeamMemberModel[],
  allRelations: DamageRelationFullModel[],
) => {
  function getRowData(): OverviewRowData[] {
    const result: OverviewRowData[] = [];

    result.push(immunities());
    result.push(...criticalWeaknesses());
    result.push(...majorWeaknesses());
    result.push(...multiple4xVulns());

    return result;
  }

  function criticalWeaknesses(): OverviewRowData[] {
    const criticalWeaknesses = stats.defensiveStats.criticalWeaknesses;
    const result: OverviewRowData[] = [];

    for (const weakness of criticalWeaknesses) {
      const row = new OverviewRowDataBuilder()
        .setHeader(OVERVIEW_STRINGS.criticalWeakness.header)
        .setSubText(OVERVIEW_STRINGS.criticalWeakness.subText(weakness.memberIds.length))
        .setHintText(OVERVIEW_STRINGS.criticalWeakness.hintText)
        .setType(OverviewRowType.Weakness)
        .setSeverity(OverviewRowSeverity.High)
        .setLeadType(allTypes.find((type) => type.id === weakness.attackingTypeId)!)
        .setProgressBar(members.length, weakness.memberIds.length)
        .setAffectedMembers(
          members.filter((member) => weakness.memberIds.includes(member.id)),
        )
        .build();

      result.push(row);
    }

    return result;
  }

  function majorWeaknesses(): OverviewRowData[] {
    const majorWeaknesses = stats.defensiveStats.majorWeaknesses;
    const result: OverviewRowData[] = [];

    for (const weakness of majorWeaknesses) {
      const row = new OverviewRowDataBuilder()
        .setHeader(OVERVIEW_STRINGS.majorWeakness.header)
        .setSubText(OVERVIEW_STRINGS.majorWeakness.subText(weakness.memberIds.length))
        .setHintText(OVERVIEW_STRINGS.majorWeakness.hintText)
        .setType(OverviewRowType.Weakness)
        .setLeadType(allTypes.find((type) => type.id === weakness.attackingTypeId)!)
        .setProgressBar(members.length, weakness.memberIds.length)
        .setAffectedMembers(
          members.filter((member) => weakness.memberIds.includes(member.id)),
        );
      if (weakness.memberIds.length >= members.length - 1) {
        row.setSeverity(OverviewRowSeverity.High);
      } else {
        row.setSeverity(OverviewRowSeverity.Medium);
      }

      result.push(row.build());
    }

    return result;
  }

  function immunities(): OverviewRowData {
    const typesWithImmunity = allTypes.filter((type) =>
      new Set([1, 2, 3, 8, 5, 9, 17, 18]).has(type.id),
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

  function multiple4xVulns(): OverviewRowData[] {
    const vulnsStats = stats.defensiveStats.multiple4xVulns;
    const result: OverviewRowData[] = [];

    for (const stat of vulnsStats) {
      const row = new OverviewRowDataBuilder()
        .setHeader(OVERVIEW_STRINGS.multiple4xWeaknesses.header)
        .setSubText(OVERVIEW_STRINGS.multiple4xWeaknesses.subText(stat.memberIds.length))
        .setHintText(OVERVIEW_STRINGS.multiple4xWeaknesses.hintText)
        .setType(OverviewRowType.Weakness)
        .setProgressBar(members.length, stat.memberIds.length)
        .setLeadType(allTypes.find((type) => type.id === stat.attackingTypeId)!)
        .setAffectedMembers(
          members.filter((member) => stat.memberIds.includes(member.id)),
        );

      const severity =
        stat.affectedMembersCount >= 3
          ? OverviewRowSeverity.High
          : OverviewRowSeverity.Medium;

      const counteringTypeIds = allRelations
        .filter((r) => r.attackingTypeId === stat.attackingTypeId && r.multiplier < 1)
        .map((r) => r.defendingTypeId);

      const counteringTypes = allTypes.filter((t) => counteringTypeIds.includes(t.id));

      row
        .setSeverity(severity)
        .setSuggestedTypes(counteringTypes, members);

      result.push(row.build());
    }

    return result;
  }

  return {
    getRowData,
  };
};
