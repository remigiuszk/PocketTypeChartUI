import { PokeTypeModel } from "../TypeSelection/types";

export interface TeamMemberModel {
  id: string;
  name: string;
  types: PokeTypeModel[];
  iconId: string;
  iconColor: string;
}
