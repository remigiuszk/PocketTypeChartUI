import { teamRelationsService } from "../../../teamRelationsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamA_off_super_effective } from "../../__fixtures__/expected/offensive/teamA.expected";
import { teamB_off_super_effective } from "../../__fixtures__/expected/offensive/teamB.expected";
import { teamC_off_super_effective } from "../../__fixtures__/expected/offensive/teamC.expected";
import { teamA, teamB, teamC } from "../../__fixtures__/teams";
import { expectOffensive } from "../../__helpers/assertRelations";

describe("offensive - superEffective", () => {
  it("should return superEffectives for Fire/Flying and Grass/Poison", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamA);

    expectOffensive(result.offensiveRelations.superEffective, teamA_off_super_effective);
  });

  it("should return superEffectives vs 3 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamB);

    expectOffensive(result.offensiveRelations.superEffective, teamB_off_super_effective);
  });

  it("should return superEffectives vs 6 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamC);

    expectOffensive(result.offensiveRelations.superEffective, teamC_off_super_effective);
  });
});
