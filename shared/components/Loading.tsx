import { ActivityIndicator, Text, View } from "react-native";
import { TEXT_100 } from "../../constants";

export const Loading = () => {
  return (
    <View style={{marginTop:16}}>
      <ActivityIndicator size="large" color={TEXT_100} />
    </View>
  );
};
