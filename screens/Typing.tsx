import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { WEB_CONTENT_WIDTH } from "../constants/style";
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
    <Screen teamBuilderOpen={false} switchViews={switchViews}>
      <ContentScroll>
        <View style={[styles.content, IS_WEB && styles.contentWeb]}>
          <View style={styles.typesContainer}>
            <TeamBuilderHeader
              title="TYPE CHART"
              subtitle="Select up to 2 types and check their type relations"
              selectionCount={selectedType.length}
              selectionMax={2}
              onClearSelection={clearSelection}
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
            <Relations selectedTypes={normalizedSelected}></Relations>
          ) : (
            data && data.length > 0 && <NoTypesSelected></NoTypesSelected>
          )}
        </View>
      </ContentScroll>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { margin: 12, gap: 16 },
  contentWeb: { maxWidth: WEB_CONTENT_WIDTH, alignSelf: "center", width: "100%" },
  typesContainer: { alignItems: "stretch", gap: 16 },
});
