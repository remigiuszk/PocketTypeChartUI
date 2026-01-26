import { DefensiveMemberRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamB_def_vulnerabilities: DefensiveMemberRelation[] = [
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
];
export const teamB_def_resistances: DefensiveMemberRelation[] = [
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

  // m3 Water/Ground
  { memberId: "m3", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
  { memberId: "m3", attackingTypeId: TypeId.Poison, multiplier: 0.5 },
  { memberId: "m3", attackingTypeId: TypeId.Rock, multiplier: 0.5 },
  { memberId: "m3", attackingTypeId: TypeId.Steel, multiplier: 0.5 },

  // m4 Dragon/Flying
  { memberId: "m4", attackingTypeId: TypeId.Fire, multiplier: 0.5 },
  { memberId: "m4", attackingTypeId: TypeId.Water, multiplier: 0.5 },
  { memberId: "m4", attackingTypeId: TypeId.Fighting, multiplier: 0.5 },
  { memberId: "m4", attackingTypeId: TypeId.Bug, multiplier: 0.5 },
  { memberId: "m4", attackingTypeId: TypeId.Grass, multiplier: 0.25 },
];
export const teamB_def_immunities: DefensiveMemberRelation[] = [
  // m1 Fire/Flying
  { memberId: "m1", attackingTypeId: TypeId.Ground, multiplier: 0 },

  // m3 Water/Ground
  { memberId: "m3", attackingTypeId: TypeId.Electric, multiplier: 0 },

  // m4 Dragon/Flying
  { memberId: "m4", attackingTypeId: TypeId.Ground, multiplier: 0 },
];
