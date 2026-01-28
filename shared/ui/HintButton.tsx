import { FontAwesome5 } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { BG_500, OPTIONS_CONTENT, TEXT_300 } from "../../constants";

type Props = {
  style?: StyleProp<ViewStyle>;
  hintText: string;
};

type AnchorRect = { x: number; y: number; width: number; height: number };

export const HintButton = ({ style, hintText }: Props) => {
  const btnRef = useRef<React.ElementRef<typeof Pressable> | null>(null);

  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  const screen = Dimensions.get("window");

  function open() {
    btnRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setVisible(true);

      opacity.setValue(0);
      scale.setValue(0.98);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }

  const close = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setAnchor(null);
    });
  };

  const placement = useMemo(() => {
    if (!anchor) return null;

    const margin = 10;
    const bubbleMaxWidth = Math.min(260, screen.width - margin * 2);
    const approxBubbleWidth = bubbleMaxWidth;

    const leftSpace = anchor.x - margin;
    const rightSpace = screen.width - (anchor.x + anchor.width) - margin;

    const side: "left" | "right" =
      rightSpace >= approxBubbleWidth || rightSpace >= leftSpace ? "right" : "left";

    const top = Math.max(margin, anchor.y - 6); // start near the icon (you can tweak)
    const bubbleTop = top; // will adjust inside render if you want smarter vertical clamp

    const bubbleLeft =
      side === "right"
        ? Math.min(screen.width - margin - bubbleMaxWidth, anchor.x + anchor.width + 8)
        : Math.max(margin, anchor.x - 8 - bubbleMaxWidth);

    // Clamp vertically so it stays on screen (simple)
    const maxTop = screen.height - margin - 80; // 80 = rough bubble height
    const clampedTop = Math.min(bubbleTop, maxTop);

    return {
      side,
      bubbleMaxWidth,
      bubbleLeft,
      bubbleTop: clampedTop,
      anchorCenterY: anchor.y + anchor.height / 2,
      anchorX: anchor.x,
      anchorW: anchor.width,
    };
  }, [anchor, screen.width, screen.height]);

  return (
    <>
      <Pressable
        ref={btnRef}
        onPress={open}
        style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed, style]}
      >
        <FontAwesome5 style={style} name="question" size={14} color={BG_500} />
      </Pressable>

      <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
        {/* Click outside to close */}
        <Pressable style={styles.backdrop} onPress={close}></Pressable>

        {anchor && placement && (
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.bubbleWrap,
              {
                left: placement.bubbleLeft,
                top: placement.bubbleTop,
                maxWidth: placement.bubbleMaxWidth,
                opacity,
                transform: [{ scale }],
              },
            ]}
          >
            {/* Arrow */}
            <View
              style={[
                styles.arrow,
                placement.side === "right" ? styles.arrowLeft : styles.arrowRight,
                {
                  top: Math.max(
                    12,
                    Math.min(44, placement.anchorCenterY - placement.bubbleTop - 6),
                  ),
                },
              ]}
            />

            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{hintText}</Text>
            </View>
          </Animated.View>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor: BG_500,
    backgroundColor: OPTIONS_CONTENT,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },

  bubbleWrap: {
    position: "absolute",
    zIndex: 9999,
  },

  bubble: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#10161a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  bubbleText: {
    color: TEXT_300,
    fontSize: 12,
    lineHeight: 16,
  },

  arrow: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "#10161a",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    transform: [{ rotate: "45deg" }],
  },

  // bubble on the RIGHT side of the icon -> arrow points left
  arrowLeft: {
    left: -5,
  },

  // bubble on the LEFT side of the icon -> arrow points right
  arrowRight: {
    right: -5,
  },
});
