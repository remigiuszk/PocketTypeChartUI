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
    singleCoverageDependency: null,
  };

  function calculate() {
    const noSuperEffectiveCoverage = getNoSuperEffectveCoverage(relations, allTypes);
    result.noSuperEffectiveCoverage.push(...noSuperEffectiveCoverage);
  }

  function getNoSuperEffectveCoverage(
    relations: OffensiveRelations,
    allTypes: PokeTypeModel[],
  ): number[] {
    const coveredTypeIds = new Set(
      relations.superEffective.map((r) => r.defendingTypeId),
    );

    return allTypes
      .map((type) => type.id)
      .filter((typeId) => !coveredTypeIds.has(typeId));
  }

  function getSeverlyResistedBy(relations: OffensiveRelations) {
    const resists = relations.notVeryEffective;
    resists.push(...relations.noEffect);

    const uniqueStabTypes = getUniqueStabTypes(members);

    const uniquedefendingTypes = new Set(resists.map((r) => r.defendingTypeId));

    for (const typeId of uniquedefendingTypes) {
      const currentTypeResists = resists.filter((x) => x.defendingTypeId === typeId);
    }
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
};
