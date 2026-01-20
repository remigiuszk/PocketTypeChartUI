import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { BG_100 } from "../constants";
import { TeamList } from "../features/TeamBuilder/components/team/TeamList";
import { TeamAnalysis } from "../features/TeamBuilder/components/teamAnalysis/TeamAnalysis";
import { TeamMemberModel } from "../features/TeamBuilder/types";
import { NavBar } from "../shared/components/NavBar";
import { TopBar } from "../shared/components/TopBar";
import { TeamBuilderHeader } from "../shared/typohraphy/TeamBuilderHeader";
import { Card } from "../shared/ui/Card";

type Props = {
  switchViews: () => void;
};

export const TeamBuilder = ({ switchViews }: Props) => {
  // const { data, isLoading, isFetching, error, refetch } =
  //   useGetAllRelationsQuery();
  const [analysisOn, setAnalysisOn] = useState<boolean>(false);

  function onEvaluate(teamMembers: TeamMemberModel[]) {
    setAnalysisOn(true);
  }

  return (
    <View style={styles.container}>
      <TopBar clearSelection={() => {}}></TopBar>
      {analysisOn ? (
        <View style={{ padding: 10, flex: 1, gap: 16 }}>
          <TeamAnalysis></TeamAnalysis>
        </View>
      ) : (
        <View style={{ padding: 6, flex: 1, gap: 16 }}>
          <Card>
            <TeamBuilderHeader
              title="WELCOME TO THE TEAMBUILDER"
              subtitle="Select up to 6 team members to analyze synergy and get improvement reccomendations"
            />
          </Card>
          <TeamList
            onEvaluate={(teamMembers: TeamMemberModel[]) => onEvaluate(teamMembers)}
          ></TeamList>
        </View>
      )}
      <NavBar switchViews={switchViews} teamBuilderOpen={true}></NavBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_100,
    flex: 1,
  },
  content: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
