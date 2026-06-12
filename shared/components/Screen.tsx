import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BG_ROOT } from "../../constants";
import { IS_WEB } from "../layout/platform";
import { NavBar } from "./NavBar";
import { PageContainer } from "./PageContainer";
import { TopBar } from "./TopBar";
import { WebFooter } from "./WebFooter";

type Props = {
  teamBuilderOpen: boolean;
  switchViews: () => void;
  typesSelected?: boolean;
  clearSelection?: () => void;
  children: ReactNode;
};

// App shell shared by both screens.
// - Web: full-width TopBar (with nav moved in), a single page-level ScrollView,
//   content centered/capped via PageContainer, and a store-badge footer. No
//   bottom NavBar.
// - Native: today's layout — TopBar, flex content, bottom NavBar.
export const Screen = ({
  teamBuilderOpen,
  switchViews,
  typesSelected,
  clearSelection,
  children,
}: Props) => {
  const topBar = (
    <TopBar
      teamBuilderOpen={teamBuilderOpen}
      switchViews={switchViews}
      typesSelected={typesSelected}
      clearSelection={clearSelection ?? (() => {})}
    />
  );

  if (IS_WEB) {
    return (
      <View style={styles.container}>
        {topBar}
        <ScrollView style={styles.flex} contentContainerStyle={styles.webContent}>
          <PageContainer>{children}</PageContainer>
          <WebFooter />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {topBar}
      <View style={styles.flex}>{children}</View>
      <NavBar teamBuilderOpen={teamBuilderOpen} switchViews={switchViews} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_ROOT,
  },
  flex: {
    flex: 1,
  },
  webContent: {
    flexGrow: 1,
  },
});
