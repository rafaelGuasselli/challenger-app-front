import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

// Componente para o card de desafio
// (Agora recebe 'index' e 'onCompleteChallenge'
// e passa o 'index' no onPress)
const ChallengeCard = ({ item, index, onCompleteChallenge }) => (
  <View style={styles.challengeCard}>
    <Text style={styles.challengeTitle} numberOfLines={2}>
      {item.title}
    </Text>

    {item.completed ? (
      <Text style={styles.completedText}>Desafio Completado</Text>
    ) : (
      <TouchableOpacity
        style={styles.checkButton}
        // --- MUDANÇA PRINCIPAL AQUI ---
        onPress={() => onCompleteChallenge(index)} 
      >
        <Text style={styles.checkButtonText}>✓</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Componente para os botões de ação (Nenhuma mudança aqui)
const ActionButtons = ({ t, onPressSignOut, onPressProfile, onPressCriarGrupo }) => (
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
  </View>
);

export default function HomeView({
  t,
  userName,
  onPressSignOut,
  onPressProfile,
  onPressCriarGrupo,
  challenges,
  onCompleteChallenge,
}) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={challenges}
      // --- MUDANÇA NO KEY EXTRACTOR ---
      // Usando o index como chave, já que o id não é mais garantido
      keyExtractor={(item, index) => index.toString()}
      
      // --- MUDANÇA NO RENDER ITEM ---
      // Pegamos o 'index' aqui e passamos para o 'ChallengeCard'
      renderItem={({ item, index }) => (
        <ChallengeCard 
          item={item} 
          index={index} 
          onCompleteChallenge={onCompleteChallenge} 
        />
      )}
      ListHeaderComponent={
        <Text style={styles.title}>{t("home.welcome", { userName })}</Text>
      }
      ListFooterComponent={
        <ActionButtons
          t={t}
          onPressSignOut={onPressSignOut}
          onPressProfile={onPressProfile}
          onPressCriarGrupo={onPressCriarGrupo}
        />
      }
    />
  );
}

// Os estilos permanecem exatamente os mesmos da versão anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    // alignItems: "center", // Removido para funcionar na Web
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 24,
    textAlign: "center",
  },
  challengeCard: {
    width: "90%",
    alignSelf: "center", // Usado para centralizar
    backgroundColor: "#fff",
    height: 70,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginRight: 10,
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  checkButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  completedText: {
    fontSize: 14,
    color: "#4CAF50",
    fontStyle: "italic",
    fontWeight: "600",
  },
  actions: {
    width: "90%",
    alignSelf: "center", // Usado para centralizar
    flexDirection: "column",
    gap: 12,
    marginTop: 24,
  },
  button: {
    width: "100%",
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