import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { defensiveStatsService } from "../../../teamStats/defensiveStatsService";
import { TypeThreat } from "../../../teamStats/types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { TypeId } from "../../__fixtures__/types.fixture";

describe("defensive stats - multiple 4x", () => {
  it("should return multiple 4x for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      {
        attackingTypeId: TypeId.Rock,
        affectedMembersCount: 3,
        memberIds: ["m1", "m2", "m5"],
      },
    ];
    expect(statsResult.multiple4xVulns).toEqual(expected);
  });

  it("should return multiple 4x for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [];
    expect(statsResult.multiple4xVulns).toEqual(expected);
  });

  it("should return multiple 4x for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [];
    expect(statsResult.multiple4xVulns).toEqual(expected);
  });
});
