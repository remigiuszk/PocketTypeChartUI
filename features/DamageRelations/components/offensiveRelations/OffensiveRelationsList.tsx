import { StyleSheet, View } from "react-native";

import { BORDER_100 } from "../../../../constants";
import { CardWithHeaderRelations } from "../../../../shared/ui/CardWithHeaderRelations";
import { OffensiveRelationsHeader } from "../../../../shared/ui/OffensiveRelationsHeader";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { OffensiveDamageRelationModel } from "../../types";
import { OffensiveDamageRelation } from "./OffensiveDamageRelation";

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
  console.log
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
        <CardWithHeaderRelations
          title="Offensive Relations"
          subtitle="TYPE MOVES ARE:"
          iconName="sword"
          sprites={[bucket.attackingType.sprite]}
          key={bucket.attackingType.id}
        >
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
                {bucket.notVeryEffective.sort((a, b) => b.multiplier - a.multiplier).map(
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
        </CardWithHeaderRelations>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 15 },
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
