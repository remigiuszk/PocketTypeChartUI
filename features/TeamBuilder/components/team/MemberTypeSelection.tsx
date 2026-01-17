import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_500, PRIMARY, TEXT_300 } from "../../../../constants";
import { Error } from "../../../../shared/components/Error";
import { Loading } from "../../../../shared/components/Loading";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { CardWithHeader } from "../../../../shared/ui/CardWithHeader";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";
import { PokeType } from "../../../TypeSelection/components/PokeType";
import { useGetAllPokeTypesQuery } from "../../../TypeSelection/query";
import { PokeTypeModel } from "../../../TypeSelection/types";
import { TeamMemberModel } from "../../types";

type Props = {
  showModal: boolean;
  selectedMember?: TeamMemberModel;
  onConfirm: (id: string, selectedTypes: PokeTypeModel[]) => void;
  onClose: () => void;
};

export const MemberTypeSelection = ({
  showModal,
  selectedMember,
  onConfirm,
  onClose,
}: Props) => {
  useEffect(() => {
    setSelectedTypes(selectedMember?.selectedTypes ?? []);
  }, [selectedMember]);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAllPokeTypesQuery();

  const [selectedTypes, setSelectedTypes] = useState<PokeTypeModel[]>([]);

  const toggleType = (type: PokeTypeModel) => {
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
  };

  const confirm = () => {
    if (!selectedMember) return;
    onConfirm(selectedMember.id, selectedTypes);
    onClose();
  };

  const cancel = () => {
    onClose();
  };

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
                <Subtitle style={{ color: TEXT_300 }}>
                  Currently selected:
                </Subtitle>
                <TwoTypesHeader
                  imageHeight={20}
                  message=""
                  sprites={selectedTypes.map((x) => x.sprite)}
                ></TwoTypesHeader>
              </View>
              <View style={styles.buttonsContainer}>
                <Pressable
                  onPress={confirm}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.pressed,
                  ]}
                  hitSlop={8}
                >
                  <Feather name="check" size={18} color={ACCENT} />
                  <Subtitle style={{ fontSize: 18, color: ACCENT }}>
                    Confirm
                  </Subtitle>
                </Pressable>

                <Pressable
                  onPress={cancel}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    styles.dangerBtn,
                    pressed && styles.pressed,
                  ]}
                  hitSlop={8}
                >
                  <Feather name="x" size={18} color="#ff6b6b" />
                  <Subtitle style={{ fontSize: 18, color: "#ff6b6b" }}>
                    Cancel
                  </Subtitle>
                </Pressable>
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
    // „card” tło dopasowane do motywu
    backgroundColor: BG_500,

    // subtelny border w akcencie
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
  actionBtn: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 24,
    height: 32,

    backgroundColor: "rgba(27,197,190,0.12)",
    borderWidth: 1,
    borderColor: "rgba(27,197,190,0.28)",
  },

  dangerBtn: {
    backgroundColor: "rgba(255,107,107,0.10)",
    borderColor: "rgba(255,107,107,0.25)",
  },

  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
});
