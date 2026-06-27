import { useEffect, useState } from "react";
import { Keyboard, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import {
  BG_BUTTON,
  BG_LAYOUT,
  ERROR_CONTENT,
  TEXT_300,
  TEXT_SHADOW,
} from "../../../../../constants";
import { Error } from "../../../../../shared/components/Error";
import { Loading } from "../../../../../shared/components/Loading";
import { IS_WEB } from "../../../../../shared/layout/platform";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../../shared/ui/CardWithHeader";
import {
  CANCEL_TINT,
  CONFIRM_TINT,
  PillButton,
} from "../../../../../shared/ui/PillButton";
import { TwoTypesHeader } from "../../../../../shared/ui/TwoTypesHeader";
import { PokeTypeList } from "../../../../TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { PokeTypeModel } from "../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../types";
import { MemberIconSelection } from "./MemberIconSelection";
import { MemberName } from "./MemberName";

type ValidationError = { field: "name" | "types"; message: string };

type Props = {
  showModal: boolean;
  selectedMember: TeamMemberModel;
  onConfirm: (id: string, newMember: TeamMemberModel) => ValidationError | null;
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
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const { data, isLoading, isFetching, error, refetch } = useGetAllPokeTypesQuery();

  useEffect(() => {
    setNewMember(selectedMember);
    setValidationError(null);
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
    if (validationError?.field === "types") setValidationError(null);
  }

  function confirm() {
    if (newMember.types.length === 0) {
      setValidationError({ field: "types", message: "Please select at least one type." });
      return;
    }
    if (newMember.name.trim().length === 0) {
      setValidationError({ field: "name", message: "Please enter a name." });
      return;
    }
    const result = onConfirm(selectedMember.id, newMember);
    if (result) setValidationError(result);
  }

  function cancel() {
    onClose();
  }

  function onNameChange(name: string) {
    setNewMember((prev) => ({ ...prev, name }));
    if (validationError?.field === "name") setValidationError(null);
  }

  function onColorSelected(color: string) {
    setNewMember((prev) => ({ ...prev, iconColor: color }));
  }

  function onIconSelected(iconId: string) {
    setNewMember((prev) => ({ ...prev, iconId: iconId }));
  }

  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="slide"
      statusBarTranslucent={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                {validationError?.field === "name" && (
                  <Text style={styles.errorText}>{validationError.message}</Text>
                )}
                <MemberName
                  onNameChange={onNameChange}
                  memberName={newMember.name}
                  hasError={validationError?.field === "name"}
                />
                <PokeTypeList
                  memberTypes={newMember.types}
                  data={data}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  error={error}
                  refetch={refetch}
                  onToggle={toggleType}
                />
                {validationError?.field === "types" && (
                  <Text style={styles.errorText}>{validationError.message}</Text>
                )}
                <View
                  style={[
                    styles.selectedContainer,
                    validationError?.field === "types" && styles.selectedContainerError,
                  ]}
                >
                  <Subtitle style={{ color: TEXT_300 }}>Currently selected:</Subtitle>
                  <TwoTypesHeader
                    imageHeight={20}
                    message=""
                    sprites={newMember.types.map((x) => x.sprite)}
                  />
                </View>
                <MemberIconSelection
                  onColorSelected={onColorSelected}
                  onIconSelected={onIconSelected}
                  selectedColor={newMember.iconColor}
                  selectedIconId={newMember.iconId}
                />
                <View style={styles.buttonsContainer}>
                  <PillButton
                    label="Confirm"
                    icon="check"
                    tint={CONFIRM_TINT}
                    onPress={confirm}
                    disabled={validationError !== null}
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
      </TouchableWithoutFeedback>
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
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginVertical: 8,
    color: TEXT_300,
    textShadowColor: TEXT_SHADOW,
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },
  headerTextWeb: { fontFamily: "Inter_600SemiBold" },
  content: {
    gap: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  errorText: {
    color: ERROR_CONTENT,
    fontSize: 12,
    textAlign: "center",
    marginBottom: -4,
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedContainerError: {
    borderColor: ERROR_CONTENT,
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
});
