import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  ACCENT,
  BG_200,
  BG_500,
  BORDER_100,
  MARGIN_HORIZONTAL,
  PADDING,
  TEXT_100,
} from "../../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Title } from "../typohraphy/Title";
import { Subtitle } from "../typohraphy/Subtitle";

type CardProps = {
  title: string;
  subtitle: string;
  iconName?: string;
  children: any;
  style?: StyleProp<ViewStyle>;
};

export const CardWithHeader = ({
  title,
  subtitle,
  iconName,
  children,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.headerContainer,
          iconName !== undefined
            ? { alignItems: "flex-start" }
            : { alignItems: "center" },
        ]}
      >
        <View style={styles.titleContainer}>
          {iconName == "shield" ? (
            <FontAwesome name="shield" size={36} color={ACCENT} />
          ) : iconName == "sword" ? (
            <MaterialCommunityIcons name="sword" size={36} color={ACCENT} />
          ) : null}
          <View
            style={[
              styles.textContainer,
              iconName !== undefined
                ? { alignItems: "flex-start" }
                : { alignItems: "center" },
            ]}
          >
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
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
    backgroundColor: BG_500,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    padding: PADDING,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  content: {
    padding: PADDING,
    borderTopWidth: 1,
    borderTopColor: BORDER_100,
  },
});
