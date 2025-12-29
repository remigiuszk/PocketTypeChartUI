import { Text, View } from "react-native";

type ErrorStateProps = {
  onRetry: () => void;
};

export const Error = ({ onRetry }: ErrorStateProps) => {
  return (
    <View>
      <Text>Coś poszło nie tak.</Text>
      <Text
        onPress={() => {
          onRetry;
        }}
      >
        Spróbuj ponownie
      </Text>
    </View>
  );
};
