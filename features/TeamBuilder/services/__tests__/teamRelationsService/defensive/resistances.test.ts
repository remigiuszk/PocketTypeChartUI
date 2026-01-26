import { teamRelationsService } from "../../../teamRelationsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamA_def_resistances } from "../../__fixtures__/expected/defensive/teamA.expected";
import { teamB_def_resistances } from "../../__fixtures__/expected/defensive/teamB.expected";
import { teamC_def_resistances } from "../../__fixtures__/expected/defensive/teamC.expected";
import { teamA, teamB, teamC } from "../../__fixtures__/teams";
import { expectResistances } from "../../__helpers/assertRelations";

describe("defensive - resistances", () => {
  it("should return resistances vs Fire/Flying and Grass/Poison", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamA);

    expectResistances(result.defensiveRelations, {
      vulnerabilities: [],
      resistances: teamA_def_resistances,
      immunities: [],
    });
  });

  it("should return resistances vs 3 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamB);

    expectResistances(result.defensiveRelations, {
      vulnerabilities: [],
      resistances: teamB_def_resistances,
      immunities: [],
    });
  });

  it("should return resistances vs 6 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamC);

    expectResistances(result.defensiveRelations, {
      vulnerabilities: [],
      resistances: teamC_def_resistances,
      immunities: [],
    });
  });
});
