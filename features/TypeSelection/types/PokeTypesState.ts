import { PokeType } from "./pokeType";

export type PokeTypesState = {
  pokeTypes: PokeType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};