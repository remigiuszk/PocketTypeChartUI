import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  Animated,
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
  BG_STRENGTHS,
  BORDER_DEFAULT,
  BORDER_INTERNAL,
  TEXT_300,
  TEXT_MUTED,
  TEXT_STRENGTHS,
  TEXT_SUGGESTIONS,
} from "../../constants";
import { IS_WEB, typeImageSize } from "../layout/platform";

type SpriteItem = { id: number; sprite: string };

export type BreakdownSection = {
  label: string;
  content: ReactNode;
};

const SectionLabel = ({ text, color }: { text: string; color: string }) => (
  <View style={styles.labelRow}>
    <View style={[styles.labelDot, { backgroundColor: color }]} />
    <Text style={styles.labelText}>{text}</Text>
  </View>
);

type Props = {
  style?: StyleProp<ViewStyle>;
  title: string;
  leadType?: SpriteItem[];
  typeList?: SpriteItem[];
  typeListLabel?: string;
  hintText: string;
  accentColor: string;
  icon: React.ReactNode;
  suggestedTypes?: SpriteItem[];
  bestSuggestedTypeIds?: number[];
  breakdown?: BreakdownSection;
};

export const HintButton = ({
  style,
  title,
  leadType,
  typeList,
  typeListLabel,
  hintText,
  accentColor,
  icon,
  suggestedTypes,
  bestSuggestedTypeIds,
  breakdown,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [scale] = useState(() => new Animated.Value(1));

  const screenWidth = Dimensions.get("window").width;

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const hasSuggestedTypes = !!suggestedTypes && suggestedTypes.length > 0;
  const hasTypeList = !!typeList && typeList.length > 0;
  const bestSuggested =
    suggestedTypes?.filter((t) => bestSuggestedTypeIds?.includes(t.id)) ?? [];
  const otherSuggested =
    suggestedTypes?.filter((t) => !bestSuggestedTypeIds?.includes(t.id)) ?? [];
  const hasBestSuggestion = bestSuggested.length > 0;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return (
    <>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={open}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={({ pressed }) => [styles.triggerBtn, pressed && styles.pressed, style]}
        >
          <FontAwesome5 name="question" size={13} color={ACCENT} />
        </Pressable>
      </Animated.View>

      <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={close} />

          <View
            style={[styles.card, IS_WEB ? styles.cardWeb : { width: screenWidth - 48 }]}
          >
            <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

            {/* Header */}
            <View style={styles.header}>
              {icon}
              <View style={styles.headerTitleRow}>
                <Text style={styles.headerTitle}>{title}</Text>
                {leadType && leadType.length > 0 && (
                  <View style={styles.leadTypeGroup}>
                    {leadType.map((type) => (
                      <View key={type.id} style={styles.leadTypeContainer}>
                        <Image
                          style={styles.leadTypeImage}
                          source={{ uri: type.sprite }}
                          resizeMode="contain"
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Scrollable sections */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <Text style={styles.hintText}>{hintText}</Text>
              </View>

              {hasTypeList && (
                <View style={styles.section}>
                  <SectionLabel text={typeListLabel ?? "Types"} color={accentColor} />
                  <View style={styles.spriteList}>
                    {typeList!.map((t) => (
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

              {hasSuggestedTypes && (
                <View style={styles.section}>
                  <SectionLabel text="Consider adding" color={TEXT_SUGGESTIONS} />
                  <View
                    style={[
                      styles.spriteList,
                      hasBestSuggestion && styles.spriteListBest,
                    ]}
                  >
                    {bestSuggested.length > 0 && (
                      <View style={styles.bestGroup}>
                        <View style={styles.bestFrame} />
                        <Text style={styles.bestLabel} numberOfLines={1}>
                          Best coverage
                        </Text>
                        <View style={styles.bestGroupRow}>
                          {bestSuggested.map((t) => (
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
                    {otherSuggested.map((t) => (
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

              {breakdown && (
                <View style={[styles.section, styles.sectionLast]}>
                  <SectionLabel text={breakdown.label} color={accentColor} />
                  {breakdown.content}
                </View>
              )}
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BG_INTERNAL,
    borderWidth: 1.5,
    borderColor: ACCENT,
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
  cardWeb: {
    width: "90%",
    maxWidth: 400,
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
    alignItems: "center",
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
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_300,
    lineHeight: 20,
  },
  leadTypeGroup: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: 5,
  },
  leadTypeContainer: {
    height: typeImageSize(21),
    aspectRatio: 200 / 44,
    borderRadius: 5,
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
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 9,
  },
  labelDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  labelText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_300,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  hintText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: TEXT_MUTED,
    lineHeight: 23,
  },
  spriteList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  spriteListBest: {
    paddingTop: 24,
  },
  bestGroup: {
    position: "relative",
  },
  bestGroupRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 6,
  },
  bestFrame: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderWidth: 1.5,
    borderColor: TEXT_STRENGTHS,
    borderRadius: 6,
    backgroundColor: BG_STRENGTHS,
  },
  bestLabel: {
    position: "absolute",
    top: -21,
    left: -30,
    right: -30,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: TEXT_STRENGTHS,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  spriteWrap: {
    width: typeImageSize(21) * (200 / 44),
    height: typeImageSize(21),
    borderRadius: 5,
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
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: TEXT_300,
  },
});
