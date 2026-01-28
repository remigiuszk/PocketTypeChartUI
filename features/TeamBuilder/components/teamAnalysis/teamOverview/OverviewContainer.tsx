import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import {
  ERROR_BG,
  ERROR_BORDER,
  ERROR_CONTENT,
  PADDING,
  STRENGHTS_BG,
  STRENGHTS_BORDER,
  STRENGHTS_CONTENT,
  SUGGESTIONS_BG,
  SUGGESTIONS_BORDER,
  SUGGESTIONS_CONTENT,
  TeamOverviewRowTextData,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { OverviewRow } from "./OverviewRow";

export const CONTAINER_TYPE = {
  Weaknesses: "weaknesses",
  Strenghts: "strenghts",
  Suggestions: "suggestions",
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
    borderColor: STRENGHTS_BORDER,
    backgroundColor: STRENGHTS_BG,
  },
  containerSuggestions: {
    borderColor: SUGGESTIONS_BORDER,
    backgroundColor: SUGGESTIONS_BG,
  },
  headerText: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  weaknessesText: {
    color: ERROR_CONTENT,
  },
  strenghtsText: {
    color: STRENGHTS_CONTENT,
  },
  suggestionsText: {
    color: SUGGESTIONS_CONTENT,
  },
});

const CONTAINER_CONFIG: Record<ContainerType, ContainerConfig> = {
  weaknesses: {
    label: "Weaknesses",
    containerStyle: styles.containerWeaknesses,
    headerTextStyle: styles.weaknessesText,
    headerText: "Weaknesses",
    rowTextStyle: styles.weaknessesText,
  },
  strenghts: {
    label: "Strenghts",
    containerStyle: styles.containerStrenghts,
    headerTextStyle: styles.strenghtsText,
    headerText: "Strenghts",
    rowTextStyle: styles.strenghtsText,
  },
  suggestions: {
    label: "Suggestions",
    containerStyle: styles.containerSuggestions,
    headerTextStyle: styles.suggestionsText,
    headerText: "Suggestions",
    rowTextStyle: styles.suggestionsText,
  },
};
