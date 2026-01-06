import { Image, StyleSheet, Pressable, View } from "react-native";
import { PokeTypeModel } from "../types";
import { ACCENT, PRIMARY, SELECTION } from "../../../constants";

type PokeTypeProps = {
  pokeType: PokeTypeModel;
  isSelected: boolean;
  onPress: () => void;
};

export const PokeType = ({ pokeType, isSelected, onPress }: PokeTypeProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Image
        style={styles.image}
        source={{
          uri: pokeType.sprite,
        }}
      ></Image>
      {isSelected && <View style={styles.selectedOverlay} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    height: 0,
    borderRadius: 6,
    overflow: "hidden",
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
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  selected: {
    backgroundColor: SELECTION,
    paddingHorizontal: 0,
    paddingVertical: 2,
    borderRadius:6,
    zIndex: 7,
    transform: [{ scale: 1.08 }],
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.47)",
    pointerEvents: "none",
  },
});
