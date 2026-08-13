import { Image, StyleSheet, View } from "react-native";

import { TEXT_300 } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";

export const NoTypesSelected = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/img/notypes.png")}
      ></Image>
      <Subtitle style={styles.header}>Waiting for type selection...</Subtitle>
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 390,
    height: 309,
    resizeMode: "contain",
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    color: TEXT_300,
    marginBottom: 4,
  },
  subHeader: { fontSize: 12 },
});
