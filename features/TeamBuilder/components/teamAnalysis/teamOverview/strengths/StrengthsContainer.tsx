import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_STRENGTHS,
  BORDER_STRENGTHS,
  TEXT_STRENGTHS,
} from "../../../../../../constants";
import { IS_WEB } from "../../../../../../shared/layout/platform";
import { Subtitle } from "../../../../../../shared/typohraphy/Subtitle";
import { OverviewRowData } from "../../../../services/overviewRows/types";
import { OverviewRow } from "../overviewRow/OverviewRow";

type Props = {
  style?: ViewStyle | ViewStyle[];
  strengthRowData: OverviewRowData[];
};

export const StrengthsContainer = ({ style, strengthRowData }: Props) => {
  return (
    <View style={[styles.card, IS_WEB && styles.cardWeb, style]}>
      <View style={[styles.headerContainer]}>
        <View style={[styles.textContainer]}>
          <MaterialIcons style={[styles.header]} name="catching-pokemon" size={32} />
          <Subtitle style={styles.header}>STRENGTHS</Subtitle>
        </View>
      </View>
      <View style={styles.content}>
        {strengthRowData.map((rowData, index) => (
          <View key={index}>
            <OverviewRow rowData={rowData} />
            {index < strengthRowData.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: BG_STRENGTHS,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER_STRENGTHS,
    flex: 1,
  },
  // On web the page scrolls (no bounded height); flex:1 collapses the card.
  cardWeb: { flexGrow: 0, flexShrink: 0, flexBasis: "auto" },
  separator: {
    height: 1,
    backgroundColor: BORDER_STRENGTHS,
    marginVertical: 6,
    marginHorizontal: 8,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: BORDER_STRENGTHS,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    padding: 12,
  },
  header: {
    color: TEXT_STRENGTHS,
    fontSize: 16,
    fontWeight: 800,
  },
  content: { margin: 6 },
});