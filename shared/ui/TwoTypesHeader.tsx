import { Image, StyleSheet, View } from "react-native";
import { Subtitle } from "../typohraphy/Subtitle";
import { PADDING } from "../../constants";

type Props = {
  sprites: string[];
  message: string;
};

export const TwoTypesHeader = ({ sprites, message }: Props) => {
  return (
    <View style={styles.attackingTypeHeader}>
      <View style={styles.imagesContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: sprites[0] }}
            style={styles.attackingTypeImage}
          ></Image>
        </View>
        {sprites.length == 2 && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: sprites[1] }}
              style={styles.attackingTypeImage}
            ></Image>
          </View>
        )}
      </View>
      <Subtitle style={styles.attackingTypeHeaderText}>{message}</Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  attackingTypeHeader: {
    flexDirection: "row",
    gap: 4,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: PADDING / 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  attackingTypeHeaderText: {},
  attackingTypeImage: {
    aspectRatio: 200 / 44,
    height: 16,
    resizeMode: "contain",
  },
  imagesContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    borderRadius: 6,
    overflow: "hidden",
  },
});
