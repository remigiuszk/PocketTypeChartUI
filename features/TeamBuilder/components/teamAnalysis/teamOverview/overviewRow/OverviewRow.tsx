import { useMemo } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

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
      <View style={styles.badgeContainer}>
        <OverviewRowBadge rowData={rowData} />
      </View>

      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Subtitle style={styles.header}>{rowData.header}</Subtitle>
          {rowData.leadType && (
            <View style={[styles.leadTypeContainer]}>
              <Image
                style={styles.typeImage}
                source={{ uri: rowData.leadType!.sprite }}
              />
            </View>
          )}
          <View style={styles.hintContainer}>
            <HintButton hintText={rowData.hintText}></HintButton>
          </View>
        </View>
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
        <Subtitle style={styles.subText}>{rowData.subText}</Subtitle>
        {!!rowData.suggestedTypes && (
          <View>
            <OverviewRowSuggestedTypes rowData={rowData}></OverviewRowSuggestedTypes>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    flex: 1,
  },
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  hintContainer: {
    marginLeft: "auto",
  },
  content: {
    flexDirection: "column",
    flex: 1,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: "#2a2a3a",
    borderRadius: 6,
  },
  thumb: {
    height: 6,
    backgroundColor: "#e24b4a",
    borderRadius: 6,
  },
  progressBarText: {
    fontWeight: "bold",
    letterSpacing: 0.05,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    color: TEXT_300,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Inter_500Regular",
  },
  subText: {
    textAlign: "left",
    marginRight: 15,
    fontSize: 12,
  },
  leadTypeContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: 4,
    height: 18,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    aspectRatio: 200 / 44,
  },
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
