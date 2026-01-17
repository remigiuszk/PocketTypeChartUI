import Feather from "@expo/vector-icons/Feather";
import {Pressable, StyleSheet, View } from "react-native";

import {
  ACCENT,
  BG_1000,
  TEXT_300,
} from "../../../../constants";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";
import { TeamMemberModel } from "../../types";

type Props = {
  editMember: () => void;
  deleteMember: () => void;
  member: TeamMemberModel;
};

export const TeamMember = ({ editMember, deleteMember, member }: Props) => {
  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.glow} />
      <View style={styles.content}>
        <TwoTypesHeader
          imageHeight={28}
          message=""
          sprites={member.selectedTypes.map((x) => x.sprite)}
          style={styles.types}
        />

        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={editMember}
            style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
            hitSlop={8}
          >
            <Feather name="edit-2" size={18} color={ACCENT} />
          </Pressable>

          <Pressable
            onPress={deleteMember}
            style={({ pressed }) => [
              styles.actionBtn,
              styles.dangerBtn,
              pressed && styles.pressed,
            ]}
            hitSlop={8}
          >
            <Feather name="trash" size={18} color="#ff6b6b" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
    position: "relative",
  },

  // Ta warstwa robi „poświatę”
  glow: {
    position: "absolute",
    left: 6,
    right: 6,
    top: 4,
    bottom: 2,
    borderRadius: 14,

    // kolor poświaty
    backgroundColor: ACCENT,
    opacity: 0.12,

    // iOS: miękki blur przez shadow
    shadowColor: ACCENT,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },

    // Android: zbliżony efekt (mniej „glow”, bardziej lift)
    elevation: 6,
  },

  content: {
    height: 44,
    borderRadius: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // „card” tło dopasowane do motywu
    backgroundColor: BG_1000,

    // subtelny border w akcencie
    borderWidth: 1,
    //borderColor: "rgba(27,197,190,0.22)",
    borderColor: TEXT_300,

    // delikatny cień (lift)
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  types: {
    width: "70%",
    height: 34,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(27,197,190,0.12)",
    borderWidth: 1,
    borderColor: "rgba(27,197,190,0.28)",
  },

  dangerBtn: {
    backgroundColor: "rgba(255,107,107,0.10)",
    borderColor: "rgba(255,107,107,0.25)",
  },

  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
});
