import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_LAYOUT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
} from "../../../../../constants";
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
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 6 }}
          showsHorizontalScrollIndicator={false}
        >
          {teamMembers.map((member: TeamMemberModel) => (
            <MemberPreview member={member} key={member.id}></MemberPreview>
          ))}
        </ScrollView>
        <LinearGradient
          colors={["transparent", "white"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fadeGradient}
          pointerEvents="none"
        />
      </View>
      {/* <OptionButton style={styles.buttonStyle} onPress={onChangeTeam} type="options">
        <FontAwesome6 name="arrows-rotate" size={18} color={OPTIONS_CONTENT} />
        <Subtitle style={styles.addText}>change team</Subtitle>
      </OptionButton> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: BG_LAYOUT,
  },
  membersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 12,
    padding: 6,
    backgroundColor: BG_LAYOUT,
    borderWidth: 1,
  },
  fadeGradient: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
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
