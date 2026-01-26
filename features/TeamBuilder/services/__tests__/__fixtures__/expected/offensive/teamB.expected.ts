import { OffensiveRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamB_off_super_effective: OffensiveRelation[] = [
  // m1 Fire (10)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Bug,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Steel,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Ice,
    multiplier: 2,
  },

  // m1 Flying (3)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Fighting,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Bug,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },

  // m2 Grass (12)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Ground,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Rock,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Water,
    multiplier: 2,
  },

  // m2 Poison (4)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Fairy,
    multiplier: 2,
  },

  // m3 Water (11)
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Ground,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Rock,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Fire,
    multiplier: 2,
  },

  // m3 Ground (5)
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Poison,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Steel,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Fire,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Electric,
    multiplier: 2,
  },

  // m4 Dragon (16)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Dragon,
    defendingTypeId: TypeId.Dragon,
    multiplier: 2,
  },

  // m4 Flying (3)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Fighting,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Bug,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },
];

export const teamB_off_not_very_effective: OffensiveRelation[] = [
  // m1 Fire
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Water,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Fairy,
    multiplier: 0.5,
  },

  // m1 Flying
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Rock,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Electric,
    multiplier: 0.5,
  },

  // m2 Grass
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Flying,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Bug,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Grass,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },

  // m2 Poison
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Ground,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Rock,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Bug,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Ghost,
    multiplier: 0.5,
  },

  // m3 Water
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Water,
    multiplier: 0.5,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Grass,
    multiplier: 0.5,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Water,
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },

  // m3 Ground
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Bug,
    multiplier: 0.5,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Grass,
    multiplier: 0.5,
  },

  // m4 Dragon
  {
    memberId: "m4",
    attackingTypeId: TypeId.Dragon,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },

  // m4 Flying
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Rock,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Electric,
    multiplier: 0.5,
  },
];

export const teamB_off_no_effect: OffensiveRelation[] = [
  // m1 Flying
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Ground,
    multiplier: 0,
  },

  // m2 Poison
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Steel,
    multiplier: 0,
  },

  // m3 Ground
  {
    memberId: "m3",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Flying,
    multiplier: 0,
  },

  // m4 Dragon
  {
    memberId: "m4",
    attackingTypeId: TypeId.Dragon,
    defendingTypeId: TypeId.Fairy,
    multiplier: 0,
  },

  // m4 Flying
  {
    memberId: "m4",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Ground,
    multiplier: 0,
  },
];
