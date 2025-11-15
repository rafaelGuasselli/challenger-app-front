import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
// O seu arquivo original usava 'useI18n'. Vou manter isso.
import { useI18n } from "../i18n"; 
import CadastroView from "../features/cadastro/CadastroView";
// Importa o nosso hook refatorado
import { useCadastroController } from "../features/cadastro/useCadastroController";

const Cadastro = () => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n();

  // 1. O hook agora nos dá TUDO:
  // - Estados dos campos (name, email, password)
  // - Setters (setName, setEmail, setPassword)
  // - A função de submissão (handleSubmit)
  // - Os estados da UI (isLoading, error)
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit, // <<< O novo handler de lógica
    error,        // <<< O novo estado de erro
    isLoading,    // <<< O novo estado de carregamento
  } = useCadastroController();

  // 2. A função 'onSubmit' da View ficou muito mais simples
  const handleViewSubmit = async () => {
    // 3. Chama o 'handleSubmit' do controller.
    // - Ele já valida os campos.
    // - Ele já gerencia o 'isLoading'.
    // - Ele já faz o try...catch.
    const result = await handleSubmit();

    // 4. Se 'result' existir, o cadastro foi um sucesso.
    // (Se 'result' for undefined, o hook já cuidou de
    // definir a mensagem no estado 'error')
    if (result) {
      // Mantendo sua lógica de verificação de confirmação,
      // pois é uma ótima prática.
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
      error={error}         // << Vindo do hook (NOVO)
      onChangeName={setName}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={handleViewSubmit} // << Passa o nosso novo handler
      onNavigateLogin={handleNavigateLogin}
    />
  );
};

export default Cadastro;