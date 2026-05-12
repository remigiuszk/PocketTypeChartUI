import { OVERVIEW_STRINGS } from "../../../../constants";
import { DamageRelationFullModel } from "../../../DamageRelations/types";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { Stats } from "../teamStats/types";
import { OverviewRowDataBuilder } from "./OverviewRowDataBuilder";
import { OverviewRowData, OverviewRowSeverity, OverviewRowType } from "./types";

const MULTIPLE_4X_VULN_HIGH_SEVERITY_COUNT = 3;
const MIN_UNCOVERED_TYPES_TO_SHOW = 3;
const UNCOVERED_TYPES_WEAKNESS_THRESHOLD = 7;
const SEVERELY_RESISTED_HIGH_SEVERITY_RATIO = 0.7;
const OVERLAPPING_OFFENSIVE_WEAKNESS_RATIO = 0.5;

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
    result.push(...noSafeSwitchAgainst());
    result.push(...noSuperEffectiveCoverage());
    result.push(...severlyResistedTypes());
    result.push(...overlappingOffensiveTypes());

    return result.sort((a, b) => b.severity - a.severity);
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
        .setLeadType([allTypes.find((type) => type.id === weakness.attackingTypeId)!])
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
        .setLeadType([allTypes.find((type) => type.id === weakness.attackingTypeId)!])
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
        .setLeadType([allTypes.find((type) => type.id === stat.attackingTypeId)!])
        .setAffectedMembers(
          members.filter((member) => stat.memberIds.includes(member.id)),
        );

      const severity =
        stat.affectedMembersCount >= MULTIPLE_4X_VULN_HIGH_SEVERITY_COUNT
          ? OverviewRowSeverity.High
          : OverviewRowSeverity.Medium;

      const counteringTypeIds = allRelations
        .filter((r) => r.attackingTypeId === stat.attackingTypeId && r.multiplier < 1)
        .map((r) => r.defendingTypeId);

      const counteringTypes = allTypes.filter((t) => counteringTypeIds.includes(t.id));

      row.setSeverity(severity).setSuggestedTypes(counteringTypes, members);

      result.push(row.build());
    }

    return result;
  }

  function noSafeSwitchAgainst(): OverviewRowData[] {
    const noSafeSwitchStats = stats.defensiveStats.noSafeSwitchAgainst;
    if (noSafeSwitchStats.length === 0) return [];

    const leadType = noSafeSwitchStats
      .map((s) => allTypes.find((t) => t.id === s.attackingTypeId)!)
      .filter(Boolean);

    const affectedMemberIds = new Set(noSafeSwitchStats.flatMap((s) => s.memberIds));

    const row = new OverviewRowDataBuilder()
      .setHeader(OVERVIEW_STRINGS.noSafeSwitch.header)
      .setSubText(OVERVIEW_STRINGS.noSafeSwitch.subText)
      .setHintText(OVERVIEW_STRINGS.noSafeSwitch.hintText)
      .setType(OverviewRowType.Weakness)
      .setSeverity(OverviewRowSeverity.Medium)
      .setLeadType(leadType)
      .setAffectedMembers(members.filter((m) => affectedMemberIds.has(m.id)))
      .build();

    return [row];
  }

  function noSuperEffectiveCoverage(): OverviewRowData[] {
    const uncoveredIds = stats.offensiveStats.noSuperEffectiveCoverage;
    const result: OverviewRowData[] = [];
    if (uncoveredIds.length < MIN_UNCOVERED_TYPES_TO_SHOW) return result;

    const typeList = allTypes.filter((t) => uncoveredIds.includes(t.id));
    const rowType =
      uncoveredIds.length >= UNCOVERED_TYPES_WEAKNESS_THRESHOLD
        ? OverviewRowType.Weakness
        : OverviewRowType.Suggestion;

    const row = new OverviewRowDataBuilder()
      .setHeader(OVERVIEW_STRINGS.noSuperEffectiveCoverage.header)
      .setSubText(OVERVIEW_STRINGS.noSuperEffectiveCoverage.subText(uncoveredIds.length))
      .setHintText(OVERVIEW_STRINGS.noSuperEffectiveCoverage.hintText)
      .setType(rowType)
      .setSeverity(OverviewRowSeverity.Medium)
      .setTypeList(typeList)
      .build();

    result.push(row);
    return result;
  }

  function severlyResistedTypes(): OverviewRowData[] {
    const resistedStats = stats.offensiveStats.severlyResistedTypes;
    const result: OverviewRowData[] = [];
    const totalSlots = members.reduce((sum, m) => sum + m.types.length, 0);

    const groups = new Map<number, typeof resistedStats>();
    for (const stat of resistedStats) {
      const existing = groups.get(stat.totalTypesResisted) ?? [];
      groups.set(stat.totalTypesResisted, [...existing, stat]);
    }

    for (const [resistedCount, group] of groups) {
      const severity =
        resistedCount / totalSlots >= SEVERELY_RESISTED_HIGH_SEVERITY_RATIO
          ? OverviewRowSeverity.High
          : OverviewRowSeverity.Medium;

      const leadType = group
        .map((s) => allTypes.find((t) => t.id === s.defendingTypeId)!)
        .filter(Boolean);

      const affectedMemberIds = new Set(
        group.flatMap((s) => s.affectedMembers.map((a) => a.memberId)),
      );

      const suggestedTypeIds = new Set(
        group.flatMap((s) =>
          allRelations
            .filter((r) => r.defendingTypeId === s.defendingTypeId && r.multiplier > 1)
            .map((r) => r.attackingTypeId),
        ),
      );
      const suggestedTypes = allTypes.filter((t) => suggestedTypeIds.has(t.id));

      const row = new OverviewRowDataBuilder()
        .setHeader(OVERVIEW_STRINGS.severlyResistedTypes.header)
        .setSubText(
          OVERVIEW_STRINGS.severlyResistedTypes.subText(resistedCount, totalSlots),
        )
        .setHintText(OVERVIEW_STRINGS.severlyResistedTypes.hintText)
        .setType(OverviewRowType.Weakness)
        .setSeverity(severity)
        .setProgressBar(totalSlots, resistedCount)
        .setLeadType(leadType)
        .setAffectedMembers(members.filter((m) => affectedMemberIds.has(m.id)))
        .setSuggestedTypes(suggestedTypes, members)
        .build();

      result.push(row);
    }

    return result;
  }

  function overlappingOffensiveTypes(): OverviewRowData[] {
    const overlappingIds = stats.offensiveStats.overlappingOffensiveTypes;
    const result: OverviewRowData[] = [];
    const totalSlots = members.reduce((sum, m) => sum + m.types.length, 0);

    for (const typeId of overlappingIds) {
      const affectedMembers = members.filter((m) => m.types.some((t) => t.id === typeId));
      const slotCount = affectedMembers.length;
      const rowType =
        slotCount / totalSlots >= OVERLAPPING_OFFENSIVE_WEAKNESS_RATIO
          ? OverviewRowType.Weakness
          : OverviewRowType.Suggestion;

      const row = new OverviewRowDataBuilder()
        .setHeader(OVERVIEW_STRINGS.overlappingOffensiveTypes.header)
        .setSubText(OVERVIEW_STRINGS.overlappingOffensiveTypes.subText(slotCount))
        .setHintText(OVERVIEW_STRINGS.overlappingOffensiveTypes.hintText)
        .setType(rowType)
        .setSeverity(OverviewRowSeverity.Medium)
        .setLeadType([allTypes.find((type) => type.id === typeId)!])
        .setAffectedMembers(affectedMembers)
        .build();

      result.push(row);
    }

    return result;
  }

  return {
    getRowData,
  };
};
