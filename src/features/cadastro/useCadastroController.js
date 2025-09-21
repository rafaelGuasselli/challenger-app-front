import { useCallback, useEffect, useState } from "react";
import { registerUser, getCurrentUser } from "../../services/authService";

export function useCadastroController({ onAuthenticated } = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let mounted = true;
    getCurrentUser()
      .then(() => {
        if (mounted && onAuthenticated) onAuthenticated();
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [onAuthenticated]);

  const submit = useCallback(async () => {
    const userData = { name, email, password };
    const data = await registerUser(userData);
    return data;
  }, [name, email, password]);

  return { name, setName, email, setEmail, password, setPassword, submit };
}
