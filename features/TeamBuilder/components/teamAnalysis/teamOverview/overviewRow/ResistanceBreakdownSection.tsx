import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import {
  BG_CARD,
  BG_WEAKNESS_WEAK,
  BG_WEAKNESSES,
  BORDER_INTERNAL,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
import { IS_WEB } from "../../../../../../shared/layout/platform";
import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { MemberPreview } from "../../membersPreview/MemberPreview";

export type MemberBreakdownItem = {
  id: string;
  name: string;
  types: PokeTypeModel[];
  iconId: string;
  iconColor: string;
  resistedTypeIds: number[];
  multiplier: number;
  defendingTypes: PokeTypeModel[];
};

type Props = {
  items: MemberBreakdownItem[];
};

// Below this width the web breakdown row's card + pill + defending-type badges
// no longer all fit on one line at their normal size, so they're shrunk down.
const WEB_COMPACT_BREAKPOINT = 480;

export const ResistanceBreakdownSection = ({ items }: Props) => {
  const { width } = useWindowDimensions();
  const isCompact = IS_WEB && width < WEB_COMPACT_BREAKPOINT;

  return (
    <View style={styles.list}>
      {items.map((item) => {
        const isCritical = item.multiplier <= 0.25 || item.multiplier >= 4;
        const pillColor = isCritical ? TEXT_WEAKNESSES_CRITICAL : TEXT_WEAKNESSES_WEAK;
        const pillBg = isCritical ? BG_WEAKNESSES : BG_WEAKNESS_WEAK;
        return (
          <ScrollView
            key={item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.rowScroll}
            contentContainerStyle={[
              styles.row,
              IS_WEB && styles.rowWeb,
              isCompact && styles.rowWebCompact,
            ]}
          >
            <MemberPreview
              style={
                IS_WEB
                  ? [styles.memberCard, styles.memberCardWeb, isCompact && styles.memberCardWebCompact]
                  : styles.memberCard
              }
              iconSize={IS_WEB ? (isCompact ? 18 : 26) : undefined}
              compact={IS_WEB && isCompact}
              member={{
                id: item.id,
                name: item.name,
                types: item.types,
                iconId: item.iconId,
                iconColor: item.iconColor,
              }}
              resistedTypeIds={item.resistedTypeIds}
            />
            <View
              style={[
                styles.pill,
                IS_WEB && styles.pillWeb,
                isCompact && styles.pillWebCompact,
                { borderColor: pillColor, backgroundColor: pillBg },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  isCompact && styles.pillTextCompact,
                  { color: pillColor },
                ]}
              >
                ×{item.multiplier}
              </Text>
            </View>
            <View style={styles.defendingTypes}>
              {item.defendingTypes.map((t) => (
                <View
                  key={t.id}
                  style={[styles.typeContainer, isCompact && styles.typeContainerCompact]}
                >
                  <Image style={styles.typeImage} source={{ uri: t.sprite }} />
                </View>
              ))}
            </View>
          </ScrollView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: IS_WEB ? 8 : 6,
  },
  rowScroll: {
    flexGrow: 0,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: IS_WEB ? 24 : 8,
  },
  rowWeb: {
    alignSelf: "flex-start",
    backgroundColor: BG_CARD,
    borderWidth: 1,
    borderColor: BORDER_INTERNAL,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  rowWebCompact: {
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  memberCard: {
    flexShrink: 0,
  },
  memberCardWeb: {
    flexShrink: 0,
    flexGrow: 0,
    width: 170,
    overflow: "hidden",
  },
  memberCardWebCompact: {
    width: 120,
  },
  pill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pillWeb: {
    minWidth: 58,
  },
  pillWebCompact: {
    minWidth: 36,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  pillText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    fontWeight: "700",
  },
  pillTextCompact: {
    fontSize: 11,
  },
  defendingTypes: {
    flexDirection: "row",
    gap: 4,
  },
  typeContainer: {
    height: 18,
    aspectRatio: 200 / 44,
    borderRadius: 4,
    overflow: "hidden",
  },
  typeContainerCompact: {
    height: 14,
  },
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
