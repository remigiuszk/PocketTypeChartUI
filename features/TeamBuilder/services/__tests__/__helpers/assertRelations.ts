import { DefensiveMemberRelation } from "../../teamRelationsService";

export const sortDef = (a: DefensiveMemberRelation, b: DefensiveMemberRelation) =>
  a.memberId.localeCompare(b.memberId) ||
  a.attackingTypeId - b.attackingTypeId ||
  a.multiplier - b.multiplier;

export function expectVulnerabilities(
  actual: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
  expected: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
) {
  expect([...actual.vulnerabilities].sort(sortDef)).toEqual(
    [...expected.vulnerabilities].sort(sortDef),
  );
}

export function expectResistances(
  actual: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
  expected: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
) {
  expect([...actual.resistances].sort(sortDef)).toEqual(
    [...expected.resistances].sort(sortDef),
  );
}

export function expectImmunities(
  actual: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
  expected: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
) {
  expect([...actual.immunities].sort(sortDef)).toEqual(
    [...expected.immunities].sort(sortDef),
  );
}

export function expectDefensive(
  actual: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
  expected: {
    vulnerabilities: DefensiveMemberRelation[];
    resistances: DefensiveMemberRelation[];
    immunities: DefensiveMemberRelation[];
  },
) {
  expect([...actual.vulnerabilities].sort(sortDef)).toEqual(
    [...expected.vulnerabilities].sort(sortDef),
  );
  expect([...actual.resistances].sort(sortDef)).toEqual(
    [...expected.resistances].sort(sortDef),
  );
  expect([...actual.immunities].sort(sortDef)).toEqual(
    [...expected.immunities].sort(sortDef),
  );
}
