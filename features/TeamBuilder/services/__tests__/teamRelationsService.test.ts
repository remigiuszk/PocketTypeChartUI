import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../__fixtures__/damageRelations.fixture";
import { ALL_TYPES_FIXTURE, TypeId } from "../__fixtures__/types.fixture";
import { teamRelationsService } from "../teamRelationsService";

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

    // const m1 = result.defensive.superEffectiveAgainstMembers["m1"];
    // const m2 = result.defensive.superEffectiveAgainstMembers["m2"];

    // Fire/Flying: Rock = 4x, Water = 2x, Electric = 2x
    expect(m1.x4.sort()).toEqual([TypeId.Rock].sort());
    expect(m1.x2.sort()).toEqual([TypeId.Water, TypeId.Electric].sort());

    // Grass/Poison: Fire, Ice, Flying, Psychic = 2x
    expect(m2.x4.sort()).toEqual([]);
    expect(m2.x2.sort()).toEqual(
      [TypeId.Fire, TypeId.Ice, TypeId.Flying, TypeId.Psychic].sort(),
    );
  });
});
