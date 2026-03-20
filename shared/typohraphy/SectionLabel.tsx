// shared/typography/SectionLabel.tsx
import { StyleProp, Text, TextStyle } from "react-native";

import { TEXT_100 } from "../../constants/colors";
import { FONT_SIZE, FONTS } from "../../constants/typography";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const SectionLabel = ({ children, style }: Props) => (
  <Text
    style={[
      {
        fontFamily: FONTS.regular,
        fontSize: FONT_SIZE.xs,
        color: TEXT_100,
        letterSpacing: 1.5,
        textTransform: "uppercase",
      },
      style,
    ]}
  >
    {children}
  </Text>
);
