import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BG_100 } from "../constants";
import { Relations } from "../features/DamageRelations/components/Relations";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../features/TypeSelection/query";
import { PokeTypeModel } from "../features/TypeSelection/types";
import { NavBar } from "../shared/components/NavBar";
import { NoTypesSelected } from "../shared/components/NoTypesSelected";
import { TopBar } from "../shared/components/TopBar";

type Props = {
  switchViews: () => void;
};

export const Typing = ({ switchViews }: Props) => {
  const [selectedType, setSelectedType] = useState<PokeTypeModel[]>([]);

  const { data, isLoading, isFetching, error, refetch } = useGetAllPokeTypesQuery();

  const normalizedSelected = useMemo(
    () => [...selectedType].sort((a, b) => a.id - b.id),
    [selectedType],
  );

  function toggleType(type: PokeTypeModel): void {
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
  }

  function clearSelection(): void {
    setSelectedType(() => []);
  }

  return (
    <View style={styles.container}>
      <TopBar
        typesSelected={selectedType && selectedType.length > 0}
        clearSelection={clearSelection}
      ></TopBar>
      <View style={{ margin: 6, marginBottom: 0, flex: 1, gap: 16 }}>
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
        ) : (
          data && data.length > 0 && <NoTypesSelected></NoTypesSelected>
        )}
      </View>
      <NavBar switchViews={switchViews} teamBuilderOpen={false}></NavBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_100,
    flex: 1,
  },
});
