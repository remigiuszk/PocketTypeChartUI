import { DefensiveMemberRelation, OffensiveRelation } from "../../teamRelationsService";

export const sortDef = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
  a.memberId.localeCompare(b.memberId) ||
  a.attackingTypeId - b.attackingTypeId ||
  a.multiplier - b.multiplier;

export const sortOffensive = (a: OffensiveRelation, b: OffensiveRelation) =>
  a.memberId.localeCompare(b.memberId) ||
  a.attackingTypeId - b.attackingTypeId ||
  a.defendingTypeId - b.defendingTypeId ||
  a.multiplier - b.multiplier;

export function expectDefensive(
  actual: DefensiveMemberRelation[],
  expected: DefensiveMemberRelation[],
) {
  expect([...actual].sort(sortDef)).toEqual([...expected].sort(sortDef));
}

export function expectOffensive(
  actual: OffensiveRelation[],
  expected: OffensiveRelation[],
) {
  expect([...actual].sort(sortOffensive)).toEqual([...expected].sort(sortOffensive));
}
