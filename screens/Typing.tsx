import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Relations } from "../features/DamageRelations/components/Relations";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../features/TypeSelection/query";
import { PokeTypeModel } from "../features/TypeSelection/types";
import { ContentScroll } from "../shared/components/ContentScroll";
import { NoTypesSelected } from "../shared/components/NoTypesSelected";
import { Screen } from "../shared/components/Screen";
import { IS_WEB } from "../shared/layout/platform";
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
    <Screen
      teamBuilderOpen={false}
      switchViews={switchViews}
      typesSelected={selectedType && selectedType.length > 0}
      clearSelection={clearSelection}
    >
      <View style={[styles.content, !IS_WEB && styles.contentNative]}>
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
          <ContentScroll>
            <Relations selectedTypes={normalizedSelected}></Relations>
          </ContentScroll>
        ) : (
          data && data.length > 0 && <NoTypesSelected></NoTypesSelected>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { margin: 12, marginBottom: 0, gap: 16 },
  contentNative: { flex: 1 },
  typesContainer: { alignItems: "stretch", gap: 6 },
});
