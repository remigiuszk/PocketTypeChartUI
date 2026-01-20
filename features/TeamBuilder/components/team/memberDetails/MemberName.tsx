import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View, ViewStyle } from "react-native";

import { BG_500, BG_800, SUBTITLE_FONT_SIZE, TEXT_100 } from "../../../../../constants";

type Props = {
  style?: ViewStyle | ViewStyle[];
  memberName: string;
};

export const MemberName = ({ style, memberName }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.wrapper}>
        <View style={{ width: 18 }} />
        <TextInput style={styles.input}>{memberName}</TextInput>
        <Feather name="edit-2" size={18} color={TEXT_100} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    borderWidth: 1,
    borderColor: BG_800,
    borderRadius: 16,
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 12,
    backgroundColor: BG_500,
  },
  input: {
    flex: 1,
    fontWeight: "400",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_100,
    fontSize: SUBTITLE_FONT_SIZE,
    letterSpacing: 1.5,
  },
});
