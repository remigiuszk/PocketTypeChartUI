import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../../types";
import { ALL_TYPES_FIXTURE, TypeId } from "../types.fixture";

const byId = new Map<number, PokeTypeModel>(ALL_TYPES_FIXTURE.map((t) => [t.id, t]));

const t = (...ids: TypeId[]) => ids.map((id) => byId.get(id)!);

export const teamA: TeamMemberModel[] = [
  {
    id: "m1",
    name: "Charizard-ish",
    types: t(TypeId.Fire, TypeId.Flying),
    iconId: "x",
    iconColor: "#000",
  },
  {
    id: "m2",
    name: "Venusaur-ish",
    types: t(TypeId.Grass, TypeId.Poison),
    iconId: "y",
    iconColor: "#000",
  },
];
