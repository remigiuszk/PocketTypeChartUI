import { StyleSheet, View } from "react-native";

import { BORDER_INTERNAL } from "../../../../constants";
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
  const groupedBuckets = (relationList ?? []).reduce<Record<string, OffensiveBuckets>>(
    (acc, rel) => {
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
    },
    {},
  );

  return (
    <View style={styles.container}>
      {Object.values(groupedBuckets).map((bucket) => {
        const sections = [
          bucket.superEffective.length > 0
            ? { multiplier: 2, list: bucket.superEffective }
            : null,
          bucket.notVeryEffective.length > 0
            ? {
                multiplier: 0.5,
                list: [...bucket.notVeryEffective].sort((a, b) => b.multiplier - a.multiplier),
              }
            : null,
          bucket.immunities.length > 0 ? { multiplier: 0, list: bucket.immunities } : null,
        ].filter(
          (s): s is { multiplier: number; list: OffensiveDamageRelationModel[] } => s !== null,
        );

        return (
          <CardWithHeaderRelations
            title="Offensive Relations"
            subtitle="TYPE MOVES ARE:"
            iconName="sword"
            sprites={[bucket.attackingType.sprite]}
            key={bucket.attackingType.id}
          >
            {sections.map((section, index) => (
              <View key={section.multiplier} style={styles.section}>
                <OffensiveRelationsHeader multiplier={section.multiplier} />
                <View style={styles.listContainer}>
                  {section.list.map((relation) => (
                    <OffensiveDamageRelation
                      key={relation.defendingType.id}
                      damageRelation={relation}
                    />
                  ))}
                </View>
                {index < sections.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </CardWithHeaderRelations>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 15, alignItems: "center" },
  section: {
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: BORDER_INTERNAL,
    marginHorizontal: 6,
    marginBottom: 8,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  list: {},
});
