import { Image, StyleSheet, View } from "react-native";

import { ACCENT, BG_800 } from "../../../../constants";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { DefensiveDamageRelationModel } from "../../types";

type Props = {
  damageRelation: DefensiveDamageRelationModel;
};

export const DefensiveDamageRelation = ({ damageRelation }: Props) => {
  const formatMultiplier = (value: number) =>
    value < 0.5 && value > 0
      ? value.toString().replace(/^0\./, ".")
      : value.toString();

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
    marginRight: 8,
    marginBottom: 8,
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
    fontWeight: 900,
    fontSize: 13,
    color: BG_800,
    paddingHorizontal: 1,
    letterSpacing: 0.1,
  },
  multiplierTextSmall: {
    fontWeight: 900,
    fontSize: 11,
    color: BG_800,
    paddingHorizontal: 1,
    letterSpacing: 0.1,
  },
});
