import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { NavigationProp, useNavigation, useNavigationState } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_ROOT } from "../../constants";
import { TABS } from "../../navigation/tabs";
import { RootTabParamList } from "../../navigation/types";
import { MutedText } from "../typohraphy/MutedText";

export const NavBar = () => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const activeRoute = useNavigationState((state) => state.routes[state.index].name);

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = activeRoute === tab.name;
        return (
          <Pressable
            key={tab.name}
            style={({ pressed }) => [
              styles.button,
              active && styles.selected,
              pressed && styles.pressed,
            ]}
            onPress={active ? undefined : () => navigation.navigate(tab.name)}
          >
            <FontAwesome6 name={tab.icon} size={16} color={active ? ACCENT : "#555"} />
            <MutedText style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </MutedText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_ROOT,
    borderTopWidth: 1,
    borderTopColor: "#2a2a3a",
    gap: 4,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 6,
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },
  selected: {
    backgroundColor: "#22223a",
    borderTopColor: ACCENT,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 10,
    color: "#555",
  },
  labelActive: {
    color: ACCENT,
  },
});
