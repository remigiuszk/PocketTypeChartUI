import { TeamMemberModel } from "../../types";
import { OffensiveRelations } from "../teamRelationsService/types";
import { OffensiveStats } from "./types";

export const offensiveStatsService = (
  relations: OffensiveRelations,
  members: TeamMemberModel[],
) => {
  const result: OffensiveStats = {
    immunityWalls: [],
    noSuperEffectiveCoverage: [],
    severlyResistedTypes: [],
    ovelappingOffensiveTypes: [],
    singleCoverageDependency: null,
  };

  function calculate(relations: OffensiveRelations, members: TeamMemberModel[]) {}

  function getUniqueStabTypes(members: TeamMemberModel[]): Set<number> {
    const set: Set<number> = new Set<number>();

    for (const member of members) {
      for (const type of member.types) {
        set.add(type.id);
      }
    }

    return set;
  }

  function calculateImmunityWalls(
    relations: OffensiveRelations,
    members: TeamMemberModel[],
  ) {
    //const stabTypes = getUniqueStabTypes(members);

    const uniqueImmunityTypes = new Set<number>(
      relations.noEffect.map((x) => x.defendingTypeId),
    );

    for (const immunityType of uniqueImmunityTypes) {
    }

    // for(const defendingTypeId of uniqueImmunityTypes) {
    //     const isWall = [...stabTypes].every
    // }
  }
};
