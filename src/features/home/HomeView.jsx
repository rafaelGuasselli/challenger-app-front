import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeView({
  t,
  userName,
  onPressSignOut,
  onPressProfile,
  onPressCriarGrupo,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("home.welcome", { userName })}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1976d2" }]}
          onPress={onPressSignOut}
        >
          <Text style={styles.buttonText}>{t("home.signOut")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1976d2" }]}
          onPress={onPressProfile}
        >
          <Text style={styles.buttonText}>{t("home.profileButton")}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={onPressCriarGrupo}
        >
          <Text style={styles.buttonText}>
            {t("home.createGroupButton") || "Criar Grupo"}
          </Text>
        </TouchableOpacity>
        {/* ------------------------------------- */}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  actions: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});