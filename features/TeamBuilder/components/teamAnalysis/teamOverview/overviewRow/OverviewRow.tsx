import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import {
  ACCENT,
  BG_INTERNAL,
  BORDER_DEFAULT,
  TEXT_MUTED,
  TEXT_STRENGTHS,
  TEXT_SUGGESTIONS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import { BodyText } from "../../../../../../shared/typohraphy/BodyText";
import { ValueText } from "../../../../../../shared/typohraphy/ValueText";
import { BreakdownSection, HintButton } from "../../../../../../shared/ui/HintButton";
import {
  MemberResistanceBreakdown,
  OverviewRowData,
  OverviewRowSeverity,
  OverviewRowType,
} from "../../../../services/overviewRows/types";
import { OverviewRowBadge } from "./OverviewRowBadge";
import {
  MemberBreakdownItem,
  ResistanceBreakdownSection,
} from "./ResistanceBreakdownSection";

function toBreakdownItems(
  breakdown: MemberResistanceBreakdown[] | undefined,
): MemberBreakdownItem[] | undefined {
  if (!breakdown?.length) return undefined;
  return breakdown.map(({ member, resistedTypes }) => {
    const worstResist = resistedTypes.reduce((a, b) =>
      a.multiplier <= b.multiplier ? a : b,
    );
    const defendingTypes = resistedTypes
      .map((r) => r.defendingType)
      .filter((t, i, arr) => arr.findIndex((x) => x.id === t.id) === i);
    return {
      id: member.id,
      name: member.name,
      types: member.types,
      iconId: member.iconId,
      iconColor: member.iconColor,
      resistedTypeIds: resistedTypes.map((r) => r.type.id),
      multiplier: worstResist.multiplier,
      defendingTypes,
    };
  });
}

type Props = {
  style?: ViewStyle | ViewStyle[];
  rowData: OverviewRowData;
};

export const OverviewRow = ({ style, rowData }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const breakdownItems = toBreakdownItems(rowData.memberResistanceBreakdown);
  const breakdownSection: BreakdownSection | undefined = breakdownItems
    ? {
        label: "Per member breakdown",
        content: <ResistanceBreakdownSection items={breakdownItems} />,
      }
    : undefined;

  const isCollapsible = !!rowData.collapsible;
  const progressBarEnabled = !!rowData.progressBarActual && !!rowData.progressBarTotal;

  const showToggleButton =
    (isCollapsible &&
      ((rowData.leadType?.length ?? 0) > 0 || (rowData.typeList?.length ?? 0) > 0)) ||
    (rowData.suggestedTypes?.length ?? 0) > 0 ||
    (rowData.memberResistanceBreakdown?.length ?? 0) > 0;

  const accentColor = useMemo(() => {
    if (rowData.type === OverviewRowType.Suggestion) return TEXT_SUGGESTIONS;
    if (rowData.type === OverviewRowType.Strength) return TEXT_STRENGTHS;
    return rowData.severity === OverviewRowSeverity.High
      ? TEXT_WEAKNESSES_CRITICAL
      : TEXT_WEAKNESSES_WEAK;
  }, [rowData]);

  const hintIcon = useMemo(() => {
    if (rowData.type === OverviewRowType.Strength)
      return <FontAwesome6 name="star" size={18} color={TEXT_STRENGTHS} />;
    switch (rowData.severity) {
      case OverviewRowSeverity.High:
        return (
          <Feather name="alert-triangle" size={18} color={TEXT_WEAKNESSES_CRITICAL} />
        );
      case OverviewRowSeverity.Medium:
        return (
          <AntDesign name="exclamation-circle" size={18} color={TEXT_WEAKNESSES_WEAK} />
        );
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
          <View style={styles.headerContent}>
            <ValueText style={{ textAlign: "left", fontSize: 14 }}>
              {rowData.header}
            </ValueText>
            {!isCollapsible &&
              rowData.leadType &&
              rowData.leadType.map((type) => (
                <View key={type.id} style={styles.leadTypeContainer}>
                  <Image style={styles.typeImage} source={{ uri: type.sprite }} />
                </View>
              ))}
          </View>
          <View style={styles.hintContainer}>
            <HintButton
              title={rowData.header}
              leadType={rowData.leadType}
              hintText={rowData.hintText}
              accentColor={accentColor}
              icon={hintIcon}
              suggestedTypes={rowData.suggestedTypes}
              breakdown={breakdownSection}
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

        {isCollapsible ? (
          rowData.subText ? (
            <BodyText style={{ textAlign: "left", marginRight: 15, color: TEXT_MUTED }}>
              {rowData.subText}
            </BodyText>
          ) : null
        ) : rowData.typeList && rowData.typeList.length > 0 ? (
          <View style={styles.typeListRow}>
            <BodyText style={{ color: TEXT_MUTED }}>{rowData.subText}</BodyText>
            {rowData.typeList.map((type) => (
              <View key={type.id} style={styles.typeListBadge}>
                <Image style={styles.typeImage} source={{ uri: type.sprite }} />
              </View>
            ))}
          </View>
        ) : (
          <BodyText style={{ textAlign: "left", marginRight: 15, color: TEXT_MUTED }}>
            {rowData.subText}
          </BodyText>
        )}

        {showToggleButton && (
          <Pressable
            onPress={() => setExpanded((e) => !e)}
            style={({ pressed }) => [
              styles.toggleBtn,
              pressed && styles.toggleBtnPressed,
            ]}
          >
            <Text style={styles.toggleBtnText}>
              {expanded ? "Hide potential fix" : "View potential fix"}
            </Text>
          </Pressable>
        )}

        {expanded && (
          <View style={styles.expandedSection}>
            {isCollapsible && rowData.collapsibleLabel && (
              <View>
                <Text style={styles.expandedLabel}>{rowData.collapsibleLabel}</Text>
                <View style={styles.spriteRow}>
                  {(rowData.leadType ?? rowData.typeList ?? []).map((type) => (
                    <View key={type.id} style={styles.typeListBadge}>
                      <Image style={styles.typeImage} source={{ uri: type.sprite }} />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {breakdownItems && (
              <View>
                <Text style={styles.expandedLabel}>Per member breakdown</Text>
                <ResistanceBreakdownSection items={breakdownItems} />
              </View>
            )}

            {(rowData.suggestedTypes?.length ?? 0) > 0 && (
              <View>
                <Text style={styles.expandedLabel}>Consider adding:</Text>
                <View style={styles.spriteRow}>
                  {rowData.suggestedTypes!.map((type) => (
                    <View key={type.id} style={styles.typeListBadge}>
                      <Image style={styles.typeImage} source={{ uri: type.sprite }} />
                    </View>
                  ))}
                </View>
              </View>
            )}
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
    alignSelf: "center",
  },
  hintContainer: {
    marginLeft: "auto",
  },
  content: {
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
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
    alignItems: "flex-start",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },
  typeListRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },
  typeListBadge: {
    height: 18,
    aspectRatio: 200 / 44,
    borderRadius: 5,
    overflow: "hidden",
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
  toggleBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: BG_INTERNAL,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
  },
  toggleBtnPressed: {
    opacity: 0.7,
  },
  toggleBtnText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: ACCENT,
  },
  expandedSection: {
    marginTop: 10,
    gap: 10,
  },
  expandedLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: TEXT_MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 6,
  },
  spriteRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
});
