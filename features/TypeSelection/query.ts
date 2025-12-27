import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, POKETYPES_ENDPOINT } from "../../constants";
import { PokeTypeModel } from "./types";
import { baseQueryWithLogging } from "../../shared/baseQueryWithLogging";

export const pokeTypesApi = createApi({
  reducerPath: "pokeTypes",
  baseQuery: baseQueryWithLogging,
  endpoints: (builder) => ({
    getAllPokeTypes: builder.query<PokeTypeModel[], void>({
      query: () => {
        return {
          url: POKETYPES_ENDPOINT,
          method: "GET",
        };
      },
      transformResponse: (res: any) => res.data as PokeTypeModel[],
    }),
  }),
});

export const { useGetAllPokeTypesQuery } = pokeTypesApi;
