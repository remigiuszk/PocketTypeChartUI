import { teamRelationsService } from "../../../teamRelationsService/teamRelationsService";
import { offensiveStatsService } from "../../../teamStats/offensiveStatsService";
import { SevereResistance } from "../../../teamStats/types";
import { ALL_DAMAGE_RELATIONS_FIXTURE } from "../../__fixtures__/damageRelations.fixture";
import { teamD, teamE, teamF } from "../../__fixtures__/teams";
import { ALL_TYPES_FIXTURE, TypeId } from "../../__fixtures__/types.fixture";

describe("offensive stats - severly resisted types", () => {
  it("should return severly resisted types for teamD", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamD);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamD,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: SevereResistance[] = [
      {
        defendingTypeId: TypeId.Rock,
        totalTypesResisted: 8,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Fire, TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Fire, TypeId.Flying] },
          { memberId: "m4", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m5", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m6", resistedTypeIds: [TypeId.Normal, TypeId.Flying] },
        ],
      },
      {
        defendingTypeId: TypeId.Steel,
        totalTypesResisted: 9,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m3", resistedTypeIds: [TypeId.Grass, TypeId.Psychic] },
          { memberId: "m4", resistedTypeIds: [TypeId.Rock] },
          { memberId: "m5", resistedTypeIds: [TypeId.Ice, TypeId.Flying] },
          { memberId: "m6", resistedTypeIds: [TypeId.Normal, TypeId.Flying] },
        ],
      },
      {
        defendingTypeId: TypeId.Fire,
        totalTypesResisted: 5,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m2", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m3", resistedTypeIds: [TypeId.Grass] },
          { memberId: "m4", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m5", resistedTypeIds: [TypeId.Ice] },
        ],
      },
      {
        defendingTypeId: TypeId.Water,
        totalTypesResisted: 4,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m2", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m4", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m5", resistedTypeIds: [TypeId.Ice] },
        ],
      },
      {
        defendingTypeId: TypeId.Dragon,
        totalTypesResisted: 4,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m2", resistedTypeIds: [TypeId.Fire] },
          { memberId: "m3", resistedTypeIds: [TypeId.Grass] },
          { memberId: "m4", resistedTypeIds: [TypeId.Fire] },
        ],
      },
      {
        defendingTypeId: TypeId.Electric,
        totalTypesResisted: 4,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m5", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m6", resistedTypeIds: [TypeId.Flying] },
        ],
      },
    ];

    expect(statsResult.severlyResistedTypes).toEqual(expect.arrayContaining(expected));
  });
  it("should return severly resisted types for teamE", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamE);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamE,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: SevereResistance[] = [
      {
        defendingTypeId: TypeId.Steel,
        totalTypesResisted: 7,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Rock, TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m3", resistedTypeIds: [TypeId.Ice, TypeId.Flying] },
          { memberId: "m4", resistedTypeIds: [TypeId.Grass, TypeId.Poison] },
        ],
      },
      {
        defendingTypeId: TypeId.Electric,
        totalTypesResisted: 3,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m3", resistedTypeIds: [TypeId.Flying] },
        ],
      },
      {
        defendingTypeId: TypeId.Rock,
        totalTypesResisted: 4,
        affectedMembers: [
          { memberId: "m1", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m2", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m3", resistedTypeIds: [TypeId.Flying] },
          { memberId: "m4", resistedTypeIds: [TypeId.Poison] },
        ],
      },
    ];

    expect(statsResult.severlyResistedTypes).toEqual(expect.arrayContaining(expected));
  });

  it("should return severly resisted types for teamF", () => {
    const service = teamRelationsService();
    const result = service.calculateTeamRelations(ALL_DAMAGE_RELATIONS_FIXTURE, teamF);

    const statsService = offensiveStatsService(
      result.offensiveRelations,
      teamF,
      ALL_TYPES_FIXTURE,
    );
    const statsResult = statsService.calculate();

    const expected: SevereResistance[] = [];

    expect(statsResult.severlyResistedTypes).toEqual(expect.arrayContaining(expected));
  });
});
