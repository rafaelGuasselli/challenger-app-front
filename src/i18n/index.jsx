import React, { createContext, useContext, useMemo, useState } from "react";

const translations = {
  en: {
    appName: "Challengers App",
    nav: {
      loginTitle: "Sign In",
      registerTitle: "Create Account",
      homeTitle: "Home",
      profileTitle: "Profile",
    },
    common: {
      or: "or",
      successTitle: "Success",
      errorTitle: "Error",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      yes: "YES",
      no: "NO",
    },
    login: {
      title: "Sign In",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      signInButton: "Sign In",
      registerButton: "Register",
      continueWithGoogle: "Continue with Google",
      googleHeader: "Sign in with Google",
      chooseAccount: "Choose an account",
      proceedTo: "to proceed to",
      useAnotherAccount: "Use another account",
      successMessage: "Login successful!",
      errorMessage: "Login failed. Check your credentials.",
    },
    register: {
      title: "Create Account",
      namePlaceholder: "Full Name",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      submitButton: "Register",
      successMessage: "Registration completed successfully!",
      errorMessageGeneric: "Registration failed. Check your data and try again.",
      errorEmptyFields: "Please fill in all fields.",
      confirmTitle: "Registration Almost Complete",
      confirmMessage: "We have sent a confirmation code to your email to activate your account.",
      loginLink: "Already have an account? Sign In",
    },
    home: {
      welcome: "Welcome to Challengers App {userName}!!!",
      signOut: "Sign Out",
      deleteAccount: "Delete account",
      deleteConfirmTitle: "Delete account",
      deleteConfirmMsg:
        "Are you sure you want to delete your account? This action is permanent.",
      deleteConfirmYes: "Delete",
      deleteConfirmNo: "Cancel",
      deleteSuccessTitle: "Account deleted",
      deleteSuccessMsg: "Your account has been deleted.",
      deleteErrorMsg: "Could not delete the account.",
      signOutErrorMsg: "Failed to sign out.",
      profileButton: "Profile",
      createGroupButton: "Create Group",
    },
    profile: {
      resetPassword: "Reset password",
      deleteAccount: "Delete account",
      deleteTitle: "Delete account",
      deleteQuestion:
        "Are you sure you want to delete your account in Challengers App?",
      oldPasswordPlaceholder: "Current password",
      newPasswordPlaceholder: "New password",
      demoUser: "Demo User",
      usernameLabel: "Username",
      passwordUpdated: "Password updated successfully.",
      passwordUpdateError: "Error updating password",
      accountDeleted: "Account deleted.",
      accountDeleteError: "Error deleting account",
    },
    createGroup: {
      title: "Create New Group",
      namePlaceholder: "Group Name",
      descriptionPlaceholder: "Description (optional)",
      privateLabel: "Private Group",
      submitButton: "Create Group",
      successMessage: "Group created successfully!",
    },
  },
  pt: {
    appName: "Challengers App",
    nav: {
      loginTitle: "Entrar",
      registerTitle: "Criar Conta",
      homeTitle: "Home",
      profileTitle: "Perfil",
    },
    common: {
      or: "ou",
      successTitle: "Sucesso",
      errorTitle: "Erro",
      cancel: "Cancelar",
      save: "Salvar",
      close: "Fechar",
      yes: "SIM",
      no: "NÃO",
    },
    login: {
      title: "Entrar",
      emailPlaceholder: "E-mail",
      passwordPlaceholder: "Senha",
      signInButton: "Entrar",
      registerButton: "Cadastrar",
      continueWithGoogle: "Continuar com Google",
      googleHeader: "Fazer login com o Google",
      chooseAccount: "Escolha uma conta",
      proceedTo: "para prosseguir para",
      useAnotherAccount: "Usar outra conta",
      successMessage: "Login realizado!",
      errorMessage: "Falha no login. Verifique suas credenciais.",
    },
    register: {
      title: "Criar Conta",
      namePlaceholder: "Nome Completo",
      emailPlaceholder: "E-mail",
      passwordPlaceholder: "Senha",
      submitButton: "Cadastrar",
      successMessage: "Cadastro realizado com sucesso!",
      errorMessageGeneric: "Falha no cadastro. Verifique os dados e tente novamente.",
      errorEmptyFields: "Por favor, preencha todos os campos.",
      confirmTitle: "Cadastro Quase Completo",
      confirmMessage: "Enviamos um código de confirmação para o seu e-mail para ativar sua conta.",
      loginLink: "Já tem uma conta? Entrar",
    },
    home: {
      welcome: "Bem-vindo ao Challengers APP {userName}!!!",
      signOut: "Sair",
      deleteAccount: "Apagar conta",
      deleteConfirmTitle: "Apagar conta",
      deleteConfirmMsg:
        "Tem certeza que deseja apagar sua conta? Esta ação é permanente.",
      deleteConfirmYes: "Apagar",
      deleteConfirmNo: "Cancelar",
      deleteSuccessTitle: "Conta apagada",
      deleteSuccessMsg: "Sua conta foi excluída.",
      deleteErrorMsg: "Não foi possível apagar a conta.",
      signOutErrorMsg: "Falha ao sair.",
      profileButton: "Perfil",
      createGroupButton: "Criar Grupo",
    },
    profile: {
      resetPassword: "Reconfigurar senha",
      deleteAccount: "Apagar conta",
      deleteTitle: "Apagar conta",
      deleteQuestion:
        "Tem certeza que deseja excluir sua conta no Challengers App?",
      oldPasswordPlaceholder: "Senha antiga",
      newPasswordPlaceholder: "Nova senha",
      demoUser: "Usuário Demo",
      usernameLabel: "Nome de usuário",
      passwordUpdated: "Senha atualizada com sucesso.",
      passwordUpdateError: "Erro ao atualizar senha",
      accountDeleted: "Conta excluída.",
      accountDeleteError: "Erro ao excluir conta",
    },
    createGroup: {
      title: "Criar Novo Grupo",
      namePlaceholder: "Nome do Grupo",
      descriptionPlaceholder: "Descrição (opcional)",
      privateLabel: "Grupo Privado",
      submitButton: "Criar Grupo",
      successMessage: "Grupo criado com sucesso!",
    },
  },
};

const I18nContext = createContext({
  lang: "pt",
  fetchI18nText: (key, params) => key,
  setLang: (_lang) => {},
});

function resolveKey(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] != null ? acc[part] : undefined),
      obj,
    );
}

function formatString(str, params) {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] != null ? String(params[k]) : `{${k}}`,
  );
}

export function I18nProvider({ initialLang = "pt", children }) {
  const [lang, setLang] = useState(initialLang);

  const value = useMemo(() => {
    const translate = (key, params) => {
      const dict = translations[lang] || translations.pt;
      const raw = resolveKey(dict, key) ?? key;
      return typeof raw === "string" ? formatString(raw, params) : raw;
    };
    return { lang, setLang, fetchI18nText: translate };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const i18nTranslations = translations; // export for potential external tooling
