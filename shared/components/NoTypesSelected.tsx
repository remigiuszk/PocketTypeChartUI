import { Image, StyleSheet, View } from "react-native";

import { TEXT_300 } from "../../constants";
import { IS_WEB } from "../layout/platform";
import { Subtitle } from "../typohraphy/Subtitle";

export const NoTypesSelected = () => {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, IS_WEB && styles.imageWeb]}
        source={require("../../assets/img/notypes.png")}
      ></Image>
      <Subtitle style={styles.header}>You have selected no types :( </Subtitle>
      <Subtitle style={styles.subHeader}>
        Select one from the list above to get started
      </Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: "65%",
  },
  // The page has no fixed height on web, so a percentage height collapses; use a
  // fixed pixel height (intrinsic aspect ratio scales the width).
  imageWeb: { height: 360, width: 360, marginVertical: 6 },
  header: { fontSize: 24, color: TEXT_300 },
  subHeader: { fontSize: 12 },
});
