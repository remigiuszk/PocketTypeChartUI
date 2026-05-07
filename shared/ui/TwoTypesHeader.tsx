import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Subtitle } from "../typohraphy/Subtitle";

type Props = {
  sprites: string[];
  message: string;
  imageHeight?: number;
  style?: StyleProp<ViewStyle>;
};

export const TwoTypesHeader = ({
  sprites,
  message,
  imageHeight,
  style,
}: Props) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.imagesContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: sprites[0] }}
            style={[
              styles.attackingTypeImage,
              imageHeight !== undefined ? { height: imageHeight } : undefined,
            ]}
          ></Image>
        </View>
        {sprites.length == 2 && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: sprites[1] }}
              style={[
                styles.attackingTypeImage,
                imageHeight !== undefined ? { height: imageHeight } : undefined,
              ]}
            ></Image>
          </View>
        )}
      </View>
      <Subtitle style={styles.headerText}>{message}</Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {},
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
    borderRadius: 6,
    overflow: "hidden",
  },
  imageContainer: {
    borderRadius: 6,
    overflow: "hidden",
  },
});
