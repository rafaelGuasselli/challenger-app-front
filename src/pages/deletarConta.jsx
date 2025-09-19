import React from 'react';
import { Button, Container, Typography, Box, Alert } from '@mui/material';

const deletarConta = () => {
  const handleDelete = () => {
    // A lógica de confirmação e chamada da API viria aqui
    const isConfirmed = window.confirm('Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.');
    if (isConfirmed) {
      console.log('Deleção de conta confirmada');
      alert('Função de deletar conta ainda não implementada.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Deletar Conta
        </Typography>
        <Alert severity="error">Atenção: Esta ação é permanente e não pode ser desfeita. Todos os seus dados, grupos e desafios serão perdidos.</Alert>
        <Button onClick={handleDelete} fullWidth variant="contained" color="error" sx={{ mt: 3, mb: 2 }}>
          Eu entendo as consequências, deletar minha conta
        </Button>
      </Box>
    </Container>
  );
};

export default deletarConta;