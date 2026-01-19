import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import {
  ERROR_BG,
  ERROR_BORDER,
  ERROR_CONTENT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
  PADDING,
  TeamOverviewRowTextData,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { OverviewRow } from "./OverviewRow";

export const CONTAINER_TYPE = {
  Weaknesses: "weaknesses",
  Strenghts: "strenghts",
} as const;

export type ContainerType = (typeof CONTAINER_TYPE)[keyof typeof CONTAINER_TYPE];

type Props = {
  type: ContainerType;
  style?: ViewStyle | ViewStyle[];
  overViewRowTextData: TeamOverviewRowTextData[];
};

type ContainerConfig = {
  label: string;
  containerStyle: ViewStyle;
  headerTextStyle: TextStyle;
  headerText: string;
  rowTextStyle: TextStyle;
};

export const OverviewContainer = ({ type, style, overViewRowTextData }: Props) => {
  const config = CONTAINER_CONFIG[type];
  return (
    <View style={[styles.container, config.containerStyle, style]}>
      <Subtitle style={[styles.headerText, config.headerTextStyle]}>
        {config.headerText}
      </Subtitle>
      {overViewRowTextData.map((rowText) => (
        <OverviewRow
          key={rowText.mainText}
          textStyle={config.rowTextStyle}
          texts={rowText}
        ></OverviewRow>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: PADDING,
    gap: 8,
  },
  containerWeaknesses: {
    borderColor: ERROR_BORDER,
    backgroundColor: ERROR_BG,
  },
  containerStrenghts: {
    borderColor: OPTIONS_BORDER,
    backgroundColor: OPTIONS_BG,
  },

  headerText: {
    fontSize: 20,
  },
  headerTextWeaknesses: {
    color: ERROR_CONTENT,
    textTransform: "uppercase",
  },
  headerTextStrenghts: {
    color: OPTIONS_CONTENT,
    textTransform: "uppercase",
  },

  rowTextStyleWeaknesses: {
    color: ERROR_CONTENT,
  },
  rowTextStyleStrenghts: {
    color: OPTIONS_CONTENT,
  },
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
    rowTextStyle: styles.rowTextStyleStrenghts,
  },
};
