import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_SUGGESTIONS,
  BORDER_SUGGESTIONS,
  TEXT_SUGGESTIONS,
} from "../../../../../../constants";
import { Subtitle } from "../../../../../../shared/typohraphy/Subtitle";
import { OverviewRowData } from "../../../../services/overviewRows/types";
import { OverviewRow } from "../overviewRow/OverviewRow";

type Props = {
  style?: ViewStyle | ViewStyle[];
  suggestionRowData: OverviewRowData[];
};

export const SuggestionsContainer = ({ style, suggestionRowData }: Props) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.headerContainer]}>
        <View style={[styles.textContainer]}>
          <MaterialIcons style={[styles.header]} name="lightbulb" size={32} />
          <Subtitle style={styles.header}>SUGGESTIONS</Subtitle>
        </View>
      </View>
      <View style={styles.content}>
        {suggestionRowData.map((rowData, index) => (
          <View key={index}>
            <OverviewRow rowData={rowData} />
            {index < suggestionRowData.length - 1 && <View style={styles.separator} />}
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
    backgroundColor: BG_SUGGESTIONS,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER_SUGGESTIONS,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: BORDER_SUGGESTIONS,
    marginVertical: 6,
    marginHorizontal: 8,
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: BORDER_SUGGESTIONS,
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
    color: TEXT_SUGGESTIONS,
    fontSize: 16,
    fontWeight: 800,
  },
  content: { margin: 6 },
});
