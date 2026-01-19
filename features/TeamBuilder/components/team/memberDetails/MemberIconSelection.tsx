import { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { MEMBER_ICONS } from "../../../../../constants/icons";
import { MEMBERS_COLORS, TEXT_300 } from "../../../../../constants";

type Props = {
  style?: ViewStyle | ViewStyle[];
  onIconSelected: (iconId: string) => void;
  onColorSelected: (selectedColor: string) => void;
};

export const MemberIconSelection = ({
  style,
  onIconSelected,
  onColorSelected,
}: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>(MEMBERS_COLORS[0]);
  const [selectedIconId, setSelectedIconId] = useState<string>(MEMBER_ICONS[0].id);

  function selectIcon(iconId: string) {
    setSelectedIconId(iconId);
    onIconSelected(iconId);
  }

  function selectColor(color: string) {
    setSelectedColor(color);
    onColorSelected(color);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.selectionContainer}>
        {MEMBER_ICONS.map((icon) => {
          const IconComp = icon.library;
          return (
            <Pressable
              style={[
                styles.itemContainer,
                selectedIconId === icon.id && styles.selected,
              ]}
              key={icon.id}
              onPress={() => selectIcon(icon.id)}
            >
              <IconComp name={icon.name} size={26} color={selectedColor} />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.selectionContainer}>
        {MEMBERS_COLORS.map((color) => {
          return (
            <Pressable
              style={[styles.itemContainer, selectedColor === color && styles.selected]}
              key={color}
              onPress={() => selectColor(color)}
            >
              <View
                style={{ backgroundColor: color, width: "100%", height: "100%" }}
              ></View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  selectionContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 6,
  },
  itemContainer: { width: 32, height: 32 },
  selected: {
    borderColor: TEXT_300,
    borderWidth: 3,
  },
});
