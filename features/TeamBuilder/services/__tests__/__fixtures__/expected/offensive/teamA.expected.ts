import { OffensiveRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamA_off_super_effective: OffensiveRelation[] = [
  // m1 Fire
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Bug,
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
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Steel,
    multiplier: 2,
  },

  // m1 Flying
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Bug,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Fighting,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },

  // m2 Grass
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Water,
    multiplier: 2,
  },
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

  // m2 Poison
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
];

export const teamA_off_not_very_effective: OffensiveRelation[] = [
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
    defendingTypeId: TypeId.Rock,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Fire,
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },

  // m1 Flying
  {
    memberId: "m1",
    attackingTypeId: TypeId.Flying,
    defendingTypeId: TypeId.Electric,
    multiplier: 0.5,
  },
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

  // m2 Grass
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Fire,
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
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Flying,
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
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Grass,
    defendingTypeId: TypeId.Steel,
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
    defendingTypeId: TypeId.Ghost,
    multiplier: 0.5,
  },
];

export const teamA_off_no_effect: OffensiveRelation[] = [
  // m2 Poison
  {
    memberId: "m2",
    attackingTypeId: TypeId.Poison,
    defendingTypeId: TypeId.Steel,
    multiplier: 0,
  },
];
