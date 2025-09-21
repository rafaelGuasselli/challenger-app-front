import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../i18n";
import CadastroView from "../features/cadastro/CadastroView";
import { useCadastroController } from "../features/cadastro/useCadastroController";

const Cadastro = () => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n();
  const { name, setName, email, setEmail, password, setPassword, submit } =
    useCadastroController({
      onAuthenticated: () => navigation.replace("Home"),
    });

  const handleSubmit = async () => {
    try {
      await submit();
      Alert.alert(t("common.successTitle"), t("register.successMessage"));
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(t("common.errorTitle"), t("register.errorMessage"));
    }
  };

  return (
    <CadastroView
      t={t}
      name={name}
      email={email}
      password={password}
      onChangeName={setName}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Cadastro;
