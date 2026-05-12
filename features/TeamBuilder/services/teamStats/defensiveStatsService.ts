import {
  DefensiveMemberRelation,
  DefensiveRelations,
} from "../teamRelationsService/types";
import { DefensiveStats, TypeThreat } from "./types";

const FOUR_X_DAMAGE_MULTIPLIER = 4;
const CRITICAL_WEAKNESS_MIN_MEMBERS = 4;
const MAJOR_WEAKNESS_MEMBERS = 3;
const MULTIPLE_4X_VULN_MIN_MEMBERS = 2;

export const defensiveStatsService = (defensiveRelations: DefensiveRelations) => {
  const result: DefensiveStats = {
    criticalWeaknesses: [],
    majorWeaknesses: [],
    multiple4xVulns: [],
    noSafeSwitchAgainst: [],
  };

  function calculate(): DefensiveStats {
    const byType = groupByType(defensiveRelations.vulnerabilities);
    const byType4x = groupByType(
      defensiveRelations.vulnerabilities,
      FOUR_X_DAMAGE_MULTIPLIER,
    );

    for (const [attackingTypeId, members] of byType) {
      const weakness: TypeThreat = {
        attackingTypeId,
        affectedMembersCount: members.size,
        memberIds: [...members],
      };

      if (members.size >= CRITICAL_WEAKNESS_MIN_MEMBERS) {
        result.criticalWeaknesses.push(weakness);
      } else if (members.size === MAJOR_WEAKNESS_MEMBERS) {
        result.majorWeaknesses.push(weakness);
      }
    }

    for (const [attackingTypeId, members] of byType4x) {
      if (members.size >= MULTIPLE_4X_VULN_MIN_MEMBERS) {
        result.multiple4xVulns.push({
          attackingTypeId,
          affectedMembersCount: members.size,
          memberIds: [...members],
        });
      }
    }

    calculateNoSafeSwitch(defensiveRelations);

    return result;
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
