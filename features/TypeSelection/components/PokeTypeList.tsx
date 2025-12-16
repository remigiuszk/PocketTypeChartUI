import { useEffect } from "react";
import { View } from "react-native";
import { getAllPokeTypes } from "../query";

export const PokeTypeList = () => {
  useEffect(() => {
    getAllPokeTypes();
  });
  return <View></View>;
};
