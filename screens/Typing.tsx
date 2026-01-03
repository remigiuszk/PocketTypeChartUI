import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { Relations } from "../features/DamageRelations/components/Relations";
import { BG_100 } from "../constants";
import { TopBar } from "../shared/components/TopBar";
import { useMemo, useState } from "react";
import { PokeTypeModel } from "../features/TypeSelection/types";
import { NoTypesSelected } from "../shared/components/NoTypesSelected";
import { useGetAllPokeTypesQuery } from "../features/TypeSelection/query";

export const Typing = () => {
  const [selectedType, setSelectedType] = useState<PokeTypeModel[]>([]);
  const { data, isLoading, isFetching, error, refetch } =
    useGetAllPokeTypesQuery();

  const toggleType = (type: PokeTypeModel) => {
    setSelectedType((prev) => {
      const has = prev.some((x) => x.id === type.id);
      if (has) {
        return prev.filter((x) => x.id !== type.id);
      }
      if (prev.length === 2) {
        return [prev[1], type];
      }
      return [...prev, type];
    });
  };

  const normalizedSelected = useMemo(
    () => [...selectedType].sort((a, b) => a.id - b.id),
    [selectedType]
  );

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <View style={{ padding: 10, flex: 1, gap: 16 }}>
        <PokeTypeList
          data={data}
          isFetching={isFetching}
          error={error}
          isLoading={isLoading}
          refetch={refetch}
          selectedTypes={normalizedSelected}
          onToggle={toggleType}
        />
        {selectedType.length > 0 ? (
          <ScrollView>
            <Relations selectedTypes={normalizedSelected}></Relations>
          </ScrollView>
        ) : data && data.length > 0 && (
          <NoTypesSelected></NoTypesSelected>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_100,
    flex: 1,
  },
});
