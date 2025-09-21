import { useCallback, useState } from "react";
import { registerUser } from "../../services/authService";

export function useCadastroController() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = useCallback(async () => {
    const userData = { name, email, password };
    const data = await registerUser(userData);
    return data;
  }, [name, email, password]);

  return { name, setName, email, setEmail, password, setPassword, submit };
}
