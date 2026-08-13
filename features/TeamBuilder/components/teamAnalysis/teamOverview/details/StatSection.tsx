import { StyleSheet, View } from "react-native";

import { BORDER_DEFAULT, BORDER_INTERNAL, TEXT_MUTED } from "../../../../../../constants";
import { SectionLabel } from "../../../../../../shared/typohraphy/SectionLabel";
import { StatRow, StatRowConfig } from "./StatRow";

type Props = {
  label: string;
  rows: StatRowConfig[];
  isFirst?: boolean;
};

export const StatSection = ({ label, rows, isFirst }: Props) => (
  <View style={[styles.section, !isFirst && styles.sectionBorder]}>
    <View style={styles.header}>
      <SectionLabel style={styles.headerLabel}>{label}</SectionLabel>
    </View>
    <View style={styles.rows}>
      {rows.map((row, i) => (
        <StatRow key={row.label} {...row} isFirst={i === 0} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {},
  sectionBorder: {
    borderTopWidth: 1,
    borderTopColor: BORDER_DEFAULT,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_INTERNAL,
  },
  headerLabel: {
    color: TEXT_MUTED,
    fontSize: 11,
  },
  rows: {
    flexDirection: "column",
  },
});
