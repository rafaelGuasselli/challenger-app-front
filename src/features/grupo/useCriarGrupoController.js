import { useCallback, useState } from "react";
import { createGroup } from "../../services/apiService";

/**
 * Hook para controlar a lógica da tela de Criar Grupo.
 */
export function useCriarGrupoController() {
  // --- Estados do Formulário ---
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isPrivado, setIsPrivado] = useState(false);

  // --- Estados da UI ---
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Valida os campos do formulário.
   */
  const validarCampos = () => {
    setError("");
    if (!nome.trim()) {
      setError("O nome do grupo é obrigatório.");
      return false;
    }
    return true;
  };

  /**
   * Orquestra a criação do grupo.
   */
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    if (!validarCampos()) {
      setIsLoading(false);
      return; // Para a execução se for inválido
    }

    try {
      const groupData = { nome, descricao, isPrivado };
      
      // 2. Chama o serviço de API
      const newGroup = await createGroup(groupData);

      setIsLoading(false);
      return newGroup; // Retorna o novo grupo em caso de sucesso
      
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Ocorreu um erro ao criar o grupo.");
      return undefined; // Retorna undefined em caso de erro
    }
  }, [nome, descricao, isPrivado]); // Dependências do useCallback

  // --- Retorno do Hook ---
  return {
    nome,
    setNome,
    descricao,
    setDescricao,
    isPrivado,
    setIsPrivado,
    handleSubmit,
    error,
    isLoading,
  };
}