import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { TabRouteName } from "./types";

export type TabConfig = {
  name: TabRouteName;
  icon: keyof typeof FontAwesome6.glyphMap;
  label: string;
  compactLabel: string;
};

export const TABS: TabConfig[] = [
  { name: "Typing", icon: "fire-flame-curved", label: "Type Chart", compactLabel: "Chart" },
  { name: "TeamBuilder", icon: "users", label: "Team Builder", compactLabel: "Team" },
  {
    name: "PokemonSearch",
    icon: "magnifying-glass",
    label: "Pokemon Search",
    compactLabel: "Search",
  },
];
