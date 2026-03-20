import { StyleProp, Text, TextStyle } from "react-native";

import { TEXT_500 } from "../../constants/colors";
import { FONT_SIZE, FONTS } from "../../constants/typography";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const DisplayHeader = ({ children, style }: Props) => (
  <Text
    style={[{ fontFamily: FONTS.light, fontSize: FONT_SIZE.xxl, color: TEXT_500 }, style]}
  >
    {children}
  </Text>
);
