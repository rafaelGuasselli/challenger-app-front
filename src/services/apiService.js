/**
 * @param {object} data Os dados a serem enviados (ex: { nome: "...", ... })
 * @returns {Promise<object>} O novo objeto criado
 */
const mockApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    // Simula uma espera de rede
    setTimeout(() => {
      console.log("API MOCK: Enviando dados...", data);
      resolve({ id: new Date().getTime(), ...data });
    }, delay);
  });
};

/**
 * Cria um novo grupo no back-end.
 * @param {{ nome: string, descricao: string, isPrivado: boolean }} groupData
 */
export async function createGroup(groupData) {
  const newGroup = await mockApiCall(groupData);
  return newGroup;
}

/**
 * Deleta um grupo no back-end.
 * @param {string} groupId O ID do grupo a ser deletado
 */
export async function deleteGroup(groupId) {
  console.log(`API MOCK: Deletando grupo com ID: ${groupId}`);
  // Em uma API real, o 'data' seria nulo ou {}.
  // Usamos 'mockApiCall' para simular o tempo de rede.
  await mockApiCall({ id: groupId }, 500); // Simula uma deleção rápida
  return { success: true }; // Retorna sucesso
}