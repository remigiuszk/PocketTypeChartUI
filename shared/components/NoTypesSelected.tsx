import { Image, StyleSheet, View } from "react-native";
import { Subtitle } from "../typohraphy/Subtitle";
import { TEXT_300 } from "../../constants";

export const NoTypesSelected = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
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
    height:"65%"
  },
  header: { fontSize: 24, color: TEXT_300 },
  subHeader: {fontSize:12},
});
