import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import {
  BG_LAYOUT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
} from "../../../../../constants";
import { Subtitle } from "../../../../../shared/typohraphy/Subtitle";
import { OptionButton } from "../../../../../shared/ui/OptionButton";
import { TeamMemberModel } from "../../../types";
import { MemberPreview } from "./MemberPreview";

type Props = {
  style?: ViewStyle | ViewStyle[];
  teamMembers: TeamMemberModel[];
  onChangeTeam: () => void;
};

export const MembersPreview = ({ style, teamMembers, onChangeTeam }: Props) => {
  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const thumbWidth =
    contentWidth > 0 ? (viewWidth / contentWidth) * viewWidth : viewWidth;
  const thumbLeft =
    contentWidth > 0
      ? Math.min((scrollX / contentWidth) * viewWidth, viewWidth - thumbWidth)
      : 0;

  return (
    <View style={[styles.container, style]}>
      <OptionButton style={styles.buttonStyle} onPress={onChangeTeam} type="options">
        <FontAwesome6 name="arrows-rotate" size={18} color={OPTIONS_CONTENT} />
        <Subtitle style={styles.addText}>change team</Subtitle>
      </OptionButton>
      <View style={styles.membersContainer}>
        <View style={{ position: "relative" }}>
          <ScrollView
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
        </View>
        <View style={styles.scrollTrack}>
          <View
            style={[
              styles.scrollThumb,
              { width: thumbWidth, position: "absolute", left: thumbLeft },
            ]}
          />
        </View>
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
  addText: {
    color: OPTIONS_CONTENT,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 800,
  },
  buttonStyle: {
    width: "50%",
    marginBottom: 6,
  },
});
