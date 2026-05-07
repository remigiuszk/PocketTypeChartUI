import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export type MemberIconDef = {
  id: string;
  library: any; // komponent ikony
  name: string; // nazwa z danej biblioteki
};

export const MEMBER_ICONS: MemberIconDef[] = [
  { id: "aliwangwang", library: AntDesign, name: "aliwangwang" },
  { id: "bug", library: AntDesign, name: "bug" },
  { id: "dingtalk", library: AntDesign, name: "dingtalk" },
  { id: "bolt", library: AntDesign, name: "thunderbolt" },
  { id: "skull", library: FontAwesome5, name: "skull" },
  { id: "moon", library: AntDesign, name: "moon" },
  { id: "baidu", library: AntDesign, name: "baidu" },
  { id: "icloud", library: Entypo, name: "icloud" },
  { id: "leaf", library: Entypo, name: "leaf" },
  { id: "star-outlined", library: Entypo, name: "star-outlined" },
  { id: "cloud", library: Feather, name: "cloud" },
  { id: "feather", library: Feather, name: "feather" },
  { id: "github", library: Feather, name: "github" },
  { id: "mysql", library: Fontisto, name: "mysql" },
  { id: "snowflake", library: Fontisto, name: "snowflake" },
  { id: "bug-outline", library: Ionicons, name: "bug-outline" },
  { id: "diamond-outline", library: Ionicons, name: "diamond-outline" },
  { id: "fish-outline", library: Ionicons, name: "fish-outline" },
  { id: "flash-outline", library: Ionicons, name: "flash-outline" },
  { id: "flower-outline", library: Ionicons, name: "flower-outline" },
  { id: "leaf-outline", library: Ionicons, name: "leaf-outline" },
  { id: "logo-electron", library: Ionicons, name: "logo-electron" },
  { id: "nuclear", library: Ionicons, name: "nuclear" },
  { id: "planet-outline", library: Ionicons, name: "planet-outline" },
  { id: "skull-outline", library: Ionicons, name: "skull-outline" },
  { id: "sparkles-outline", library: Ionicons, name: "sparkles-outline" },
  { id: "water-outline", library: Ionicons, name: "water-outline" },
  { id: "air", library: MaterialIcons, name: "air" },
];
