import React from "react";
import { Alert, TouchableOpacity, Text } from "react-native";
import { useI18n } from "../i18n";
import HomeView from "../features/home/HomeView";
import { useHomeController } from "../features/home/useHomeController";

const Home = ({ navigation }) => {
  const { fetchI18nText: t } = useI18n();
  const { userName, signOut, deleteAccount } = useHomeController({
    onUnauthenticated: () => navigation.navigate("Login"),
  });

  const handleSignOutPress = async () => {
    try {
      await signOut();
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    } catch (err) {
      Alert.alert(t("common.errorTitle"), t("home.signOutErrorMsg"));
    }
  };

  const handleDeleteAccountPress = () => {
    Alert.alert(
      t("home.deleteConfirmTitle"),
      t("home.deleteConfirmMsg"),
      [
        { text: t("home.deleteConfirmNo"), style: "cancel" },
        {
          text: t("home.deleteConfirmYes"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              Alert.alert(
                t("home.deleteSuccessTitle"),
                t("home.deleteSuccessMsg"),
              );
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            } catch (err) {
              Alert.alert(t("common.errorTitle"), t("home.deleteErrorMsg"));
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <HomeView
      t={t}
      userName={userName}
      onPressSignOut={handleSignOutPress}
      onPressDeleteAccount={handleDeleteAccountPress}
    />
  );
};

export const homeOptions = ({ navigation }) => {
  const handleGoToProfile = () => navigation.navigate("Profile");
  return {
    title: "Home",
    headerRight: () => (
      <TouchableOpacity onPress={handleGoToProfile} style={{ marginRight: 16 }}>
        <Text style={{ color: "#1976d2", fontWeight: "600" }}>Perfil</Text>
      </TouchableOpacity>
    ),
  };
};

export default Home;
