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

const MudarSenha = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleSubmit = () => {
		console.log('Mudança de senha solicitada');
		// Aqui viria a lógica para chamar a API de mudança de senha
		Alert.alert('Info', 'Função de mudar senha ainda não implementada.');
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Text style={styles.title}>Mudar Senha</Text>
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Senha Atual"
						value={currentPassword}
						onChangeText={setCurrentPassword}
						secureTextEntry
						returnKeyType="next"
					/>
					<TextInput
						style={styles.input}
						placeholder="Nova Senha"
						value={newPassword}
						onChangeText={setNewPassword}
						secureTextEntry
						returnKeyType="done"
					/>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Salvar Nova Senha</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default MudarSenha;

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
