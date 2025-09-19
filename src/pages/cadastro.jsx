import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
// 1. Importe a função do seu serviço de API
import { registerUser } from '../services/authService';

const cadastro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Transforme a função handleSubmit em assíncrona (async)
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 3. Crie o objeto com os dados do formulário
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // 4. Chame a função da API e trate a resposta
    try {
      const data = await registerUser(userData);
      console.log('Usuário cadastrado com sucesso:', data);
      alert('Cadastro realizado com sucesso!');
      // Aqui você pode redirecionar o usuário para a tela de login
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Falha no cadastro. Verifique os dados e tente novamente.');
    }
  };

  return (
    // ... o restante do seu código JSX continua exatamente igual ...
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome Completo"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default cadastro;