import { View, Image, Text } from "react-native";
import { PokeType } from "../types/PokeType";

type PokeTypeProps = {
  pokeType: PokeType;
};

export const PokeType = ({ pokeType }: PokeTypeProps) => {
  return (
    <View>
      <Text>{pokeType.name}</Text>
    </View>
  );
};
