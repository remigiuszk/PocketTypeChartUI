import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Error } from "../../../shared/components/Error";
import { Loading } from "../../../shared/components/Loading";
import { PokeTypeModel } from "../types";
import { PokeType } from "./PokeType";

type PokeTypeListProps = {
  memberTypes: PokeTypeModel[];
  data: PokeTypeModel[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch: () => void;
  onToggle: (pokeType: PokeTypeModel) => void;
};

export const PokeTypeList = ({
  memberTypes,
  data,
  isLoading,
  isFetching,
  error,
  refetch,
  onToggle,
}: PokeTypeListProps) => {
  const [selectedTypes, setSelectedTypes] = useState<PokeTypeModel[]>([]);

  useEffect(() => {
    setSelectedTypes(memberTypes ?? []);
  }, [memberTypes]);

  return (
    <View>
      {isLoading || isFetching ? (
        <Loading />
      ) : error ? (
        <Error onRetry={refetch} />
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
