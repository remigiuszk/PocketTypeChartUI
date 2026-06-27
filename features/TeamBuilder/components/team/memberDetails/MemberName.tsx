import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, ViewStyle } from "react-native";

import { BG_BUTTON, ERROR_CONTENT, TEXT_100 } from "../../../../../constants";

type Props = {
  style?: ViewStyle | ViewStyle[];
  memberName: string;
  hasError?: boolean;
  onNameChange: (name: string) => void;
};

export const MemberName = ({ style, memberName, hasError, onNameChange }: Props) => {
  const [localName, setLocalName] = useState(memberName);

  useEffect(() => {
    setLocalName(memberName);
  }, [memberName]);

  const commitChange = () => {
    onNameChange(localName.trim());
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable style={[styles.wrapper, hasError && styles.wrapperError]}>
        <View style={{ width: 18 }} />
        <TextInput
          style={styles.input}
          value={localName}
          placeholder="Enter member name"
          placeholderTextColor="#4e4e62"
          onChangeText={setLocalName}
          onBlur={commitChange}
          onEndEditing={commitChange}
        ></TextInput>
        <Feather name="edit-2" size={18} color={TEXT_100} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    borderRadius: 16,
    width: "65%",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: BG_BUTTON,
    borderWidth: 1,
    borderColor: "transparent",
  },
  wrapperError: {
    borderColor: ERROR_CONTENT,
  },
  input: {
    flex: 1,
    fontWeight: "300",
    fontFamily: "System",
    textAlign: "center",
    color: TEXT_100,
    fontSize: 15,
    letterSpacing: 1.5,
  },
});
