import { configureStore } from "@reduxjs/toolkit";
import pokeTypesReducer from "./pokeTypes/pokeTypesSlice";

export const store = configureStore({
  reducer: {
    pokeTypes: pokeTypesReducer,
  },
});
