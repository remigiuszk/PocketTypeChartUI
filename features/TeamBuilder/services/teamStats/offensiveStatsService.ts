import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { OffensiveRelations } from "../teamRelationsService/types";
import { AffectedMember, OffensiveStats } from "./types";

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
    const threshold = getThreshold();
    const stabCounts = getStabTypeCounts();
    const uniqueDefendingTypes = new Set(resists.map((r) => r.defendingTypeId));

    for (const defendingTypeId of uniqueDefendingTypes) {
      const resistedForType = resists.filter(
        (r) => r.defendingTypeId === defendingTypeId,
      );

      const resistedAttackingTypes = new Set(
        resistedForType.map((r) => r.attackingTypeId),
      );

      const resistedStabCount = [...stabCounts.entries()]
        .filter(([typeId]) => resistedAttackingTypes.has(typeId))
        .reduce((sum, [, count]) => sum + count, 0);

      if (resistedStabCount >= threshold) {
        const affectedMembers: AffectedMember[] = members
          .map((member) => {
            const resistedTypeIds = member.types
              .map((t) => t.id)
              .filter((typeId) => resistedAttackingTypes.has(typeId));

            return { memberId: member.id, resistedTypeIds };
          })
          .filter((m) => m.resistedTypeIds.length > 0);

        result.severlyResistedTypes.push({
          defendingTypeId,
          totalTypesResisted: resistedStabCount,
          affectedMembers,
        });
      }
    }
  }

  function getThreshold(): number {
    const totalSlots = members.reduce((sum, m) => sum + m.types.length, 0);
    if (totalSlots > 10) return 4;
    if (totalSlots > 6) return 3;
    return 2;
  }

  function getOverlappingOffensiveTypes(): number[] {
    const stabCounts = getStabTypeCounts();
    return [...stabCounts.entries()]
      .filter(([, count]) => count >= 3)
      .map(([typeId]) => typeId);
  }

  function getStabTypeCounts(): Map<number, number> {
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
