import { configureStore } from "@reduxjs/toolkit";

import { pokeTypesApi } from "../features/TypeSelection/query";

export const store = configureStore({
  reducer: {
    [pokeTypesApi.reducerPath]: pokeTypesApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokeTypesApi.middleware),
});
