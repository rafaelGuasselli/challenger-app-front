import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function CadastroView({
  t,
  name,
  email,
  password,
  isLoading,
  error,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onNavigateLogin,
}) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{t("register.title")}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={t("register.namePlaceholder")}
            value={name}
            onChangeText={onChangeName}
            autoCapitalize="words"
            returnKeyType="next"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder={t("register.emailPlaceholder")}
            value={email}
            onChangeText={onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            editable={!isLoading}
          />
          <TextInput
            style={styles.input}
            placeholder={t("register.passwordPlaceholder")}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            returnKeyType="done"
            editable={!isLoading}
          />

          {/* 2. EXIBE MENSAGEM DE ERRO (SE ELA EXISTIR) */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#1976d2"
              style={styles.button}
            />
          ) : (
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>{t("register.submitButton")}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.loginLink}
            onPress={onNavigateLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginLinkText}>{t("register.loginLink")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "#1976d2",
    fontSize: 14,
  },

  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});