import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_WEAKNESSES,
  BORDER_WEAKNESSES,
  PADDING,
  TEXT_WEAKNESSES_CRITICAL,
} from "../../../../../../constants";
import { Subtitle } from "../../../../../../shared/typohraphy/Subtitle";
import { OverviewRowData } from "../../../../services/overviewRows/types";
import { OverviewRow } from "../overviewRow/OverviewRow";

type Props = {
  style?: ViewStyle | ViewStyle[];
  weaknessRowData: OverviewRowData[];
};

export const WeaknessesContainer = ({ style, weaknessRowData }: Props) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.headerContainer]}>
        <View style={[styles.textContainer]}>
          <MaterialIcons style={[styles.header]} name="catching-pokemon" size={21} />
          <Subtitle style={styles.header}>WEAKNESSES</Subtitle>
        </View>
      </View>
      <View style={styles.content}>
        {weaknessRowData.map((rowData, index) => (
          <OverviewRow rowData={rowData} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: BG_WEAKNESSES,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER_WEAKNESSES,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: BORDER_WEAKNESSES,
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
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
  header: {
    color: TEXT_WEAKNESSES_CRITICAL,
    fontSize: 16,
    fontWeight: 800,
  },
  content: { margin: 8 },
});
