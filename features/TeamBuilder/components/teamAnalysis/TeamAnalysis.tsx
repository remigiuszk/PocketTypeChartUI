import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import { TeamMemberModel } from "../../types";
import { MembersPreview } from "./membersPreview/MembersPreview";
import { TeamOverview } from "./teamOverview/TeamOverview";

type Props = {
  style?: ViewStyle | ViewStyle[];
  currentTeam: TeamMemberModel[];
  onChangeTeam: () => void;
};

export const TeamAnalysis = ({ style, currentTeam, onChangeTeam }: Props) => {
  // const { data, isLoading, isFetching, error, refetch } =
  //   useGetAllRelationsQuery();
  return (
    <View style={[styles.container, style]}>
      <MembersPreview
        onChangeTeam={onChangeTeam}
        teamMembers={currentTeam}
      ></MembersPreview>
      <ScrollView>
        <TeamOverview></TeamOverview>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "column", gap: 12 },
});
