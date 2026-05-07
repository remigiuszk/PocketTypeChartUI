import { StyleSheet, View, ViewStyle } from "react-native";

import { BORDER_100 } from "../../../../../../constants";
import { Subtitle } from "../../../../../../shared/typohraphy/Subtitle";
import { HintButton } from "../../../../../../shared/ui/HintButton";

type Props = {
  style?: ViewStyle | ViewStyle[];
  text: string;
  hintText: string;
  value: number | string;
};

export const DetailsRow = ({ style, text, hintText, value }: Props) => {
  return (
    <View style={[styles.rowContainer, style]}>
      <View style={styles.rowTextContainer}>
        <Subtitle style={styles.rowTextStyle}>{text}</Subtitle>
      </View>
      <View style={styles.hintContainer}>
        <Subtitle style={styles.resultTextStyle}>{value}</Subtitle>
        <HintButton hintText={hintText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    gap: 18,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 6,
    borderWidth: 1,
    borderColor: BORDER_100,
    borderRadius: 6,
  },
  rowTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minWidth: 0,
  },
  rowTextStyle: {
    fontSize: 16,
    flexShrink: 1,
    textAlign: "left",
    textAlignVertical: "top",
  },
  resultTextStyle: {
    fontSize: 20,
  },
  hintContainer: {
    marginLeft: "auto",
    flexShrink: 0,
    flexDirection: "column",
    gap: 4,
  },
});
