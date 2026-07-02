import { Image, StyleSheet, Text, View } from "react-native";

import {
  BG_WEAKNESS_WEAK,
  BG_WEAKNESSES,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../../../../../constants";
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
      const pillColor =
        item.multiplier <= 0.25 ? TEXT_WEAKNESSES_CRITICAL : TEXT_WEAKNESSES_WEAK;
      const pillBg = item.multiplier <= 0.25 ? BG_WEAKNESSES : BG_WEAKNESS_WEAK;
      return (
        <View key={item.id} style={styles.row}>
          <MemberPreview
            style={styles.memberCard}
            member={{
              id: item.id,
              name: item.name,
              types: item.types,
              iconId: item.iconId,
              iconColor: item.iconColor,
            }}
            resistedTypeIds={item.resistedTypeIds}
          />
          <View style={[styles.pill, { borderColor: pillColor, backgroundColor: pillBg }]}>
            <Text style={[styles.pillText, { color: pillColor }]}>×{item.multiplier}</Text>
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
    gap: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  memberCard: {
    flex: 1,
    minWidth: 0,
  },
  pill: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
