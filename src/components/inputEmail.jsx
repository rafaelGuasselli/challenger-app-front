import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { useI18n } from "../i18n";

// Componente de input de e-mail reutilizável (React Native)
const InputEmail = ({ value, onChange, onChangeText, label, placeholder }) => {
  const { fetchI18nText } = useI18n();
  const resolvedLabel = label ?? fetchI18nText("login.emailPlaceholder");
  const resolvedPlaceholder =
    placeholder ?? fetchI18nText("login.emailPlaceholder");
  const handleChangeText = (text) => {
    if (onChangeText) onChangeText(text);
    if (onChange) onChange({ target: { value: text } });
  };

  return (
    <View style={styles.wrapper}>
      {!!resolvedLabel && <Text style={styles.label}>{resolvedLabel}</Text>}
      <TextInput
        style={styles.input}
        placeholder={resolvedPlaceholder}
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
    width: "100%",
    marginVertical: 6,
  },
  label: {
    marginBottom: 4,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});
