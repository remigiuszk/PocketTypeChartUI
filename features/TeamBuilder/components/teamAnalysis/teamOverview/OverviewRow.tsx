import { useMemo, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  TEXT_STRENGHTS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import {
  OverviewRowData,
  OverviewRowSeverity,
  OverviewRowType,
} from "../../../services/overviewRows/types";

type Props = {
  style?: ViewStyle | ViewStyle[];
  rowData: OverviewRowData;
};

export const OverviewRow = ({ style, rowData }: Props) => {
  const progressBarEnabled = useState<boolean>(
    !!rowData.progressBarActual && !!rowData.progressBarTotal,
  );
  const color: string = useMemo(() => {
    if (rowData.type === OverviewRowType.Weakness) {
      return rowData.severity === OverviewRowSeverity.High
        ? TEXT_WEAKNESSES_CRITICAL
        : TEXT_WEAKNESSES_WEAK;
    } else return TEXT_STRENGHTS;
  }, [rowData]);

  return (
    <View style={[styles.container, style]}>
      {!progressBarEnabled && <View style={styles.badge}></View>}
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
      </View>
      <View style={styles.hintContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  hintContainer: {},
  badge: {},
  content: { flexDirection: "column" },
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
  header: {},
  subText: {},
});
