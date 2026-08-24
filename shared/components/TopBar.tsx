import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";

import { BG_ROOT, BORDER_INTERNAL } from "../../constants";
import { TABS } from "../../navigation/tabs";
import { RootTabParamList } from "../../navigation/types";
import { WebNavTab } from "./WebNavTab";

const WEB_COMPACT_BREAKPOINT = 480;

export const TopBar = () => {
  const { width } = useWindowDimensions();
  const isCompact = width < WEB_COMPACT_BREAKPOINT;
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const activeRoute = useNavigationState((state) => state.routes[state.index].name);

  return (
    <View style={[styles.webContainer, isCompact && styles.webContainerCompact]}>
      <View style={styles.webBrand}>
        <Image
          style={[styles.webBrandIcon, isCompact && styles.webBrandIconCompact]}
          source={require("../../assets/img/icon.png")}
        />
      </View>

      <View style={styles.webTabs}>
        {TABS.map((tab) => {
          const active = activeRoute === tab.name;
          return (
            <WebNavTab
              key={tab.name}
              icon={tab.icon}
              label={isCompact ? tab.compactLabel : tab.label}
              active={active}
              onPress={active ? undefined : () => navigation.navigate(tab.name)}
              compact={isCompact}
            />
          );
        })}
      </View>

      <View style={styles.webAction} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  webAction: {
    flex: 1,
  },
});
