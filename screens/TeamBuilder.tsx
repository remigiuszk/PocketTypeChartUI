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
  const [analysisOn, setAnalysisOn] = useState<boolean>(false);
  const [currentTeam, setCurrentTeam] = useState<TeamMemberModel[]>([]);

  function onEvaluate(teamMembers: TeamMemberModel[]) {
    setAnalysisOn(true);
    setCurrentTeam(teamMembers);
  }

  function onChangeTeam() {
    setAnalysisOn(false);
  }

  return (
    <View style={styles.container}>
      <TopBar clearSelection={() => {}}></TopBar>
      {analysisOn ? (
        <TeamAnalysis
          onChangeTeam={onChangeTeam}
          currentTeam={currentTeam}
        ></TeamAnalysis>
      ) : (
        <View style={{ padding: 6, flex: 1, gap: 16 }}>
          <Card>
            <TeamBuilderHeader
              title="WELCOME TO THE TEAMBUILDER"
              subtitle="Select up to 6 team members to analyze synergy and get improvement reccomendations"
            />
          </Card>
          <TeamList
            onAnalyze={(teamMembers: TeamMemberModel[]) => onEvaluate(teamMembers)}
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
