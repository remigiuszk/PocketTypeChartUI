import { StyleSheet, View } from "react-native";

import { BORDER_INTERNAL } from "../../../../constants";
import { RelationsHeader } from "../../../../shared/ui/RelationsHeader";
import { DefensiveDamageRelationModel } from "../../types";
import { DefensiveDamageRelation } from "./DefensiveDamageRelation";

type Props = {
  relationList: DefensiveDamageRelationModel[];
};

export const DefensiveRelationsList = ({ relationList }: Props) => {
  const superEffective = relationList
    .filter((x) => x.multiplier >= 2)
    .sort((a, b) => b.multiplier - a.multiplier);

  const notVeryEffective = relationList
    .filter((x) => x.multiplier < 1 && x.multiplier > 0)
    .sort((a, b) => a.multiplier - b.multiplier);

  const immunities = relationList.filter((x) => x.multiplier === 0);

  const sections = [
    superEffective.length > 0 ? { multiplier: 2, list: superEffective } : null,
    notVeryEffective.length > 0 ? { multiplier: 0.5, list: notVeryEffective } : null,
    immunities.length > 0 ? { multiplier: 0, list: immunities } : null,
  ].filter((s): s is { multiplier: number; list: DefensiveDamageRelationModel[] } => s !== null);

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <View key={section.multiplier} style={styles.section}>
          <RelationsHeader multiplier={section.multiplier} />
          <View style={styles.listContainer}>
            {section.list.map((relation) => (
              <DefensiveDamageRelation
                key={relation.attackingType.id}
                damageRelation={relation}
              />
            ))}
          </View>
          {index < sections.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
