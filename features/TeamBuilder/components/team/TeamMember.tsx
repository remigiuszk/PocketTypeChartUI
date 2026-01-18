import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, View } from "react-native";

import { ACCENT, BG_1000, BORDER_WHITE, ERROR_CONTENT } from "../../../../constants";
import { OPTION_BUTTON_TYPE, OptionButton } from "../../../../shared/ui/OptionButton";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";
import { TeamMemberModel } from "../../types";

type Props = {
  editMember: () => void;
  deleteMember: () => void;
  member: TeamMemberModel;
};

export const TeamMember = ({ editMember, deleteMember, member }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TwoTypesHeader
          imageHeight={28}
          message=""
          sprites={member.selectedTypes.map((x) => x.sprite)}
          style={styles.types}
        />

        <View style={styles.buttonsContainer}>
          <OptionButton onPress={editMember} type={OPTION_BUTTON_TYPE.Options}>
            <Feather name="edit-2" size={18} color={ACCENT} />
          </OptionButton>

          <OptionButton onPress={deleteMember} type={OPTION_BUTTON_TYPE.Error}>
            <Feather name="trash" size={18} color={ERROR_CONTENT} />
          </OptionButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
    position: "relative",
  },

  content: {
    height: 44,
    borderRadius: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG_1000,
    borderWidth: 1,
    borderColor: BORDER_WHITE,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  types: {
    width: "70%",
    height: 34,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
