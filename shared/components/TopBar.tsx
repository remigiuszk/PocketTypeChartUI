import { Image, StyleSheet, Switch, View } from "react-native";
import { ACCENT, BG_500, BG_800, TEXT_300 } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";

export const TopBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.appName}>
        <Subtitle style={styles.nameText}>POCKET</Subtitle>
        <Subtitle style={styles.nameText}>TYPE</Subtitle>
        <Subtitle style={styles.nameText}>CHART</Subtitle>
      </View>
      <View style={styles.icon}>
        <Image
          style={styles.iconImg}
          source={require("../../assets/img/poke.png")}
        ></Image>
      </View>
      <View style={styles.options}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_500,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  appName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    padding:6
  },
  nameText: {
    fontSize: 14,
    color: TEXT_300,
    fontWeight: "ultralight",
    fontFamily: "Raleway-Thin",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImg: {
    height: "100%",
    resizeMode: "contain",
  },
  options: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
});
