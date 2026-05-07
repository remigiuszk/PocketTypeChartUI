import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useMemo } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

import {
  TEXT_MUTED,
  TEXT_STRENGHTS,
  TEXT_SUGGESTIONS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import { BodyText } from "../../../../../../shared/typohraphy/BodyText";
import { ValueText } from "../../../../../../shared/typohraphy/ValueText";
import { HintButton } from "../../../../../../shared/ui/HintButton";
import {
  OverviewRowData,
  OverviewRowSeverity,
  OverviewRowType,
} from "../../../../services/overviewRows/types";
import { OverviewRowBadge } from "./OverviewRowBadge";

type Props = {
  style?: ViewStyle | ViewStyle[];
  rowData: OverviewRowData;
};

export const OverviewRow = ({ style, rowData }: Props) => {
  const progressBarEnabled = !!rowData.progressBarActual && !!rowData.progressBarTotal;

  const accentColor = useMemo(() => {
    if (rowData.type === OverviewRowType.Suggestion) return TEXT_SUGGESTIONS;
    if (rowData.type === OverviewRowType.Strength) return TEXT_STRENGHTS;
    return rowData.severity === OverviewRowSeverity.High
      ? TEXT_WEAKNESSES_CRITICAL
      : TEXT_WEAKNESSES_WEAK;
  }, [rowData]);

  const hintIcon = useMemo(() => {
    if (rowData.type === OverviewRowType.Strength)
      return <FontAwesome6 name="star" size={18} color={TEXT_STRENGHTS} />;
    switch (rowData.severity) {
      case OverviewRowSeverity.High:
        return <Feather name="alert-triangle" size={18} color={TEXT_WEAKNESSES_CRITICAL} />;
      case OverviewRowSeverity.Medium:
        return <AntDesign name="exclamation-circle" size={18} color={TEXT_WEAKNESSES_WEAK} />;
      default:
        return <AntDesign name="info-circle" size={18} color={TEXT_SUGGESTIONS} />;
    }
  }, [rowData]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.badgeContainer}>
        <OverviewRowBadge rowData={rowData} />
      </View>

      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <ValueText style={{ textAlign: "left", fontSize: 14 }}>
            {rowData.header}
          </ValueText>
          {rowData.leadType && (
            <View style={[styles.leadTypeContainer]}>
              <Image
                style={styles.typeImage}
                source={{ uri: rowData.leadType!.sprite }}
              />
            </View>
          )}
          <View style={styles.hintContainer}>
            <HintButton
              title={rowData.header}
              leadType={rowData.leadType}
              hintText={rowData.hintText}
              accentColor={accentColor}
              icon={hintIcon}
              suggestedTypes={rowData.suggestedTypes}
            />
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
                    backgroundColor: accentColor,
                  },
                ]}
              />
            </View>
            <ValueText style={{ color: accentColor }}>
              {rowData.progressBarActual!} / {rowData.progressBarTotal!}
            </ValueText>
          </View>
        )}
        <BodyText style={{ textAlign: "left", marginRight: 15, color: TEXT_MUTED }}>
          {rowData.subText}
        </BodyText>
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
    borderRadius: 6,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
