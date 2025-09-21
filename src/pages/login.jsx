import React from "react";
import { Alert } from "react-native";
import { useI18n } from "../i18n";
import LoginView from "../features/login/LoginView";
import { useLoginController } from "../features/login/useLoginController";

function Login({ navigation }) {
  const { fetchI18nText: t } = useI18n();
  const {
    email,
    setEmail,
    password,
    setPassword,
    submit,
    showGooglePopup,
    googleSignIn,
    closeGooglePopup,
  } = useLoginController({ onAuthenticated: () => navigation.replace("Home") });

  const handleCadastrar = () => {
    navigation.navigate("Cadastro");
  };

  const handleSubmit = async () => {
    try {
      await submit();
      Alert.alert(t("common.successTitle"), t("login.successMessage"));
      // Navigation handled by Amplify 'signedIn' event in controller
    } catch (err) {
      Alert.alert(t("common.errorTitle"), t("login.errorMessage"));
    }
  };

  return (
    <LoginView
      t={t}
      email={email}
      password={password}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={handleSubmit}
      onPressCadastrar={handleCadastrar}
      showGooglePopup={showGooglePopup}
      onOpenGooglePopup={googleSignIn}
      onCloseGooglePopup={closeGooglePopup}
    />
  );
}

export default Login;
