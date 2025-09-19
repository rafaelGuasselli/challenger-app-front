import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const mudarSenha = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Mudança de senha solicitada');
    // Aqui viria a lógica para chamar a API de mudança de senha
    alert('Função de mudar senha ainda não implementada.');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Mudar Senha
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth name="currentPassword" label="Senha Atual" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <TextField margin="normal" required fullWidth name="newPassword" label="Nova Senha" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Salvar Nova Senha
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default mudarSenha;