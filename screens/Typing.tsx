import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PokeTypeList } from "../features/TypeSelection/components/PokeTypeList";
import { Relations } from "../features/DamageRelations/components/Relations";
import { BG_100 } from "../constants";
import { TopBar } from "../shared/components/TopBar";
import { useMemo, useState } from "react";
import { PokeTypeModel } from "../features/TypeSelection/types";

export const Typing = () => {
  const [selectedType, setSelectedType] = useState<PokeTypeModel[]>([]);

  const toggleType = (type: PokeTypeModel) => {
    setSelectedType((prev) => {
      const has = prev.some((x) => x.id === type.id);
      if (has) {
        return prev.filter((x) => x.id !== type.id);
      }
      if (prev.length === 2) {
        return [prev[1], type];
      }
      return [...prev, type];
    });
  };

  const normalizedSelected = useMemo(
    () => [...selectedType].sort((a, b) => a.id - b.id),
    [selectedType]
  );

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <View style={{ padding: 10, flex: 1, gap: 16 }}>
        <PokeTypeList selectedTypes={normalizedSelected} onToggle={toggleType} />
        <ScrollView>
          <Relations selectedTypes={normalizedSelected}></Relations>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_100,
    flex: 1,
  },
});
