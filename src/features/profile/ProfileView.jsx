import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";

export default function ProfileView({
  t,
  user = { name: "", avatarUrl: "" },
  // password modal
  openPwdDialog,
  onOpenPwdDialog,
  onClosePwdDialog,
  oldPassword,
  onChangeOldPassword,
  newPassword,
  onChangeNewPassword,
  savingPwd,
  onPressSavePassword,
  // delete modal
  openDeleteDialog,
  onOpenDeleteDialog,
  onCloseDeleteDialog,
  deleting,
  onPressConfirmDelete,
}) {
  const displayName = user?.name || t("profile.demoUser");

  return (
    <View style={styles.container}>
      {user.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]}>
          <Text style={styles.avatarText}>
            {displayName ? displayName[0] : "U"}
          </Text>
        </View>
      )}

      <Text style={styles.name}>{displayName}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={onOpenPwdDialog}>
          <Text style={styles.buttonText}>{t("profile.resetPassword")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton]}
          onPress={onOpenDeleteDialog}
        >
          <Text style={styles.deleteButtonText}>
            {t("profile.deleteAccount")}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={openPwdDialog} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("profile.resetPassword")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("profile.oldPasswordPlaceholder")}
              secureTextEntry
              value={oldPassword}
              onChangeText={onChangeOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder={t("profile.newPasswordPlaceholder")}
              secureTextEntry
              value={newPassword}
              onChangeText={onChangeNewPassword}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={onClosePwdDialog}>
                <Text style={styles.cancelText}>{t("common.cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={onPressSavePassword}
                disabled={savingPwd}
              >
                {savingPwd ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>{t("common.save")}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={openDeleteDialog} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("profile.deleteTitle")}</Text>
            <Text style={{ marginVertical: 12 }}>
              {t("profile.deleteQuestion")}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={onCloseDeleteDialog}>
                <Text style={styles.cancelText}>{t("common.no")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "red" }]}
                onPress={onPressConfirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>{t("common.yes")}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  avatarFallback: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#1976d2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "red",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelText: {
    fontSize: 16,
    marginRight: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
