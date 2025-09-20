import React, { useState } from 'react';
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

const Login = () => {
	// Estados para e-mail and senha
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		console.log({ email, password });
		Alert.alert('Login', 'Login enviado! (Verifique o console)');
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Text style={styles.title}>Entrar</Text>
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="E-mail"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						returnKeyType="next"
					/>
					<TextInput
						style={styles.input}
						placeholder="Senha"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						returnKeyType="done"
					/>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Entrar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Login;

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
