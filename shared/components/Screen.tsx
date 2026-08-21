import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { BG_ROOT } from "../../constants";
import { IS_WEB } from "../layout/platform";
import { NavBar } from "./NavBar";
import { PageContainer } from "./PageContainer";
import { TopBar } from "./TopBar";
import { WebFooter } from "./WebFooter";

type Props = {
  children?: ReactNode;
};

export const Screen = ({ children }: Props) => {
  if (IS_WEB) {
    return (
      <View style={styles.container}>
        <TopBar />
        <ScrollView style={styles.flex} contentContainerStyle={styles.webContent}>
          <PageContainer>{children}</PageContainer>
          <WebFooter />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.flex}>{children}</View>
      <NavBar />
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
