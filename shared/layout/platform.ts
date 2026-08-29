import { Platform } from "react-native";

export const IS_WEB: boolean = Platform.OS === "web";
export const IS_ANDROID: boolean = Platform.OS === "android";

// Android renders our type-sprite badges visibly smaller than iOS at the same
// dp size (a platform image-scaling quirk), so bump them up a bit there to match.
export const typeImageSize = (basePx: number): number =>
  IS_ANDROID ? Math.round(basePx * 1.15) : basePx;
