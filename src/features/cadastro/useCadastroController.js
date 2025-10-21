import { useCallback, useState } from "react";
// Assumindo que o authService exporta uma função que chama o signUp do Amplify
import { registerUser } from "../../services/authService";

// O hook gerencia o estado e a chamada à API.
// A tela (Cadastro.jsx) cuidará da navegação e dos alertas.
export function useCadastroController() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // A tela de cadastro não precisa saber se já existe uma sessão ativa.

  const submitSignUp = useCallback(async () => {
    try {
      const userData = { name, email, password };
      // A função registerUser no seu authService deve chamar o signUp do Amplify
      // e retornar o resultado ou lançar um erro.
      const data = await registerUser(userData);
      return data; // Retorna o resultado do Amplify (ex: nextStep) para a tela
    } catch (error) {
      // Re-lança o erro para que o componente da tela possa capturá-lo
      throw error;
    }
  }, [name, email, password]);

  // Retorna os estados, os setters e a função de submissão
  return { name, setName, email, setEmail, password, setPassword, submitSignUp };
}
