import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';

const DeletarConta = () => {
	const handleDelete = () => {
		Alert.alert(
			'Confirmar deleção',
			'Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{
					text: 'Deletar',
					style: 'destructive',
					onPress: () => {
						console.log('Deleção de conta confirmada');
						Alert.alert('Info', 'Função de deletar conta ainda não implementada.');
					},
				},
			]
		);
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
				<Text style={styles.title}>Deletar Conta</Text>
				<View style={styles.alertBox}>
					<Text style={styles.alertText}>
						Atenção: Esta ação é permanente e não pode ser desfeita. Todos os seus dados, grupos e desafios serão perdidos.
					</Text>
				</View>
				<TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
					<Text style={styles.buttonText}>Eu entendo as consequências, deletar minha conta</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default DeletarConta;

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
		textAlign: 'center',
	},
	alertBox: {
		width: '100%',
		maxWidth: 500,
		backgroundColor: '#fdecea',
		borderColor: '#f5c6cb',
		borderWidth: 1,
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	alertText: {
		color: '#a94442',
	},
	button: {
		marginTop: 12,
		backgroundColor: '#1976d2',
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: 'center',
		width: '100%',
		maxWidth: 500,
	},
	deleteButton: {
		backgroundColor: '#d32f2f',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 16,
		textAlign: 'center',
	},
});
