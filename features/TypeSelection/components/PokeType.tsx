import { View, Image, Text } from "react-native";
import { PokeTypeModel } from "../types";

type PokeTypeProps = {
  pokeType: PokeTypeModel;
};

export const PokeType = ({ pokeType }: PokeTypeProps) => {
  return (
    <View>
      <Text>{pokeType.name}</Text>
    </View>
  );
};
