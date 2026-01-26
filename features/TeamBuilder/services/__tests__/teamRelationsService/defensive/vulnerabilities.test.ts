import { teamRelationsService } from "../../../teamRelationsService";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamA_def_vulnerabilities } from "../../__fixtures__/expected/defensive/teamA.expected";
import { teamB_def_vulnerabilities } from "../../__fixtures__/expected/defensive/teamB.expected";
import { teamC_def_vulnerabilities } from "../../__fixtures__/expected/defensive/teamC.expected";
import { teamA, teamB, teamC } from "../../__fixtures__/teams";
import { expectVulnerabilities } from "../../__helpers/assertRelations";

describe("defensive - vulnerabilities", () => {
  it("should return vulnerabilities vs Fire/Flying and Grass/Poison", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamA);

    expectVulnerabilities(result.defensiveRelations, {
      vulnerabilities: teamA_def_vulnerabilities,
      resistances: [],
      immunities: [],
    });
  });

  it("should return vulnerabilities vs 3 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamB);

    expectVulnerabilities(result.defensiveRelations, {
      vulnerabilities: teamB_def_vulnerabilities,
      resistances: [],
      immunities: [],
    });
  });

  it("should return vulnerabilities vs 6 team members", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamC);

    expectVulnerabilities(result.defensiveRelations, {
      vulnerabilities: teamC_def_vulnerabilities,
      resistances: [],
      immunities: [],
    });
  });
});
