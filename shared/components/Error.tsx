import { StyleSheet, View } from "react-native";
import DefaultButton from "../ui/DefaultButton";
import { Subtitle } from "../typohraphy/Subtitle";
import { PADDING } from "../../constants";

type ErrorStateProps = {
  onRetry: () => void;
};

export const Error = ({ onRetry }: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <Subtitle>Something went wrong.</Subtitle>
      <DefaultButton onPress={onRetry}>
        <Subtitle>Try again</Subtitle>
      </DefaultButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: PADDING,
  },
});
