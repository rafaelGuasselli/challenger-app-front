import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getUserAttributes,
  logoutUser,
  deleteCurrentUser,
  authService,
} from "../../services/authService";

export function useHomeController({ onUnauthenticated } = {}) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const attrs = await getUserAttributes();
        if (mounted) setUserName(attrs?.name || "");
      } catch (err) {
        if (onUnauthenticated) onUnauthenticated(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const offSignedOut = authService.subscribeAuth("signedOut", () => {
      onUnauthenticated && onUnauthenticated();
    });
    const offUserDeleted = authService.subscribeAuth("userDeleted", () => {
      onUnauthenticated && onUnauthenticated();
    });
    const offSignedIn = authService.subscribeAuth("signedIn", async () => {
      try {
        const attrs = await getUserAttributes();
        if (mounted) setUserName(attrs?.name || "");
      } catch {}
    });

    return () => {
      mounted = false;
      if (typeof offSignedOut === "function") offSignedOut();
      if (typeof offUserDeleted === "function") offUserDeleted();
      if (typeof offSignedIn === "function") offSignedIn();
    };
  }, [onUnauthenticated]);

  const signOut = useCallback(async () => {
    await logoutUser();
  }, []);

  const deleteAccount = useCallback(async () => {
    await deleteCurrentUser();
  }, []);

  const handleCreateGroup = useCallback(() => {
    navigation.navigate("CriarGrupo");
  }, [navigation]);

  return { userName, loading, signOut, deleteAccount, handleCreateGroup };
}
