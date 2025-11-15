import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useI18n } from "../i18n";
import CriarGrupoView from "../features/grupo/CriarGrupoView";
import { useCriarGrupoController } from "../features/grupo/useCriarGrupoController";

export default function CriarGrupoPage() {
  const navigation = useNavigation();
  const { fetchI18nText: t } = useI18n(); // Ou seu hook de tradução

  // 1. Chama o hook com toda a lógica
  const {
    nome,
    setNome,
    descricao,
    setDescricao,
    isPrivado,
    setIsPrivado,
    handleSubmit,
    error,
    isLoading,
  } = useCriarGrupoController();

  // 2. Handler de submissão da página
  const handleViewSubmit = async () => {
    // Chama o handler do controller
    const newGroup = await handleSubmit();

    // Se o controller retornar o novo grupo, deu sucesso
    if (newGroup) {
      Alert.alert(
        t("common.successTitle") || "Sucesso",
        t("createGroup.successMessage") || "Grupo criado com sucesso!"
      );
      // Navega para a página do novo grupo
      navigation.navigate("GrupoDetalhes", { groupData: newGroup });
    }
    // Se der erro, o 'error' state será atualizado pelo hook
    // e a View irá exibi-lo automaticamente.
  };

  // 3. Renderiza a View, passando as props
  return (
    <CriarGrupoView
      t={t}
      nome={nome}
      descricao={descricao}
      isPrivado={isPrivado}
      isLoading={isLoading}
      error={error}
      onChangeNome={setNome}
      onChangeDescricao={setDescricao}
      onChangeIsPrivado={setIsPrivado}
      onSubmit={handleViewSubmit}
    />
  );
}