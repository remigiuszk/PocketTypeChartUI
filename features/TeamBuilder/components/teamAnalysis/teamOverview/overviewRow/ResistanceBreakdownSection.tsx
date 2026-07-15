import { Image, StyleSheet, Text, View } from "react-native";

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

export const ResistanceBreakdownSection = ({ items }: Props) => (
  <View style={styles.list}>
    {items.map((item) => {
      const isCritical = item.multiplier <= 0.25 || item.multiplier >= 4;
      const pillColor = isCritical ? TEXT_WEAKNESSES_CRITICAL : TEXT_WEAKNESSES_WEAK;
      const pillBg = isCritical ? BG_WEAKNESSES : BG_WEAKNESS_WEAK;
      return (
        <View key={item.id} style={[styles.row, IS_WEB && styles.rowWeb]}>
          <MemberPreview
            style={
              IS_WEB
                ? [styles.memberCard, styles.memberCardWeb]
                : styles.memberCard
            }
            iconSize={IS_WEB ? 26 : undefined}
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
              { borderColor: pillColor, backgroundColor: pillBg },
            ]}
          >
            <Text style={[styles.pillText, { color: pillColor }]}>
              ×{item.multiplier}
            </Text>
          </View>
          <View style={styles.defendingTypes}>
            {item.defendingTypes.map((t) => (
              <View key={t.id} style={styles.typeContainer}>
                <Image style={styles.typeImage} source={{ uri: t.sprite }} />
              </View>
            ))}
          </View>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: IS_WEB ? 8 : 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
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
  memberCard: {
    flexShrink: 1,
    minWidth: 0,
  },
  memberCardWeb: {
    flexShrink: 0,
    flexGrow: 0,
    width: 155,
    overflow: "hidden",
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
  pillText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    fontWeight: "700",
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
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
