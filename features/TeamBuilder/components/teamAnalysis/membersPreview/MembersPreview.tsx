import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_500,
  BORDER_100,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { OptionButton } from "../../../../../shared/ui/OptionButton";
import { TeamMemberModel } from "../../../types";
import { MemberPreview } from "./MemberPreview";

type Props = {
  style?: ViewStyle | ViewStyle[];
  teamMembers: TeamMemberModel[];
  onChangeTeam: () => void;
};

export const MembersPreview = ({ style, teamMembers, onChangeTeam }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.membersContainer}>
        {teamMembers.map((member: TeamMemberModel) => (
          <MemberPreview member={member} key={member.id}></MemberPreview>
        ))}
      </View>
      <OptionButton style={styles.buttonStyle} onPress={onChangeTeam} type="options">
        <FontAwesome6 name="arrows-rotate" size={18} color={OPTIONS_CONTENT} />
        <Subtitle style={styles.addText}>change team</Subtitle>
      </OptionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: BG_500,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_100,
    gap: 6,
    paddingHorizontal: 6,
  },
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
    gap: 1,
    padding: 1,
    backgroundColor: BG_500,
  },
  addIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: OPTIONS_BG,
    borderWidth: 2,
    borderColor: OPTIONS_BORDER,
  },
  addText: {
    color: OPTIONS_CONTENT,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 800,
  },
  buttonStyle: {
    width: "50%",
    marginBottom: 6,
  },
});
