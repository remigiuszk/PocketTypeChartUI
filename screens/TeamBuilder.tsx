import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { BG_100 } from "../constants";
import { TeamList } from "../features/TeamBuilder/components/team/TeamList";
import { TeamAnalysis } from "../features/TeamBuilder/components/teamAnalysis/TeamAnalysis";
import { TeamMemberModel } from "../features/TeamBuilder/types";
import { NavBar } from "../shared/components/NavBar";
import { TopBar } from "../shared/components/TopBar";
import { Subtitle } from "../shared/typohraphy/Subtitle";
import { Title } from "../shared/typohraphy/Title";

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
        <View style={{ padding: 10, flex: 1, gap: 16 }}>
          <Title>Welcome to the TeamBuilder</Title>
          <Subtitle>
            Select up to 6 team members to view your entire team&apos;s relations and
            suggestions on how to improve.
          </Subtitle>
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
