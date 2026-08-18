import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  ALL_ENDPOINT,
  BASE_URL,
  DAMAGERELATIONS_ENDPOINT,
  resolveSpriteUrl,
} from "../../constants";
import { DamageRelationFullModel, TypingEffectivenessModel } from "./types";

export const damageRelationsApi = createApi({
  reducerPath: "damageRelations",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getDamageRelations: builder.query<TypingEffectivenessModel, number[]>({
      query: (selectedTypes) => {
        return {
          url: DAMAGERELATIONS_ENDPOINT,
          method: "GET",
          params: { selectedTypesId: selectedTypes.join(", ") },
        };
      },
      transformResponse: (res) => {
        const result = res as TypingEffectivenessModel;
        return {
          defensiveDamageRelations: result.defensiveDamageRelations.map((relation) => ({
            ...relation,
            attackingType: {
              ...relation.attackingType,
              sprite: resolveSpriteUrl(relation.attackingType.sprite),
            },
          })),
          offensiveDamageRelations: result.offensiveDamageRelations.map((relation) => ({
            ...relation,
            attackingMoveType: {
              ...relation.attackingMoveType,
              sprite: resolveSpriteUrl(relation.attackingMoveType.sprite),
            },
            defendingType: {
              ...relation.defendingType,
              sprite: resolveSpriteUrl(relation.defendingType.sprite),
            },
          })),
        };
      },
    }),
    getAllRelations: builder.query<DamageRelationFullModel[], void>({
      query: () => {
        return {
          url: DAMAGERELATIONS_ENDPOINT + ALL_ENDPOINT,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res as DamageRelationFullModel[];
      },
    }),
  }),
});

export const { useGetDamageRelationsQuery, useGetAllRelationsQuery } = damageRelationsApi;
