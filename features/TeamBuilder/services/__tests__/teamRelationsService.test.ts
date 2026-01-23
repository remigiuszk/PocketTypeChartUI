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
        resistances: [
          // m1 Fire/Flying
          { memberId: "m1", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Steel, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Fairy, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
          { memberId: "m1", attackingTypeId: TypeId.Bug, multiplier: 0.25 },

          // m2 Grass/Poison
          { memberId: "m2", attackingTypeId: TypeId.Water, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Electric, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Fairy, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
          { memberId: "m2", attackingTypeId: TypeId.Bug, multiplier: 0.25 },
        ],
        immunities: [{ memberId: "m1", attackingTypeId: TypeId.Ground, multiplier: 0 }],
      },
    };

    const sortFn = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
      a.memberId.localeCompare(b.memberId) || a.attackingTypeId - b.attackingTypeId;

    expect([...result.defensiveRelations.vulnerabilities].sort(sortFn)).toEqual(
      [...expected.defensiveRelations.vulnerabilities].sort(sortFn),
    );
  });
});

describe("teamRelationsService.calculateTeamRelations (defensive super effective only)", () => {
  it("should return super effective attacking types vs 4 team members", () => {
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
      {
        id: "m3",
        name: "Swampert-ish",
        types: t(TypeId.Water, TypeId.Ground),
        iconId: "z",
        iconColor: "#000",
      },
      {
        id: "m4",
        name: "Dragonite-ish",
        types: t(TypeId.Dragon, TypeId.Flying),
        iconId: "w",
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
        vulnerabilities: [
          // m1 Fire/Flying
          { memberId: "m1", attackingTypeId: TypeId.Rock, multiplier: 4 },
          { memberId: "m1", attackingTypeId: TypeId.Water, multiplier: 2 },
          { memberId: "m1", attackingTypeId: TypeId.Electric, multiplier: 2 },

          // m2 Grass/Poison
          { memberId: "m2", attackingTypeId: TypeId.Fire, multiplier: 2 },
          { memberId: "m2", attackingTypeId: TypeId.Ice, multiplier: 2 },
          { memberId: "m2", attackingTypeId: TypeId.Flying, multiplier: 2 },
          { memberId: "m2", attackingTypeId: TypeId.Psychic, multiplier: 2 },

          // m3 Water/Ground
          { memberId: "m3", attackingTypeId: TypeId.Grass, multiplier: 4 },

          // m4 Dragon/Flying
          { memberId: "m4", attackingTypeId: TypeId.Ice, multiplier: 4 },
          { memberId: "m4", attackingTypeId: TypeId.Rock, multiplier: 2 },
          { memberId: "m4", attackingTypeId: TypeId.Dragon, multiplier: 2 },
          { memberId: "m4", attackingTypeId: TypeId.Fairy, multiplier: 2 },
        ],
        resistances: [
          // m1 Fire/Flying
          { memberId: "m1", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Steel, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Fairy, multiplier: 0.5 },
          { memberId: "m1", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
          { memberId: "m1", attackingTypeId: TypeId.Bug, multiplier: 0.25 },

          // m2 Grass/Poison
          { memberId: "m2", attackingTypeId: TypeId.Water, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Electric, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Fairy, multiplier: 0.5 },
          { memberId: "m2", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
          { memberId: "m2", attackingTypeId: TypeId.Bug, multiplier: 0.25 },

          // m3 Water/Ground
          { memberId: "m3", attackingTypeId: TypeId.Fire, multiplier: 0.25 },
          { memberId: "m3", attackingTypeId: TypeId.Poison, multiplier: 0.5 },
          { memberId: "m3", attackingTypeId: TypeId.Rock, multiplier: 0.5 },
          { memberId: "m3", attackingTypeId: TypeId.Steel, multiplier: 0.5 },

          // m4 Dragon/Flying
          { memberId: "m4", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
          { memberId: "m4", attackingTypeId: TypeId.Water, multiplier: 0.5 },
          { memberId: "m4", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
          { memberId: "m4", attackingTypeId: TypeId.Bug, multiplier: 0.5 },
          { memberId: "m4", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
        ],
        immunities: [
          // m1 Fire/Flying
          { memberId: "m1", attackingTypeId: TypeId.Ground, multiplier: 0 },

          // m3 Water/Ground
          { memberId: "m3", attackingTypeId: TypeId.Electric, multiplier: 0 },

          // m4 Dragon/Flying
          { memberId: "m4", attackingTypeId: TypeId.Ground, multiplier: 0 },
        ],
      },
    };

    const sortFn = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
      a.memberId.localeCompare(b.memberId) ||
      a.attackingTypeId - b.attackingTypeId ||
      a.multiplier - b.multiplier;

    expect([...result.defensiveRelations.vulnerabilities].sort(sortFn)).toEqual(
      [...expected.defensiveRelations.vulnerabilities].sort(sortFn),
    );
  });

  describe("teamRelationsService.calculateTeamRelations (defensive full) - 6 members", () => {
    it("should return full vulnerabilities, resistances and immunities for 6 unique dual-type members", () => {
      const teamMembers: TeamMemberModel[] = [
        {
          id: "m1",
          name: "Normal/Ghost",
          types: t(TypeId.Normal, TypeId.Ghost),
          iconId: "a",
          iconColor: "#000",
        },
        {
          id: "m2",
          name: "Rock/Steel",
          types: t(TypeId.Rock, TypeId.Steel),
          iconId: "b",
          iconColor: "#000",
        },
        {
          id: "m3",
          name: "Water/Fairy",
          types: t(TypeId.Water, TypeId.Fairy),
          iconId: "c",
          iconColor: "#000",
        },
        {
          id: "m4",
          name: "Electric/Fighting",
          types: t(TypeId.Electric, TypeId.Fighting),
          iconId: "d",
          iconColor: "#000",
        },
        {
          id: "m5",
          name: "Ice/Psychic",
          types: t(TypeId.Ice, TypeId.Psychic),
          iconId: "e",
          iconColor: "#000",
        },
        {
          id: "m6",
          name: "Bug/Ground",
          types: t(TypeId.Bug, TypeId.Ground),
          iconId: "f",
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
          vulnerabilities: [
            // m1 Normal/Ghost
            { memberId: "m1", attackingTypeId: TypeId.Dark, multiplier: 2 },

            // m2 Rock/Steel
            { memberId: "m2", attackingTypeId: TypeId.Fighting, multiplier: 4 },
            { memberId: "m2", attackingTypeId: TypeId.Ground, multiplier: 4 },
            { memberId: "m2", attackingTypeId: TypeId.Water, multiplier: 2 },

            // m3 Water/Fairy
            { memberId: "m3", attackingTypeId: TypeId.Electric, multiplier: 2 },
            { memberId: "m3", attackingTypeId: TypeId.Grass, multiplier: 2 },
            { memberId: "m3", attackingTypeId: TypeId.Poison, multiplier: 2 },
            { memberId: "m3", attackingTypeId: TypeId.Steel, multiplier: 2 },

            // m4 Electric/Fighting
            { memberId: "m4", attackingTypeId: TypeId.Ground, multiplier: 2 },
            { memberId: "m4", attackingTypeId: TypeId.Psychic, multiplier: 2 },
            { memberId: "m4", attackingTypeId: TypeId.Fairy, multiplier: 2 },

            // m5 Ice/Psychic
            { memberId: "m5", attackingTypeId: TypeId.Fire, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Fighting, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Rock, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Steel, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Bug, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Ghost, multiplier: 2 },
            { memberId: "m5", attackingTypeId: TypeId.Dark, multiplier: 2 },

            // m6 Bug/Ground
            { memberId: "m6", attackingTypeId: TypeId.Fire, multiplier: 2 },
            { memberId: "m6", attackingTypeId: TypeId.Flying, multiplier: 2 },
            { memberId: "m6", attackingTypeId: TypeId.Rock, multiplier: 2 },
            { memberId: "m6", attackingTypeId: TypeId.Water, multiplier: 2 },
            { memberId: "m6", attackingTypeId: TypeId.Ice, multiplier: 2 },
          ],

          resistances: [
            // m1 Normal/Ghost
            { memberId: "m1", attackingTypeId: TypeId.Poison, multiplier: 0.5 },
            { memberId: "m1", attackingTypeId: TypeId.Bug, multiplier: 0.5 },

            // m2 Rock/Steel
            { memberId: "m2", attackingTypeId: TypeId.Normal, multiplier: 0.25 },
            { memberId: "m2", attackingTypeId: TypeId.Flying, multiplier: 0.25 },
            { memberId: "m2", attackingTypeId: TypeId.Rock, multiplier: 0.25 },
            { memberId: "m2", attackingTypeId: TypeId.Bug, multiplier: 0.5 },
            { memberId: "m2", attackingTypeId: TypeId.Ice, multiplier: 0.5 },
            { memberId: "m2", attackingTypeId: TypeId.Psychic, multiplier: 0.5 },
            { memberId: "m2", attackingTypeId: TypeId.Dragon, multiplier: 0.5 },
            { memberId: "m2", attackingTypeId: TypeId.Fairy, multiplier: 0.5 },

            // m3 Water/Fairy
            { memberId: "m3", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
            { memberId: "m3", attackingTypeId: TypeId.Water, multiplier: 0.5 },
            { memberId: "m3", attackingTypeId: TypeId.Ice, multiplier: 0.5 },
            { memberId: "m3", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
            { memberId: "m3", attackingTypeId: TypeId.Bug, multiplier: 0.5 },
            { memberId: "m3", attackingTypeId: TypeId.Dark, multiplier: 0.5 },

            // m4 Electric/Fighting
            { memberId: "m4", attackingTypeId: TypeId.Electric, multiplier: 0.5 },
            { memberId: "m4", attackingTypeId: TypeId.Steel, multiplier: 0.5 },
            { memberId: "m4", attackingTypeId: TypeId.Bug, multiplier: 0.5 },
            { memberId: "m4", attackingTypeId: TypeId.Rock, multiplier: 0.5 },
            { memberId: "m4", attackingTypeId: TypeId.Dark, multiplier: 0.5 },

            // m5 Ice/Psychic
            { memberId: "m5", attackingTypeId: TypeId.Ice, multiplier: 0.5 },
            { memberId: "m5", attackingTypeId: TypeId.Psychic, multiplier: 0.5 },

            // m6 Bug/Ground
            { memberId: "m6", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
            { memberId: "m6", attackingTypeId: TypeId.Ground, multiplier: 0.5 },
            { memberId: "m6", attackingTypeId: TypeId.Poison, multiplier: 0.5 },
          ],

          immunities: [
            // m1 Normal/Ghost
            { memberId: "m1", attackingTypeId: TypeId.Normal, multiplier: 0 },
            { memberId: "m1", attackingTypeId: TypeId.Fighting, multiplier: 0 },
            { memberId: "m1", attackingTypeId: TypeId.Ghost, multiplier: 0 },

            // m2 Rock/Steel
            { memberId: "m2", attackingTypeId: TypeId.Poison, multiplier: 0 },

            // m3 Water/Fairy
            { memberId: "m3", attackingTypeId: TypeId.Dragon, multiplier: 0 },

            // m6 Bug/Ground
            { memberId: "m6", attackingTypeId: TypeId.Electric, multiplier: 0 },
          ],
        },
      };

      const sortFn = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
        a.memberId.localeCompare(b.memberId) ||
        a.attackingTypeId - b.attackingTypeId ||
        a.multiplier - b.multiplier;

      expect([...result.defensiveRelations.vulnerabilities].sort(sortFn)).toEqual(
        [...expected.defensiveRelations.vulnerabilities].sort(sortFn),
      );

      expect([...result.defensiveRelations.resistances].sort(sortFn)).toEqual(
        [...expected.defensiveRelations.resistances].sort(sortFn),
      );

      expect([...result.defensiveRelations.immunities].sort(sortFn)).toEqual(
        [...expected.defensiveRelations.immunities].sort(sortFn),
      );
    });
  });
});
