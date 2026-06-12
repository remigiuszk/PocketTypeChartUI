import { Platform } from "react-native";

// Single source of truth for web-specific layout branches. Native (iOS/Android)
// keeps its existing phone-first behavior; web gets the responsive page layout.
export const IS_WEB: boolean = Platform.OS === "web";
