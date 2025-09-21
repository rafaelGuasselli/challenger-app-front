import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../i18n";
import ProfileView from "../features/profile/ProfileView";
import { useProfileController } from "../features/profile/useProfileController";

const Profile = ({ user = { name: "", avatarUrl: "" } }) => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n();
  const {
    user: profileUser,
    openPwdDialog,
    setOpenPwdDialog,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    savingPwd,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleting,
    updatePassword,
    deleteAccount,
  } = useProfileController();

  const handleSavePassword = async () => {
    try {
      const resp = await updatePassword();
      if (!resp || resp.success) {
        Alert.alert(t("common.successTitle"), t("profile.passwordUpdated"));
        setOpenPwdDialog(false);
      } else {
        Alert.alert(
          t("common.errorTitle"),
          resp?.message || t("profile.passwordUpdateError"),
        );
      }
    } catch (err) {
      Alert.alert(t("common.errorTitle"), t("profile.passwordUpdateError"));
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const resp = await deleteAccount();
      if (!resp || resp.success) {
        Alert.alert(t("common.successTitle"), t("profile.accountDeleted"));
        navigation.navigate("Login");
      } else {
        Alert.alert(t("common.errorTitle"), t("profile.accountDeleteError"));
      }
    } catch (err) {
      Alert.alert(t("common.errorTitle"), t("profile.accountDeleteError"));
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <ProfileView
      t={t}
      user={{ ...user, ...profileUser }}
      openPwdDialog={openPwdDialog}
      onOpenPwdDialog={() => setOpenPwdDialog(true)}
      onClosePwdDialog={() => setOpenPwdDialog(false)}
      oldPassword={oldPassword}
      onChangeOldPassword={setOldPassword}
      newPassword={newPassword}
      onChangeNewPassword={setNewPassword}
      savingPwd={savingPwd}
      onPressSavePassword={handleSavePassword}
      openDeleteDialog={openDeleteDialog}
      onOpenDeleteDialog={() => setOpenDeleteDialog(true)}
      onCloseDeleteDialog={() => setOpenDeleteDialog(false)}
      deleting={deleting}
      onPressConfirmDelete={handleConfirmDelete}
    />
  );
};

export default Profile;
