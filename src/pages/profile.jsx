import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../i18n';
import { authService } from '../services/authService';

const Profile = ({ user = { name: '', avatarUrl: '' } }) => {
  const [openPwdDialog, setOpenPwdDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingPwd, setSavingPwd] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigation = useNavigation();
  const { fetchI18nText } = useI18n();

  const handleSavePassword = async () => {
    if (savingPwd) return;
    setSavingPwd(true);
    try {
      const resp = await authService.updatePassword({ oldPassword, newPassword });
      if (resp && resp.success) {
        Alert.alert(fetchI18nText('common.successTitle'), fetchI18nText('profile.passwordUpdated'));
        setOpenPwdDialog(false);
      } else {
        Alert.alert(fetchI18nText('common.errorTitle'), resp?.message || fetchI18nText('profile.passwordUpdateError'));
      }
    } catch (err) {
      console.error('Erro ao atualizar senha:', err);
      Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('profile.passwordUpdateError'));
    } finally {
      setSavingPwd(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      const resp = await authService.deleteCurrentUser();
      if (resp && resp.success) {
        Alert.alert(fetchI18nText('common.successTitle'), fetchI18nText('profile.accountDeleted'));
        setTimeout(() => {
          navigation.navigate('Login');
        }, 800);
      } else {
        Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('profile.accountDeleteError'));
      }
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('profile.accountDeleteError'));
    } finally {
      setDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const displayName = user?.name || fetchI18nText('profile.demoUser');

  return (
    <View style={styles.container}>
      {/* Avatar */}
      {user.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]}>
          <Text style={styles.avatarText}>{displayName ? displayName[0] : 'U'}</Text>
        </View>
      )}

      {/* Nome */}
      <Text style={styles.name}>{displayName}</Text>

      {/* Botões */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => setOpenPwdDialog(true)}>
          <Text style={styles.buttonText}>{fetchI18nText('profile.resetPassword')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteButton]}
          onPress={() => setOpenDeleteDialog(true)}
        >
          <Text style={styles.deleteButtonText}>{fetchI18nText('profile.deleteAccount')}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para alterar senha */}
      <Modal visible={openPwdDialog} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{fetchI18nText('profile.resetPassword')}</Text>
            <TextInput
              style={styles.input}
              placeholder={fetchI18nText('profile.oldPasswordPlaceholder')}
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.input}
              placeholder={fetchI18nText('profile.newPasswordPlaceholder')}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setOpenPwdDialog(false)}>
                <Text style={styles.cancelText}>{fetchI18nText('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword} disabled={savingPwd}>
                {savingPwd ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>{fetchI18nText('common.save')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para excluir conta */}
      <Modal visible={openDeleteDialog} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{fetchI18nText('profile.deleteTitle')}</Text>
            <Text style={{ marginVertical: 12 }}>
              {fetchI18nText('profile.deleteQuestion')}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setOpenDeleteDialog(false)}>
                <Text style={styles.cancelText}>{fetchI18nText('common.no')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: 'red' }]}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>{fetchI18nText('common.yes')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  avatarFallback: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelText: {
    fontSize: 16,
    marginRight: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
