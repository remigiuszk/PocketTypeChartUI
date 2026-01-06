import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  BG_500,
  BG_600,
  BORDER_100,
  PADDING,
  TEXT_300,
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
  style,
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
          {iconName == "shield" ? (
            <FontAwesome name="shield" size={36} color={TEXT_300} />
          ) : iconName == "sword" ? (
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
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: BORDER_100,
    backgroundColor:BG_600,
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
  content: { padding: PADDING / 2 },
});
