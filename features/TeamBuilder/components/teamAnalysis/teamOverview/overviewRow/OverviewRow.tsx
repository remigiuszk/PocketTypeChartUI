import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import {
  ACCENT,
  BG_STRENGTHS,
  TEXT_300,
  TEXT_MUTED,
  TEXT_STRENGTHS,
  TEXT_SUGGESTIONS,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import { typeImageSize } from "../../../../../../shared/layout/platform";
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
  return breakdown.flatMap(({ member, resistedTypes }) => {
    const groups = new Map<string, typeof resistedTypes>();
    for (const resisted of resistedTypes) {
      const key = `${resisted.multiplier}-${resisted.defendingType.id}`;
      const existing = groups.get(key) ?? [];
      groups.set(key, [...existing, resisted]);
    }

    return Array.from(groups.values())
      .sort((a, b) => a[0].multiplier - b[0].multiplier)
      .map((types) => {
        const { multiplier, defendingType } = types[0];
        return {
          id: `${member.id}-${multiplier}-${defendingType.id}`,
          name: member.name,
          types: member.types,
          iconId: member.iconId,
          iconColor: member.iconColor,
          resistedTypeIds: types.map((r) => r.type.id),
          multiplier,
          defendingTypes: [defendingType],
        };
      });
  });
}

const SectionLabel = ({ text, color }: { text: string; color: string }) => (
  <View style={styles.labelRow}>
    <View style={[styles.labelDot, { backgroundColor: color }]} />
    <Text style={styles.labelText}>{text}</Text>
  </View>
);

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

  const bestSuggested =
    rowData.suggestedTypes?.filter((type) =>
      rowData.bestSuggestedTypeIds?.includes(type.id),
    ) ?? [];
  const otherSuggested =
    rowData.suggestedTypes?.filter(
      (type) => !rowData.bestSuggestedTypeIds?.includes(type.id),
    ) ?? [];
  const hasBestSuggestion = bestSuggested.length > 0;

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
            <ValueText style={{ textAlign: "left", fontSize: 18, marginRight: 10 }}>
              {rowData.header}
            </ValueText>
            {!isCollapsible && rowData.leadType && rowData.leadType.length > 0 && (
              <View style={styles.leadTypeGroup}>
                {rowData.leadType.map((type) => (
                  <View key={type.id} style={styles.leadTypeContainer}>
                    <Image style={styles.typeImage} source={{ uri: type.sprite }} />
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.hintContainer}>
            <HintButton
              title={rowData.header}
              leadType={!isCollapsible ? rowData.leadType : undefined}
              typeList={isCollapsible ? (rowData.leadType ?? rowData.typeList) : undefined}
              typeListLabel={rowData.collapsibleLabel}
              hintText={rowData.hintText}
              accentColor={accentColor}
              icon={hintIcon}
              suggestedTypes={rowData.suggestedTypes}
              bestSuggestedTypeIds={rowData.bestSuggestedTypeIds}
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
            <ValueText style={{ color: accentColor, fontSize: 16 }}>
              {rowData.progressBarActual!} / {rowData.progressBarTotal!}
            </ValueText>
          </View>
        )}

        {isCollapsible ? (
          rowData.subText ? (
            <BodyText
              style={{ textAlign: "left", marginRight: 15, color: TEXT_MUTED, fontSize: 16 }}
            >
              {rowData.subText}
            </BodyText>
          ) : null
        ) : rowData.typeList && rowData.typeList.length > 0 ? (
          <View style={styles.typeListRow}>
            <BodyText style={{ color: TEXT_MUTED, fontSize: 16 }}>
              {rowData.subText}
            </BodyText>
            {rowData.typeList.map((type) => (
              <View key={type.id} style={styles.typeListBadge}>
                <Image style={styles.typeImage} source={{ uri: type.sprite }} />
              </View>
            ))}
          </View>
        ) : (
          <BodyText
            style={{ textAlign: "left", marginRight: 15, color: TEXT_MUTED, fontSize: 16 }}
          >
            {rowData.subText}
          </BodyText>
        )}

        {showToggleButton && (
          <Pressable
            onPress={() => setExpanded((e) => !e)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => [
              styles.toggleBtn,
              pressed && styles.toggleBtnPressed,
            ]}
          >
            <Feather name={expanded ? "eye-off" : "eye"} size={16} color={ACCENT} />
            <Text style={styles.toggleBtnText}>
              {expanded ? "Hide potential fix" : "View potential fix"}
            </Text>
          </Pressable>
        )}

        {expanded && (
          <View style={styles.expandedSection}>
            {isCollapsible && rowData.collapsibleLabel && (
              <View>
                <SectionLabel text={rowData.collapsibleLabel} color={accentColor} />
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
                <SectionLabel text="Per member breakdown" color={accentColor} />
                <ResistanceBreakdownSection items={breakdownItems} />
              </View>
            )}

            {(rowData.suggestedTypes?.length ?? 0) > 0 && (
              <View>
                <SectionLabel text="Consider adding:" color={TEXT_SUGGESTIONS} />
                <View
                  style={[
                    styles.spriteRow,
                    hasBestSuggestion && styles.suggestedTypesRow,
                  ]}
                >
                  {bestSuggested.length > 0 && (
                    <View style={styles.bestGroup}>
                      <View style={styles.bestFrame} />
                      <Text style={styles.bestLabel} numberOfLines={1}>
                        Best coverage
                      </Text>
                      <View style={styles.bestGroupRow}>
                        {bestSuggested.map((type) => (
                          <View key={type.id} style={styles.suggestedTypeBadge}>
                            <Image
                              style={styles.typeImage}
                              source={{ uri: type.sprite }}
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  {otherSuggested.map((type) => (
                    <View key={type.id} style={styles.suggestedTypeBadge}>
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
    gap: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 3,
  },
  typeListRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },
  typeListBadge: {
    width: typeImageSize(21) * (200 / 44),
    height: typeImageSize(21),
    borderRadius: 5,
    overflow: "hidden",
  },
  suggestedTypeBadge: {
    width: typeImageSize(21) * (200 / 44),
    height: typeImageSize(21),
    borderRadius: 5,
    overflow: "hidden",
  },
  leadTypeGroup: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: 5,
  },
  leadTypeContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: 5,
    height: typeImageSize(21),
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
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 6,
  },
  toggleBtnPressed: {
    opacity: 0.7,
  },
  toggleBtnText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: ACCENT,
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(126, 184, 247, 0.45)",
    paddingBottom: 2,
  },
  expandedSection: {
    marginTop: 10,
    gap: 10,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 9,
  },
  labelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  labelText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_300,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  spriteRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 5,
  },
  suggestedTypesRow: {
    paddingTop: 24,
  },
  bestGroup: {
    position: "relative",
  },
  bestGroupRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    gap: 5,
  },
  bestFrame: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderWidth: 1.5,
    borderColor: TEXT_STRENGTHS,
    borderRadius: 7,
    backgroundColor: BG_STRENGTHS,
  },
  bestLabel: {
    position: "absolute",
    top: -21,
    left: -30,
    right: -30,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_STRENGTHS,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});
