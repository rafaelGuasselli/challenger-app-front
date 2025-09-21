import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 Hook do React Navigation
import { registerUser } from '../services/authService';
import { useI18n } from '../i18n';

const Cadastro = () => {
	const navigation = useNavigation(); // 👈 acesso ao navigation
	const { fetchI18nText } = useI18n();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		const userData = { name, email, password };

		try {
			if (typeof signUpInjected === 'function') {
				const result = await signUpInjected({
					username: email,
					password,
					options: {
						userAttributes: {
							email,
							name,
						},
					},
				});
				console.log('Amplify signUp result:', result);
			} else {
				const data = await registerUser(userData);
				console.log('Usuário cadastrado com sucesso:', data);
			}
			Alert.alert(fetchI18nText('common.successTitle'), fetchI18nText('register.successMessage'));
			navigation.navigate('Login');
		} catch (error) {
			console.error('Erro no cadastro:', error);
			Alert.alert(fetchI18nText('common.errorTitle'), fetchI18nText('register.errorMessage'));
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.select({ ios: 'padding', android: undefined })}
		>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Text style={styles.title}>{fetchI18nText('register.title')}</Text>
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder={fetchI18nText('register.namePlaceholder')}
						value={name}
						onChangeText={setName}
						autoCapitalize="words"
						returnKeyType="next"
					/>
					<TextInput
						style={styles.input}
						placeholder={fetchI18nText('register.emailPlaceholder')}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						returnKeyType="next"
					/>
					<TextInput
						style={styles.input}
						placeholder={fetchI18nText('register.passwordPlaceholder')}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						returnKeyType="done"
					/>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>{fetchI18nText('register.submitButton')}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Cadastro;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 24,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 22,
		fontWeight: '600',
		marginBottom: 16,
	},
	form: {
		width: '100%',
		maxWidth: 400,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginVertical: 6,
		backgroundColor: '#fff',
	},
	button: {
		marginTop: 12,
		backgroundColor: '#1976d2',
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
	},
});
