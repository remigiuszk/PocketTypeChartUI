import { StyleSheet, View, ViewStyle } from "react-native";

import { WEB_CONTENT_WIDTH } from "../../../../constants/style";
import { IS_WEB } from "../../../../shared/layout/platform";
import { TeamMemberModel } from "../../types";
import { MembersPreview } from "./membersPreview/MembersPreview";
import { TeamOverview } from "./teamOverview/TeamOverview";

type Props = {
  style?: ViewStyle | ViewStyle[];
  currentTeam: TeamMemberModel[];
  onChangeTeam: () => void;
};

export const TeamAnalysis = ({ style, currentTeam, onChangeTeam }: Props) => {
  return (
    <View style={[styles.container, IS_WEB ? styles.containerWeb : styles.containerNative, style]}>
      <MembersPreview
        onChangeTeam={onChangeTeam}
        teamMembers={currentTeam}
      ></MembersPreview>
      <TeamOverview currentTeam={currentTeam}></TeamOverview>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "column", gap: 12 },
  containerNative: { flex: 1 },
  // Cap the analysis column on web so the cards read as cards, not full-bleed bars.
  containerWeb: { maxWidth: WEB_CONTENT_WIDTH, alignSelf: "center" },
});
