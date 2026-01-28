import { OffensiveRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamC_off_super_effective: OffensiveRelation[] = [
  // m1 Normal (1) -> (fixture: brak 2x)
  // m1 Ghost (8)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Ghost,
    defendingTypeId: TypeId.Ghost,
    multiplier: 2,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Ghost,
    defendingTypeId: TypeId.Psychic,
    multiplier: 2,
  },

  // m2 Rock (6)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Flying,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Bug,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Fire,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Ice,
    multiplier: 2,
  },

  // m2 Steel (9)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Rock,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Ice,
    multiplier: 2,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
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

  // m3 Fairy (18)
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Dragon,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Dark,
    multiplier: 2,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Fighting,
    multiplier: 2,
  },

  // m4 Electric (13)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Water,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Flying,
    multiplier: 2,
  },

  // m4 Fighting (2)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Normal,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Rock,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Steel,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Ice,
    multiplier: 2,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Dark,
    multiplier: 2,
  },

  // m5 Ice (15)
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Flying,
    multiplier: 2,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Ground,
    multiplier: 2,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Dragon,
    multiplier: 2,
  },

  // m5 Psychic (14)
  {
    memberId: "m5",
    attackingTypeId: TypeId.Psychic,
    defendingTypeId: TypeId.Fighting,
    multiplier: 2,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Psychic,
    defendingTypeId: TypeId.Poison,
    multiplier: 2,
  },

  // m6 Bug (7)
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Grass,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Psychic,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Dark,
    multiplier: 2,
  },

  // m6 Ground (5)
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Poison,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Steel,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Fire,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Electric,
    multiplier: 2,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Rock,
    multiplier: 2,
  },
];

export const teamC_off_not_very_effective: OffensiveRelation[] = [
  // m1 Normal (1)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Normal,
    defendingTypeId: TypeId.Rock,
    multiplier: 0.5,
  },
  {
    memberId: "m1",
    attackingTypeId: TypeId.Normal,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },

  // m1 Ghost (8)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Ghost,
    defendingTypeId: TypeId.Dark,
    multiplier: 0.5,
  },

  // m2 Rock (6)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Fighting,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Ground,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Rock,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },

  // m2 Steel (9)
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Water,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Electric,
    multiplier: 0.5,
  },
  {
    memberId: "m2",
    attackingTypeId: TypeId.Steel,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  // m3 Water (11)
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

  // m3 Fairy (18)
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m3",
    attackingTypeId: TypeId.Fairy,
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },

  // m4 Electric (13)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Grass,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Electric,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Dragon,
    multiplier: 0.5,
  },

  // m4 Fighting (2)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Flying,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Bug,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Psychic,
    multiplier: 0.5,
  },
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Fairy,
    multiplier: 0.5,
  },

  // m5 Ice (15)
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Water,
    multiplier: 0.5,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Ice,
    multiplier: 0.5,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Ice,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },

  // m5 Psychic (14)
  {
    memberId: "m5",
    attackingTypeId: TypeId.Psychic,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m5",
    attackingTypeId: TypeId.Psychic,
    defendingTypeId: TypeId.Psychic,
    multiplier: 0.5,
  },

  // m6 Bug (7)
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Poison,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Flying,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Ghost,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Steel,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Fire,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Fairy,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Bug,
    defendingTypeId: TypeId.Fighting,
    multiplier: 0.5,
  },

  // m6 Ground (5)
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Bug,
    multiplier: 0.5,
  },
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Grass,
    multiplier: 0.5,
  },
];

export const teamC_off_no_effect: OffensiveRelation[] = [
  // m1 Normal (1)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Normal,
    defendingTypeId: TypeId.Ghost,
    multiplier: 0,
  },

  // m1 Ghost (8)
  {
    memberId: "m1",
    attackingTypeId: TypeId.Ghost,
    defendingTypeId: TypeId.Normal,
    multiplier: 0,
  },

  // m4 Electric (13)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Electric,
    defendingTypeId: TypeId.Ground,
    multiplier: 0,
  },

  // m4 Fighting (2)
  {
    memberId: "m4",
    attackingTypeId: TypeId.Fighting,
    defendingTypeId: TypeId.Ghost,
    multiplier: 0,
  },

  // m5 Psychic (14)
  {
    memberId: "m5",
    attackingTypeId: TypeId.Psychic,
    defendingTypeId: TypeId.Dark,
    multiplier: 0,
  },

  // m6 Ground (5)
  {
    memberId: "m6",
    attackingTypeId: TypeId.Ground,
    defendingTypeId: TypeId.Flying,
    multiplier: 0,
  },
];
