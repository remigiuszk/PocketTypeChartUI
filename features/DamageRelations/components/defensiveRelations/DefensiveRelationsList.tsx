import { StyleSheet, View } from "react-native";
import { DefensiveDamageRelationModel } from "../../types";
import { RelationsHeader } from "../../../../shared/ui/RelationsHeader";
import { DefensiveDamageRelation } from "./DefensiveDamageRelation";
import { BORDER_100 } from "../../../../constants";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";

type Props = {
  relationList: DefensiveDamageRelationModel[];
  selectedTypeSprites: string[]
};

export const DefensiveRelationsList = ({ relationList, selectedTypeSprites }: Props) => {
  const superEffective = relationList
    .filter((x) => x.multiplier >= 2)
    .sort((a, b) => b.multiplier - a.multiplier);
  const notVeryEffective = relationList
    .filter((x) => x.multiplier < 1 && x.multiplier > 0)
    .sort((a, b) => a.multiplier - b.multiplier);
  const immunities = relationList.filter((x) => x.multiplier == 0);

  return (
    <View style={styles.container}>
      <TwoTypesHeader sprites={selectedTypeSprites}></TwoTypesHeader>
      {superEffective.length > 0 && (
        <View style={styles.section}>
          <RelationsHeader multiplier={2}></RelationsHeader>
          <View style={styles.listContainer}>
            {superEffective.map((relation: DefensiveDamageRelationModel) => (
              <DefensiveDamageRelation
                key={relation.attackingType.id}
                damageRelation={relation}
              />
            ))}
          </View>
        </View>
      )}
      {notVeryEffective.length > 0 && (
        <View style={styles.section}>
          <RelationsHeader multiplier={0.5}></RelationsHeader>
          <View style={styles.listContainer}>
            {notVeryEffective.map((relation: DefensiveDamageRelationModel) => (
              <DefensiveDamageRelation
                key={relation.attackingType.id}
                damageRelation={relation}
              />
            ))}
          </View>
        </View>
      )}
      {immunities.length > 0 && (
        <View>
          <RelationsHeader multiplier={0}></RelationsHeader>
          <View style={styles.listContainer}>
            {immunities.map((relation: DefensiveDamageRelationModel) => (
              <DefensiveDamageRelation
                key={relation.attackingType.id}
                damageRelation={relation}
              />
            ))}
          </View>
        </View>
      )}
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
