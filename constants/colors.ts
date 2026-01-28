export const BG_100: string = "#0d1012ff";
export const BG_200: string = "#15181bff";
export const BG_500: string = "#171d20ff";
export const BG_600: string = "#1a2e35ff";
export const BG_800: string = "#2c383dff";
export const BG_1000: string = "#293b42ff";
//export const BG_1000: string = "rgb(34, 72, 88)";

export const TEXT_100: string = "#A0A3BD";
export const TEXT_300: string = "#dee0f2ff";
export const TEXT_500: string = "#f6f7ffff";

export const BORDER_WHITE: string = "#98a9c2ae";
export const BORDER_GRAY: string = "#98a9c269";

export const BORDER_100: string = "#324046ff";

export const SELECTION: string = "#ffffffff";

export const PRIMARY: string = "#5fbfdaff";
export const ACCENT: string = "#f3f2d0ff";

export const test: string = "rgb(11, 130, 163)";

export const WARNING: string = "#ffce85";

export const STRENGHTS_BG: string = "rgba(107, 255, 139, 0.1)";
export const STRENGHTS_BORDER: string = "rgba(107, 255, 149, 0.25)";
export const STRENGHTS_CONTENT: string = "#abfec7";

export const OPTIONS_BG: string = "#3d6367a3";
export const OPTIONS_BORDER: string = "#6dbfbec3";
export const OPTIONS_CONTENT: string = "rgb(229, 237, 209)";

export const ERROR_BG: string = "rgba(255,107,107,0.10)";
export const ERROR_BORDER: string = "rgba(255,107,107,0.25)";
export const ERROR_CONTENT: string = "#ff6b6b";

export const SUGGESTIONS_BG: string = "rgba(22, 120, 186, 0.81)";
export const SUGGESTIONS_BORDER: string = "rgba(60, 175, 252, 1)";
export const SUGGESTIONS_CONTENT: string = "rgb(255, 255, 255)";

export const INFO_BG: string = "rgba(97, 189, 251, 0.38)";
export const INFO_BORDER: string = "rgba(60, 175, 252, 1)";
export const INFO_CONTENT: string = "rgba(107, 199, 232, 1)";
export const INFO_SUBCONTENT: string = "rgba(107, 199, 232, 0.52)";

export const EVALUATE_BACKGROUND: string = "rgba(60, 175, 252, 1)";

export const MEMBERS_COLORS = [
  "#1BC5BE", // brand teal (twój główny accent)
  "#4DA3FF", // clean blue
  "#FF6B6B", // soft red
  "#FF9F43", // orange
  "#FFD93D", // yellow
  "#6BCB77", // green
  "#9B5DE5", // purple
  "#F15BB5", // pink
  "#5EEAD4", // mint
  "#94A3B8", // neutral gray
  "#E2E8F0", // soft white
  "#2DD4BF", // secondary teal
] as const;

export type MemberColor = (typeof MEMBERS_COLORS)[number];
