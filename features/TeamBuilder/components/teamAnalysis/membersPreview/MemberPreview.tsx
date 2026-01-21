import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { TEXT_300 } from "../../../../../constants";
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
          imageHeight={11}
          message=""
          sprites={member.types.map((x) => x.sprite)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "33%",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    padding: 3,
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
    fontWeight: 800,
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_300,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    flexShrink: 1,
  },
});
