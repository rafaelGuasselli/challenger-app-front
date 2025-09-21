import { useCallback, useEffect, useState } from "react";
import { loginUser, authService } from "../../services/authService";

export function useLoginController({ onAuthenticated } = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  useEffect(() => {
    const off = authService.subscribeAuth("signedIn", () => {
      onAuthenticated && onAuthenticated();
    });
    return off;
  }, [onAuthenticated]);

  const submit = useCallback(async () => {
    const data = await loginUser({ email, password });
    return data;
  }, [email, password]);

  const openGooglePopup = useCallback(() => setShowGooglePopup(true), []);
  const closeGooglePopup = useCallback(() => setShowGooglePopup(false), []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    submit,
    showGooglePopup,
    openGooglePopup,
    closeGooglePopup,
  };
}
