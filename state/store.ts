import { configureStore } from "@reduxjs/toolkit";

import { pokeTypesApi } from "../features/TypeSelection/query";
import { damageRelationsApi } from "../features/DamageRelations/query";

export const store = configureStore({
  reducer: {
    [pokeTypesApi.reducerPath]: pokeTypesApi.reducer,
    [damageRelationsApi.reducerPath]: damageRelationsApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(pokeTypesApi.middleware)
      .concat(damageRelationsApi.middleware),
});
