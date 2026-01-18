import { Feather } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";

import {
  ACCENT,
  ALERT_CANT_ANALYZE_CONTENT,
  ALERT_CANT_ANALYZE_TITLE,
  BORDER_GRAY,
  BORDER_WHITE,
  INFO_BORDER,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
} from "../../../../constants";
import { loadTeamMembers, saveTeamMembers } from "../../../../shared/storage/teamStorage";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { OptionButton } from "../../../../shared/ui/OptionButton";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";
import { MemberTypeSelection } from "./MemberTypeSelection";
import { TeamMember } from "./TeamMember";

type Props = {
  onEvaluate: (teamMembers: TeamMemberModel[]) => void;
};

export const TeamList = ({ onEvaluate: onAnalyze }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel>();

  const didLoad = useRef(false);
  const scale = useRef(new Animated.Value(1)).current;

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

  function analyze() {
    if (teamMembers && teamMembers.length > 1) {
      onAnalyze(teamMembers);
    } else {
      Alert.alert(ALERT_CANT_ANALYZE_TITLE, ALERT_CANT_ANALYZE_CONTENT);
    }
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

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.03, // jak mocno "puchnie"
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [scale]);

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
      {teamMembers.length > 1 ? (
        <Animated.View style={{ transform: [{ scale }] }}>
          <OptionButton onPress={analyze} style={styles.evaluateButtonStyle} type="info">
            <Subtitle style={styles.evaluateText}>ANALYZE TEAM</Subtitle>
          </OptionButton>
        </Animated.View>
      ) : (
        <OptionButton
          disabled={true}
          onPress={analyze}
          style={styles.inactiveButtonStyle}
          type="info"
        >
          <Subtitle style={styles.inactiveText}>ANALYZE TEAM</Subtitle>
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
    position: "relative",
  },
  evaluateButtonStyle: {
    width: "60%",
    marginVertical: 8,
    alignSelf: "center",
    height: 42,
    backgroundColor: INFO_BORDER,
    borderRadius: 14,

    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  inactiveButtonStyle: {
    width: "60%",
    marginVertical: 8,
    alignSelf: "center",
    height: 42,
    backgroundColor: BORDER_GRAY,
    borderColor: BORDER_GRAY,
    borderRadius: 14,

    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
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
  evaluateText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.8,

    // outline
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  inactiveText: {
    color: BORDER_WHITE,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
