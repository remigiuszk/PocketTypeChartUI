import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { PokeTypeModel } from "../types";
import { ACCENT, PRIMARY } from "../../../constants";

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
    backgroundColor: ACCENT,
    paddingHorizontal: 0,
    paddingVertical: 1.5,
    transform: [{ scale: 1.05 }],
    zIndex:7
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
