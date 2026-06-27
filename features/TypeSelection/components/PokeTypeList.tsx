import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

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

const WEB_TARGET_TILE_WIDTH = 150;

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
  const selectedTypes = memberTypes ?? [];
  const [availWidth, setAvailWidth] = useState<number>(
    () => Dimensions.get("window").width,
  );

  const types = data ?? [];

  const renderTile = (item: PokeTypeModel) => (
    <PokeType
      pokeType={item}
      isSelected={selectedTypes?.some((x) => x.id === item.id)}
      onPress={() => onToggle(item)}
    />
  );

  let webGrid = null;
  if (IS_WEB && types.length > 0) {
    const fit = Math.max(2, Math.floor(availWidth / WEB_TARGET_TILE_WIDTH));
    const columns = balancedColumns(types.length, fit);
    const tileWidth = Math.min(WEB_TARGET_TILE_WIDTH, Math.floor(availWidth / columns));
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
