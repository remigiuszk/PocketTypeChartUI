import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import {
  ALERT_CANT_CREATE_MEMBER_TITLE,
  ALERT_CEANT_CREATE_MEMBER_CONTENT,
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
import { PokeType } from "../../../../TypeSelection/components/PokeType";
import { useGetAllPokeTypesQuery } from "../../../../TypeSelection/query";
import { PokeTypeModel } from "../../../../TypeSelection/types";
import { TeamMemberModel } from "../../../types";
import { MEMBER_ICONS, MemberIconDef } from "../../../../../constants/icons";
import { MemberIconSelection } from "./MemberIconSelection";

type Props = {
  showModal: boolean;
  selectedMember?: TeamMemberModel;
  onConfirm: (id: string, selectedTypes: PokeTypeModel[]) => void;
  onClose: () => void;
};

export const MemberDetails = ({
  showModal,
  selectedMember,
  onConfirm,
  onClose,
}: Props) => {
  const [selectedTypes, setSelectedTypes] = useState<PokeTypeModel[]>([]);
  const { data, isLoading, isFetching, error, refetch } = useGetAllPokeTypesQuery();

  useEffect(() => {
    setSelectedTypes(selectedMember?.selectedTypes ?? []);
  }, [selectedMember]);

  function toggleType(type: PokeTypeModel) {
    setSelectedTypes((prev) => {
      const has = prev.some((x) => x.id === type.id);
      if (has) {
        return prev.filter((x) => x.id !== type.id);
      }
      if (prev.length === 2) {
        return [prev[1], type];
      }
      return [...prev, type];
    });
  }

  function confirm() {
    if (!selectedMember) return;
    if (selectedTypes && selectedTypes.length > 0) {
      onConfirm(selectedMember.id, selectedTypes);
      onClose();
    } else {
      Alert.alert(ALERT_CANT_CREATE_MEMBER_TITLE, ALERT_CEANT_CREATE_MEMBER_CONTENT);
    }
  }

  function cancel() {
    onClose();
  }

  function onColorSelected(color: string) {}

  function onIconSelected(iconId: string) {}

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
            >
              <FlatList
                style={styles.flatList}
                data={data ?? []}
                keyExtractor={(item: PokeTypeModel) => String(item.id)}
                renderItem={({ item }) => (
                  <PokeType
                    pokeType={item}
                    isSelected={selectedTypes?.some((x) => x.id === item.id)}
                    onPress={() => toggleType(item)}
                  ></PokeType>
                )}
                numColumns={3}
              />
              <View style={styles.selectedContainer}>
                <Subtitle style={{ color: TEXT_300 }}>Currently selected:</Subtitle>
                <TwoTypesHeader
                  imageHeight={20}
                  message=""
                  sprites={selectedTypes.map((x) => x.sprite)}
                ></TwoTypesHeader>
              </View>
              <MemberIconSelection
                onColorSelected={onColorSelected}
                onIconSelected={onIconSelected}
              ></MemberIconSelection>
              <View style={styles.buttonsContainer}>
                <OptionButton onPress={confirm} style={styles.buttonStyle} type="options">
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
    gap: 12,
    backgroundColor: BG_500,
    borderRadius: 10,
    width: "99%",
  },
  flatList: {
    padding: 6,
    marginVertical: 6,
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
    paddingHorizontal: 12,
    backgroundColor: BG_500,

    borderWidth: 1,
    borderColor: PRIMARY,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    paddingHorizontal: 12,
    width: "100%",
    gap: 24,
    marginVertical: 6,
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
