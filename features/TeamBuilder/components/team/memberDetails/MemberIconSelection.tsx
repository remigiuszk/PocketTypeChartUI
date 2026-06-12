import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import { BG_INTERNAL, BG_ROOT, MEMBERS_COLORS, TEXT_300 } from "../../../../../constants";
import { MEMBER_ICONS } from "../../../../../constants/icons";
import { IS_WEB } from "../../../../../shared/layout/platform";

type Props = {
  style?: ViewStyle | ViewStyle[];
  onIconSelected: (iconId: string) => void;
  onColorSelected: (selectedColor: string) => void;
  selectedIconId: string;
  selectedColor: string;
};

const SCROLL_STEP = 180;

// A horizontal list that scrolls. On web a mouse wheel won't scroll it
// horizontally, so the edge gradients become clickable scroll buttons — the left
// one only appears once the list has been scrolled away from the start. On native
// the list scrolls by touch and shows a static right-edge hint.
const ScrollableRow = ({ children }: { children: ReactNode }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const canLeft = scrollX > 2;
  const canRight = scrollX + viewWidth < contentWidth - 2;

  const scrollBy = (delta: number) =>
    scrollRef.current?.scrollTo({ x: Math.max(0, scrollX + delta), animated: true });

  return (
    <View style={[styles.scrollRow, IS_WEB && styles.scrollRowWeb]}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
        onContentSizeChange={(w) => setContentWidth(w)}
        onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
      >
        {children}
      </ScrollView>

      {IS_WEB ? (
        <>
          {canLeft && (
            <Pressable
              onPress={() => scrollBy(-SCROLL_STEP)}
              style={[styles.scrollHint, styles.scrollHintLeft]}
            >
              <LinearGradient
                colors={[BG_ROOT, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scrollHintFill}
              >
                <Feather name="chevron-left" size={20} color="white" />
              </LinearGradient>
            </Pressable>
          )}
          {canRight && (
            <Pressable
              onPress={() => scrollBy(SCROLL_STEP)}
              style={[styles.scrollHint, styles.scrollHintRight]}
            >
              <LinearGradient
                colors={["transparent", BG_ROOT]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scrollHintFill}
              >
                <Feather name="chevron-right" size={20} color="white" />
              </LinearGradient>
            </Pressable>
          )}
        </>
      ) : (
        <LinearGradient
          colors={["transparent", BG_ROOT]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.scrollHint, styles.scrollHintRight]}
          pointerEvents="none"
        >
          <Feather name="chevron-right" size={20} color="white" />
        </LinearGradient>
      )}
    </View>
  );
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
        <ScrollableRow>
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
        </ScrollableRow>
      </View>
      <View style={styles.selectionContainer}>
        <ScrollableRow>
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
        </ScrollableRow>
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
    backgroundColor: BG_INTERNAL,
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
  // Bound the row to the popup width on web so the horizontal list scrolls
  // inside the modal instead of overflowing past its edges.
  scrollRowWeb: {
    width: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingRight: 32, // miejsce żeby ostatni element nie był pod gradientem
    alignItems: "center",
  },
  scrollHint: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  scrollHintRight: { right: 0 },
  scrollHintLeft: { left: 0 },
  scrollHintFill: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
