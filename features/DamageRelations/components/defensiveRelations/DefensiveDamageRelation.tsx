import { Image, StyleSheet, View } from "react-native";

import { ACCENT, BG_CARD, FONTS } from "../../../../constants";
import { IS_ANDROID } from "../../../../shared/layout/platform";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { DefensiveDamageRelationModel } from "../../types";

type Props = {
  damageRelation: DefensiveDamageRelationModel;
};

export const DefensiveDamageRelation = ({ damageRelation }: Props) => {
  const formatMultiplier = (value: number) =>
    value < 0.5 && value > 0 ? value.toString().replace(/^0\./, ".") : value.toString();

  return (
    <View style={[styles.item]}>
      <View style={styles.typeBox}>
        <Image
          style={styles.typeImage}
          source={{ uri: damageRelation.attackingType.sprite }}
        />
      </View>

      <View style={styles.multiplier}>
        <Subtitle
          style={
            damageRelation.multiplier <= 0.5 && damageRelation.multiplier > 0
              ? styles.multiplierTextSmall
              : styles.multiplierText
          }
        >
          {formatMultiplier(damageRelation.multiplier)}x
        </Subtitle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: 6,
    height: 19,
    marginRight: 6,
    marginBottom: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  typeBox: {
    height: "100%",
    aspectRatio: 200 / 44,
    gap: 22,
  },
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  multiplier: {
    height: "100%",
    backgroundColor: ACCENT,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
  },
  multiplierText: {
    // A raw numeric fontWeight over Subtitle's unregistered base font renders
    // very differently per platform (iOS honors 900 as a true Black weight;
    // Android's synthetic bold is more moderate), so use a real loaded family.
    // Android still renders that family visibly thinner than iOS at the same
    // size, so nudge it back up with an explicit weight on Android only.
    fontFamily: FONTS.medium,
    ...(IS_ANDROID && { fontWeight: "700" as const }),
    fontSize: 13,
    color: BG_CARD,
    paddingHorizontal: 1,
    letterSpacing: 0.1,
  },
  multiplierTextSmall: {
    fontFamily: FONTS.medium,
    ...(IS_ANDROID && { fontWeight: "700" as const }),
    fontSize: 11,
    color: BG_CARD,
    paddingHorizontal: 1,
    letterSpacing: 0.1,
  },
});
