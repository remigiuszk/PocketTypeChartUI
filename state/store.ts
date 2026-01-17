import { configureStore } from "@reduxjs/toolkit";

import { damageRelationsApi } from "../features/DamageRelations/query";
import { pokeTypesApi } from "../features/TypeSelection/query";

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
