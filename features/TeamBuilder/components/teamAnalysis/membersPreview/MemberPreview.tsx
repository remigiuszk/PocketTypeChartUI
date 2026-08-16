import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { BG_BUTTON, BORDER_DEFAULT, TEXT_100 } from "../../../../../constants";
import { MEMBER_ICONS } from "../../../../../constants/icons";
import { TwoTypesHeader } from "../../../../../shared/ui/TwoTypesHeader";
import { TeamMemberModel } from "../../../types";

type Props = {
  style?: StyleProp<ViewStyle>;
  member: TeamMemberModel;
  resistedTypeIds?: number[];
  iconSize?: number;
};

export const MemberPreview = ({
  style,
  member,
  resistedTypeIds,
  iconSize = 20,
}: Props) => {
  const icon = MEMBER_ICONS.find((x) => x.id === member.iconId)!;
  const IconComp = icon.library;

  const inResistanceContext = resistedTypeIds !== undefined;

  return (
    <View
      style={[styles.container, inResistanceContext && styles.containerResistance, style]}
    >
      <IconComp name={icon.name} size={iconSize} color={member.iconColor} />
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
        {resistedTypeIds ? (
          <View style={styles.typesRow}>
            {member.types.map((type) => {
              const resisted = resistedTypeIds.includes(type.id);
              return (
                <View
                  key={type.id}
                  style={[
                    styles.typeBorderWrap,
                    resisted
                      ? styles.typeBorderWrapHighlighted
                      : styles.typeBorderWrapDimmed,
                  ]}
                >
                  <View style={styles.typeContainer}>
                    <Image style={styles.typeImage} source={{ uri: type.sprite }} />
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <TwoTypesHeader
            imageHeight={14}
            message=""
            sprites={member.types.map((x) => x.sprite)}
          />
        )}
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
    padding: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    backgroundColor: BG_BUTTON,
  },
  containerResistance: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
    paddingHorizontal: 0,
  },
  nameTypeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  text: {
    fontWeight: 600,
    fontFamily: "System",
    textAlign: "left",
    color: TEXT_100,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    flexShrink: 1,
  },
  typesRow: {
    flexDirection: "row",
    gap: 3,
  },
  typeBorderWrap: {
    borderRadius: 3,
    borderWidth: 1.5,
  },
  typeBorderWrapHighlighted: {
    borderColor: "#e07b00",
  },
  typeBorderWrapDimmed: {
    borderColor: "transparent",
    opacity: 0.35,
  },
  typeContainer: {
    height: 13,
    aspectRatio: 200 / 44,
    borderRadius: 2,
    overflow: "hidden",
  },
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
