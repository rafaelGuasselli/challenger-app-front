// O endereço base da sua API que o time de back-end vai te passar
const API_URL = 'http://localhost:3001/api/usuarios'; // Exemplo! Usem o endereço real aqui.

// Função para CADASTRAR um usuário
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // userData deve ser um objeto { name, email, password }
    });

    if (!response.ok) {
      // Se o back-end retornar um erro (ex: e-mail já existe), ele cairá aqui
      throw new Error('Erro ao cadastrar usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha na requisição de cadastro:', error);
    throw error;
  }
};

// Função para LOGAR um usuário
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), // credentials deve ser um objeto { email, password }
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const data = await response.json();
    return data; // Geralmente o back-end retorna um "token" aqui
  } catch (error) {
    console.error('Falha na requisição de login:', error);
    throw error;
  }
};