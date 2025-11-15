import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, TouchableOpacity, Text } from "react-native";
import { useI18n } from "../i18n";
import HomeView from "../features/home/HomeView";
import { useHomeController } from "../features/home/useHomeController";

const Home = () => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n();
  const { userName, signOut } = useHomeController({
    onUnauthenticated: () =>
      navigation.reset({ index: 0, routes: [{ name: "Login" }] }),
  });

  const irParaCriarGrupo = () => {
    navigation.navigate("CriarGrupo");
  };

  const handleSignOutPress = async () => {
    try {
      await signOut();
      // Navigation handled by Amplify 'signedOut' event via controller
    } catch (err) {
      Alert.alert(t("common.errorTitle"), t("home.signOutErrorMsg"));
    }
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <HomeView
      t={t}
      userName={userName}
      onPressSignOut={handleSignOutPress}
      onPressProfile={handleProfilePress}
      onPressCriarGrupo={irParaCriarGrupo}
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
