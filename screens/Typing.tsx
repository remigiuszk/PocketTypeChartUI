import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BG_ROOT } from "../constants";
import { Relations } from "../features/DamageRelations/components/Relations";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../features/TypeSelection/query";
import { PokeTypeModel } from "../features/TypeSelection/types";
import { NavBar } from "../shared/components/NavBar";
import { NoTypesSelected } from "../shared/components/NoTypesSelected";
import { TopBar } from "../shared/components/TopBar";
import { TeamBuilderHeader } from "../shared/typohraphy/TeamBuilderHeader";

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
      <View style={{ margin: 12, marginBottom: 0, flex: 1, gap: 16 }}>
        <View style={styles.typesContainer}>
          <TeamBuilderHeader
            title="TYPE CHART"
            subtitle="Select up to 2 types and check their type relations"
          />
          <PokeTypeList
            data={data}
            isFetching={isFetching}
            error={error}
            isLoading={isLoading}
            refetch={refetch}
            memberTypes={normalizedSelected}
            onToggle={toggleType}
          />
        </View>
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
    backgroundColor: BG_ROOT,
    flex: 1,
  },
  typesContainer: { alignItems: "stretch", gap: 6 },
});
