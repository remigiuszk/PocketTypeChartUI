import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamA_def_immunities } from "../../__fixtures__/expected/defensive/teamA.expected";
import { teamB_def_immunities } from "../../__fixtures__/expected/defensive/teamB.expected";
import { teamC_def_immunities } from "../../__fixtures__/expected/defensive/teamC.expected";
import { teamA, teamB, teamC } from "../../__fixtures__/teams";
import { expectDefensive } from "../../__helpers/assertRelations";

describe("defensive - immunities", () => {
  it("should return immunities vs Fire/Flying and Grass/Poison", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamA);

    expectDefensive(result.defensiveRelations.immunities, teamA_def_immunities);
  });

  it("should return immunities vs 3 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamB);

    expectDefensive(result.defensiveRelations.immunities, teamB_def_immunities);
  });

  it("should return immunities vs 6 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamC);

    expectDefensive(result.defensiveRelations.immunities, teamC_def_immunities);
  });
});
