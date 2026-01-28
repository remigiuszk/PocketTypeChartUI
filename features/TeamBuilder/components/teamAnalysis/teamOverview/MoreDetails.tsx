import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { BG_800, BORDER_100, PADDING, TEXT_300 } from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const MoreDetails = ({ style }: Props) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button}>
        <AntDesign name="down" size={24} color={TEXT_300} />
        <Subtitle style={styles.textStyle}>More details</Subtitle>
      </Pressable>
      <View style={styles.detailsContainer}>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
        <Subtitle style={styles.textStyle}>TEST</Subtitle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
    justifyContent: "center",
    alignItems: "flex-start",
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
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: BG_800,
  },
});
