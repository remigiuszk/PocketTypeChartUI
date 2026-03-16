import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { BG_BUTTON, BORDER_DEFAULT, TEXT_100 } from "../../../../../constants";
import { MEMBER_ICONS } from "../../../../../constants/icons";
import { TwoTypesHeader } from "../../../../../shared/ui/TwoTypesHeader";
import { TeamMemberModel } from "../../../types";

type Props = {
  style?: ViewStyle | ViewStyle[];
  member: TeamMemberModel;
};

export const MemberPreview = ({ style, member }: Props) => {
  const icon = MEMBER_ICONS.find((x) => x.id === member.iconId)!;
  const IconComp = icon.library;

  return (
    <View style={[styles.container, style]}>
      <IconComp name={icon.name} size={21} color={member.iconColor} />
      <View style={styles.nameTypeContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          style={[styles.text, style]}
        >
          {member.name}
        </Text>
        <TwoTypesHeader
          imageHeight={14}
          message=""
          sprites={member.types.map((x) => x.sprite)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    padding: 3,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    backgroundColor: BG_BUTTON,
  },
  nameTypeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  text: {
    fontWeight: 600,
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_100,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    flexShrink: 1,
  },
});
