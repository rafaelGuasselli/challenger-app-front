import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../i18n"; 
import CadastroView from "../features/cadastro/CadastroView";
import { useCadastroController } from "../features/cadastro/useCadastroController";

const Cadastro = () => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
    isLoading,
  } = useCadastroController();

  const handleViewSubmit = async () => {
    const result = await handleSubmit();

    if (result) {
      if (
        result.nextStep &&
        result.nextStep.signUpStep === "CONFIRM_SIGN_UP"
      ) {
        Alert.alert(
          t("register.confirmTitle") || "Cadastro Quase Completo",
          t("register.confirmMessage") ||
            "Enviamos um código de confirmação para o seu e-mail."
        );
        navigation.navigate("Login");
      } else {
        Alert.alert(
          t("common.successTitle") || "Sucesso",
          t("register.successMessage") || "Cadastro realizado com sucesso!"
        );
        navigation.navigate("Login");
      }
    }
    // Se 'result' for falso/undefined, não fazemos nada.
    // O hook já atualizou o 'error' state, e o
    // <CadastroView> irá exibi-lo automaticamente.
  };

  // 5. Função para o link "Já tem conta?"
  const handleNavigateLogin = () => {
    navigation.navigate("Login");
  };

  // 6. Renderiza a View, passando todas as props que ela precisa
  return (
    <CadastroView
      t={t}
      name={name}
      email={email}
      password={password}
      isLoading={isLoading} // << Vindo do hook
      error={error}         // << Vindo do hook
      onChangeName={setName}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={handleViewSubmit}
      onNavigateLogin={handleNavigateLogin}
    />
  );
};

export default Cadastro;