import { StyleProp, Text, TextStyle } from "react-native";

import { TEXT_MUTED } from "../../constants/colors";
import { FONT_SIZE, FONTS } from "../../constants/typography";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const MutedText = ({ children, style }: Props) => (
  <Text
    style={[
      { fontFamily: FONTS.light, fontSize: FONT_SIZE.sm, color: TEXT_MUTED },
      style,
    ]}
  >
    {children}
  </Text>
);
