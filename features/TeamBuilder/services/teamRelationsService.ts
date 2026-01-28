import { DamageRelationFullModel } from "../../DamageRelations/types";
import { TeamMemberModel } from "../types";
import { DefensiveMemberRelation, OffensiveRelation, TeamRelationsResult } from "./types";

export const teamRelationsService = () => {
  let result: TeamRelationsResult = {
    defensiveRelations: {
      vulnerabilities: [],
      resistances: [],
      immunities: [],
    },
    offensiveRelations: {
      superEffective: [],
      notVeryEffective: [],
      noEffect: [],
    },
  };

  function calculateTeamRelations(
    relations: DamageRelationFullModel[],
    members: TeamMemberModel[],
  ) {
    result = {
      defensiveRelations: {
        vulnerabilities: [],
        resistances: [],
        immunities: [],
      },
      offensiveRelations: {
        superEffective: [],
        notVeryEffective: [],
        noEffect: [],
      },
    };

    members.forEach((teamMember) => {
      findMembersRelations(teamMember, relations);
    });

    return result;
  }

  function findMembersRelations(
    teamMember: TeamMemberModel,
    allRelations: DamageRelationFullModel[],
  ) {
    const allDefensiveRelations: DefensiveMemberRelation[] = [];
    const allOffensiveRelations: OffensiveRelation[] = [];

    teamMember.types.forEach((type) => {
      const defensiveRelationsToMember = allRelations.filter(
        (x) => x.defendingTypeId === type.id,
      );

      const offensiveRelationsToMember = allRelations.filter(
        (x) => x.attackingTypeId === type.id,
      );

      allDefensiveRelations.push(
        ...defensiveRelationsToMember.map((m) => ({
          memberId: teamMember.id,
          attackingTypeId: m.attackingTypeId,
          multiplier: m.multiplier,
        })),
      );

      allOffensiveRelations.push(
        ...offensiveRelationsToMember.map((m) => ({
          memberId: teamMember.id,
          attackingTypeId: m.attackingTypeId,
          defendingTypeId: m.defendingTypeId,
          multiplier: m.multiplier,
        })),
      );
    });

    const nettedRelations = netMembersRelations(allDefensiveRelations);

    prepareResult(nettedRelations, allOffensiveRelations);
  }

  function netMembersRelations(
    list: DefensiveMemberRelation[],
  ): DefensiveMemberRelation[] {
    const map = new Map<string, DefensiveMemberRelation>();

    for (const relation of list) {
      const key = `${relation.memberId}-${relation.attackingTypeId}`;

      if (!map.has(key)) {
        map.set(key, { ...relation });
      } else {
        const existing = map.get(key)!;
        existing.multiplier *= relation.multiplier;
      }
    }

    return [...map.values()];
  }

  function prepareResult(
    defense: DefensiveMemberRelation[],
    offense: OffensiveRelation[],
  ) {
    result.defensiveRelations.vulnerabilities.push(
      ...defense.filter((x) => x.multiplier === 2 || x.multiplier === 4),
    );

    result.defensiveRelations.immunities.push(
      ...defense.filter((x) => x.multiplier === 0),
    );

    result.defensiveRelations.resistances.push(
      ...defense.filter((x) => x.multiplier === 0.5 || x.multiplier === 0.25),
    );

    result.offensiveRelations.superEffective.push(
      ...offense.filter((x) => x.multiplier === 2),
    );

    result.offensiveRelations.notVeryEffective.push(
      ...offense.filter((x) => x.multiplier === 0.5),
    );

    result.offensiveRelations.noEffect.push(...offense.filter((x) => x.multiplier === 0));
  }

  return {
    calculateTeamRelations,
  };
};
