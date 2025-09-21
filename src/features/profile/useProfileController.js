import { useCallback, useState } from "react";
import { authService } from "../../services/authService";

export function useProfileController() {
  const [openPwdDialog, setOpenPwdDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPwd, setSavingPwd] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updatePassword = useCallback(async () => {
    if (typeof authService.updatePassword !== "function") {
      throw new Error("updatePassword not implemented");
    }
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
