import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../../types";
import { ALL_TYPES_FIXTURE, TypeId } from "../types.fixture";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

export const teamC: TeamMemberModel[] = [
  {
    id: "m1",
    name: "Normal/Ghost",
    types: t(TypeId.Normal, TypeId.Ghost),
    iconId: "a",
    iconColor: "#000",
  },
  {
    id: "m2",
    name: "Rock/Steel",
    types: t(TypeId.Rock, TypeId.Steel),
    iconId: "b",
    iconColor: "#000",
  },
  {
    id: "m3",
    name: "Water/Fairy",
    types: t(TypeId.Water, TypeId.Fairy),
    iconId: "c",
    iconColor: "#000",
  },
  {
    id: "m4",
    name: "Electric/Fighting",
    types: t(TypeId.Electric, TypeId.Fighting),
    iconId: "d",
    iconColor: "#000",
  },
  {
    id: "m5",
    name: "Ice/Psychic",
    types: t(TypeId.Ice, TypeId.Psychic),
    iconId: "e",
    iconColor: "#000",
  },
  {
    id: "m6",
    name: "Bug/Ground",
    types: t(TypeId.Bug, TypeId.Ground),
    iconId: "f",
    iconColor: "#000",
  },
];
