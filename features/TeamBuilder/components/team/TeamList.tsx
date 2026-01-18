import { Feather } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { OPTIONS_BG, OPTIONS_BORDER, OPTIONS_CONTENT } from "../../../../constants";
import { loadTeamMembers, saveTeamMembers } from "../../../../shared/storage/teamStorage";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { OptionButton } from "../../../../shared/ui/OptionButton";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { MemberTypeSelection } from "./MemberTypeSelection";
import { TeamMember } from "./TeamMember";

export const TeamList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel>();

  const didLoad = useRef(false);

  function addMember() {
    const newMember: TeamMemberModel = {
      id: Crypto.randomUUID(),
      selectedTypes: [],
    };
    setSelectedMember(newMember);
    setShowModal(true);
  }

  function editMember(member: TeamMemberModel) {
    setSelectedMember(member);
    setShowModal(true);
  }

  function deleteMember(member: TeamMemberModel) {
    Alert.alert(
      "Delete team member",
      "Are you sure you want to delete this team member?",
      [
        {
          text: "Yes, delete",
          onPress: () => setTeamMembers((prev) => prev.filter((x) => x.id !== member.id)),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );
  }

  function onConfirm(id: string, selectedTypes: PokeTypeModel[]) {
    setTeamMembers((prev) => {
      if (prev.some((x) => x.id === id)) {
        return prev.map((m) =>
          m.id === id ? { ...m, selectedTypes: selectedTypes } : m,
        );
      } else return [...prev, { id, selectedTypes }];
    });
  }

  useEffect(() => {
    if (!didLoad.current) return;
    saveTeamMembers(teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    (async () => {
      const stored = await loadTeamMembers();
      if (stored && Array.isArray(stored)) {
        setTeamMembers(stored);
      }
      didLoad.current = true;
    })();
  }, []);

  return (
    <CardWithHeader
      title="Your team"
      subtitle="Select your team members' types"
      style={styles.card}
    >
      <MemberTypeSelection
        onClose={() => setShowModal(false)}
        onConfirm={(id: string, selectedTypes: PokeTypeModel[]) =>
          onConfirm(id, selectedTypes)
        }
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
        <OptionButton onPress={addMember} style={styles.buttonStyle} type="options">
          <View style={styles.addIconCircle}>
            <Feather name="plus" size={18} color={OPTIONS_CONTENT} />
          </View>
          <Subtitle style={styles.addText}>Add a new member</Subtitle>
        </OptionButton>
      )}
    </CardWithHeader>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 6,
  },
  buttonStyle: {
    width: "100%",
    marginTop: 4,
    position: "relative",
    flexDirection: "row",
    gap: 6,
  },

  addIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: OPTIONS_BG,
    borderWidth: 1,
    borderColor: OPTIONS_BORDER,
  },
  addText: {
    color: OPTIONS_CONTENT,
    fontSize: 18,
    letterSpacing: 1,
  },
});
