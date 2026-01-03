import { FlatList, Image, StyleSheet, View } from "react-native";
import {
  DefensiveDamageRelationModel,
  OffensiveDamageRelationModel,
} from "../../types";
import { RelationsHeader } from "../../../../shared/ui/RelationsHeader";
import { BG_800, BORDER_100, PADDING } from "../../../../constants";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { OffensiveDamageRelation } from "./OffensiveDamageRelation";
import { OffensiveRelationsHeader } from "../../../../shared/ui/OffensiveRelationsHeader";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { TypeHeader } from "../../../../shared/ui/TypeHeader";

type Props = {
  relationList: OffensiveDamageRelationModel[];
};

type OffensiveBuckets = {
  attackingType: PokeTypeModel;
  superEffective: OffensiveDamageRelationModel[];
  notVeryEffective: OffensiveDamageRelationModel[];
  immunities: OffensiveDamageRelationModel[];
};

export const OffensiveRelationsList = ({ relationList }: Props) => {
  const groupedBuckets = (relationList ?? []).reduce<
    Record<string, OffensiveBuckets>
  >((acc, rel) => {
    const key = String(rel.attackingMoveType.id); // albo rel.attackingMoveType.name

    if (!acc[key]) {
      acc[key] = {
        attackingType: rel.attackingMoveType,
        superEffective: [],
        notVeryEffective: [],
        immunities: [],
      };
    }

    if (rel.multiplier >= 2) acc[key].superEffective.push(rel);
    else if (rel.multiplier === 0) acc[key].immunities.push(rel);
    else if (rel.multiplier > 0 && rel.multiplier < 1)
      acc[key].notVeryEffective.push(rel);

    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Object.values(groupedBuckets).map((bucket) => (
        <View key={bucket.attackingType.id}>
          <TypeHeader sprite={bucket.attackingType.sprite}></TypeHeader>
          {bucket.superEffective.length > 0 && (
            <View style={styles.section}>
              <OffensiveRelationsHeader
                multiplier={2}
              ></OffensiveRelationsHeader>
              <View style={styles.listContainer}>
                {bucket.superEffective.map(
                  (relation: OffensiveDamageRelationModel) => (
                    <OffensiveDamageRelation
                      key={relation.defendingType.id}
                      damageRelation={relation}
                    />
                  )
                )}
              </View>
            </View>
          )}
          {bucket.notVeryEffective.length > 0 && (
            <View style={styles.section}>
              <OffensiveRelationsHeader
                multiplier={0.5}
              ></OffensiveRelationsHeader>
              <View style={styles.listContainer}>
                {bucket.notVeryEffective.map(
                  (relation: OffensiveDamageRelationModel) => (
                    <OffensiveDamageRelation
                      key={relation.defendingType.id}
                      damageRelation={relation}
                    />
                  )
                )}
              </View>
            </View>
          )}
          {bucket.immunities.length > 0 && (
            <View style={styles.section}>
              <OffensiveRelationsHeader
                multiplier={0}
              ></OffensiveRelationsHeader>
              <View style={styles.listContainer}>
                {bucket.immunities.map(
                  (relation: OffensiveDamageRelationModel) => (
                    <OffensiveDamageRelation
                      key={relation.defendingType.id}
                      damageRelation={relation}
                    />
                  )
                )}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 8,
    borderBottomColor: BORDER_100,
    borderBottomWidth: 1,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  list: {},
});
