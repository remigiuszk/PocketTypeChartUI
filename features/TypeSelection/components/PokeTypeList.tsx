import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useGetAllPokeTypesQuery } from "../query";
import { PokeType } from "./PokeType";

export const PokeTypeList = () => {
  const {
    data, // odpowiedź (po transformResponse)
    isLoading, // pierwszy load
    isFetching, // każde odświeżanie (np. refetch)
    error,
    refetch,
  } = useGetAllPokeTypesQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <View>
        <Text>Coś poszło nie tak.</Text>
        <Text onPress={() => refetch()}>Spróbuj ponownie</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isFetching ? <Text>Odświeżam…</Text> : null}

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PokeType pokeType={item}></PokeType>}
      />
    </View>
  );
};
