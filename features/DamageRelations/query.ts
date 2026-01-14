import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ALL_ENDPOINT,
  BASE_URL,
  DAMAGERELATIONS_ENDPOINT,
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
      transformResponse: (res: any) => {
        console.log("FETCHING RELATIONS", res);
        return res as TypingEffectivenessModel;
      },
    }),
    getAllRelations: builder.query<DamageRelationFullModel[], void>({
      query: () => {
        return {
          url: DAMAGERELATIONS_ENDPOINT + ALL_ENDPOINT,
          method: "GET",
        };
      },
      transformResponse: (res: any) => {
        return res as DamageRelationFullModel[];
      },
    }),
  }),
});

export const { useGetDamageRelationsQuery, useGetAllRelationsQuery } =
  damageRelationsApi;
