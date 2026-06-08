import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import {
  BG_LAYOUT,
  BORDER_DEFAULT,
  ERROR_BG,
  ERROR_BORDER,
  ERROR_CONTENT,
  OPTIONS_BG,
  OPTIONS_BORDER,
  OPTIONS_CONTENT,
  TEXT_300,
  TEXT_MUTED,
} from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import { OptionButton } from "./OptionButton";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: Props) => {
  const confirmType = destructive ? "error" : "options";
  const confirmContent = destructive ? ERROR_CONTENT : OPTIONS_CONTENT;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      supportedOrientations={["landscape", "portrait"]}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onCancel} />

        <View style={styles.container}>
          <Subtitle style={styles.title}>{title}</Subtitle>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsContainer}>
            <OptionButton
              onPress={onConfirm}
              style={styles.buttonStyle}
              type={confirmType}
            >
              <View
                style={[
                  styles.iconCircle,
                  destructive ? styles.iconCircleError : styles.iconCircleOptions,
                ]}
              >
                <Feather
                  name={destructive ? "trash-2" : "check"}
                  size={18}
                  color={confirmContent}
                />
              </View>
              <Subtitle style={{ fontSize: 16, fontWeight: 100, color: confirmContent }}>
                {confirmLabel}
              </Subtitle>
            </OptionButton>

            <OptionButton onPress={onCancel} style={styles.buttonStyle} type="options">
              <View style={[styles.iconCircle, styles.iconCircleOptions]}>
                <Feather name="x" size={18} color={OPTIONS_CONTENT} />
              </View>
              <Subtitle style={{ fontSize: 16, fontWeight: 100, color: OPTIONS_CONTENT }}>
                {cancelLabel}
              </Subtitle>
            </OptionButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    backgroundColor: BG_LAYOUT,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_DEFAULT,
    width: "90%",
    maxWidth: 420,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 18,
    color: TEXT_300,
  },
  message: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: TEXT_MUTED,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginTop: 4,
  },
  buttonStyle: {
    width: "40%",
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  iconCircleOptions: {
    backgroundColor: OPTIONS_BG,
    borderColor: OPTIONS_BORDER,
  },
  iconCircleError: {
    backgroundColor: ERROR_BG,
    borderColor: ERROR_BORDER,
  },
});