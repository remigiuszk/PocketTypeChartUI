import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { BG_LAYOUT, BORDER_DEFAULT, TEXT_300, TEXT_MUTED } from "../../constants";
import { Subtitle } from "../typohraphy/Subtitle";
import { CANCEL_TINT, CONFIRM_TINT, PillButton, PillTint } from "./PillButton";

const NEUTRAL_TINT: PillTint = {
  bgIdle: "#3d6367a3",
  bgActive: "rgba(61,99,103,0.80)",
  border: "#6dbfbec3",
  content: "rgb(229, 237, 209)",
  glow: "#6dbfbec3",
};

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  // When true, renders a single acknowledge button (an info/alert dialog) instead
  // of a confirm/cancel pair. Used to replace native Alert.alert calls on web.
  singleButton?: boolean;
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
  singleButton = false,
  onConfirm,
  onCancel,
}: Props) => {
  const confirmTint = destructive ? NEUTRAL_TINT : CONFIRM_TINT;
  const cancelTint = destructive ? CANCEL_TINT : NEUTRAL_TINT;
  const confirmIcon = destructive ? "trash-2" : "check";

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
            <PillButton
              label={confirmLabel}
              icon={confirmIcon}
              tint={confirmTint}
              onPress={onConfirm}
            />

            {!singleButton && (
              <PillButton
                label={cancelLabel}
                icon="x"
                tint={cancelTint}
                onPress={onCancel}
              />
            )}
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
});
