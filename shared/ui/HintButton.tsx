import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import {
  ACCENT,
  BG_BUTTON,
  BG_CARD,
  BG_INTERNAL,
  BORDER_DEFAULT,
  BORDER_INTERNAL,
  TEXT_300,
  TEXT_MUTED,
} from "../../constants";

type SpriteItem = { id: number; sprite: string };

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  leadType?: { sprite: string };
  hintText: string;
  accentColor: string;
  icon: React.ReactNode;
  suggestedTypes?: SpriteItem[];
};

export const HintButton = ({
  style,
  title,
  leadType,
  hintText,
  accentColor,
  icon,
  suggestedTypes,
}: Props) => {
  const [visible, setVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const hasSuggestedTypes = !!suggestedTypes && suggestedTypes.length > 0;

  return (
    <>
      <Pressable
        onPress={open}
        style={({ pressed }) => [styles.triggerBtn, pressed && styles.pressed, style]}
      >
        <FontAwesome5 name="question" size={10} color={ACCENT} />
      </Pressable>

      <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={close} />

          <View style={[styles.card, { width: screenWidth - 48 }]}>
            <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

            {/* Header */}
            <View style={styles.header}>
              {icon}
              <View style={styles.headerTitleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  {title}
                </Text>
                {leadType && (
                  <View style={styles.leadTypeContainer}>
                    <Image
                      style={styles.leadTypeImage}
                      source={{ uri: leadType.sprite }}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Scrollable sections */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={styles.hintText}>{hintText}</Text>
              </View>

              {hasSuggestedTypes && (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Consider adding</Text>
                  <View style={styles.spriteList}>
                    {suggestedTypes!.map((t) => (
                      <View key={t.id} style={styles.spriteWrap}>
                        <Image
                          style={styles.sprite}
                          source={{ uri: t.sprite }}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={[styles.section, styles.sectionLast]}>
                <Text style={styles.sectionLabel}>All related relations</Text>
                <Text style={styles.placeholderText}>Coming soon</Text>
              </View>
            </ScrollView>

            {/* Bottom close button */}
            <View style={styles.footer}>
              <Pressable
                onPress={close}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && styles.closeBtnPressed,
                ]}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  triggerBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: BG_INTERNAL,
    borderWidth: 1.5,
    borderColor: BORDER_DEFAULT,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    overflow: "hidden",
    maxHeight: "80%",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_INTERNAL,
  },
  headerTitleRow: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 3,
  },
  headerTitle: {
    flexShrink: 1,
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_300,
    lineHeight: 18,
  },
  leadTypeContainer: {
    height: 18,
    aspectRatio: 200 / 44,
    borderRadius: 4,
    overflow: "hidden",
  },
  leadTypeImage: {
    width: "100%",
    height: "100%",
  },
  scroll: {
    flexGrow: 0,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_INTERNAL,
  },
  sectionLast: {
    borderBottomWidth: 0,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: TEXT_MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: TEXT_MUTED,
    lineHeight: 21,
  },
  spriteList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  spriteWrap: {
    height: 22,
    aspectRatio: 200 / 44,
    borderRadius: 4,
    overflow: "hidden",
  },
  sprite: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: TEXT_MUTED,
    fontStyle: "italic",
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: BORDER_INTERNAL,
  },
  closeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: BG_BUTTON,
    borderRadius: 8,
  },
  closeBtnPressed: {
    opacity: 0.75,
  },
  closeBtnText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: TEXT_300,
  },
});
