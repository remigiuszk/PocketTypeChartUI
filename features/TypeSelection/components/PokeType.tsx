import { AntDesign } from "@expo/vector-icons";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_LAYOUT, BG_ROOT } from "../../../constants";
import { PokeTypeModel } from "../types";

type PokeTypeProps = {
  pokeType: PokeTypeModel;
  isSelected: boolean;
  anySelected: boolean;
  onPress: () => void;
};

// The web tile's outer box height is computed in PokeTypeList to preserve this
// same margin, so the sprite (which fills the box exactly) keeps its intended
// 200:44 aspect ratio and rounded corners regardless of gap size. Native derives
// its own height straight from aspectRatio (post-margin), so it doesn't need
// that extra math, but shares this constant to keep the gap identical.
export const TILE_MARGIN = 1.8;

// The ring sits flush with the tile's edge; the moat is inset by exactly the
// ring's width so the two bands sit concentrically with no overlap and no gap.
const RING_WIDTH = 3;
const MOAT_WIDTH = 2;

export const PokeType = ({ pokeType, isSelected, anySelected, onPress }: PokeTypeProps) => {
  const shouldDim = anySelected && !isSelected;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.clip}>
        <Image
          style={styles.image}
          source={{
            uri: pokeType.sprite,
          }}
        ></Image>
        {shouldDim && <View style={styles.dim} />}
      </View>
      {isSelected && <View style={styles.moat} />}
      {isSelected && <View style={styles.ring} />}
      {isSelected && (
        <View style={styles.badge}>
          <AntDesign name="check" size={12} color={BG_LAYOUT} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: TILE_MARGIN,
    height: Platform.OS === "web" ? undefined : 0,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    aspectRatio: 200 / 44,
  },
  // The sprite is clipped to its rounded pill shape here rather than on
  // `container`, so the accent ring (drawn on `container`) isn't cut off by
  // the same overflow:hidden that rounds the artwork's corners.
  clip: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 6,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  // With nothing selected every tile stays full-brightness. Once a type is
  // picked, every *other* tile dims — so the selected one reads as the odd
  // one out against a grid of muted neighbors, rather than every tile always
  // sitting dimmed regardless of whether anything is selected.
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    pointerEvents: "none",
  },
  selected: {
    zIndex: 7,
    transform: [{ scale: 0.94 }],
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  // Both bands sit entirely outside the sprite's own box (negative insets)
  // rather than on top of it, so the full artwork stays visible with no part
  // of it covered — at the cost of the ring/moat extending into the gap and
  // potentially over neighboring tiles.
  moat: {
    position: "absolute",
    top: -MOAT_WIDTH,
    left: -MOAT_WIDTH,
    right: -MOAT_WIDTH,
    bottom: -MOAT_WIDTH,
    borderRadius: 7,
    borderWidth: MOAT_WIDTH,
    borderColor: BG_ROOT,
    pointerEvents: "none",
  },
  ring: {
    position: "absolute",
    top: -(MOAT_WIDTH + RING_WIDTH),
    left: -(MOAT_WIDTH + RING_WIDTH),
    right: -(MOAT_WIDTH + RING_WIDTH),
    bottom: -(MOAT_WIDTH + RING_WIDTH),
    borderRadius: 9,
    borderWidth: RING_WIDTH,
    borderColor: ACCENT,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    pointerEvents: "none",
  },
  badge: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: BG_LAYOUT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 8,
  },
});
