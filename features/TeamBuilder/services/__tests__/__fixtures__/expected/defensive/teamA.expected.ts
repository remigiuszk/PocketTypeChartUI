import { DefensiveMemberRelation } from "../../../../teamRelationsService";
import { TypeId } from "../../types.fixture";

export const teamA_def_vulnerabilities: DefensiveMemberRelation[] = [
  // Fire/Flying
  { memberId: "m1", attackingTypeId: 6, multiplier: 4 }, // Rock
  { memberId: "m1", attackingTypeId: 11, multiplier: 2 }, // Water
  { memberId: "m1", attackingTypeId: 13, multiplier: 2 }, // Electric

  // Grass/Poison
  { memberId: "m2", attackingTypeId: 10, multiplier: 2 }, // Fire
  { memberId: "m2", attackingTypeId: 15, multiplier: 2 }, // Ice
  { memberId: "m2", attackingTypeId: 3, multiplier: 2 }, // Flying
  { memberId: "m2", attackingTypeId: 14, multiplier: 2 }, // Psychic
];

export const teamA_def_resistances: DefensiveMemberRelation[] = [
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
];

export const teamA_def_immunities: DefensiveMemberRelation[] = [
  { memberId: "m1", attackingTypeId: TypeId.Ground, multiplier: 0 },
];
