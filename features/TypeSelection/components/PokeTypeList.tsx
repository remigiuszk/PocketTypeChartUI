import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FlatList, StyleSheet, View } from "react-native";

import { Error } from "../../../shared/components/Error";
import { Loading } from "../../../shared/components/Loading";
import { CardWithHeader } from "../../../shared/ui/CardWithHeader";
import { PokeTypeModel } from "../types";
import { PokeType } from "./PokeType";

type PokeTypeListProps = {
  selectedTypes: PokeTypeModel[];
  data: PokeTypeModel[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch: () => void;
  onToggle: (pokeType: PokeTypeModel) => void;
};

export const PokeTypeList = ({
  selectedTypes,
  data,
  isLoading,
  isFetching,
  error,
  refetch,
  onToggle,
}: PokeTypeListProps) => {
  return (
    <View>
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Error onRetry={refetch} />
      ) : (
        <CardWithHeader title="Select poke type(s)" subtitle="Choose up to two types">
          <FlatList
            style={styles.container}
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
        </CardWithHeader>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 6 },
});
