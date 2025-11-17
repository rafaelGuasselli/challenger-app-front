import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  getUserAttributes,
  logoutUser,
  deleteCurrentUser,
  authService,
} from "../../services/authService";

// --- DADOS DE TESTE (MOCK) ---
// Usado para testes visuais enquanto o backend não está pronto.
const MOCK_CHALLENGES_FALLBACK = [
  { id: "1", title: "Correr 5km (TESTE)", completed: false },
  { id: "2", title: "Ler 20 páginas (TESTE)", completed: false },
  { id: "3", title: "Meditar por 10 minutos (TESTE)", completed: true },
];

export function useHomeController({ onUnauthenticated } = {}) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DE ESTADO (VERSÃO DE TESTE ATIVA) ---
  // Inicia o estado com o mock para testes visuais.
  const [challenges, setChallenges] = useState(MOCK_CHALLENGES_FALLBACK);

  /*
  // --- LÓGICA DE ESTADO (VERSÃO DE PRODUÇÃO) ---
  // (Descomente esta linha e comente a linha acima quando o backend estiver pronto)
  const [challenges, setChallenges] = useState([]);
  */

  useEffect(() => {
    let mounted = true;

    // --- LÓGICA DO EFFECT (VERSÃO DE TESTE ATIVA) ---
    (async () => {
      try {
        const attrs = await getUserAttributes();
        if (mounted) {
          setUserName(attrs?.name || "");
          // No modo de teste, NÃO buscamos os desafios do 'attrs'
          // para forçar o uso do mock e evitar que ele seja resetado.
        }
      } catch (err) {
        if (onUnauthenticated) onUnauthenticated(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    /*
    // --- LÓGICA DO EFFECT (VERSÃO DE PRODUÇÃO) ---
    (async () => {
      try {
        const attrs = await getUserAttributes(); // Busca dados do user
        if (mounted) {
          setUserName(attrs?.name || "");
          
          // Em PROD: Popula os desafios vindos do usuário
          // (Esperamos que 'attrs.challenges' seja a lista)
          setChallenges(attrs?.challenges || []);
        }
      } catch (err) {
        if (onUnauthenticated) onUnauthenticated(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    */

    // --- LISTENERS DE AUTENTICAÇÃO ---
    // (Também precisam ser atualizados para a versão de produção)

    const offSignedOut = authService.subscribeAuth("signedOut", () => {
      onUnauthenticated && onUnauthenticated();
    });
    const offUserDeleted = authService.subscribeAuth("userDeleted", () => {
      onUnauthenticated && onUnauthenticated();
    });
    const offSignedIn = authService.subscribeAuth("signedIn", async () => {
      try {
        const attrs = await getUserAttributes();
        if (mounted) {
          setUserName(attrs?.name || "");
          // (Em PROD, descomente a linha abaixo)
          // setChallenges(attrs?.challenges || []);
        }
      } catch {}
    });

    return () => {
      mounted = false;
      if (typeof offSignedOut === "function") offSignedOut();
      if (typeof offUserDeleted === "function") offUserDeleted();
      if (typeof offSignedIn === "function") offSignedIn();
    };
  }, [onUnauthenticated]);

  const signOut = useCallback(async () => {
    await logoutUser();
  }, []);

  const deleteAccount = useCallback(async () => {
    await deleteCurrentUser();
  }, []);

  const handleCreateGroup = useCallback(() => {
    navigation.navigate("CriarGrupo");
  }, [navigation]);

  // --- FUNÇÃO DE COMPLETAR (VERSÃO DE TESTE ATIVA) ---
  // (Esta versão funciona com o MOCK, usando 'challenge.id')
  const handleCompleteChallenge = useCallback((challengeId) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  }, []);

  /*
  //
  const handleCompleteChallenge = useCallback((challengeIndex) => {
    
    // 1. Atualização Otimista da UI
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge, index) =>
        index === challengeIndex
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  */

  return {
    userName,
    loading,
    signOut,
    deleteAccount,
    handleCreateGroup,
    challenges,
    handleCompleteChallenge,
  };
}