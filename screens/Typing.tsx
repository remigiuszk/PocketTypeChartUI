import { StyleSheet, Text, View } from "react-native";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { Relations } from "../features/DamageRelations/components/Relations";
import { BG_100 } from "../constants";
import { TopBar } from "../shared/components/TopBar";

export const Typing = () => {
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <View style={{ padding: 10, flex: 1, gap: 16 }}>
        <PokeTypeList />
        <Relations></Relations>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_100,
    flex: 1,
  },
});
