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
// 2. Handler de submissão da página
  const handleViewSubmit = async () => {
    // Chama o handler do controller
    const newGroup = await handleSubmit();

    // Verificamos se newGroup existe E se ele tem um ID válido
    if (newGroup && newGroup.id) {
      Alert.alert(
        t("common.successTitle") || "Sucesso",
        t("createGroup.successMessage") || "Grupo criado com sucesso!"
      );
      // Só navega se tivermos certeza que o ID existe
      navigation.navigate("GrupoDetalhes", { groupData: newGroup });
      
    } else if (newGroup) {
      // Caso raro: O grupo foi criado (newGroup existe), mas veio sem ID
      Alert.alert("Atenção", "Grupo criado, mas não foi possível carregar os detalhes.");
    }
    // Se newGroup for undefined (erro no controller), não fazemos nada pois o controller já exibiu a msg de erro na tela.
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