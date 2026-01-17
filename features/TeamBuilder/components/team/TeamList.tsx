import { Feather } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Alert,Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_800, PRIMARY, TEXT_300 } from "../../../../constants";
import {
  loadTeamMembers,
  saveTeamMembers,
} from "../../../../shared/storage/teamStorage";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { MemberTypeSelection } from "./MemberTypeSelection";
import { TeamMember } from "./TeamMember";

export const TeamList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel>();
  const didLoad = useRef(false);

  useEffect(() => {
    (async () => {
      const stored = await loadTeamMembers();
      if (stored && Array.isArray(stored)) {
        setTeamMembers(stored);
      }
      didLoad.current = true;
    })();
  }, []);

  useEffect(() => {
    if (!didLoad.current) return; // żeby nie nadpisać storage zanim załadujesz
    saveTeamMembers(teamMembers);
  }, [teamMembers]);

  const editMember = (member: TeamMemberModel) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const deleteMember = (member: TeamMemberModel) => {
    Alert.alert(
      "Delete team member",
      "Are you sure you want to delete this team member?",
      [
        {
          text: "Yes, delete",
          onPress: () =>
            setTeamMembers((prev) => prev.filter((x) => x.id !== member.id)),
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  const addMember = () => {
    const newMember: TeamMemberModel = {
      id: Crypto.randomUUID(),
      selectedTypes: [],
    };
    setSelectedMember(newMember);
    setShowModal(true);
  };

  return (
    <CardWithHeader
      title="Your team"
      subtitle="Select your team members' types"
      style={styles.card}
    >
      <MemberTypeSelection
        onClose={() => setShowModal(false)}
        onConfirm={(id: string, selectedTypes: PokeTypeModel[]) => {
          setTeamMembers((prev) => {
            if (prev.some((x) => x.id === id)) {
              return prev.map((m) =>
                m.id === id ? { ...m, selectedTypes: selectedTypes } : m
              );
            } else return [...prev, { id, selectedTypes }];
          });
        }}
        selectedMember={selectedMember}
        showModal={showModal}
      ></MemberTypeSelection>
      {teamMembers.map((member: TeamMemberModel) => (
        <TeamMember
          member={member}
          editMember={() => editMember(member)}
          key={member.id}
          deleteMember={() => deleteMember(member)}
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
          <View pointerEvents="none" style={styles.addGlow} />
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
    borderColor: PRIMARY,

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
    color: TEXT_300,
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
