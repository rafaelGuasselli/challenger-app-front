import React from "react";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useI18n } from "../i18n";
import GrupoDetalhesView from "../features/grupo/GrupoDetalhesView";
import { useGrupoDetalhesController } from "../features/grupo/useGrupoDetalhesController";

export default function GrupoDetalhesPage() {
  const { t } = useI18n();
  const route = useRoute();
  const { groupData } = route.params;
  const groupId = groupData.id;

  // 1. Chama o hook com a lógica
  const { handleDelete, isDeleting, deleteError } =
    useGrupoDetalhesController(groupId);

  // 2. Handler de submissão da página (com confirmação)
  const handleConfirmDelete = () => {
    // Alerta de confirmação ANTES de chamar o controller
    Alert.alert(
      t("deleteGroup.confirmTitle") || "Deletar Grupo",
      t("deleteGroup.confirmMessage") ||
        "Tem certeza que deseja deletar este grupo? Esta ação não pode ser desfeita.",
      [
        {
          text: t("common.cancel") || "Cancelar",
          style: "cancel",
        },
        {
          text: t("common.delete") || "Deletar",
          style: "destructive",
          onPress: handleDelete, // Só chama a função do controller se o usuário confirmar
        },
      ]
    );
  };

  return (
    <GrupoDetalhesView
      t={t}
      groupData={groupData} 
      isDeleting={isDeleting}
      deleteError={deleteError}
      onDeletePress={handleConfirmDelete}
    />
  );
}