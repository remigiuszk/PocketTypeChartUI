import { StyleSheet, Text, View } from "react-native";

import { BG_500, PRIMARY, test, TEXT_100, TEXT_300 } from "../../constants";

type Props = {
  title: string;
  subtitle?: string;
};

export const TeamBuilderHeader = ({ title, subtitle }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_500,
    borderWidth: 1,
    borderColor: PRIMARY,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,

    // lekki "glow"
    shadowColor: PRIMARY,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },

    // Android glow
    elevation: 4,
  },

  title: {
    color: TEXT_300,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 2.5,
    textAlign: "center",

    textShadowColor: test,
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 1,
  },

  subtitle: {
    marginTop: 4,
    color: TEXT_100 + "AA",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
