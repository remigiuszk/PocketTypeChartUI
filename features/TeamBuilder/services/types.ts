import { PokeTypeModel } from "../../TypeSelection/types";
import { TeamMemberModel } from "../types";

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

export type DefensiveStats = {
  criticalWeaknesses: Weakness[];
  majorWeaknesses: Weakness[];
  multiple4xVulns: Weakness[];
  noSafeSwitchAgainst: PokeTypeModel[];
};

export type Weakness = {
  attackingTypeId: number;
  affectedMembersCount: number;
  memberIds: string[];
};


export type OffensiveStats = {
  immunityWalls: PokeTypeModel[];
  noSuperEffectiveCoverage: PokeTypeModel[];
  severlyResistedTypes: OffensiveRelation[];
  ovelappingOffensiveTypes: TeamMemberModel[];
  singleCoverageDependency: TeamMemberModel;
};
