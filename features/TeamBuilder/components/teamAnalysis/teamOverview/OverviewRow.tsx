import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import { TeamOverviewRowTextData } from "../../../../../constants/strings";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { HintButton } from "../../../../../shared/ui/HintButton";

type Props = {
  style?: ViewStyle | ViewStyle[];
  texts: TeamOverviewRowTextData;
  textStyle: TextStyle;
};

export const OverviewRow = ({ style, texts, textStyle }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons style={[textStyle]} name="catching-pokemon" size={21} />
      <View style={styles.textContainer}>
        <Subtitle style={[textStyle, styles.mainTextStyle]}>{texts.mainText}</Subtitle>
        <Subtitle style={[textStyle, styles.subTextStyle]}>{texts.subText}</Subtitle>
      </View>
      <View style={styles.hintContainer}>
        <HintButton hintText={texts.hintText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 18,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minWidth: 0,
  },
  mainTextStyle: {
    fontSize: 14,
    textAlign: "left",
    flexShrink: 1,
  },
  subTextStyle: {
    fontSize: 12,
    opacity: 0.8,
    flexShrink: 1,
    textAlign: "left",
  },
  hintContainer: {
    marginLeft: "auto", // ⭐ dociska hint do prawej ściany
    flexShrink: 0, // hint nigdy się nie ściska
  },
});
