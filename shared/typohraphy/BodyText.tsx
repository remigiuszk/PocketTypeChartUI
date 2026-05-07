import { StyleProp, Text, TextStyle } from "react-native";

import { TEXT_300 } from "../../constants/colors";
import { FONT_SIZE, FONTS } from "../../constants/typography";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const BodyText = ({ children, style }: Props) => (
  <Text
    style={[{ fontFamily: FONTS.light, fontSize: FONT_SIZE.md, color: TEXT_300 }, style]}
  >
    {children}
  </Text>
);
