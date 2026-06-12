import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { WEB_GUTTER, WEB_MAX_WIDTH } from "../../constants/style";
import { IS_WEB } from "../layout/platform";

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

// Centers page content and caps its width on web so it doesn't stretch
// edge-to-edge on a desktop browser. On native it is a transparent passthrough.
export const PageContainer = ({ children, style }: Props) => {
  return <View style={[IS_WEB && styles.web, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  web: {
    width: "100%",
    maxWidth: WEB_MAX_WIDTH,
    alignSelf: "center",
    paddingHorizontal: WEB_GUTTER,
  },
});
