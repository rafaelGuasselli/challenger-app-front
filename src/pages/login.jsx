import React, { useState } from 'react';
import {
	View, Text, TextInput, TouchableOpacity,
	StyleSheet, Alert, KeyboardAvoidingView, Platform,
	ScrollView, Pressable, Image, Modal, Button
} from 'react-native';

import { loginUser, getCurrentUser, logoutUser } from '../services/authService';
import { signOut, signInWithRedirect } from "@aws-amplify/auth";


const mockAccounts = [
	{ id: 1, name: "Felipe Rocha", email: "felipematorocha@gmail.com", avatar: "https://i.pravatar.cc/100?img=3" },
	{ id: 2, name: "Felipe Rocha", email: "fmrocha@gmail.com", avatar: "https://i.pravatar.cc/100?img=5" },
];


const handleGoogleOAuth = async () => {
	try {
		await signOut();
		await signInWithRedirect({ provider: "Google" });
	} catch (err) {
		console.error("Erro no OAuth Google:", err);
	}
};



function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showGooglePopup, setShowGooglePopup] = useState(false);

	// Redirect if already logged in
	getCurrentUser()
		.then(() => {
			navigation.replace('Home');
		})
		.catch((err) => console.log(err));


	const handleCadastrar = ()=>{
		navigation.navigate("Cadastro");
	};


	const handleSubmit = async () => {
		try {
			const data = await loginUser({ email, password });
			console.log("Login bem-sucedido:", data);
			Alert.alert('Sucesso', 'Login realizado!');
			navigation.replace('Home');
		} catch (err) {
			console.error("Erro no login:", err);
			Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Text style={styles.title}>Entrar</Text>

				{/* Formulário de login */}
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

					<TouchableOpacity style={styles.button} onPress={handleCadastrar}>
						<Text style={styles.buttonText}>Cadastrar</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.divider}>ou</Text>

				{/* Botão Google */}
				<Pressable style={styles.googleButton} onPress={() => setShowGooglePopup(true)}>
					<Image
						source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
						style={styles.googleIcon}
					/>
					<Text style={styles.googleText}>Continuar com Google</Text>
				</Pressable>

				{/* Popup simulado */}
				<Modal visible={showGooglePopup} animationType="slide">
					<View style={styles.modalContainer}>
						<View style={styles.header}>
							<Image
								source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
								style={styles.logo}
							/>
							<Text style={styles.headerText}>Fazer login com o Google</Text>
						</View>

						<ScrollView contentContainerStyle={styles.content}>
							<Text style={styles.modalTitle}>Escolha uma conta</Text>
							<Text style={styles.subtitle}>
								para prosseguir para <Text style={styles.appName}>MeuApp</Text>
							</Text>

							{mockAccounts.map((acc) => (
								<Pressable
									key={acc.id}
									style={styles.accountItem}
									onPress={() => {
										console.log("Usuário escolheu:", acc.email);
										// 🚀 aqui é só trocar pelo handleGoogleOAuth quando o backend estiver pronto
										// handleGoogleOAuth();
										setShowGooglePopup(false);
									}}
								>
									<Image source={{ uri: acc.avatar }} style={styles.avatar} />
									<View>
										<Text style={styles.accountName}>{acc.name}</Text>
										<Text style={styles.accountEmail}>{acc.email}</Text>
									</View>
								</Pressable>
							))}

							<Pressable style={styles.accountItem} onPress={() => setShowGooglePopup(false)}>
								<Image source={{ uri: "https://img.icons8.com/material-outlined/24/000000/user.png" }} style={styles.avatar} />
								<Text style={styles.accountName}>Usar outra conta</Text>
							</Pressable>
						</ScrollView>

						<Button title="Fechar" onPress={() => setShowGooglePopup(false)} />
					</View>
				</Modal>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: { flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
	title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
	form: { width: '100%', maxWidth: 400 },
	input: {
		borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
		paddingHorizontal: 12, paddingVertical: 10, marginVertical: 6, backgroundColor: '#fff',
	},
	button: { marginTop: 12, backgroundColor: '#1976d2', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
	buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
	divider: { marginVertical: 15, fontSize: 14, color: '#666' },
	googleButton: {
		flexDirection: 'row', alignItems: 'center',
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#fff',
	},
	googleIcon: { width: 20, height: 20, marginRight: 10 },
	googleText: { fontSize: 16, color: '#444' },
	// Modal
	modalContainer: { flex: 1, backgroundColor: '#fff' },
	header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
	logo: { width: 25, height: 25, marginRight: 10 },
	headerText: { fontSize: 16, color: '#555' },
	content: { padding: 20 },
	modalTitle: { fontSize: 22, fontWeight: '500', marginBottom: 5, textAlign: 'center' },
	subtitle: { fontSize: 14, color: '#555', marginBottom: 25, textAlign: 'center' },
	appName: { color: '#1a73e8', fontWeight: 'bold' },
	accountItem: {
		flexDirection: 'row', alignItems: 'center',
		padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 15,
	},
	avatar: { width: 35, height: 35, borderRadius: 50, marginRight: 12 },
	accountName: { fontSize: 16 },
	accountEmail: { fontSize: 13, color: '#666' },
});
