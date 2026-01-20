import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, View } from "react-native";

import { ACCENT, BG_800, ERROR_CONTENT, TEXT_300 } from "../../../../constants";
import { MEMBER_ICONS } from "../../../../constants/icons";
import { Subtitle } from "../../../../shared/typohraphy/Subtitle";
import { OPTION_BUTTON_TYPE, OptionButton } from "../../../../shared/ui/OptionButton";
import { TwoTypesHeader } from "../../../../shared/ui/TwoTypesHeader";
import { TeamMemberModel } from "../../types";

type Props = {
  editMember: () => void;
  deleteMember: () => void;
  member: TeamMemberModel;
};

export const TeamMember = ({ editMember, deleteMember, member }: Props) => {
  const icon = MEMBER_ICONS.find((x) => x.id === member.iconId)!;
  const IconComp = icon.library;

  return (
    <View style={styles.container}>
      <IconComp name={icon.name} size={42} color={member.iconColor} />
      <View style={styles.nameTypeContainer}>
        <Subtitle style={styles.textStyle}>{member.name}</Subtitle>
        <TwoTypesHeader
          imageHeight={18}
          message=""
          sprites={member.types.map((x) => x.sprite)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <OptionButton onPress={editMember} type={OPTION_BUTTON_TYPE.Options}>
          <Feather name="edit-2" size={18} color={ACCENT} />
        </OptionButton>

        <OptionButton onPress={deleteMember} type={OPTION_BUTTON_TYPE.Error}>
          <Feather name="trash" size={18} color={ERROR_CONTENT} />
        </OptionButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG_800,
    gap: 12,
  },
  nameTypeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    gap: 1,
  },
  textStyle: {
    color: TEXT_300,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: 800,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
