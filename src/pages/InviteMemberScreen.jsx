import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useI18n } from '../i18n'; 
import axios from 'axios'; //npm install axios
// Configuração da URL base da API (ajuste conforme a porta do seu backend Java)
const API_BASE_URL = 'http://localhost:8080/api'; 

export default function InviteMemberScreen() {
  const { t } = useI18n();
  const route = useRoute();
  const navigation = useNavigation();

  // Recebe os dados do desafio passados pela tela anterior
  const { challengeId, challengeName } = route.params;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddMember = async () => {
    if (!email || !challengeId) {
      Alert.alert(t('common.error') || 'Erro', t('invite.validationError') || 'Por favor, insira um email válido e garanta que o ID do desafio esteja disponível.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // 1. Chamada POST para o endpoint do Spring Boot
      const response = await axios.post(
        `${API_BASE_URL}/challenges/${challengeId}/members`, 
        { email }
      );

      setSuccessMessage(t('invite.successMessage') || `Membro adicionado com sucesso ao desafio ${challengeName}!`);
      
      setTimeout(() => {
        Alert.alert(t('common.success') || 'Sucesso', successMessage, [
          { text: t('common.ok') || 'OK', onPress: () => navigation.goBack() }
        ]);
      }, 500);

    } catch (err) {
      const errorMessage = err.response?.data?.message 
        ? err.response.data.message // Mensagem específica do backend (ex: "Usuário não encontrado")
        : t('invite.apiError') || 'Não foi possível adicionar o membro. Verifique o email ou tente novamente.';
      
      setError(errorMessage);
      Alert.alert(t('common.error') || 'Erro', errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {t('invite.title') || 'Convidar Membro'}
      </Text>
      <Text style={styles.subHeader}>
        {t('invite.toChallenge') || 'Para o desafio:'} <Text style={styles.challengeName}>{challengeName}</Text>
      </Text>

      <Text style={styles.label}>
        {t('invite.emailLabel') || 'Email do Usuário'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={t('invite.emailPlaceholder') || 'exemplo@gymrats.com'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      {/* Exibir mensagem de erro ou sucesso */}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleAddMember}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            {t('invite.addButton') || 'Adicionar ao Grupo'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.backButtonText}>
          {t('common.cancel') || 'Cancelar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  challengeName: {
    fontWeight: 'bold',
    color: '#444',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#A9D4F5',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#1976D2',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  }
});
