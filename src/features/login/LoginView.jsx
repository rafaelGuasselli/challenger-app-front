import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Button,
} from "react-native";

const mockAccounts = [
  {
    id: 1,
    name: "Felipe Rocha",
    email: "felipematorocha@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 2,
    name: "Felipe Rocha",
    email: "fmrocha@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

export default function LoginView({
  t,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onPressCadastrar,
  showGooglePopup,
  onOpenGooglePopup,
  onCloseGooglePopup,
}) {
  const handleAccountSelected = (acc) => {
    console.log("Usuário escolheu:", acc.email);
    onCloseGooglePopup();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>{t("login.title")}</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChangeText={onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{t("login.signInButton")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPressCadastrar}>
            <Text style={styles.buttonText}>{t("login.registerButton")}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.divider}>{t("common.or")}</Text>

        <Pressable style={styles.googleButton} onPress={onOpenGooglePopup}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>{t("login.continueWithGoogle")}</Text>
        </Pressable>

        <Modal visible={showGooglePopup} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("login.googleHeader")}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
              <Text style={styles.modalTitle}>{t("login.chooseAccount")}</Text>
              <Text style={styles.subtitle}>
                {t("login.proceedTo")}{" "}
                <Text style={styles.appName}>{t("appName")}</Text>
              </Text>

              {mockAccounts.map((acc) => (
                <AccountItem
                  key={acc.id}
                  acc={acc}
                  onSelect={handleAccountSelected}
                />
              ))}

              <Pressable
                style={styles.accountItem}
                onPress={onCloseGooglePopup}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/material-outlined/24/000000/user.png",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.accountName}>
                  {t("login.useAnotherAccount")}
                </Text>
              </Pressable>
            </ScrollView>

            <Button title={t("common.close")} onPress={onCloseGooglePopup} />
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function AccountItem({ acc, onSelect }) {
  const handlePress = () => onSelect(acc);
  return (
    <Pressable style={styles.accountItem} onPress={handlePress}>
      <Image source={{ uri: acc.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.accountName}>{acc.name}</Text>
        <Text style={styles.accountEmail}>{acc.email}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  form: { width: "100%", maxWidth: 400 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#1976d2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  divider: { marginVertical: 15, fontSize: 14, color: "#666" },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  googleText: { fontSize: 16, color: "#444" },
  modalContainer: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: { width: 25, height: 25, marginRight: 10 },
  headerText: { fontSize: 16, color: "#555" },
  content: { padding: 20 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
  },
  appName: { color: "#1a73e8", fontWeight: "bold" },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  avatar: { width: 35, height: 35, borderRadius: 50, marginRight: 12 },
  accountName: { fontSize: 16 },
  accountEmail: { fontSize: 13, color: "#666" },
});
