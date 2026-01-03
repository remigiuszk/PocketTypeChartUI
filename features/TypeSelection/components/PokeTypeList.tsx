import { FlatList, StyleSheet, Text, View } from "react-native";
import { PokeType } from "./PokeType";
import { Loading } from "../../../shared/components/Loading";
import { CardWithHeader } from "../../../shared/ui/CardWithHeader";
import { Error } from "../../../shared/components/Error";
import { useGetAllPokeTypesQuery } from "../query";
import { PADDING } from "../../../constants";
import { PokeTypeModel } from "../types";

type PokeTypeListProps = {
  selectedTypes: PokeTypeModel[];
  onToggle: (pokeType: PokeTypeModel) => void;
};

export const PokeTypeList = ({
  selectedTypes,
  onToggle,
}: PokeTypeListProps) => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetAllPokeTypesQuery();

  return (
    <CardWithHeader
      title="Select poke type(s)"
      subtitle="Choose up to two types"
      style={styles.container}
    >
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error onRetry={refetch} />
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PokeType
              pokeType={item}
              isSelected={selectedTypes?.some((x) => x.id === item.id)}
              onPress={() => onToggle(item)}
            ></PokeType>
          )}
          numColumns={3}
        />
      )}
    </CardWithHeader>
  );
};

const styles = StyleSheet.create({
  container: {},
});
