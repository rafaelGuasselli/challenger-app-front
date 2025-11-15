/**
 * @param {object} data Os dados a serem enviados (ex: { nome: "...", ... })
 * @returns {Promise<object>} O novo objeto criado
 */
const mockApiCall = (data) => {
  return new Promise((resolve) => {
    // Simula uma espera de rede de 1 segundo
    setTimeout(() => {
      console.log("API MOCK: Enviando dados...", data);
      // Retorna os dados enviados + um ID falso
      resolve({ id: new Date().getTime(), ...data });
    }, 1000);
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