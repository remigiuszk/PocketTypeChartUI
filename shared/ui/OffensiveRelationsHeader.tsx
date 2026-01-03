import { StyleSheet, View } from "react-native";
import { TEXT_100, WARNING } from "../../constants";
import Feather from "@expo/vector-icons/Feather";
import { Subtitle } from "../typohraphy/Subtitle";

type Props = {
  multiplier: number;
};

export const OffensiveRelationsHeader = ({ multiplier }: Props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.headerContainer]}>
        <View style={styles.titleContainer}>
          {multiplier == 2 || multiplier == 4 ? (
            <Feather name="chevrons-up" size={36} color="lightgreen" />
          ) : multiplier == 0.5 || multiplier == 0.25 ? (
            <Feather name="chevrons-down" size={36} color={WARNING} />
          ) : multiplier == 0 ? (
            <Feather name="shield-off" size={36} color="lightblue" />
          ) : null}
          {multiplier == 2 || multiplier == 4 ? (
            <View style={[styles.textContainer]}>
              <View style={styles.headerContainer}>
                <Subtitle style={styles.titleTextStyle}>SUPER EFFECTIVE AGAINST: </Subtitle>
                <Subtitle style={styles.subTitileTextStyle}>(2x)</Subtitle>
              </View>
            </View>
          ) : multiplier == 0.5 || multiplier == 0.25 ? (
            <View style={[styles.textContainer]}>
              <View style={styles.headerContainer}>
                <Subtitle style={styles.titleTextStyle}>NOT VERY EFFECTIVE AGAINST: </Subtitle>
                <Subtitle style={styles.subTitileTextStyle}>
                  (0.5x)
                </Subtitle>
              </View>
            </View>
          ) : multiplier == 0 ? (
            <View style={[styles.textContainer]}>
              <View style={styles.headerContainer}>
                <Subtitle style={styles.titleTextStyle}>NOT EFFECTIVE AGAINST: </Subtitle>
                <Subtitle style={styles.subTitileTextStyle}>(0x)</Subtitle>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 8,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  titleTextStyle: {
    fontSize: 16,
    color: TEXT_100,
    fontWeight: 200,
  },
  subTitileTextStyle: {
    fontSize: 10,
  },
});
