import { TypeId } from "./__tests__/__fixtures__/types.fixture";

export type DefensiveGlobal = {
  totalTeamImmunities: number;
  totalTeamResistances: number;
  pivotDependecyRatio: number;
  teamSize: number;
};

export type DefensivePerMember = {
  totalImmunitiesByMemberId: Record<string, TypeId>;
  totalResistancesByMemberId: Record<string, TypeId>;
};
