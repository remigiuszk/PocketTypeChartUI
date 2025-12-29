import { View, Image, Text, StyleSheet } from "react-native";
import { PokeTypeModel } from "../types";

type PokeTypeProps = {
  pokeType: PokeTypeModel;
};

export const PokeType = ({ pokeType }: PokeTypeProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: pokeType.sprite,
        }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    height:30,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    width:"100%",
    height:"100%"
  },
});
