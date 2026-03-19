import { Image, StyleSheet, View } from "react-native";

import { PokeTypeModel } from "../../../../../TypeSelection/types";
import { OverviewRowData } from "../../../../services/overviewRows/types";

type Props = {
  rowData: OverviewRowData;
};

export const OverviewRowSuggestedTypes = ({ rowData }: Props) => {
  return (
    <View style={styles.suggestedTypes}>
      <View style={styles.list}>
        {rowData.suggestedTypes!.map((type: PokeTypeModel) => {
          return (
            <View key={type.id} style={[styles.item]}>
              <View style={styles.typeBox}>
                <Image style={styles.typeImage} source={{ uri: type.sprite }} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestedTypes: { marginTop: 5 },
  text: {
    textAlign: "left",
    fontSize: 10,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: 4,
    height: 13,
    marginRight: 3,
    marginBottom: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  typeBox: {
    height: "100%",
    aspectRatio: 200 / 44,
  },
  typeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
