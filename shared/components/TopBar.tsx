import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { ACCENT, BG_ROOT, BORDER_INTERNAL } from "../../constants";
import { IS_WEB } from "../layout/platform";
import { MutedText } from "../typohraphy/MutedText";
import { Subtitle } from "../typohraphy/Subtitle";
import DefaultButton from "../ui/DefaultButton";

type Props = {
  typesSelected?: boolean;
  clearSelection: () => void;
  teamBuilderOpen?: boolean;
  switchViews?: () => void;
};

// Below this width the brand icon and the nav tabs no longer both fit on one
// row with labels, so the labels are dropped and the tabs go icon-only.
const WEB_COMPACT_BREAKPOINT = 480;

export const TopBar = ({
  typesSelected,
  clearSelection,
  teamBuilderOpen = false,
  switchViews,
}: Props) => {
  const { width } = useWindowDimensions();
  const isCompact = width < WEB_COMPACT_BREAKPOINT;

  // Web: full-width header with the Type Chart / Team Builder nav moved in (the
  // bottom NavBar is dropped on web). Native keeps its original three-column bar.
  if (IS_WEB) {
    return (
      <View style={[styles.webContainer, isCompact && styles.webContainerCompact]}>
        <View style={styles.webBrand}>
          <Image
            style={[styles.webBrandIcon, isCompact && styles.webBrandIconCompact]}
            source={require("../../assets/img/icon.png")}
          />
        </View>

        <View style={styles.webTabs}>
          <WebNavTab
            icon="fire-flame-curved"
            label={isCompact ? "Chart" : "Type Chart"}
            active={!teamBuilderOpen}
            onPress={teamBuilderOpen ? switchViews : undefined}
            compact={isCompact}
          />
          <WebNavTab
            icon="users"
            label={isCompact ? "Team" : "Team Builder"}
            active={teamBuilderOpen}
            onPress={!teamBuilderOpen ? switchViews : undefined}
            compact={isCompact}
          />
        </View>

        <View style={styles.webAction}>
          {typesSelected && (
            <DefaultButton
              style={[styles.webButton, isCompact && styles.webButtonCompact]}
              click={clearSelection}
            >
              <Subtitle style={[styles.buttonText, isCompact && styles.buttonTextCompact]}>
                CLEAR SELECTED
              </Subtitle>
            </DefaultButton>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <View style={styles.iconClip}>
          <Image
            style={styles.iconImg}
            source={require("../../assets/img/icon.png")}
          ></Image>
        </View>
      </View>
      <View style={styles.options}>
        {typesSelected && (
          <DefaultButton style={styles.button} click={clearSelection}>
            <Subtitle style={styles.buttonText}>CLEAR SELECTED</Subtitle>
          </DefaultButton>
        )}
      </View>
    </View>
  );
};

type WebNavTabProps = {
  icon: keyof typeof FontAwesome6.glyphMap;
  label: string;
  active: boolean;
  onPress?: () => void;
  compact?: boolean;
};

const WebNavTab = ({ icon, label, active, onPress, compact = false }: WebNavTabProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.webTab,
      compact && styles.webTabCompact,
      active && styles.webTabActive,
      pressed && styles.webTabPressed,
    ]}
    onPress={active ? undefined : onPress}
  >
    <FontAwesome6 name={icon} size={compact ? 12 : 15} color={active ? ACCENT : "#555"} />
    <MutedText
      style={[
        styles.webTabLabel,
        compact && styles.webTabLabelCompact,
        active && styles.webTabLabelActive,
      ]}
    >
      {label}
    </MutedText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: "16%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_ROOT,
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  iconClip: {
    height: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImg: {
    width: "157%",
    height: "157%",
    resizeMode: "contain",
  },
  options: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: "wrap",
    height: "100%",
  },
  button: { width: "90%", padding: 4 },
  buttonText: { color: BG_ROOT, fontWeight: 800, fontSize: 12 },

  // --- Web header ---
  webContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: BG_ROOT,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_INTERNAL,
  },
  webContainerCompact: {
    gap: 8,
    paddingHorizontal: 12,
  },
  webBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  webBrandIcon: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  webBrandIconCompact: {
    width: 52,
    height: 52,
  },
  webTabs: {
    flexDirection: "row",
    gap: 8,
  },
  webTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },
  webTabCompact: {
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  webTabActive: {
    backgroundColor: "#22223a",
    borderTopColor: ACCENT,
  },
  webTabPressed: {
    opacity: 0.85,
  },
  webTabLabel: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  webTabLabelCompact: {
    fontSize: 11,
  },
  webTabLabelActive: {
    color: ACCENT,
  },
  webAction: {
    flex: 1,
    alignItems: "flex-end",
  },
  webButton: { paddingVertical: 6, paddingHorizontal: 14 },
  webButtonCompact: { paddingVertical: 4, paddingHorizontal: 8 },
  buttonTextCompact: { fontSize: 10 },
});
