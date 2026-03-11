import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { OffensiveRelations } from "../teamRelationsService/types";
import { OffensiveStats } from "./types";

export const offensiveStatsService = (
  relations: OffensiveRelations,
  members: TeamMemberModel[],
  allTypes: PokeTypeModel[],
) => {
  const result: OffensiveStats = {
    noSuperEffectiveCoverage: [],
    severlyResistedTypes: [],
    ovelappingOffensiveTypes: [],
  };

  function calculate(): OffensiveStats {
    result.noSuperEffectiveCoverage.push(...getNoSuperEffectveCoverage());
    getSeverlyResistedBy();
    result.ovelappingOffensiveTypes.push(...getOverlappingOffensiveTypes());
    return result;
  }

  function getNoSuperEffectveCoverage(): number[] {
    const coveredTypeIds = new Set(
      relations.superEffective.map((r) => r.defendingTypeId),
    );

    return allTypes
      .map((type) => type.id)
      .filter((typeId) => !coveredTypeIds.has(typeId));
  }

  function getSeverlyResistedBy() {
    const resists = [...relations.notVeryEffective, ...relations.noEffect];
    const threshold = members.length >= 5 ? 3 : 2;
    const uniqueStabTypes = getUniqueStabTypes(members);
    const uniqueDefendingTypes = new Set(resists.map((r) => r.defendingTypeId));

    for (const defendingTypeId of uniqueDefendingTypes) {
      const resistedAttackingTypes = new Set(
        resists
          .filter((r) => r.defendingTypeId === defendingTypeId)
          .map((r) => r.attackingTypeId),
      );

      const resistedStabCount = [...uniqueStabTypes].filter((typeId) =>
        resistedAttackingTypes.has(typeId),
      ).length;

      if (resistedStabCount >= threshold) {
        result.severlyResistedTypes.push(defendingTypeId);
      }
    }
  }

  function getOverlappingOffensiveTypes(): number[] {
    const stabCounts = getStabTypeCounts(members);
    return [...stabCounts.entries()]
      .filter(([, count]) => count >= 3)
      .map(([typeId]) => typeId);
  }

  function getUniqueStabTypes(members: TeamMemberModel[]): Set<number> {
    const set: Set<number> = new Set<number>();

    for (const member of members) {
      for (const type of member.types) {
        set.add(type.id);
      }
    }

    return set;
  }

  function getStabTypeCounts(members: TeamMemberModel[]): Map<number, number> {
    const counts = new Map<number, number>();
    for (const member of members) {
      for (const type of member.types) {
        counts.set(type.id, (counts.get(type.id) ?? 0) + 1);
      }
    }
    return counts;
  }

  return {
    calculate,
  };
};
