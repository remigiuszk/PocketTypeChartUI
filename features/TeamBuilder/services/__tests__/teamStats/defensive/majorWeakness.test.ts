import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { defensiveStatsService } from "../../../teamStats/defensiveStatsService";
import { TypeThreat } from "../../../teamStats/types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { TypeId } from "../../__fixtures__/types.fixture";

describe("defensive stats - major weakness", () => {
  it("should return major weaknesses for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      {
        attackingTypeId: TypeId.Water,
        affectedMembersCount: 3,
        memberIds: ["m1", "m2", "m4"],
      },
    ];
    expect(statsResult.majorWeaknesses).toEqual(expected);
  });

  it("should return major weaknesses for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      { attackingTypeId: 6, affectedMembersCount: 3, memberIds: ["m1", "m2", "m3"] },
      { attackingTypeId: 13, affectedMembersCount: 3, memberIds: ["m1", "m2", "m3"] },
    ];
    expect(statsResult.majorWeaknesses).toEqual(expected);
  });

  it("should return major weaknesses for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      { attackingTypeId: 15, affectedMembersCount: 3, memberIds: ["m2", "m3", "m4"] },
    ];
    expect(statsResult.majorWeaknesses).toEqual(expected);
  });
});
