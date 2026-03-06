export type TeamRelationsResult = {
  defensiveRelations: DefensiveRelations;
  offensiveRelations: OffensiveRelations;
};

export type OffensiveRelations = {
  superEffective: OffensiveRelation[];
  notVeryEffective: OffensiveRelation[];
  noEffect: OffensiveRelation[];
};

export type OffensiveRelation = {
  memberId: string;
  attackingTypeId: number;
  defendingTypeId: number;
  multiplier: number;
};

export type DefensiveRelations = {
  vulnerabilities: DefensiveMemberRelation[];
  resistances: DefensiveMemberRelation[];
  immunities: DefensiveMemberRelation[];
};

export type DefensiveMemberRelation = {
  memberId: string;
  attackingTypeId: number;
  multiplier: number;
};
