import {
  DefensiveMemberRelation,
  DefensiveRelations,
} from "../teamRelationsService/types";
import { DefensiveStats, TypeThreat } from "./types";

export const defensiveStatsService = () => {
  const result: DefensiveStats = {
    criticalWeaknesses: [],
    majorWeaknesses: [],
    multiple4xVulns: [],
    noSafeSwitchAgainst: [],
  };

  function calculate(defensiveRelations: DefensiveRelations) {
    const byType = groupByType(defensiveRelations.vulnerabilities);
    const byType4x = groupByType(defensiveRelations.vulnerabilities, 4);

    for (const [attackingTypeId, members] of byType) {
      const weakness: TypeThreat = {
        attackingTypeId,
        affectedMembersCount: members.size,
        memberIds: [...members],
      };

      if (members.size >= 4) {
        result.criticalWeaknesses.push(weakness);
      } else if (members.size === 3) {
        result.majorWeaknesses.push(weakness);
      }
    }

    for (const [attackingTypeId, members] of byType4x) {
      if (members.size >= 2) {
        result.multiple4xVulns.push({
          attackingTypeId,
          affectedMembersCount: members.size,
          memberIds: [...members],
        });
      }
    }

    calculateNoSafeSwitch(defensiveRelations);
  }

  function calculateNoSafeSwitch(defensiveRelations: DefensiveRelations) {
    const byTypeVuln = groupByType(defensiveRelations.vulnerabilities);
    const byTypeResist = groupByType(defensiveRelations.resistances);
    const byTypeImmune = groupByType(defensiveRelations.immunities);

    for (const [attackingTypeId, weakMembers] of byTypeVuln) {
      const hasResist = byTypeResist.has(attackingTypeId);
      const hasImmune = byTypeImmune.has(attackingTypeId);

      if (!hasResist && !hasImmune) {
        result.noSafeSwitchAgainst.push({
          attackingTypeId,
          affectedMembersCount: weakMembers.size,
          memberIds: [...weakMembers],
        });
      }
    }
  }

  function groupByType(relations: DefensiveMemberRelation[], filterMultiplier?: number) {
    const map = new Map<number, Set<string>>();

    for (const { attackingTypeId, memberId, multiplier } of relations) {
      if (filterMultiplier !== undefined && multiplier !== filterMultiplier) {
        continue;
      }
      if (!map.has(attackingTypeId)) {
        map.set(attackingTypeId, new Set());
      }
      map.get(attackingTypeId)!.add(memberId);
    }

    return map;
  }

  return {
    calculate,
  };
};
