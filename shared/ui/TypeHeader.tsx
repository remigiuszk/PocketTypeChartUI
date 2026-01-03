import { Image, StyleSheet, View } from "react-native";
import { Subtitle } from "../typohraphy/Subtitle";
import { BG_800, PADDING, TEXT_300 } from "../../constants";

type Props = {
  sprite: string;
};

export const TypeHeader = ({ sprite }: Props) => {
  return (
    <View style={styles.attackingTypeHeader}>
      <Image source={{ uri: sprite }} style={styles.attackingTypeImage}></Image>
      <Subtitle style={styles.attackingTypeHeaderText}>type moves are:</Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  attackingTypeHeader: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: PADDING / 2,
    backgroundColor: BG_800,
    borderRadius: 6,
    overflow: "hidden",
  },
  attackingTypeHeaderText: {
    color: TEXT_300,
    fontSize: 16,
  },
  attackingTypeImage: {
    aspectRatio: 200 / 44,
    height: 22,
    resizeMode: "contain",
  },
});
