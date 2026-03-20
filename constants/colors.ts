export const BG_ROOT: string = "#0f0f14";
export const BG_LAYOUT: string = "#151520";
export const BG_CARD: string = "#12121c";
export const BG_INTERNAL: string = "#1a1a28";
export const BG_BUTTON: string = "#22223A";
export const BG_HINT: string = "#2A2A3A";

export const BG_WEAKNESSES: string = "#130707";
export const BG_WEAKNESS_WEAK: string = "#27221D";
export const BG_WEAKNESS_WEAK_BADGE: string = "#362307";
export const BG_STRENGHTS: string = "#121E16";
export const BG_SUGGESTIONS: string = "#12161E";

export const TEXT_WEAKNESSES_CRITICAL: string = "#E24B4A";
export const TEXT_WEAKNESSES_WEAK: string = "#BA7517";
export const TEXT_STRENGHTS: string = "#1D9E75";
export const TEXT_SUGGESTIONS: string = "#378ADD";
export const TEXT_HINT: string = "#686868";

export const BORDER_DEFAULT: string = "#3a435a";
export const BORDER_INTERNAL: string = "#2a2a3a";
export const BORDER_WEAKNESSES: string = "#431D21";
export const BORDER_STRENGHTS: string = "#143628";
export const BORDER_SUGGESTIONS: string = "#172436";

//export const ACCENT: string = "#f3f2d0ff";
export const ACCENT: string = "#7eb8f7";

export const TEXT_100: string = "#A0A3BD";
export const TEXT_300: string = "#dee0f2ff";
export const TEXT_500: string = "#f6f7ffff";
export const TEXT_MUTED: string = "#55556a";

export const SELECTION: string = "#ffffffff";

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
