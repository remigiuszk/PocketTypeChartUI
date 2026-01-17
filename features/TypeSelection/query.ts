import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, POKETYPES_ENDPOINT } from "../../constants";
import { PokeTypeModel } from "./types";

export const pokeTypesApi = createApi({
  reducerPath: "pokeTypes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getAllPokeTypes: builder.query<PokeTypeModel[], void>({
      query: () => {
        return {
          url: POKETYPES_ENDPOINT,
          method: "GET",
        };
      },
      transformResponse: (res: any) => {
        console.log(res);
        return res as PokeTypeModel[];
      },
    }),
  }),
});

export const { useGetAllPokeTypesQuery } = pokeTypesApi;
