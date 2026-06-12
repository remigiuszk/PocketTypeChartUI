import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { Error } from "../../../shared/components/Error";
import { Loading } from "../../../shared/components/Loading";
import { IS_WEB } from "../../../shared/layout/platform";
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

// Target tile width on web; the column count is derived from how many of these
// fit the available width.
const WEB_TARGET_TILE_WIDTH = 150;

// Pick a column count that divides `count` evenly (so every row has the same
// number of tiles) and is no wider than `maxCols`. Falls back to maxCols if the
// count has no suitable divisor (e.g. a prime count).
const balancedColumns = (count: number, maxCols: number): number => {
  const cap = Math.max(2, maxCols);
  let best = 1;
  for (let d = 1; d <= cap && d <= count; d++) {
    if (count % d === 0) best = d;
  }
  return best === 1 ? Math.min(cap, count) : best;
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
  // Available width measured on web; used to derive a balanced column count.
  const [availWidth, setAvailWidth] = useState<number | null>(null);

  useEffect(() => {
    setSelectedTypes(memberTypes ?? []);
  }, [memberTypes]);

  const types = data ?? [];

  const renderTile = (item: PokeTypeModel) => (
    <PokeType
      pokeType={item}
      isSelected={selectedTypes?.some((x) => x.id === item.id)}
      onPress={() => onToggle(item)}
    />
  );

  let webGrid = null;
  if (IS_WEB && availWidth !== null && types.length > 0) {
    const fit = Math.max(2, Math.floor(availWidth / WEB_TARGET_TILE_WIDTH));
    const columns = balancedColumns(types.length, fit);
    // Keep tiles at the target size (shrinking only if the row wouldn't fit), so
    // the grid is exactly columns * tileWidth wide and stays centered/narrower.
    const tileWidth = Math.min(
      WEB_TARGET_TILE_WIDTH,
      Math.floor(availWidth / columns),
    );
    // Grid is exactly as wide as its rows, centered — so it shrinks to fit the
    // balanced layout instead of stretching the section's full width.
    webGrid = (
      <View style={[styles.webGrid, { width: tileWidth * columns }]}>
        {types.map((item) => (
          <View key={String(item.id)} style={{ width: tileWidth }}>
            {renderTile(item)}
          </View>
        ))}
      </View>
    );
  }

  const content =
    isLoading || isFetching ? (
      <Loading />
    ) : error ? (
      <Error onRetry={refetch} />
    ) : IS_WEB ? (
      <View
        style={styles.webMeasure}
        onLayout={(e) => setAvailWidth(e.nativeEvent.layout.width)}
      >
        {webGrid}
      </View>
    ) : (
      <FlatList
        style={styles.container}
        data={types}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderTile(item)}
        numColumns={3}
        columnWrapperStyle={styles.column}
      />
    );

  return <View style={styles.wrapper}>{content}</View>;
};

const styles = StyleSheet.create({
  wrapper: { borderRadius: 12 },
  container: {},
  column: {
    justifyContent: "center",
  },
  // Full-width measuring box that centers the (narrower) balanced grid.
  webMeasure: { width: "100%", alignItems: "center" },
  webGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
