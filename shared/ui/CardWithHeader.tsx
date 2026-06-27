import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import {
  BG_CARD,
  BORDER_DEFAULT,
  BORDER_INTERNAL,
  PADDING,
  TEXT_300,
} from "../../constants";
import { DisplayHeader } from "../typohraphy/DisplayHeader";
import { MutedText } from "../typohraphy/MutedText";

type CardProps = {
  title: string;
  subtitle?: string;
  iconName?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const CardWithHeader = ({
  title,
  subtitle,
  iconName,
  children,
  style,
  titleStyle,
}: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View
        style={[
          styles.headerContainer,
          iconName !== undefined
            ? { alignItems: "flex-start" }
            : { alignItems: "center" },
        ]}
      >
        <View style={styles.titleContainer}>
          {iconName === "shield" ? (
            <FontAwesome name="shield" size={36} color={TEXT_300} />
          ) : iconName === "sword" ? (
            <MaterialCommunityIcons name="sword" size={36} color={TEXT_300} />
          ) : null}
          <View
            style={[
              styles.textContainer,
              iconName !== undefined
                ? { alignItems: "flex-start" }
                : { alignItems: "center" },
            ]}
          >
            <DisplayHeader style={titleStyle}>{title}</DisplayHeader>
            {subtitle && <MutedText>{subtitle}</MutedText>}
          </View>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: BG_CARD,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: BORDER_INTERNAL,
    backgroundColor: BG_CARD,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    padding: PADDING / 2,
    paddingHorizontal: PADDING,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  content: { margin: 8, backgroundColor: BG_CARD },
});
