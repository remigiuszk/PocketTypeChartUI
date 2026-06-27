import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { ACCENT, BG_ROOT, BORDER_INTERNAL, TEXT_300 } from "../../constants";
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

export const TopBar = ({
  typesSelected,
  clearSelection,
  teamBuilderOpen = false,
  switchViews,
}: Props) => {
  // Web: full-width header with the Type Chart / Team Builder nav moved in (the
  // bottom NavBar is dropped on web). Native keeps its original three-column bar.
  if (IS_WEB) {
    return (
      <View style={styles.webContainer}>
        <View style={styles.webBrand}>
          <Image
            style={styles.webBrandIcon}
            source={require("../../assets/img/icon.png")}
          />
          <View>
            <Subtitle style={styles.webBrandText}>POCKET</Subtitle>
            <Subtitle style={[styles.webBrandText, styles.webBrandTextBold]}>
              TYPE CHART
            </Subtitle>
          </View>
        </View>

        <View style={styles.webTabs}>
          <WebNavTab
            icon="fire-flame-curved"
            label="Type Chart"
            active={!teamBuilderOpen}
            onPress={teamBuilderOpen ? switchViews : undefined}
          />
          <WebNavTab
            icon="users"
            label="Team Builder"
            active={teamBuilderOpen}
            onPress={!teamBuilderOpen ? switchViews : undefined}
          />
        </View>

        <View style={styles.webAction}>
          {typesSelected && (
            <DefaultButton style={styles.webButton} click={clearSelection}>
              <Subtitle style={styles.buttonText}>CLEAR SELECTED</Subtitle>
            </DefaultButton>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.appName}>
        <Subtitle style={styles.nameText}>POCKET</Subtitle>
        <Subtitle style={styles.nameText}>TYPE</Subtitle>
        <Subtitle style={styles.nameText}>CHART</Subtitle>
      </View>
      <View style={styles.icon}>
        <Image
          style={styles.iconImg}
          source={require("../../assets/img/icon.png")}
        ></Image>
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
};

const WebNavTab = ({ icon, label, active, onPress }: WebNavTabProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.webTab,
      active && styles.webTabActive,
      pressed && styles.webTabPressed,
    ]}
    onPress={active ? undefined : onPress}
  >
    <FontAwesome6 name={icon} size={15} color={active ? ACCENT : "#555"} />
    <MutedText style={[styles.webTabLabel, active && styles.webTabLabelActive]}>
      {label}
    </MutedText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: "8%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: BG_ROOT,
    paddingHorizontal: 10,
    marginBottom: 1,
  },
  appName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "center",
    flexDirection: "column",
    padding: 6,
  },
  nameText: {
    fontSize: 12,
    color: TEXT_300,
    fontWeight: "ultralight",
    fontFamily: "Raleway-Thin",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImg: {
    height: "100%",
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
  webBrand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  webBrandIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
  webBrandText: {
    fontSize: 12,
    color: TEXT_300,
    letterSpacing: 2,
    fontWeight: "300",
  },
  webBrandTextBold: {
    fontWeight: "600",
    letterSpacing: 3,
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
  webTabLabelActive: {
    color: ACCENT,
  },
  webAction: {
    flex: 1,
    alignItems: "flex-end",
  },
  webButton: { paddingVertical: 6, paddingHorizontal: 14 },
});
