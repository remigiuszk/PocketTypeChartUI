import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import {
  BG_500,
  ERROR_BG,
  ERROR_BORDER,
  ERROR_CONTENT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
  PRIMARY,
  TEXT_300,
} from "../../../../../constants";
import { Error } from "../../../../../shared/components/Error";
import { Loading } from "../../../../../shared/components/Loading";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../../shared/ui/CardWithHeader";
import { OptionButton } from "../../../../../shared/ui/OptionButton";
import { TwoTypesHeader } from "../../../../../shared/ui/TwoTypesHeader";
import { PokeTypeList } from "../../../../TypeSelection/components/PokeTypeList";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { PokeTypeModel } from "../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../types";
import { MemberIconSelection } from "./MemberIconSelection";
import { MemberName } from "./MemberName";

type Props = {
  showModal: boolean;
  selectedMember: TeamMemberModel;
  onConfirm: (id: string, selectedTypes: PokeTypeModel[]) => void;
  onClose: () => void;
};

export const MemberDetails = ({
  showModal,
  selectedMember,
  onConfirm,
  onClose,
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
    if (!selectedMember) return;
    // if (selectedTypes && selectedTypes.length > 0) {
    //   onConfirm(selectedMember.id, selectedTypes);
    //   onClose();
    // } else {
    //   Alert.alert(ALERT_CANT_CREATE_MEMBER_TITLE, ALERT_CEANT_CREATE_MEMBER_CONTENT);
    // }
  }

  function cancel() {
    onClose();
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
        <View style={styles.container}>
          {isLoading || isFetching ? (
            <Loading />
          ) : error ? (
            <Error onRetry={refetch} />
          ) : (
            <CardWithHeader
              title="Select typing"
              subtitle="Choose up to two types for your team member"
              style={{ gap: 12 }}
            >
              <View style={styles.content}>
                <MemberName memberName={newMember.name}></MemberName>
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
                  <OptionButton
                    onPress={confirm}
                    style={styles.buttonStyle}
                    type="options"
                  >
                    <View style={[styles.iconCircle, styles.iconCircleOptions]}>
                      <Feather name="check" size={18} color={OPTIONS_CONTENT} />
                    </View>
                    <Subtitle
                      style={{ fontSize: 16, fontWeight: 100, color: OPTIONS_CONTENT }}
                    >
                      Confirm
                    </Subtitle>
                  </OptionButton>

                  <OptionButton onPress={cancel} style={styles.buttonStyle} type="error">
                    <View style={[styles.iconCircle, styles.iconCircleError]}>
                      <Feather name="x" size={18} color={ERROR_CONTENT} />
                    </View>
                    <Subtitle
                      style={{ fontSize: 16, fontWeight: 100, color: ERROR_CONTENT }}
                    >
                      Cancel
                    </Subtitle>
                  </OptionButton>
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
    backgroundColor: BG_500,
    borderRadius: 10,
    width: "98%",
  },
  content: {
    gap: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  selectedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 6,
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    gap: 6,
    paddingHorizontal: 6,
    backgroundColor: BG_500,

    borderWidth: 1,
    borderColor: PRIMARY,
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
  buttonStyle: {
    width: "40%",
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconCircleOptions: {
    backgroundColor: OPTIONS_BG,
    borderColor: OPTIONS_BORDER,
  },
  iconCircleError: {
    backgroundColor: ERROR_BG,
    borderColor: ERROR_BORDER,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
});
