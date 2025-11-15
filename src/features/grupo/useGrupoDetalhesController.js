import { useCallback, useState } from "react";
// Importa a nova função do serviço
import { deleteGroup } from "../../services/apiService";
import { useNavigation } from "@react-navigation/native";

/**
 * Hook para controlar a lógica da tela de Detalhes do Grupo.
 * @param {string} groupId O ID do grupo que esta tela está gerenciando
 */
export function useGrupoDetalhesController(groupId) {
  const navigation = useNavigation();

  // Estados da UI específicos para a *ação* de deletar
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  /**
   * Orquestra a deleção do grupo.
   */
  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      // 1. Chama o serviço de API
      await deleteGroup(groupId);

      setIsDeleting(false);
      
      // 2. Sucesso: Retorna para a lista de grupos
      navigation.navigate("ListaDeGrupos"); // Ou sua tela 'Home'
      
      return true;
      
    } catch (error) {
      setIsDeleting(false);
      setDeleteError(error.message || "Ocorreu um erro ao deletar o grupo.");
      return false;
    }
  }, [groupId, navigation]); // Dependências do useCallback

  // --- Retorno do Hook ---
  return {
    handleDelete,
    isDeleting,
    deleteError,
  };
}