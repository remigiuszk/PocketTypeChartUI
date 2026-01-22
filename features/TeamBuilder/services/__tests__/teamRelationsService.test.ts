import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../__fixtures__/damageRelations.fixture";
import { ALL_TYPES_FIXTURE, TypeId } from "../__fixtures__/types.fixture";
import {
  DefensiveMemberRelation,
  TeamRelationsResult,
  teamRelationsService,
} from "../teamRelationsService";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

describe("teamRelationsService.calculateTeamRelations (defensive super effective only)", () => {
  it("should return super effective attacking types vs Fire/Flying and Grass/Poison", () => {
    const teamMembers: TeamMemberModel[] = [
      {
        id: "m1",
        name: "Charizard-ish",
        types: t(TypeId.Fire, TypeId.Flying),
        iconId: "x",
        iconColor: "#000",
      },
      {
        id: "m2",
        name: "Venusaur-ish",
        types: t(TypeId.Grass, TypeId.Poison),
        iconId: "y",
        iconColor: "#000",
      },
    ];

    const service = teamRelationsService();
    const result = service.calculateTeamRelations(
      ALL_DAMAGE_RELATIONS_FIXTURE,
      teamMembers,
    );

    const expected: TeamRelationsResult = {
      defensiveRelations: {
        allRelations: [], // na razie możesz zostawić puste, jeśli jeszcze tego nie liczysz
        vulnerabilities: [
          // Fire/Flying
          { memberId: "m1", attackingTypeId: 6, multiplier: 4 }, // Rock
          { memberId: "m1", attackingTypeId: 11, multiplier: 2 }, // Water
          { memberId: "m1", attackingTypeId: 13, multiplier: 2 }, // Electric

          // Grass/Poison
          { memberId: "m2", attackingTypeId: 10, multiplier: 2 }, // Fire
          { memberId: "m2", attackingTypeId: 15, multiplier: 2 }, // Ice
          { memberId: "m2", attackingTypeId: 3, multiplier: 2 }, // Flying
          { memberId: "m2", attackingTypeId: 14, multiplier: 2 }, // Psychic
        ],
        resistances: [],
        immunities: [],
      },
    };

    const sortFn = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
      a.memberId.localeCompare(b.memberId) || a.attackingTypeId - b.attackingTypeId;

    expect([...result.defensiveRelations.vulnerabilities].sort(sortFn)).toEqual(
      [...expected.defensiveRelations.vulnerabilities].sort(sortFn),
    );
  });
});
