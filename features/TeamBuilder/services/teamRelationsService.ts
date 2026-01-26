import { DamageRelationFullModel } from "../../DamageRelations/types";
import { TeamMemberModel } from "../types";

export type TeamRelationsResult = {
  defensiveRelations: DefensiveRelations;
  offensiveRelations: OffensiveRelations;
};

export type OffensiveRelations = {
  superEffective: OffensiveRelation[];
  notVeryEffective: OffensiveRelation[];
  noEffect: OffensiveRelation[];
};

export type OffensiveRelation = {
  memberId: string;
  attackingTypeId: number;
  defendingTypeId: number;
  multiplier: number;
};

export type DefensiveRelations = {
  vulnerabilities: DefensiveMemberRelation[];
  resistances: DefensiveMemberRelation[];
  immunities: DefensiveMemberRelation[];
};

export type DefensiveMemberRelation = {
  memberId: string;
  attackingTypeId: number;
  multiplier: number;
};

export const teamRelationsService = () => {
  let damageRelations: DamageRelationFullModel[] = [];
  let teamMembers: TeamMemberModel[] = [];
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
    damageRelations = relations;
    teamMembers = members;
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

    teamMembers.forEach((teamMember) => {
      calculateDefense(teamMember);
      calculateOffense(teamMember);
    });

    return result;
  }

  function calculateOffense(teamMember: TeamMemberModel) {
    const membersOffensiveRelations = findOffensiveRelations(teamMember);
  }

  function findOffensiveRelations(
    teamMember: TeamMemberModel,
  ): DefensiveMemberRelation[] {
    const allMemberRelations: OffensiveRelation[] = [];

    teamMember.types.forEach((type) => {
      const offensiveRelations = damageRelations.filter(
        (x) => x.attackingTypeId === type.id,
      );

      allMemberRelations.push(
        ...offensiveRelations.map((m) => ({
          memberId: teamMember.id,
          attackingTypeId: m.attackingTypeId,
          defendingTypeId: m.defendingTypeId,
          multiplier: m.multiplier,
        })),
      );
    });

    return allMemberRelations;
  }

  function calculateDefense(teamMember: TeamMemberModel) {
    const membersDefensiveRelations = findDefensiveRelations(teamMember);

    const nettedRelations = netMembersRelations(membersDefensiveRelations);

    prepareResult(nettedRelations);
  }

  function findDefensiveRelations(
    teamMember: TeamMemberModel,
  ): DefensiveMemberRelation[] {
    const allMemberRelations: DefensiveMemberRelation[] = [];

    teamMember.types.forEach((type) => {
      const defensiveRelationsToMember = damageRelations.filter(
        (x) => x.defendingTypeId === type.id,
      );

      allMemberRelations.push(
        ...defensiveRelationsToMember.map((m) => ({
          memberId: teamMember.id,
          attackingTypeId: m.attackingTypeId,
          multiplier: m.multiplier,
        })),
      );
    });

    return allMemberRelations;
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

  function prepareResult(nettedRelations: DefensiveMemberRelation[]) {
    result.defensiveRelations.vulnerabilities.push(
      ...nettedRelations.filter((x) => x.multiplier === 2 || x.multiplier === 4),
    );

    result.defensiveRelations.immunities.push(
      ...nettedRelations.filter((x) => x.multiplier === 0),
    );

    result.defensiveRelations.resistances.push(
      ...nettedRelations.filter((x) => x.multiplier === 0.5 || x.multiplier === 0.25),
    );
  }

  return {
    calculateTeamRelations,
  };
};
