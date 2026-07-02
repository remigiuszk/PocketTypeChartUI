import { Image, StyleSheet, Text, View } from "react-native";

import {
  BG_WEAKNESS_WEAK,
  BG_WEAKNESSES,
  TEXT_WEAKNESSES_CRITICAL,
  TEXT_WEAKNESSES_WEAK,
} from "../../constants";
import { MemberBreakdownItem } from "./HintButton";

type Props = {
  items: MemberBreakdownItem[];
  compact?: boolean;
};

export const ResistanceBreakdownSection = ({ items, compact = false }: Props) => (
  <View style={styles.list}>
    {items.map((item) => {
      const pillColor =
        item.multiplier <= 0.25 ? TEXT_WEAKNESSES_CRITICAL : TEXT_WEAKNESSES_WEAK;
      const pillBg = item.multiplier <= 0.25 ? BG_WEAKNESSES : BG_WEAKNESS_WEAK;
      return (
        <View key={item.id} style={styles.row}>
          <Text style={[styles.name, compact && styles.nameCompact]} numberOfLines={1}>
            {item.label}
          </Text>
          <View style={styles.types}>
            {item.types.map((t) => {
              const resisted = item.resistedTypeIds.includes(t.id);
              return (
                <View
                  key={t.id}
                  style={[
                    styles.typeBorder,
                    resisted ? styles.typeBorderResisted : styles.typeBorderDimmed,
                  ]}
                >
                  <View style={[styles.typeInner, compact && styles.typeInnerCompact]}>
                    <Image
                      style={styles.typeImage}
                      source={{ uri: t.sprite }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              );
            })}
          </View>
          <View style={[styles.pill, { borderColor: pillColor, backgroundColor: pillBg }]}>
            <Text style={[styles.pillText, compact && styles.pillTextCompact, { color: pillColor }]}>
              ×{item.multiplier}
            </Text>
          </View>
          <View style={styles.defendingTypes}>
            {item.defendingTypes.map((t) => (
              <View key={t.id} style={[styles.defendingType, compact && styles.defendingTypeCompact]}>
                <Image
                  style={styles.typeImage}
                  source={{ uri: t.sprite }}
                  resizeMode="contain"
                />
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
  name: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    textTransform: "uppercase",
    letterSpacing: 1,
    minWidth: 0,
  },
  nameCompact: {
    fontSize: 11,
  },
  types: {
    flexDirection: "row",
    gap: 3,
  },
  typeBorder: {
    borderRadius: 3,
    borderWidth: 1.5,
  },
  typeBorderResisted: {
    borderColor: "#e07b00",
  },
  typeBorderDimmed: {
    borderColor: "transparent",
    opacity: 0.35,
  },
  typeInner: {
    height: 14,
    aspectRatio: 200 / 44,
    borderRadius: 2,
    overflow: "hidden",
  },
  typeInnerCompact: {
    height: 13,
  },
  typeImage: {
    width: "100%",
    height: "100%",
  },
  pill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    fontWeight: "700",
  },
  pillTextCompact: {
    fontSize: 11,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  defendingTypes: {
    flexDirection: "row",
    gap: 3,
  },
  defendingType: {
    height: 18,
    aspectRatio: 200 / 44,
    borderRadius: 3,
    overflow: "hidden",
  },
  defendingTypeCompact: {
    height: 15,
  },
});
