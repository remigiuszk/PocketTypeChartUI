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

export const TILE_MARGIN = 1.8;
const RING_WIDTH = 3;
const MOAT_WIDTH = 2;

export const PokeType = ({
  pokeType,
  isSelected,
  anySelected,
  onPress,
}: PokeTypeProps) => {
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
    marginVertical: TILE_MARGIN,
    marginHorizontal: TILE_MARGIN,

    height: undefined,
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
    elevation: Platform.OS === "android" ? 0 : 6,
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
