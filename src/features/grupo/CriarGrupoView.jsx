import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function CriarGrupoView({
  t, // Para traduções
  nome,
  descricao,
  isPrivado,
  isLoading,
  error,
  onChangeNome,
  onChangeDescricao,
  onChangeIsPrivado, // Para o Switch
  onSubmit,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{t("createGroup.title")}</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t("createGroup.namePlaceholder")}
          value={nome}
          onChangeText={onChangeNome}
          returnKeyType="next"
          editable={!isLoading}
        />
        <TextInput
          style={[styles.input, styles.textArea]} // Estilo para área de texto
          placeholder={t("createGroup.descriptionPlaceholder")}
          value={descricao}
          onChangeText={onChangeDescricao}
          editable={!isLoading}
          multiline={true} // Permite múltiplas linhas
          numberOfLines={4}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            {t("createGroup.privateLabel")}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPrivado ? "#1976d2" : "#f4f3f4"}
            onValueChange={onChangeIsPrivado}
            value={isPrivado}
            disabled={isLoading}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#1976d2"
            style={styles.button}
          />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>{t("createGroup.submitButton")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    width: "100%",
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
  textArea: {
    height: 100, // Altura para a descrição
    textAlignVertical: "top", // Alinha o texto no topo no Android
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  switchLabel: {
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
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});