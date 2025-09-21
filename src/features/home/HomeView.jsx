import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeView({
  t,
  userName,
  onPressSignOut,
  onPressProfile,
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
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
