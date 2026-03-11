import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { defensiveStatsService } from "../../../teamStats/defensiveStatsService";
import { TypeThreat } from "../../../teamStats/types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { TypeId } from "../../__fixtures__/types.fixture";

describe("defensive stats - critical weakness", () => {
  it("should return critical weaknesses for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = defensiveStatsService();
    const statsResult = statsService.calculate(result.defensiveRelations);

    const expected: TypeThreat[] = [
      {
        attackingTypeId: TypeId.Rock,
        affectedMembersCount: 5,
        memberIds: ["m1", "m2", "m4", "m5", "m6"],
      },
      {
        attackingTypeId: TypeId.Electric,
        affectedMembersCount: 4,
        memberIds: ["m1", "m2", "m5", "m6"],
      },
    ];

    expect(statsResult.criticalWeaknesses).toEqual(expected);
  });

  it("should return critical weaknesses for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = defensiveStatsService();
    const statsResult = statsService.calculate(result.defensiveRelations);

    const expected: TypeThreat[] = [];

    expect(statsResult.criticalWeaknesses).toEqual(expected);
  });

  it("should return critical weaknesses for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = defensiveStatsService();
    const statsResult = statsService.calculate(result.defensiveRelations);

    const expected: TypeThreat[] = [];

    expect(statsResult.criticalWeaknesses).toEqual(expected);
  });
});
