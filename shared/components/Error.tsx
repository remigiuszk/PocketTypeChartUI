import { Image, StyleSheet, View } from "react-native";

import { TEXT_100 } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import { CONFIRM_TINT, PillButton } from "../ui/PillButton";

type ErrorStateProps = {
  onRetry: () => void;
};

export const Error = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/img/error.png")}></Image>
      <Subtitle style={styles.header}>Connection error</Subtitle>
      <PillButton
        label="Refresh"
        icon="refresh-cw"
        tint={CONFIRM_TINT}
        onPress={onRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  image: {
    width: 260,
    height: 175,
    resizeMode: "contain",
    marginBottom: 8,
  },
  header: {
    fontSize: 18,
    color: TEXT_100,
    fontFamily: "Inter_300Light",
    marginBottom: 12,
  },
});
