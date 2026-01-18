import { StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle | ViewStyle[];
};

export const Evaluation = ({ style }: Props) => {
  return <View style={[styles.container, style]}></View>;
};

const styles = StyleSheet.create({
  container: {},
});
