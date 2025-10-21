import React, { useState } from "react";
import { Alert, ActivityIndicator, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../i18n";
import CadastroView from "../features/cadastro/CadastroView";
import { useCadastroController } from "../features/cadastro/useCadastroController";

const Cadastro = () => {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n(); // Função de tradução

  // 1. Adicionar Estado de Carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Pega estados e funções do hook controlador
  // Assume que o hook fornece o estado (name, email, password) E os setters (setName...)
  // Assume que a função de submissão foi renomeada para submitSignUp no hook
  const { name, setName, email, setEmail, password, setPassword, submitSignUp } =
    useCadastroController();

  // Função chamada pelo botão no CadastroView
  const handleSubmit = async () => {
    // 2. Validar Campos Vazios (Front-end)
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        t("common.errorTitle") || "Erro", // Texto fallback
        t("register.errorEmptyFields") || "Por favor, preencha todos os campos." // Texto fallback
      );
      return; // Para a execução
    }

    // 3. Controlar Carregamento (Início)
    setIsLoading(true);

    try {
      // Chama a lógica de cadastro no hook, que chama o Amplify
      // Assume que submitSignUp retorna o resultado do Amplify (incluindo nextStep)
      const result = await submitSignUp(name, email, password); // Passa os dados se o hook não os gerenciar internamente

      // 3. Controlar Carregamento (Sucesso)
      setIsLoading(false);

      // 5. Verificar Confirmação de E-mail (se habilitado no Amplify)
      if (result && result.nextStep && result.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
         Alert.alert(
            t("register.confirmTitle") || "Cadastro Quase Completo", // Fallback
            t("register.confirmMessage") || "Enviamos um código de confirmação para o seu e-mail." // Fallback
         );
         // Opcional: Navegar para tela de confirmação de código
         // navigation.navigate('ConfirmSignUp', { username: email });
         navigation.navigate("Login"); // Volta para Login para confirmar depois
      } else {
         // Mensagem de sucesso padrão
         Alert.alert(
            t("common.successTitle") || "Sucesso", // Fallback
            t("register.successMessage") || "Cadastro realizado com sucesso!" // Fallback
         );
         // 6. Navegação para Login
         navigation.navigate("Login");
      }

    } catch (error) {
      // 3. Controlar Carregamento (Erro)
      setIsLoading(false);
      console.error("SignUp Error:", error); // Mantém o log para debug

      // 4. Mostrar Erro Específico vindo do Amplify/Cognito
      Alert.alert(
        t("common.errorTitle") || "Erro no cadastro", // Fallback
        // Tenta usar a mensagem específica do erro, senão usa uma genérica
        error.message || t("register.errorMessageGeneric") || "Ocorreu um erro desconhecido." // Fallback
      );
    }
  };

  // Renderiza o componente visual, passando as props necessárias
  return (
    <CadastroView
      t={t} // Passa a função de tradução
      name={name}
      email={email}
      password={password}
      isLoading={isLoading} // << Passa o estado de carregamento
      onChangeName={setName}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={handleSubmit} // << Passa a função de submissão corrigida
      // << Passa uma função para o link/botão "Já tem conta?"
      onNavigateLogin={() => navigation.navigate('Login')}
    />
  );
};

export default Cadastro;