import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, View, ActivityIndicator, Text } from "react-native";
import { useI18n } from "../i18n"; // Importamos o hook aqui
import GrupoDetalhesView from "../features/grupo/GrupoDetalhesView";
import { useGrupoDetalhesController } from "../features/grupo/useGrupoDetalhesController";

export default function GrupoDetalhesPage() {
  // 1. Pegamos o 't' aqui no nível da Página, onde é mais seguro
  const { t } = useI18n();
  const route = useRoute();
  const navigation = useNavigation();

  const groupData = route.params?.groupData;

  useEffect(() => {
    if (!groupData || !groupData.id) {
      Alert.alert(
        "Erro",
        "Dados do grupo inválidos.",
        [{ text: "Voltar", onPress: () => navigation.goBack() }]
      );
    }
  }, [groupData, navigation]);

  if (!groupData || !groupData.id) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  const { handleDelete, isDeleting, deleteError } =
    useGrupoDetalhesController(groupData.id);

  const handleConfirmDelete = () => {
    Alert.alert(
      t("deleteGroup.confirmTitle") || "Deletar Grupo",
      t("deleteGroup.confirmMessage") ||
        "Tem certeza que deseja deletar este grupo?",
      [
        { text: t("common.cancel") || "Cancelar", style: "cancel" },
        {
          text: t("common.delete") || "Deletar",
          style: "destructive",
          onPress: handleDelete,
        },
      ]
    );
  };

  // 2. Passamos o 't' (e uma função de fallback caso ele falhe) para a View
  // A prop 't' é passada explicitamente aqui
  return (
    <GrupoDetalhesView
      t={t || ((key) => key)} 
      groupData={groupData}
      isDeleting={isDeleting}
      deleteError={deleteError}
      onDeletePress={handleConfirmDelete}
    />
  );
}