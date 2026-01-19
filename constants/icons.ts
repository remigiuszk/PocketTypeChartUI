import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export type MemberIconDef = {
  id: string;
  library: any; // komponent ikony
  name: string; // nazwa z danej biblioteki
};

export const MEMBER_ICONS: MemberIconDef[] = [
  { id: "cloud", library: AntDesign, name: "cloud" },
  { id: "fire", library: FontAwesome5, name: "fire" },
  { id: "leaf", library: FontAwesome5, name: "leaf" },
  { id: "bolt", library: AntDesign, name: "thunderbolt" },
  { id: "skull", library: FontAwesome5, name: "skull" },
  { id: "bug", library: MaterialCommunityIcons, name: "bug" },
  { id: "star", library: AntDesign, name: "star" },
  { id: "shield", library: FontAwesome5, name: "shield-alt" },
];
