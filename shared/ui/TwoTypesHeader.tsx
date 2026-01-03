import { Image, StyleSheet, View } from "react-native";
import { Subtitle } from "../typohraphy/Subtitle";
import { BG_800, PADDING, TEXT_300 } from "../../constants";

type Props = {
  sprites: string[];
};

export const TwoTypesHeader = ({ sprites }: Props) => {
  return (
    <View style={styles.attackingTypeHeader}>
      <Image
        source={{ uri: sprites[0] }}
        style={styles.attackingTypeImage}
      ></Image>
      {sprites.length == 2 && (
        <View style={styles.twoTypesContainer}>
          <Subtitle style={styles.attackingTypeHeaderText}>/</Subtitle>
          <Image
            source={{ uri: sprites[1] }}
            style={styles.attackingTypeImage}
          ></Image>
        </View>
      )}
      <Subtitle style={styles.attackingTypeHeaderText}>POKEMON ARE:</Subtitle>
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
    padding: 4,
  },
  twoTypesContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
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
