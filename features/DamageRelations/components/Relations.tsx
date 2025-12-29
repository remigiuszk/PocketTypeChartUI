import { StyleSheet, View } from "react-native";
import { Title } from "../../../shared/typohraphy/Title";
import { BG_100, BG_500 } from "../../../constants";
import { CardWithHeader } from "../../../shared/ui/CardWithHeader";

export const Relations = () => {
  return (
    <View style={styles.container}>
      <CardWithHeader
        title="Defensive Relations"
        subtitle="How much damage your typing takes"
        iconName="shield"
      >
        <View style={styles.relationsView}>
        </View>
      </CardWithHeader>
      <CardWithHeader
        title="Offensive Relations"
        subtitle="How effective your moves are"
        iconName="sword"
      >
        <View style={styles.relationsView}>
        </View>
      </CardWithHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: BG_100,
    gap:15
  },
  relationsView: {
    height: 125,
  },
});
