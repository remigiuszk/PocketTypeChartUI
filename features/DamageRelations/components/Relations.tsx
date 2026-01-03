import { StyleSheet, View } from "react-native";
import { BG_100 } from "../../../constants";
import { useGetDamageRelationsQuery } from "../query";
import { DefensiveRelationsList } from "./defensiveRelations/DefensiveRelationsList";
import { OffensiveRelationsList } from "./offensiveRelations/OffensiveRelationsList";
import { PokeTypeModel } from "../../TypeSelection/types";
import { CardWithHeaderRelations } from "../../../shared/ui/CardWithHeaderRelations";
import { Loading } from "../../../shared/components/Loading";
import { Error } from "../../../shared/components/Error";

type Props = {
  selectedTypes: PokeTypeModel[];
};

export const Relations = ({ selectedTypes }: Props) => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetDamageRelationsQuery(selectedTypes.map((t) => t.id));

  return (
    <View style={styles.container}>
      {isLoading || isFetching ? (
        <Loading></Loading>
      ) : error ? (
        <Error onRetry={refetch}></Error>
      ) : (
        <View>
          <CardWithHeaderRelations
            title="Defensive Relations"
            subtitle="POKEMON ARE:"
            iconName="shield"
            sprites={selectedTypes.map((x) => x.sprite)}
          >
            <DefensiveRelationsList
              relationList={data?.defensiveDamageRelations ?? []}
              selectedTypeSprites={selectedTypes.map((x) => x.sprite)}
            ></DefensiveRelationsList>
          </CardWithHeaderRelations>
          <OffensiveRelationsList
            relationList={data?.offensiveDamageRelations ?? []}
          ></OffensiveRelationsList>
        </View>
      )}
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
