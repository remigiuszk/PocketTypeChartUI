import { Pressable, StyleSheet, View } from "react-native";
import {
  ACCENT,
  BG_100,
  BG_500,
  BG_800,
  BORDER_100,
  TEXT_100,
} from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  teamBuilderOpen: boolean;
  switchViews: () => void;
};

export const NavBar = ({ teamBuilderOpen, switchViews }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          !teamBuilderOpen && styles.selected,
          pressed && styles.pressed,
        ]}
        onPress={teamBuilderOpen ? switchViews : null}
      >
        <FontAwesome6 name="fire-flame-curved" size={18} color={TEXT_100} />
        <Subtitle style={styles.textStyle}>Type Chart</Subtitle>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          teamBuilderOpen && styles.selected,
          pressed && styles.pressed,
        ]}
        onPress={!teamBuilderOpen ? switchViews : null}
      >
        <FontAwesome6 name="users" size={18} color={TEXT_100} />
        <Subtitle style={styles.textStyle}>Team Builder</Subtitle>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "6%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_500,
    borderTopColor: BORDER_100,
    borderTopWidth: 1,
  },
  button: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
    padding:10,
    gap:1
  },
  selected: {
    color: ACCENT,
    backgroundColor:BG_800,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  textStyle:{
    fontSize:10
  }
});
