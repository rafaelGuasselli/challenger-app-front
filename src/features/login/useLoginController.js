import { useCallback, useEffect, useState } from "react";
import {
  loginUser,
  authService,
  getCurrentUser,
} from "../../services/authService";

export function useLoginController({ onAuthenticated } = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showGooglePopup, setShowGooglePopup] = useState(false);

  useEffect(() => {
    // Initial check: if already authenticated, redirect
    let mounted = true;
    getCurrentUser()
      .then(() => {
        if (mounted && onAuthenticated) onAuthenticated();
      })
      .catch(() => {});

    const off = authService.subscribeAuth("signedIn", () => {
      onAuthenticated && onAuthenticated();
    });
    return () => {
      mounted = false;
      if (typeof off === "function") off();
    };
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
