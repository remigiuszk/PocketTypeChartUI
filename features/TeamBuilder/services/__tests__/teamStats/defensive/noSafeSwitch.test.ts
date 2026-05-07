import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { defensiveStatsService } from "../../../teamStats/defensiveStatsService";
import { TypeThreat } from "../../../teamStats/types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { TypeId } from "../../__fixtures__/types.fixture";

describe("defensive stats - no safe switch", () => {
  it("should return no safe switch for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      {
        attackingTypeId: TypeId.Rock,
        affectedMembersCount: 5,
        memberIds: ["m1", "m2", "m4", "m5", "m6"],
      },
      {
        attackingTypeId: TypeId.Dark,
        affectedMembersCount: 1,
        memberIds: ["m3"],
      },
    ];

    expect(statsResult.noSafeSwitchAgainst).toEqual(expected);
  });

  it("should return no safe switch for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [
      {
        attackingTypeId: 6,
        affectedMembersCount: 3,
        memberIds: ["m1", "m2", "m3"],
      },
      {
        attackingTypeId: 15,
        affectedMembersCount: 2,
        memberIds: ["m1", "m4"],
      },
      {
        attackingTypeId: 14,
        affectedMembersCount: 1,
        memberIds: ["m4"],
      },
    ];

    expect(statsResult.noSafeSwitchAgainst).toEqual(expected);
  });

  it("should return no safe switch for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = defensiveStatsService(result.defensiveRelations);
    const statsResult = statsService.calculate();

    const expected: TypeThreat[] = [];

    expect(statsResult.noSafeSwitchAgainst).toEqual(expected);
  });
});
