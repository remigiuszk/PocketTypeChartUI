import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { offensiveStatsService } from "../../../teamStats/offensiveStatsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { ALL_TYPES_FIXTURE, TypeId } from "../../__fixtures__/types.fixture";

describe("offensive stats - no super effective coverage", () => {
  it("should return no super effective coverage for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamD,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [
      TypeId.Normal,
      TypeId.Ghost,
      TypeId.Electric,
      TypeId.Psychic,
      TypeId.Dark,
      TypeId.Fairy,
    ];

    expect(statsResult.noSuperEffectiveCoverage).toEqual(expected);
  });

  it("should return no super effective coverage for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamE,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [
      TypeId.Normal,
      TypeId.Poison,
      TypeId.Ghost,
      TypeId.Steel,
      TypeId.Electric,
      TypeId.Psychic,
      TypeId.Dark,
    ];

    expect(statsResult.noSuperEffectiveCoverage).toEqual(expected);
  });

  it("should return no super effective coverage for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamF,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [TypeId.Normal, TypeId.Ghost, TypeId.Psychic];

    expect(statsResult.noSuperEffectiveCoverage).toEqual(expected);
  });
});
