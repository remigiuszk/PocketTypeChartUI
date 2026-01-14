import { Image, StyleSheet, View } from "react-native";
import { BG_100, BG_500, BORDER_100, TEXT_300 } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import DefaultButton from "../ui/DefaultButton";

type Props = {
  typesSelected?: boolean;
  clearSelection: () => void;
};

export const TopBar = ({ typesSelected, clearSelection }: Props) => {
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
          source={require("../../assets/img/icon.png")}
        ></Image>
      </View>
      <View style={styles.options}>
        {typesSelected && (
          <DefaultButton style={styles.button} click={clearSelection}>
            <Subtitle style={styles.buttonText}>CLEAR SELECTED</Subtitle>
          </DefaultButton>
        )}
      </View>
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
    borderBottomColor: BORDER_100,
    borderBottomWidth: 1,
    marginBottom:1
  },
  appName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    padding: 6,
  },
  nameText: {
    fontSize: 12,
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
    alignItems: "flex-end",
    flexWrap: "wrap",
    height: "100%",
  },
  button: { width: "90%", padding: 4 },
  buttonText: { color: BG_100, fontWeight: 800, fontSize: 12 },
});
