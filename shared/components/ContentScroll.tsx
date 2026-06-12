import { ScrollView, ScrollViewProps, View } from "react-native";

import { IS_WEB } from "../layout/platform";

// On native this is a ScrollView so inner regions scroll within the fixed shell.
// On web the whole page scrolls (see Screen), so we render a plain View here to
// avoid a nested scroll container that would trap the wheel/scrollbar.
export const ContentScroll = ({ children, style, ...rest }: ScrollViewProps) => {
  if (IS_WEB) {
    return <View style={style}>{children}</View>;
  }
  return (
    <ScrollView style={style} {...rest}>
      {children}
    </ScrollView>
  );
};
