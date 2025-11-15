import { useCallback, useState } from "react";
// CORREÇÃO 1: Importando 'signUp' ao invés de 'registerUser' para
// manter consistência com o diagrama de sequência.
import { signUp } from "../../services/authService";

/**
 * Hook customizado para controlar a lógica da tela de Cadastro.
 * As responsabilidades dele são:
 * 1. Gerenciar o estado dos campos (name, email, password).
 * 2. Validar os campos (conforme diagrama).
 * 3. Chamar o serviço de autenticação.
 * 4. Retornar estados, carregamento e erros para a View.
 */
export function useCadastroController() {
  // --- Estados ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para feedback de erro (conforme diagrama: 'mostrarMensagemErro')
  const [error, setError] = useState("");
  // Estado para feedback de carregamento (boa prática, não está no diagrama
  // mas ajuda a View a saber quando mostrar um "spinner")
  const [isLoading, setIsLoading] = useState(false);

  // --- Funções Auxiliares ---

  // CORREÇÃO 2: Adicionando a função 'validarCampos' que estava
  // presente no diagrama ('Opt - [cadastroInvalido]'), mas ausente no código.
  /**
   * Valida os campos do formulário de cadastro.
   * @returns {boolean} True se os campos são válidos, False caso contrário.
   */
  const validarCampos = () => {
    // Limpa erro anterior antes de validar
    setError("");

    // Validação simples de campos obrigatórios
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Campos Obrigatórios"); // Mensagem do seu diagrama
      return false;
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return false;
    }

    return true; // Passou na validação
  };

  // --- Função Principal (Handler) ---

  // CORREÇÃO 3: Renomeando 'submitSignUp' para 'handleSubmit'
  // para ficar mais alinhado com o que a View (CadastroView)
  // provavelmente chamaria (conforme diagrama: 'handleSubmit').
  /**
   * Orquestra o processo de cadastro.
   * É chamado pela View quando o usuário clica em 'Cadastrar'.
   */
  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    // 1. Chamar 'validarCampos()' (conforme diagrama)
    if (!validarCampos()) {
      setIsLoading(false);
      return; // Para a execução se for inválido
    }

    // 2. Chamar o serviço 'signUp' (conforme diagrama)
    try {
      const userData = { name, email, password };

      // CORREÇÃO 4: Chamando 'signUp' (importado) ao invés de 'registerUser'.
      const data = await signUp(userData);

      setIsLoading(false);
      // Sucesso (conforme diagrama: 'retornoSucesso')
      // A View será responsável por 'navegarParaLogin()'
      return data;
    } catch (error) {
      setIsLoading(false);

      // CORREÇÃO 5: Tratamento de Erros (conforme diagrama: 'retornoErro')
      // Mapeia erros do Cognito para mensagens amigáveis.
      // Isso implementa o fluxo 'Alt - [emailExiste]'.
      if (error.code === "UsernameExistsException") {
        setError("E-mail já existe"); // Mensagem do seu diagrama
      } else {
        // Para outros erros inesperados
        setError(error.message || "Ocorreu um erro ao tentar cadastrar.");
      }
    }
  }, [name, email, password]); // useCallback depende desses estados

  // --- Retorno do Hook ---
  // Expõe os estados e a função de submissão para a View.
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit, // Exporta a função com o nome corrigido
    error,        // Exporta o erro para a View mostrar
    isLoading,    // Exporta o estado de carregamento
  };
}