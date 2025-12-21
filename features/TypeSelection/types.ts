export interface PokeType {
  id: number;
  name: string;
  sprite: string;
}

export type PokeTypesState = {
  pokeTypes: PokeType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};