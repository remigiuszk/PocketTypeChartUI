import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_LAYOUT,
  EVALUATE_BACKGROUND,
  OPTIONS_BG,
  OPTIONS_BORDER,
} from "../../../../../constants";
import { IS_WEB } from "../../../../../shared/layout/platform";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { OptionButton } from "../../../../../shared/ui/OptionButton";
import { TeamMemberModel } from "../../../types";
import { MemberPreview } from "./MemberPreview";

// react-native-web supports CSS "sticky" positioning at runtime, but RN's own
// ViewStyle typing doesn't know about it — cast around the type gap.
const STICKY_WEB_STYLE = { position: "sticky", top: 0, zIndex: 20 } as unknown as ViewStyle;

type Props = {
  style?: ViewStyle | ViewStyle[];
  teamMembers: TeamMemberModel[];
  onChangeTeam: () => void;
};

const SCROLL_STEP = 180;

export const MembersPreview = ({ style, teamMembers, onChangeTeam }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const [scale] = useState(() => new Animated.Value(1));
  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const scrollable = contentWidth > viewWidth + 1;
  const canLeft = scrollX > 2;
  const canRight = scrollX + viewWidth < contentWidth - 2;

  const scrollBy = (delta: number) =>
    scrollRef.current?.scrollTo({ x: Math.max(0, scrollX + delta), animated: true });
  const thumbWidth =
    contentWidth > 0
      ? Math.min(viewWidth, (viewWidth / contentWidth) * viewWidth)
      : viewWidth;
  const thumbLeft =
    contentWidth > 0
      ? Math.max(
          0,
          Math.min((scrollX / contentWidth) * viewWidth, viewWidth - thumbWidth),
        )
      : 0;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.015, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return (
    <View style={[styles.container, IS_WEB && STICKY_WEB_STYLE, style]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <OptionButton
          style={[styles.buttonStyle, IS_WEB && styles.buttonStyleWeb]}
          onPress={onChangeTeam}
          type="info"
        >
          <FontAwesome6 name="arrows-rotate" size={15} color="#FFFFFF" style={styles.icon} />
          <Subtitle style={styles.addText}>change team</Subtitle>
        </OptionButton>
      </Animated.View>
      <View style={styles.membersContainer}>
        <View style={{ position: "relative" }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            contentContainerStyle={{ gap: 6 }}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
            onContentSizeChange={(w) => setContentWidth(w)}
            onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
            scrollEventThrottle={16}
          >
            {teamMembers.map((member: TeamMemberModel) => (
              <MemberPreview member={member} key={member.id} />
            ))}
          </ScrollView>

          {IS_WEB && canLeft && (
            <Pressable
              onPress={() => scrollBy(-SCROLL_STEP)}
              style={[styles.scrollHint, styles.scrollHintLeft]}
            >
              <LinearGradient
                colors={[BG_LAYOUT, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scrollHintFill}
              >
                <Feather name="chevron-left" size={20} color="white" />
              </LinearGradient>
            </Pressable>
          )}
          {IS_WEB && canRight && (
            <Pressable
              onPress={() => scrollBy(SCROLL_STEP)}
              style={[styles.scrollHint, styles.scrollHintRight]}
            >
              <LinearGradient
                colors={["transparent", BG_LAYOUT]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scrollHintFill}
              >
                <Feather name="chevron-right" size={20} color="white" />
              </LinearGradient>
            </Pressable>
          )}
        </View>
        {(!IS_WEB || scrollable) && (
          <View style={styles.scrollTrack}>
            <View
              style={[
                styles.scrollThumb,
                { width: thumbWidth, position: "absolute", left: thumbLeft },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: BG_LAYOUT,
  },
  membersContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 6,
    backgroundColor: BG_LAYOUT,
    borderWidth: 1,
  },
  scrollTrack: {
    height: 3,
    backgroundColor: "#2a2a3a",
    borderRadius: 2,
    marginTop: 4,
    marginHorizontal: 6,
    position: "relative",
  },
  scrollThumb: {
    height: 3,
    backgroundColor: "#4a4a6a",
    borderRadius: 2,
  },
  addIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: OPTIONS_BG,
    borderWidth: 2,
    borderColor: OPTIONS_BORDER,
  },
  icon: {
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonStyle: {
    width: "40%",
    height: 36,
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 6,
    marginLeft: 8,
    backgroundColor: EVALUATE_BACKGROUND,
    borderRadius: 14,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  buttonStyleWeb: {
    maxWidth: 360,
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
