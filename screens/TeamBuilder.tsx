import { StyleSheet, View } from "react-native";

import { BG_100 } from "../constants";
import { useGetAllRelationsQuery } from "../features/DamageRelations/query";
import { TeamList } from "../features/TeamBuilder/components/team/TeamList";
import { NavBar } from "../shared/components/NavBar";
import { TopBar } from "../shared/components/TopBar";
import { Subtitle } from "../shared/typohraphy/Subtitle";
import { Title } from "../shared/typohraphy/Title";

type Props = {
  switchViews: () => void;
};

export const TeamBuilder = ({ switchViews }: Props) => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetAllRelationsQuery();

  return (
    <View style={styles.container}>
      <TopBar clearSelection={() => {}}></TopBar>
      <View style={{ padding: 10, flex: 1, gap: 16 }}>
        <Title>Welcome to the TeamBuilder</Title>
        <Subtitle>
          Select up to 6 team members to view your entire team's relations and
          suggestions on how to improve.
        </Subtitle>
        <TeamList></TeamList>
      </View>
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
