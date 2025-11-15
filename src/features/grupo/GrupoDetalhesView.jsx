import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function GrupoDetalhesView({
  t, // Para traduções
  groupData, // Os dados do grupo (ex: { nome: "...", descricao: "..." })
  isDeleting, // Estado de loading do "delete"
  deleteError, // Estado de erro do "delete"
  onDeletePress, // Função chamada ao pressionar "Deletar"
}) {
  const nomeGrupo = groupData ? groupData.nome : "Carregando...";
  const descricaoGrupo = groupData ? groupData.descricao : "...";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{nomeGrupo}</Text>
        <Text style={styles.description}>{descricaoGrupo}</Text>
      </View>

      {/* --- Seção de Perigo (Deletar) --- */}
      <View style={styles.dangerZone}>
        <Text style={styles.dangerTitle}>
          {t("deleteGroup.dangerZoneTitle") || "Zona de Perigo"}
        </Text>
        
        {/* Exibe o erro de deleção, se houver */}
        {deleteError && <Text style={styles.errorText}>{deleteError}</Text>}

        {/* Botão de Deletar */}
        {isDeleting ? (
          // Mostra um spinner se estiver deletando
          <ActivityIndicator
            size="large"
            color="#D32F2F"
            style={styles.deleteButton}
          />
        ) : (
          // Botão normal
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={onDeletePress}
          >
            <Text style={styles.deleteButtonText}>
              {t("deleteGroup.deleteButton") || "Deletar Grupo"}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.dangerWarning}>
          {t("deleteGroup.deleteWarning") || "Esta ação é permanente."}
        </Text>
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  dangerZone: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 8,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dangerWarning: {
    textAlign: "center",
    color: "#555",
    fontSize: 12,
    marginTop: 8,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});