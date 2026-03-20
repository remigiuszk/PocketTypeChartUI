import { StyleProp, Text, TextStyle } from "react-native";

import { TEXT_300 } from "../../constants/colors";
import { FONT_SIZE, FONTS } from "../../constants/typography";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const ValueText = ({ children, style }: Props) => (
  <Text
    style={[{ fontFamily: FONTS.medium, fontSize: FONT_SIZE.sm, color: TEXT_300 }, style]}
  >
    {children}
  </Text>
);
