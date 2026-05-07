import { TeamRelationsResult } from "../teamRelationsService/types";

export type Stats = {
  relations: TeamRelationsResult;
  offensiveStats: OffensiveStats;
  defensiveStats: DefensiveStats;
};

export type DefensiveStats = {
  criticalWeaknesses: TypeThreat[];
  majorWeaknesses: TypeThreat[];
  multiple4xVulns: TypeThreat[];
  noSafeSwitchAgainst: TypeThreat[];
};

export type TypeThreat = {
  attackingTypeId: number;
  affectedMembersCount: number;
  memberIds: string[];
};

export type OffensiveStats = {
  noSuperEffectiveCoverage: number[];
  severlyResistedTypes: SevereResistance[];
  overlappingOffensiveTypes: number[];
};

export type SevereResistance = {
  defendingTypeId: number;
  totalTypesResisted: number;
  affectedMembers: AffectedMember[];
};

export type AffectedMember = {
  memberId: string;
  resistedTypeIds: number[];
};
