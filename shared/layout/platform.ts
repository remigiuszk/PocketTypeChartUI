import { Platform } from "react-native";

export const IS_WEB: boolean = Platform.OS === "web";
export const IS_ANDROID: boolean = Platform.OS === "android";
