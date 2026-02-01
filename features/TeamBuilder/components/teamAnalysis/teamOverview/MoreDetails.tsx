import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import {
  BORDER_100,
  MORE_DETAILS_IMMUNITIES,
  MORE_DETAILS_NO_EFF,
  MORE_DETAILS_NOT_VERY_EFF,
  MORE_DETAILS_RESISTANCES,
  MORE_DETAILS_SUPER_EFF,
  MORE_DETAILS_VULN,
  PADDING,
  TEXT_300,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { DetailsRow } from "./details/DetailsRow";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const MoreDetails = ({ style }: Props) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => setShowDetails(!showDetails)} style={styles.button}>
        {showDetails ? (
          <AntDesign name="up" size={18} color={TEXT_300} />
        ) : (
          <AntDesign name="down" size={18} color={TEXT_300} />
        )}
        <Subtitle style={styles.textStyle}>More details</Subtitle>
      </Pressable>
      {showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.subContainerL}>
            <Subtitle style={styles.textStyle}>Defence</Subtitle>
            <DetailsRow text={MORE_DETAILS_VULN} hintText="text" value={4}></DetailsRow>
            <DetailsRow
              text={MORE_DETAILS_RESISTANCES}
              hintText="text"
              value={12}
            ></DetailsRow>
            <DetailsRow
              text={MORE_DETAILS_IMMUNITIES}
              hintText="text"
              value={1}
            ></DetailsRow>
          </View>
          <View style={styles.subContainer}>
            <Subtitle style={styles.textStyle}>Offence</Subtitle>
            <DetailsRow
              text={MORE_DETAILS_SUPER_EFF}
              hintText="text"
              value={4}
            ></DetailsRow>
            <DetailsRow
              text={MORE_DETAILS_NOT_VERY_EFF}
              hintText="text"
              value={12}
            ></DetailsRow>
            <DetailsRow text={MORE_DETAILS_NO_EFF} hintText="text" value={1}></DetailsRow>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 12,
    borderWidth: 1,
    borderColor: BORDER_100,
    padding: PADDING,
    borderRadius: 8,
  },
  textStyle: {
    color: TEXT_300,
    fontSize: 20,
    textTransform: "uppercase",
  },
  detailsContainer: {
    width: "100%",
    flexDirection: "row",
  },
  subContainerL: {
    flexDirection: "column",
    gap: 8,
    width: "50%",
    borderRightColor: BORDER_100,
    borderRightWidth: 1,
    paddingHorizontal: 6,
  },
  subContainer: {
    flexDirection: "column",
    gap: 8,
    width: "50%",
    paddingHorizontal: 6,
  },
});
