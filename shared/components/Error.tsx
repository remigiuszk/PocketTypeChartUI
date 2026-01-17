import { Image, StyleSheet, View } from "react-native";

import { BG_100 } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import DefaultButton from "../ui/DefaultButton";

type ErrorStateProps = {
  onRetry: () => void;
};

export const Error = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/img/error.png")}
      ></Image>
      <Subtitle style={styles.subHeader}>Something went wrong :( </Subtitle>
      <DefaultButton click={onRetry}>
        <Subtitle style={styles.buttonText}>Refresh</Subtitle>
      </DefaultButton>
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
  subHeader: { fontSize: 24, marginBottom: 6 },
  buttonText: { color: BG_100, fontWeight: 600, fontSize: 18 },
});
