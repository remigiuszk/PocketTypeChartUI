import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import { BG_100, BG_800, MEMBERS_COLORS, TEXT_300 } from "../../../../../constants";
import { MEMBER_ICONS } from "../../../../../constants/icons";

type Props = {
  style?: ViewStyle | ViewStyle[];
  onIconSelected: (iconId: string) => void;
  onColorSelected: (selectedColor: string) => void;
  selectedIconId: string;
  selectedColor: string;
};

export const MemberIconSelection = ({
  style,
  onIconSelected,
  onColorSelected,
  selectedIconId,
  selectedColor,
}: Props) => {
  function selectIcon(iconId: string) {
    onIconSelected(iconId);
  }

  function selectColor(color: string) {
    onColorSelected(color);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.selectionContainer}>
        <View style={styles.scrollRow}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
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
                  <IconComp name={icon.name} size={32} color={selectedColor} />
                </Pressable>
              );
            })}
          </ScrollView>
          <LinearGradient
            colors={["transparent", BG_100]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scrollHint}
            pointerEvents="none"
          >
            <Feather name="chevron-right" size={20} color="white" />
          </LinearGradient>
        </View>
      </View>
      <View style={styles.selectionContainer}>
        <View style={styles.scrollRow}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {MEMBERS_COLORS.map((color) => {
              return (
                <Pressable
                  style={[
                    styles.itemContainer,
                    selectedColor === color && styles.selected,
                  ]}
                  key={color}
                  onPress={() => selectColor(color)}
                >
                  <View
                    style={{
                      backgroundColor: color,
                      width: "100%",
                      height: "100%",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  ></View>
                </Pressable>
              );
            })}
          </ScrollView>
          <LinearGradient
            colors={["transparent", BG_100]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scrollHint}
            pointerEvents="none"
          >
            <Feather name="chevron-right" size={20} color="white" />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", gap: 12 },
  selectionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  itemContainer: {
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent",
    backgroundColor: BG_800,
    padding: 3,
    width: 48,
    aspectRatio: 1 / 1,
    marginRight: 8,
  },
  selected: {
    borderColor: TEXT_300,
  },
  scrollRow: {
    position: "relative",
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingRight: 32, // miejsce żeby ostatni element nie był pod gradientem
    alignItems: "center",
  },
  scrollHint: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
