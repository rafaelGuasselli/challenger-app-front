import { useCallback, useEffect, useState } from "react";
import {
  getUserAttributes,
  getCurrentUser,
  getSession,
  logoutUser,
  deleteCurrentUser,
} from "../../services/authService";

export function useHomeController({ onUnauthenticated } = {}) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const attrs = await getUserAttributes();
        if (mounted) setUserName(attrs?.name || "");
        await getCurrentUser();
        await getSession();
      } catch (err) {
        if (onUnauthenticated) onUnauthenticated(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [onUnauthenticated]);

  const signOut = useCallback(async () => {
    await logoutUser();
  }, []);

  const deleteAccount = useCallback(async () => {
    await deleteCurrentUser();
  }, []);

  return { userName, loading, signOut, deleteAccount };
}
