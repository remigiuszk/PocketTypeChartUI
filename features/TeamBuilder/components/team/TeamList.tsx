import { StyleSheet, View, Pressable } from "react-native";
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { useState } from "react";
import { TeamMemberModel } from "../../types";
import { TeamMember } from "./TeamMember";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  ACCENT,
  BG_100,
  BG_1000,
  BG_500,
  BG_800,
  BORDER_100,
  PRIMARY,
  TEXT_100,
  TEXT_300,
} from "../../../../constants";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { Feather } from "@expo/vector-icons";
import { MemberTypeSelection } from "./MemberTypeSelection";

export const TeamList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([
    {
      id: "dupa",
      selectedTypes: [
        {
          id: 1,
          name: "normal",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
        },
        {
          id: 6,
          name: "rock",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
        },
      ],
    },
    {
      id: "sras",
      selectedTypes: [
        {
          id: 2,
          name: "normal",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
        },
        {
          id: 6,
          name: "rock",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
        },
      ],
    },
  ]);
  const editMember = () => {};
  const deleteMember = () => {};
  const addMember = () => {
    setShowModal(true);
  };

  return (
    <CardWithHeader
      title="Your team"
      subtitle="Select your team members' types"
      style={styles.card}
    >
      <MemberTypeSelection showModal={showModal}></MemberTypeSelection>
      {teamMembers.map((member: TeamMemberModel) => (
        <TeamMember
          member={member}
          editMember={editMember}
          key={member.id}
          deleteMember={deleteMember}
        />
      ))}
      {teamMembers.length < 6 && (
        <Pressable
          onPress={addMember}
          style={({ pressed }) => [
            styles.addContainer,
            pressed && styles.pressed,
          ]}
        >
          {/* glow */}
          <View pointerEvents="none" style={styles.addGlow} />

          {/* content */}
          <View style={styles.addContent}>
            <View style={styles.addIconCircle}>
              <Feather name="plus" size={18} color={ACCENT} />
            </View>
            <Subtitle style={styles.addText}>Add a team member</Subtitle>
          </View>
        </Pressable>
      )}
    </CardWithHeader>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 6,
  },
  addContainer: {
    width: "100%",
    marginTop: 4,
    position: "relative",
  },

  addGlow: {
    position: "absolute",
    left: 6,
    right: 6,
    top: 4,
    bottom: 4,
    borderRadius: 14,

    backgroundColor: ACCENT,
    opacity: 0.18,

    shadowColor: ACCENT,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  addContent: {
    height: 44,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    backgroundColor: BG_800,
    borderWidth: 1.5,
    borderColor: ACCENT,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  addIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(27,197,190,0.15)",
    borderWidth: 1,
    borderColor: "rgba(27,197,190,0.35)",
  },

  addText: {
    color: TEXT_100,
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },

  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});
