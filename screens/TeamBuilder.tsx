import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { WEB_CONTENT_WIDTH } from "../constants/style";
import { TeamList } from "../features/TeamBuilder/components/team/TeamList";
import { TeamAnalysis } from "../features/TeamBuilder/components/teamAnalysis/TeamAnalysis";
import { TeamMemberModel } from "../features/TeamBuilder/types";
import { Screen } from "../shared/components/Screen";
import { IS_WEB } from "../shared/layout/platform";
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
    <Screen teamBuilderOpen={true} switchViews={switchViews}>
      {analysisOn ? (
        <TeamAnalysis onChangeTeam={onChangeTeam} currentTeam={currentTeam}></TeamAnalysis>
      ) : (
        <View
          style={[styles.builder, !IS_WEB && styles.builderNative, IS_WEB && styles.builderWeb]}
        >
          <Card>
            <TeamBuilderHeader
              title="TEAM BUILDER"
              subtitle="Select up to 6 team members to analyze synergy and get improvement reccomendations"
            />
          </Card>
          <TeamList
            onAnalyze={(teamMembers: TeamMemberModel[]) => onEvaluate(teamMembers)}
          ></TeamList>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  builder: { padding: 6, gap: 16 },
  builderNative: { flex: 1 },
  builderWeb: { maxWidth: WEB_CONTENT_WIDTH, alignSelf: "center", width: "100%" },
});
