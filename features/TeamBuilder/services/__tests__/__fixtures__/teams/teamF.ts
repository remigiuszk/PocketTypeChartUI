import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../../types";
import { ALL_TYPES_FIXTURE, TypeId } from "../types.fixture";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

export const teamF: TeamMemberModel[] = [
  {
    id: "m1",
    name: "Water/Steel",
    types: t(TypeId.Water, TypeId.Steel),
    iconId: "a",
    iconColor: "#000",
  },
  {
    id: "m2",
    name: "Dragon/Fairy",
    types: t(TypeId.Dragon, TypeId.Fairy),
    iconId: "b",
    iconColor: "#000",
  },
  {
    id: "m3",
    name: "Ground/Rock",
    types: t(TypeId.Ground, TypeId.Rock),
    iconId: "c",
    iconColor: "#000",
  },
  {
    id: "m4",
    name: "Electric/Flying",
    types: t(TypeId.Electric, TypeId.Flying),
    iconId: "d",
    iconColor: "#000",
  },
];
