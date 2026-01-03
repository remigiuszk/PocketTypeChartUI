import { StyleSheet, View } from "react-native";
import { BG_100 } from "../../../constants";
import { CardWithHeader } from "../../../shared/ui/CardWithHeader";
import { useGetDamageRelationsQuery } from "../query";
import { DefensiveRelationsList } from "./defensiveRelations/DefensiveRelationsList";
import { OffensiveRelationsList } from "./offensiveRelations/OffensiveRelationsList";
import { Loading } from "../../../shared/components/Loading";
import { Error } from "../../../shared/components/Error";
import { PokeTypeModel } from "../../TypeSelection/types";

type Props = {
  selectedTypes: PokeTypeModel[];
};

export const Relations = ({ selectedTypes }: Props) => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetDamageRelationsQuery(selectedTypes.map((t) => t.id));

  return (
    <View style={styles.container}>
      <CardWithHeader
        title="Defensive Relations"
        subtitle="How much damage selected types take"
        iconName="shield"
      >
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error onRetry={refetch} />
        ) : (
          <DefensiveRelationsList
            relationList={data?.defensiveDamageRelations ?? []}
            selectedTypeSprites={selectedTypes.map((x) => x.sprite)}
          ></DefensiveRelationsList>
        )}
      </CardWithHeader>
      <CardWithHeader
        title="Offensive Relations"
        subtitle="How effective your moves are"
        iconName="sword"
      >
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error onRetry={refetch} />
        ) : (
          <OffensiveRelationsList
            relationList={data?.offensiveDamageRelations ?? []}
          ></OffensiveRelationsList>
        )}
      </CardWithHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: BG_100,
    gap: 15,
    flexDirection: "column",
    width: "100%",
  },
  relationsView: {},
});
