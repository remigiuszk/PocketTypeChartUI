import { PokeTypeModel } from "../TypeSelection/types";

export interface DamageRelationModel {
  multiplier: number;
}

export interface DefensiveDamageRelationModel extends DamageRelationModel {
  attackingType: PokeTypeModel;
}

export interface OffensiveDamageRelationModel extends DamageRelationModel {
  attackingMoveType: PokeTypeModel;
  defendingType: PokeTypeModel;
}

export interface TypingEffectivenessModel {
  defensiveDamageRelations: DefensiveDamageRelationModel[];
  offensiveDamageRelations: OffensiveDamageRelationModel[];
}

export interface DamageRelationFullModel {
  id: string;
  attackingTypeId: number;
  defendingTypeId: number;
  multiplier: number;
}
