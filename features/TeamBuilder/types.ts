import { PokeTypeModel } from "../TypeSelection/types";

export interface TeamMemberModel {
  id: string;
  selectedTypes: PokeTypeModel[];
}
