import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../../types";
import { ALL_TYPES_FIXTURE, TypeId } from "../types.fixture";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

export const teamD: TeamMemberModel[] = [
  {
    id: "m1",
    name: "Fire/Flying",
    types: t(TypeId.Fire, TypeId.Flying),
    iconId: "a",
    iconColor: "#000",
  },
  {
    id: "m2",
    name: "Fire/Flying 2",
    types: t(TypeId.Fire, TypeId.Flying),
    iconId: "b",
    iconColor: "#000",
  },
  {
    id: "m3",
    name: "Grass/Psychic",
    types: t(TypeId.Grass, TypeId.Psychic),
    iconId: "c",
    iconColor: "#000",
  },
  {
    id: "m4",
    name: "Fire/Rock",
    types: t(TypeId.Fire, TypeId.Rock),
    iconId: "d",
    iconColor: "#000",
  },
  {
    id: "m5",
    name: "Ice/Flying",
    types: t(TypeId.Ice, TypeId.Flying),
    iconId: "e",
    iconColor: "#000",
  },
  {
    id: "m6",
    name: "Normal/Flying",
    types: t(TypeId.Normal, TypeId.Flying),
    iconId: "f",
    iconColor: "#000",
  },
];
