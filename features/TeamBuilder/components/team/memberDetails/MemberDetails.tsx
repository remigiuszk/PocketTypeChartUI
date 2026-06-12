import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { BG_BUTTON, BG_LAYOUT, test, TEXT_300 } from "../../../../../constants";
import { Error } from "../../../../../shared/components/Error";
import { Loading } from "../../../../../shared/components/Loading";
import { IS_WEB } from "../../../../../shared/layout/platform";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../../shared/ui/CardWithHeader";
import { TwoTypesHeader } from "../../../../../shared/ui/TwoTypesHeader";
import { PokeTypeList } from "../../../../TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { PokeTypeModel } from "../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../types";
import { MemberIconSelection } from "./MemberIconSelection";
import { MemberName } from "./MemberName";

type PillTint = {
  bgIdle: string;
  bgActive: string;
  border: string;
  content: string;
  glow: string;
};

const CONFIRM_TINT: PillTint = {
  bgIdle: "rgba(27,197,190,0.12)",
  bgActive: "rgba(27,197,190,0.22)",
  border: "#1BC5BE",
  content: "#bff0ed",
  glow: "#1BC5BE",
};

const CANCEL_TINT: PillTint = {
  bgIdle: "rgba(255,107,107,0.10)",
  bgActive: "rgba(255,107,107,0.18)",
  border: "rgba(255,107,107,0.55)",
  content: "#ffb3b3",
  glow: "#ff6b6b",
};

// Pill button with a soft glow on hover (web) / press (native). No icon circle.
const PillButton = ({
  label,
  icon,
  tint,
  onPress,
}: {
  label: string;
  icon: "check" | "x";
  tint: PillTint;
  onPress: () => void;
}) => {
  const [active, setActive] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setActive(true)}
      onHoverOut={() => setActive(false)}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}
      style={[
        styles.pill,
        {
          backgroundColor: active ? tint.bgActive : tint.bgIdle,
          borderColor: tint.border,
          shadowColor: tint.glow,
          shadowOpacity: active ? 0.5 : 0,
          shadowRadius: active ? 10 : 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: active ? 6 : 0,
        },
      ]}
    >
      <Feather name={icon} size={18} color={tint.content} />
      <Subtitle style={{ fontSize: 16, color: tint.content }}>{label}</Subtitle>
    </Pressable>
  );
};

type Props = {
  showModal: boolean;
  selectedMember: TeamMemberModel;
  onConfirm: (id: string, newMember: TeamMemberModel) => void;
  onClose: () => void;
  isEdit?: boolean;
};

export const MemberDetails = ({
  showModal,
  selectedMember,
  onConfirm,
  onClose,
  isEdit = false,
}: Props) => {
  const [newMember, setNewMember] = useState<TeamMemberModel>(selectedMember);
  const { data, isLoading, isFetching, error, refetch } = useGetAllPokeTypesQuery();

  useEffect(() => {
    setNewMember(selectedMember);
  }, [selectedMember]);

  function toggleType(type: PokeTypeModel) {
    setNewMember((prev) => {
      const has = prev.types.some((x) => x.id === type.id);
      if (has) {
        return { ...prev, types: prev.types.filter((x) => x.id !== type.id) };
      }
      if (prev.types.length === 2) {
        return { ...prev, types: [prev.types[1], type] };
      }
      return { ...prev, types: [...prev.types, type] };
    });
  }

  function confirm() {
    onConfirm(selectedMember.id, newMember);
  }

  function cancel() {
    onClose();
  }

  function onNameChange(name: string) {
    setNewMember((prev) => {
      return { ...prev, name: name };
    });
  }

  function onColorSelected(color: string) {
    setNewMember((prev) => {
      return { ...prev, iconColor: color };
    });
  }

  function onIconSelected(iconId: string) {
    setNewMember((prev) => {
      return { ...prev, iconId: iconId };
    });
  }

  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="slide"
      statusBarTranslucent={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <View style={styles.backdrop}>
        <View style={[styles.container, IS_WEB && styles.containerWeb]}>
          {isLoading || isFetching ? (
            <Loading />
          ) : error ? (
            <Error onRetry={refetch} />
          ) : (
            <CardWithHeader
              title={isEdit ? "Edit member" : "New member"}
              titleStyle={[styles.headerText, IS_WEB && styles.headerTextWeb]}
              style={{ gap: 12 }}
            >
              <View style={styles.content}>
                <MemberName
                  onNameChange={onNameChange}
                  memberName={newMember.name}
                ></MemberName>
                <PokeTypeList
                  memberTypes={newMember.types}
                  data={data}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  error={error}
                  refetch={refetch}
                  onToggle={toggleType}
                ></PokeTypeList>
                <View style={styles.selectedContainer}>
                  <Subtitle style={{ color: TEXT_300 }}>Currently selected:</Subtitle>
                  <TwoTypesHeader
                    imageHeight={20}
                    message=""
                    sprites={newMember.types.map((x) => x.sprite)}
                  ></TwoTypesHeader>
                </View>
                <MemberIconSelection
                  onColorSelected={onColorSelected}
                  onIconSelected={onIconSelected}
                  selectedColor={newMember.iconColor}
                  selectedIconId={newMember.iconId}
                ></MemberIconSelection>
                <View style={styles.buttonsContainer}>
                  <PillButton
                    label="Confirm"
                    icon="check"
                    tint={CONFIRM_TINT}
                    onPress={confirm}
                  />
                  <PillButton
                    label="Cancel"
                    icon="x"
                    tint={CANCEL_TINT}
                    onPress={cancel}
                  />
                </View>
              </View>
            </CardWithHeader>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: BG_LAYOUT,
    borderRadius: 10,
    width: "98%",
  },
  containerWeb: { maxWidth: 520 },
  // Title styled like the screen section headers (TeamBuilderHeader text).
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginVertical: 8,
    color: TEXT_300,
    textShadowColor: test,
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },
  headerTextWeb: { fontFamily: "Inter_600SemiBold" },
  content: {
    gap: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  selectedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    gap: 6,
    backgroundColor: BG_BUTTON,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    width: "100%",
    gap: 24,
    marginBottom: 12,
  },
  pill: {
    width: "40%",
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 999,
    borderWidth: 1.5,
  },
});
