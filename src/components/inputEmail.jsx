import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

// Componente de input de e-mail reutilizável (React Native)
const InputEmail = ({ value, onChange, onChangeText, label = 'E-mail', placeholder = 'E-mail' }) => {
	const handleChangeText = (text) => {
		if (onChangeText) onChangeText(text);
		if (onChange) onChange({ target: { value: text } });
	};

	return (
		<View style={styles.wrapper}>
			{!!label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				value={value}
				onChangeText={handleChangeText}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
		</View>
	);
};

export default InputEmail;

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		marginVertical: 6,
	},
	label: {
		marginBottom: 4,
		color: '#333',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: '#fff',
	},
});
