import { PokeTypeModel } from "../TypeSelection/types";

export interface TeamMemberModel {
  id: string;
  types: PokeTypeModel[];
  iconId: string;
  iconColor: string;
}
