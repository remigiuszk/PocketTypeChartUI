import { Image, StyleSheet, Switch, View } from "react-native";
import { BG_200, BG_500, PADDING, PRIMARY } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import { useState } from "react";

export const TopBar = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.appName}>
        <Subtitle>PocketTypeChart</Subtitle>
      </View>
      <View style={styles.icon}>
        <Image
          style={styles.iconImg}
          source={require("../../assets/img/poke.png")}
        ></Image>
      </View>
      <View style={styles.options}>
        <Switch
          trackColor={{ false: BG_200, true: BG_200 }}
          thumbColor={PRIMARY}
          ios_backgroundColor={BG_500}
        ></Switch>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "5%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_500,
    paddingHorizontal:10,
    paddingVertical:6
  },
  appName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
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
    alignItems: "flex-end",
  },
});
