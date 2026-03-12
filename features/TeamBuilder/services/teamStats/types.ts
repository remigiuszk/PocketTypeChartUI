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
  ovelappingOffensiveTypes: number[];
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
