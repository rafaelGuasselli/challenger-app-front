import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getCurrentUser, getSession, getUserAttributes, logoutUser, deleteCurrentUser } from '../services/authService';
import { useI18n } from '../i18n';

const Home = ({ navigation }) => {
  	const [userName, setUserName] = useState('');
    const { fetchI18nText } = useI18n();
	
	getUserAttributes().then(attr=>{
		setUserName(attr.name);
	}).catch((err)=>{
		console.log(err);
		navigation.navigate('Login');
	});
	
	getCurrentUser().then(user=>{
		console.log(user);
	}).catch((err)=>{
		console.log(err);
		navigation.navigate('Login');
	});

	getSession().then(session=>{
		console.log(session);
	}).catch(err=>{
		console.log(err)
	});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fetchI18nText('home.welcome', { userName })}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#1976d2' }]}
          onPress={async () => {
            try {
              await logoutUser();
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } catch (err) {
              console.log('Erro ao sair:', err);
              Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('home.signOutErrorMsg'));
            }
          }}
        >
          <Text style={styles.buttonText}>{fetchI18nText('home.signOut')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#d32f2f' }]}
          onPress={() => {
            Alert.alert(
              fetchI18nText('home.deleteConfirmTitle'),
              fetchI18nText('home.deleteConfirmMsg'),
              [
                { text: fetchI18nText('home.deleteConfirmNo'), style: 'cancel' },
                {
                  text: fetchI18nText('home.deleteConfirmYes'),
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteCurrentUser();
                      Alert.alert(fetchI18nText('home.deleteSuccessTitle'), fetchI18nText('home.deleteSuccessMsg'));
                      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                    } catch (err) {
                      console.log('Erro ao apagar conta:', err);
                      Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('home.deleteErrorMsg'));
                    }
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <Text style={styles.buttonText}>{fetchI18nText('home.deleteAccount')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const homeOptions = ({ navigation }) => ({
  title: 'Home',
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={{ marginRight: 16 }}
    >
      <Text style={{ color: '#1976d2', fontWeight: '600' }}>Perfil</Text>
    </TouchableOpacity>
  ),
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  title: {
    fontSize: 24, 
    fontWeight: '600',
    marginBottom: 12,
	textAlign: "center"
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1976d2',
  },
});
