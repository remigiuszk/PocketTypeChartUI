import { OffensiveRelation } from "../teamRelationsService/types";

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
  severlyResistedTypes: number[];
  ovelappingOffensiveTypes: number[];
};
export { OffensiveRelation };
