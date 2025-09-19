import React from 'react';
import TextField from '@mui/material/TextField';

// Este é o nosso componente de input de e-mail reutilizável
const InputEmail = ({ value, onChange }) => {
  return (
    <TextField
      // Props que o Material-UI oferece
      label="E-mail"
      type="email"
      variant="outlined"
      margin="normal"
      fullWidth
      required

      // Props que nós estamos passando para controlar o componente
      value={value}
      onChange={onChange}
    />
  );
};

export default InputEmail;