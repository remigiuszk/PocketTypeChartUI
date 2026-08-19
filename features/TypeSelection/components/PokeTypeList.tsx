import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import { Error } from "../../../shared/components/Error";
import { Loading } from "../../../shared/components/Loading";
import { IS_WEB } from "../../../shared/layout/platform";
import { PokeTypeModel } from "../types";
import { PokeType, TILE_MARGIN } from "./PokeType";

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
    // Firefox fails to resolve aspectRatio on a flex:1 child whose container has
    // no definite height (see PokeType.tsx), so give the tile an explicit pixel
    // height here rather than relying on aspectRatio to derive it from width.
    // The margin eats into the tile's inner box on both axes, so the ratio is
    // derived from the post-margin width and then padded back out — otherwise a
    // non-zero margin distorts the inner box's aspect ratio and the sprite
    // letterboxes instead of filling its rounded-corner clip exactly.
    const innerWidth = tileWidth - TILE_MARGIN * 2;
    const innerHeight = Math.round(innerWidth * (44 / 200));
    const tileHeight = innerHeight + TILE_MARGIN * 2;
    webGrid = (
      <View style={[styles.webGrid, { width: tileWidth * columns }]}>
        {types.map((item) => (
          <View key={String(item.id)} style={{ width: tileWidth, height: tileHeight }}>
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
