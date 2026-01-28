import { Feather } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";

import {
  ACCENT,
  ALERT_CANT_ANALYZE_CONTENT,
  ALERT_CANT_ANALYZE_TITLE,
  ALERT_CANT_CREATE_MEMBER_TITLE,
  ALERT_CANT_CREATE_NAME_EXISTS,
  ALERT_CANT_CREATE_NO_NAME,
  ALERT_CANT_CREATE_NO_TYPES,
  BORDER_GRAY,
  BORDER_WHITE,
  EVALUATE_BACKGROUND,
  MEMBERS_COLORS,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
} from "../../../../constants";
import { MEMBER_ICONS } from "../../../../constants/icons";
import { loadTeamMembers, saveTeamMembers } from "../../../../shared/storage/teamStorage";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { Card } from "../../../../shared/ui/Card";
import { OptionButton } from "../../../../shared/ui/OptionButton";
import { TeamMemberModel } from "../../types";
import { MemberDetails } from "./memberDetails/MemberDetails";
import { TeamMember } from "./TeamMember";

type Props = {
  onAnalyze: (teamMembers: TeamMemberModel[]) => void;
};

export const TeamList = ({ onAnalyze }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberModel[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMemberModel>({
    id: Crypto.randomUUID(),
    name: "",
    types: [],
    iconId: MEMBER_ICONS[0].id,
    iconColor: MEMBERS_COLORS[0],
  });

  const didLoad = useRef(false);
  const scale = useRef(new Animated.Value(1)).current;

  function addMember() {
    const newMember: TeamMemberModel = {
      id: Crypto.randomUUID(),
      name: "Team member #" + (teamMembers.length + 1),
      types: [],
      iconId: MEMBER_ICONS[0].id,
      iconColor: MEMBERS_COLORS[0],
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

  function onConfirm(id: string, newMember: TeamMemberModel) {
    const validationResult = validateMember(newMember);

    if (validationResult.length > 0) {
      Alert.alert(ALERT_CANT_CREATE_MEMBER_TITLE, validationResult);
      return;
    }

    setTeamMembers((prev) => {
      if (prev.some((x) => x.id === id)) {
        return prev.map((member) =>
          member.id === newMember.id
            ? {
                ...member,
                types: newMember.types,
                name: newMember.name,
                iconId: newMember.iconId,
                iconColor: newMember.iconColor,
              }
            : member,
        );
      } else return [...prev, newMember];
    });
    setShowModal(false);
  }

  function validateMember(newMember: TeamMemberModel): string {
    if (newMember.types.length === 0) return ALERT_CANT_CREATE_NO_TYPES;

    if (newMember.name.length === 0) return ALERT_CANT_CREATE_NO_NAME;

    if (teamMembers.some((x) => x.name === newMember.name && x.id !== newMember.id))
      return ALERT_CANT_CREATE_NAME_EXISTS;

    return "";
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
    <Card style={styles.card}>
      <MemberDetails
        onClose={() => setShowModal(false)}
        onConfirm={(id: string, newMember: TeamMemberModel) => onConfirm(id, newMember)}
        selectedMember={selectedMember}
        showModal={showModal}
      ></MemberDetails>
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
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { padding: 8 },
  buttonStyle: {
    width: "100%",
    position: "relative",
    height: 42,
    borderWidth: 2,
  },
  evaluateButtonStyle: {
    width: "60%",
    marginTop: 8,
    alignSelf: "center",
    height: 42,
    backgroundColor: EVALUATE_BACKGROUND,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: OPTIONS_BG,
    borderWidth: 2,
    borderColor: OPTIONS_BORDER,
  },
  addText: {
    color: OPTIONS_CONTENT,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: 800,
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
