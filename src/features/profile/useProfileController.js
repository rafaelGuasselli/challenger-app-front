import { useCallback, useEffect, useState } from "react";
import { authService, getCurrentUser, getUserAttributes } from "../../services/authService";

export function useProfileController() {
  const [openPwdDialog, setOpenPwdDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  const [user, setUser] = useState({ name: "", username: "", avatarUrl: "" });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [cu, attrs] = await Promise.all([
          getCurrentUser().catch(() => null),
          getUserAttributes().catch(() => ({})),
        ]);
        if (!mounted) return;
        const username = cu?.username || cu?.signInDetails?.loginId || "";
        const name = attrs?.name || attrs?.given_name || "";
        setUser((prev) => ({ ...prev, name, username }));
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const updatePassword = useCallback(async () => {
    setSavingPwd(true);
    try {
      const resp = await authService.updatePassword({
        oldPassword,
        newPassword,
      });
      return resp;
    } finally {
      setSavingPwd(false);
    }
  }, [oldPassword, newPassword]);

  const deleteAccount = useCallback(async () => {
    setDeleting(true);
    try {
      const resp = await authService.deleteCurrentUser();
      return resp;
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    // state
    user,
    openPwdDialog,
    setOpenPwdDialog,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    savingPwd,
    openDeleteDialog,
    setOpenDeleteDialog,
    deleting,
    // actions
    updatePassword,
    deleteAccount,
  };
}
