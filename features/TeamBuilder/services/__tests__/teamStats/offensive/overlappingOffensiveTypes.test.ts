import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { offensiveStatsService } from "../../../teamStats/offensiveStatsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { ALL_TYPES_FIXTURE, TypeId } from "../../__fixtures__/types.fixture";

describe("offensive stats - overlapping defensive types", () => {
  it("should return overlapping defensive types for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamD,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [TypeId.Fire, TypeId.Flying];

    expect(statsResult.ovelappingOffensiveTypes).toEqual(expected);
  });

  it("should return overlapping defensive types for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamE,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [TypeId.Flying];

    expect(statsResult.ovelappingOffensiveTypes).toEqual(expected);
  });

  it("should return overlapping defensive types for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamF,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: number[] = [];

    expect(statsResult.ovelappingOffensiveTypes).toEqual(expected);
  });
});
