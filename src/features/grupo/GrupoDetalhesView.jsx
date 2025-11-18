import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

// Recebemos 't' via props agora
export default function GrupoDetalhesView({
  t, 
  groupData,
  isDeleting,
  deleteError,
  onDeletePress,
}) {
  // CRITICAL FIX: Se 't' não vier por algum motivo bizarro, usamos um fallback seguro
  // Isso impede o erro "t is not a function" para sempre.
  const translate = typeof t === 'function' ? t : (key) => key;

  if (!groupData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Título */}
        <Text style={styles.title}>{groupData.nome}</Text>

        {/* Descrição */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            {translate("group.description") || "Descrição"}:
          </Text>
          <Text style={styles.value}>
            {groupData.descricao || translate("common.noDescription") || "Sem descrição"}
          </Text>
        </View>

        {/* Privacidade */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>
            {translate("group.privacy") || "Privacidade"}:
          </Text>
          <Text style={styles.value}>
            {groupData.isPrivado
              ? translate("group.private") || "Privado"
              : translate("group.public") || "Público"}
          </Text>
        </View>

        {/* Erro de Deleção */}
        {deleteError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{deleteError}</Text>
          </View>
        ) : null}

        {/* Botão */}
        <View style={styles.buttonContainer}>
          <Button
            title={isDeleting ? (translate("common.deleting") || "Deletando...") : (translate("common.delete") || "Deletar Grupo")}
            onPress={onDeletePress}
            color="#d32f2f"
            disabled={isDeleting}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
  },
  errorContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffebee",
    borderRadius: 4,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
  },
});