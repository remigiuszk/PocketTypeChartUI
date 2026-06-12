import { Feather } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import {
  ALERT_CANT_ANALYZE_CONTENT,
  ALERT_CANT_ANALYZE_TITLE,
  ALERT_CANT_CREATE_MEMBER_TITLE,
  ALERT_CANT_CREATE_NAME_EXISTS,
  ALERT_CANT_CREATE_NO_NAME,
  ALERT_CANT_CREATE_NO_TYPES,
  BORDER_DEFAULT,
  BORDER_INTERNAL,
  EVALUATE_BACKGROUND,
  MEMBERS_COLORS,
} from "../../../../constants";
import { MEMBER_ICONS } from "../../../../constants/icons";
import { IS_WEB } from "../../../../shared/layout/platform";
import { loadTeamMembers, saveTeamMembers } from "../../../../shared/storage/teamStorage";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { Card } from "../../../../shared/ui/Card";
import { ConfirmModal } from "../../../../shared/ui/ConfirmModal";
import { OptionButton } from "../../../../shared/ui/OptionButton";
import { TeamMemberModel } from "../../types";
import { MemberDetails } from "./memberDetails/MemberDetails";
import { TeamMember } from "./TeamMember";

// "Add a new member" underline-tab colors (idle vs hover/press).
const ADD_IDLE = "#9fd3d0";
const ADD_ACTIVE = "#cdeeec";
const ADD_BORDER_IDLE = "#2f4f53";
const ADD_BORDER_ACTIVE = MEMBERS_COLORS[0]; // brand teal #1BC5BE

type Props = {
  onAnalyze: (teamMembers: TeamMemberModel[]) => void;
};

export const TeamList = ({ onAnalyze }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMemberModel | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ title: string; message: string } | null>(
    null,
  );
  // Hover (web) / press (native) state for the add-member underline tab.
  const [addActive, setAddActive] = useState<boolean>(false);
  // Whether the details modal was opened to edit an existing member vs add new.
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
    setIsEditing(false);
    setShowModal(true);
  }

  function editMember(member: TeamMemberModel) {
    setSelectedMember(member);
    setIsEditing(true);
    setShowModal(true);
  }

  function deleteMember(member: TeamMemberModel) {
    setMemberToDelete(member);
  }

  function confirmDelete() {
    if (memberToDelete) {
      setTeamMembers((prev) => prev.filter((x) => x.id !== memberToDelete.id));
    }
    setMemberToDelete(null);
  }

  function cancelDelete() {
    setMemberToDelete(null);
  }

  function onConfirm(id: string, newMember: TeamMemberModel) {
    const validationResult = validateMember(newMember);

    if (validationResult.length > 0) {
      setAlertInfo({
        title: ALERT_CANT_CREATE_MEMBER_TITLE,
        message: validationResult,
      });
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
      setAlertInfo({
        title: ALERT_CANT_ANALYZE_TITLE,
        message: ALERT_CANT_ANALYZE_CONTENT,
      });
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
    <Card style={[styles.card, IS_WEB && styles.cardWeb]}>
      <ConfirmModal
        visible={alertInfo !== null}
        title={alertInfo?.title ?? ""}
        message={alertInfo?.message ?? ""}
        confirmLabel="OK"
        singleButton={true}
        onConfirm={() => setAlertInfo(null)}
        onCancel={() => setAlertInfo(null)}
      ></ConfirmModal>
      <MemberDetails
        onClose={() => setShowModal(false)}
        onConfirm={(id: string, newMember: TeamMemberModel) => onConfirm(id, newMember)}
        selectedMember={selectedMember}
        showModal={showModal}
        isEdit={isEditing}
      ></MemberDetails>
      <ConfirmModal
        visible={memberToDelete !== null}
        title="Delete team member"
        message="Are you sure you want to delete this team member?"
        confirmLabel="Yes, delete"
        cancelLabel="No"
        destructive={true}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      ></ConfirmModal>
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
          onHoverIn={() => setAddActive(true)}
          onHoverOut={() => setAddActive(false)}
          onPressIn={() => setAddActive(true)}
          onPressOut={() => setAddActive(false)}
          hitSlop={8}
          style={[
            styles.addButton,
            {
              borderColor: addActive ? ADD_BORDER_ACTIVE : ADD_BORDER_IDLE,
              backgroundColor: addActive
                ? "rgba(27,197,190,0.06)"
                : "rgba(255,255,255,0.012)",
            },
          ]}
        >
          <Feather
            name="user-plus"
            size={22}
            color={addActive ? ADD_ACTIVE : ADD_IDLE}
          />
          <Subtitle style={[styles.addText, { color: addActive ? ADD_ACTIVE : ADD_IDLE }]}>
            Add a new member
          </Subtitle>
        </Pressable>
      )}
      {teamMembers.length > 1 ? (
        <Animated.View style={{ transform: [{ scale }] }}>
          <OptionButton
            onPress={analyze}
            style={[styles.evaluateButtonStyle, IS_WEB && styles.actionButtonWeb]}
            type="info"
          >
            <Subtitle style={styles.evaluateText}>ANALYZE TEAM</Subtitle>
          </OptionButton>
        </Animated.View>
      ) : (
        <OptionButton
          disabled={true}
          onPress={analyze}
          style={[styles.inactiveButtonStyle, IS_WEB && styles.actionButtonWeb]}
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
  // Keep the team list a card on wide web screens instead of a full-bleed bar.
  cardWeb: { maxWidth: 720, alignSelf: "center", width: "100%" },
  actionButtonWeb: { maxWidth: 360 },
  // Empty roster-slot card (option F) carrying H's content/colors — a full-width
  // rounded box with a solid 2px border, centered person-plus + label.
  addButton: {
    width: "100%",
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 2,
    borderRadius: 14,
  },
  evaluateButtonStyle: {
    width: "60%",
    marginTop: 8,
    alignSelf: "center",
    height: 42,
    backgroundColor: EVALUATE_BACKGROUND,
    borderRadius: 14,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  inactiveButtonStyle: {
    width: "60%",
    marginVertical: 8,
    alignSelf: "center",
    height: 42,
    backgroundColor: BORDER_INTERNAL,
    borderColor: BORDER_DEFAULT,
    borderRadius: 14,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  addText: {
    fontSize: 14,
    letterSpacing: 1,
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
    color: BORDER_DEFAULT,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
