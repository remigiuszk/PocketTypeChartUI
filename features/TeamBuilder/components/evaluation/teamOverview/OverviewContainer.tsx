import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import {
  ERROR_BG,
  ERROR_BORDER,
  ERROR_CONTENT,
  ERROR_SUBCONTENT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
  OPTIONS_SUBCONTENT,
  PADDING,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";

export const CONTAINER_TYPE = {
  Weaknesses: "weaknesses",
  Strenghts: "strenghts",
} as const;

export type ContainerType = (typeof CONTAINER_TYPE)[keyof typeof CONTAINER_TYPE];

type Props = {
  type: ContainerType;
  style?: ViewStyle | ViewStyle[];
};

type ContainerConfig = {
  label: string;
  containerStyle: ViewStyle;
  headerTextStyle: TextStyle;
  headerText: string;
  rowTextStyle: TextStyle;
};

export const OverviewContainer = ({ type, style }: Props) => {
  const config = CONTAINER_CONFIG[type];
  return (
    <View style={[styles.container, config.containerStyle, style]}>
      <Subtitle style={[styles.headerText]}>{config.headerText}</Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 1, borderRadius: 8, padding: PADDING },
  containerWeaknesses: { borderColor: ERROR_BORDER, backgroundColor: ERROR_BG },
  containerStrenghts: { borderColor: OPTIONS_BORDER, backgroundColor: OPTIONS_BG },

  headerText: { fontSize: 20 },
  headerTextWeaknesses: { color: ERROR_CONTENT },
  headerTextStrenghts: { color: OPTIONS_CONTENT },

  rowTextStyle: { fontSize: 14 },
  rowTextStyleWeaknesses: { color: ERROR_SUBCONTENT },
  rowTextStyleStrenghts: { color: OPTIONS_SUBCONTENT },
});

const CONTAINER_CONFIG: Record<ContainerType, ContainerConfig> = {
  weaknesses: {
    label: "Weaknesses",
    containerStyle: styles.containerWeaknesses,
    headerTextStyle: styles.headerTextWeaknesses,
    headerText: "Weaknesses",
    rowTextStyle: styles.rowTextStyleWeaknesses,
  },
  strenghts: {
    label: "Strenghts",
    containerStyle: styles.containerStrenghts,
    headerTextStyle: styles.headerTextStrenghts,
    headerText: "Strenghts",
    rowTextStyle: styles.rowTextStyleWeaknesses,
  },
};
