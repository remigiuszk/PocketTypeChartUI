import { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  TEXT_300,
  TEXT_STRENGHTS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import { Subtitle } from "../../../../../../shared/typohraphy/Subtitle";
import { HintButton } from "../../../../../../shared/ui/HintButton";
import {
  OverviewRowData,
  OverviewRowSeverity,
  OverviewRowType,
} from "../../../../services/overviewRows/types";
import { OverviewRowBadge } from "./OverviewRowBadge";
import { OverviewRowSuggestedTypes } from "./OverviewRowSuggestedTypes";

type Props = {
  style?: ViewStyle | ViewStyle[];
  rowData: OverviewRowData;
};

export const OverviewRow = ({ style, rowData }: Props) => {
  const progressBarEnabled = !!rowData.progressBarActual && !!rowData.progressBarTotal;
  const color: string = useMemo(() => {
    if (rowData.type === OverviewRowType.Weakness) {
      return rowData.severity === OverviewRowSeverity.High
        ? TEXT_WEAKNESSES_CRITICAL
        : TEXT_WEAKNESSES_WEAK;
    } else return TEXT_STRENGHTS;
  }, [rowData]);

  return (
    <View style={[styles.container, style]}>
      {!progressBarEnabled && (
        <View style={styles.badgeContainer}>
          <OverviewRowBadge rowData={rowData} />
        </View>
      )}
      <View style={styles.content}>
        {progressBarEnabled && (
          <View style={styles.progressBarContainer}>
            <View style={styles.track}>
              <View
                style={[
                  styles.thumb,
                  {
                    width: `${(rowData.progressBarActual! / rowData.progressBarTotal!) * 100}%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
            <Subtitle style={[styles.progressBarText, { color: color }]}>
              {rowData.progressBarActual!} / {rowData.progressBarTotal!}
            </Subtitle>
          </View>
        )}
        <Subtitle style={styles.header}>{rowData.header}</Subtitle>
        <Subtitle style={styles.subText}>{rowData.subText}</Subtitle>
        {!!rowData.suggestedTypes && (
          <View style={styles.suggestedTypes}>
            <OverviewRowSuggestedTypes rowData={rowData}></OverviewRowSuggestedTypes>
          </View>
        )}
      </View>
      <View style={styles.hintContainer}>
        <HintButton hintText={rowData.hintText}></HintButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  badgeContainer: { justifyContent: "center", alignItems: "center", height: "100%" },
  hintContainer: {},
  content: { flexDirection: "column", flex: 1 },
  progressBarContainer: { flexDirection: "row" },
  track: {
    flex: 1,
    height: 5,
    backgroundColor: "#2a2a3a",
    borderRadius: 4,
  },
  thumb: {
    height: 5,
    backgroundColor: "#e24b4a",
    borderRadius: 4,
  },
  progressBarText: {},
  header: { color: TEXT_300, fontSize: 14, textAlign: "left" },
  subText: { textAlign: "left" },
  suggestedTypes: {},
});
