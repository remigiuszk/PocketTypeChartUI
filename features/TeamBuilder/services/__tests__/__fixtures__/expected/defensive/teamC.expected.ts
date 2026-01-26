import { DefensiveMemberRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamC_def_vulnerabilities: DefensiveMemberRelation[] = [
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

  // m4 Electric/Fighting
  { memberId: "m4", attackingTypeId: TypeId.Ground, multiplier: 2 },
  { memberId: "m4", attackingTypeId: TypeId.Psychic, multiplier: 2 },
  { memberId: "m4", attackingTypeId: TypeId.Fairy, multiplier: 2 },

  // m5 Ice/Psychic
  { memberId: "m5", attackingTypeId: TypeId.Fire, multiplier: 2 },
  { memberId: "m5", attackingTypeId: TypeId.Rock, multiplier: 2 },
  { memberId: "m5", attackingTypeId: TypeId.Steel, multiplier: 2 },
  { memberId: "m5", attackingTypeId: TypeId.Bug, multiplier: 2 },
  { memberId: "m5", attackingTypeId: TypeId.Ghost, multiplier: 2 },
  { memberId: "m5", attackingTypeId: TypeId.Dark, multiplier: 2 },

  // m6 Bug/Ground
  { memberId: "m6", attackingTypeId: TypeId.Fire, multiplier: 2 },
  { memberId: "m6", attackingTypeId: TypeId.Flying, multiplier: 2 },
  { memberId: "m6", attackingTypeId: TypeId.Water, multiplier: 2 },
  { memberId: "m6", attackingTypeId: TypeId.Ice, multiplier: 2 },
];

export const teamC_def_resistances: DefensiveMemberRelation[] = [
  // m1 Normal/Ghost
  { memberId: "m1", attackingTypeId: TypeId.Poison, multiplier: 0.5 },
  { memberId: "m1", attackingTypeId: TypeId.Bug, multiplier: 0.5 },

  // m2 Rock/Steel
  { memberId: "m2", attackingTypeId: TypeId.Normal, multiplier: 0.25 },
  { memberId: "m2", attackingTypeId: TypeId.Flying, multiplier: 0.25 },
  { memberId: "m2", attackingTypeId: TypeId.Rock, multiplier: 0.5 },
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
];

export const teamC_def_immunities: DefensiveMemberRelation[] = [
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
];
