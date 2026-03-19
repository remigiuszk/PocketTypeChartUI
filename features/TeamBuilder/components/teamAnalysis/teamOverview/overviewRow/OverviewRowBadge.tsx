import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import {
  BG_WEAKNESS_WEAK_BADGE,
  BORDER_STRENGHTS,
  BORDER_SUGGESTIONS,
  BORDER_WEAKNESSES,
  TEXT_STRENGHTS,
  TEXT_SUGGESTIONS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import {
  OverviewRowData,
  OverviewRowSeverity,
  OverviewRowType,
} from "../../../../services/overviewRows/types";

type Props = {
  rowData: OverviewRowData;
};

export const OverviewRowBadge = ({ rowData }: Props) => {
  if (rowData.type === OverviewRowType.Strength) {
    return (
      <View style={[styles.badge, styles.badgeStrength]}>
        <FontAwesome6 name="star" size={14} color={TEXT_STRENGHTS} />
      </View>
    );
  }
  switch (rowData.severity) {
    case OverviewRowSeverity.High:
      return (
        <View style={[styles.badge, styles.badgeCritical]}>
          <Feather name="alert-triangle" size={18} color={TEXT_WEAKNESSES_CRITICAL} />
        </View>
      );
    case OverviewRowSeverity.Medium:
      return (
        <View style={[styles.badge, styles.badgeWeak]}>
          <AntDesign name="exclamation-circle" size={18} color={TEXT_WEAKNESSES_WEAK} />
        </View>
      );
    case OverviewRowSeverity.Low:
      return (
        <View style={[styles.badge, styles.badgeSuggestion]}>
          <AntDesign name="info-circle" size={18} color={TEXT_SUGGESTIONS} />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1 / 1,
  },
  badgeCritical: { borderColor: BORDER_WEAKNESSES },
  badgeWeak: { backgroundColor: BG_WEAKNESS_WEAK_BADGE },
  badgeStrength: { borderColor: BORDER_STRENGHTS },
  badgeSuggestion: { borderColor: BORDER_SUGGESTIONS },
});
