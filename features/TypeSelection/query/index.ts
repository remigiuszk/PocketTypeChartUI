import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, POKETYPES_ENDPOINT } from "../../../constants";

export const pokeTypesApi = createApi({
  reducerPath: "pokeTypes",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getAllPokeTypes: builder.query({
      query: () => {
        return {
          url: POKETYPES_ENDPOINT,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        const data = response?.data;
      },
    }),
  }),
});

export const { useGetAllPokeTypesQuery } = pokeTypesApi;
