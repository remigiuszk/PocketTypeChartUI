import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { ACCENT, BORDER_INTERNAL, TEXT_100, TEXT_MUTED } from "../../../../../../constants";
import { BodyText } from "../../../../../../shared/typohraphy/BodyText";
import { ValueText } from "../../../../../../shared/typohraphy/ValueText";
import { BreakdownSection, HintButton } from "../../../../../../shared/ui/HintButton";

export type StatRowConfig = {
  label: string;
  value: number;
  badgeColor?: string;
  hintTitle: string;
  hintText: string;
  breakdown?: BreakdownSection;
};

type Props = StatRowConfig & { isFirst?: boolean };

export const StatRow = ({
  label,
  value,
  badgeColor,
  hintTitle,
  hintText,
  breakdown,
  isFirst,
}: Props) => {
  const color = badgeColor ?? ACCENT;
  const isZero = value === 0;

  return (
    <View style={[styles.row, !isFirst && styles.rowBorder]}>
      <BodyText style={styles.label}>{label}</BodyText>
      <View
        style={[
          styles.badge,
          { backgroundColor: isZero ? "rgba(116, 116, 134, 0.12)" : `${color}20` },
        ]}
      >
        <ValueText style={[styles.badgeText, { color: isZero ? TEXT_MUTED : color }]}>
          {value}
        </ValueText>
      </View>
      <HintButton
        title={hintTitle}
        hintText={hintText}
        accentColor={color}
        icon={<AntDesign name="info-circle" size={18} color={color} />}
        breakdown={breakdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: BORDER_INTERNAL,
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: TEXT_100,
  },
  badge: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 28,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
