import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../../types";
import { ALL_TYPES_FIXTURE, TypeId } from "../types.fixture";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

export const teamE: TeamMemberModel[] = [
  {
    id: "m1",
    name: "Rock/Flying",
    types: t(TypeId.Rock, TypeId.Flying),
    iconId: "a",
    iconColor: "#000",
  },
  {
    id: "m2",
    name: "Water/Flying",
    types: t(TypeId.Water, TypeId.Flying),
    iconId: "b",
    iconColor: "#000",
  },
  {
    id: "m3",
    name: "Ice/Flying",
    types: t(TypeId.Ice, TypeId.Flying),
    iconId: "c",
    iconColor: "#000",
  },
  {
    id: "m4",
    name: "Grass/Poison",
    types: t(TypeId.Grass, TypeId.Poison),
    iconId: "d",
    iconColor: "#000",
  },
];
