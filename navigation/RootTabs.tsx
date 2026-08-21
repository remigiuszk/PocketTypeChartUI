import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PokemonSearch } from "../screens/PokemonSearch";
import { TeamBuilder } from "../screens/TeamBuilder";
import { Typing } from "../screens/Typing";
import { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const RootTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={() => null}>
      <Tab.Screen name="Typing" component={Typing} />
      <Tab.Screen name="TeamBuilder" component={TeamBuilder} />
      <Tab.Screen name="PokemonSearch" component={PokemonSearch} />
    </Tab.Navigator>
  );
};
