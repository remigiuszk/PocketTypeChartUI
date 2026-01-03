import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, DAMAGERELATIONS_ENDPOINT, POKETYPES_ENDPOINT } from "../../constants";
import { TypingEffectivenessModel } from "./types";

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
          params: {selectedTypesId: selectedTypes.join(", ")},
        };
      },
      transformResponse: (res: any) => {
        console.log("FETCHING RELATIONS", res);
        return res as TypingEffectivenessModel;
      },
    }),
  }),
});

export const { useGetDamageRelationsQuery } = damageRelationsApi;
