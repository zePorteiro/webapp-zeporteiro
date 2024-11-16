import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// CREATE
export function useCreateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEntrega) => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      // Log do objeto recebido
      console.log('Dados recebidos:', newEntrega);

      // Garantindo que o idPorteiro seja um número
      const idPorteiro = parseInt(newEntrega.idPorteiro);
      
      if (!idPorteiro || isNaN(idPorteiro)) {
        throw new Error('ID do porteiro inválido');
      }

      const payload = {
        tipoEntrega: newEntrega.tipoEntrega,
        dataRecebimentoPorteiro: newEntrega.dataRecebimentoPorteiro,
        dataRecebimentoMorador: null,
        recebido: false,
        numAp: newEntrega.numAp,
        idPorteiro: idPorteiro 
      };

      console.log('Payload a ser enviado:', payload);

      try {
        const response = await axios.post(
          'http://localhost:8080/entregas',
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Resposta do servidor:', response.data);

        return response.data;
      } catch (error) {
        console.error('Erro completo:', error);
        console.error('Resposta do erro:', error.response?.data);
        
        if (error.response) {
          const errorMessage = error.response.data.message || 'Erro ao criar entrega';
          throw new Error(`${errorMessage} (${error.response.status})`);
        }
        throw new Error('Erro de conexão com o servidor');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
    },
    onError: (error) => {
      console.error('Erro ao criar entrega:', error);
    },
  });
}



// UPDATE
export function useUpdateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedEntrega) => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/entregas/${updatedEntrega.id}`,
          updatedEntrega,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Erro ao atualizar entrega");
        }
      } catch (error) {
        console.error("Erro ao atualizar entrega:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["entregas"]);
    },
  });
}

// DELETE
export function useDeleteEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:8080/entregas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 204) {
          return true;
        } else {
          throw new Error("Erro ao deletar entrega");
        }
      } catch (error) {
        console.error("Erro ao deletar entrega:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["entregas"]);
    },
  });
}

// GET
export function useGetEntregas() {
  return useQuery({
    queryKey: ["entregas"],
    queryFn: async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Token de autenticação não encontrado");
        }

        const response = await axios.get(`http://localhost:8080/entregas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log para debug
        console.log('Dados brutos do backend:', response.data);

        // Se não houver dados, retornar array vazio
        if (!response.data) return [];

        const entregas = response.data.map(entrega => {
          // Log para debug de cada entrega
          console.log('Processando entrega:', entrega);

          return {
            id: entrega.id, // Adicionando o ID
            tipoEntrega: entrega.tipoEntrega,
            dataRecebimentoPorteiro: entrega.dataRecebimentoPorteiro,
            dataRecebimentoMorador: entrega.dataRecebimentoMorador,
            recebido: entrega.recebido,
            // Dados do apartamento
            numAp: entrega.apartamento?.numAp || entrega.numAp, // Tenta ambos os caminhos
            // Dados do porteiro
            idPorteiro: entrega.porteiro?.id || entrega.idPorteiro || entrega.fkPorteiro, // Tenta todas as possibilidades
            nomePorteiro: entrega.porteiro?.nome
          };
        });

        // Log das entregas processadas
        console.log('Entregas processadas:', entregas);

        return entregas;
      } catch (error) {
        console.error("Erro completo:", error);
        if (error.response) {
          throw new Error(
            `Erro ${error.response.status}: ${error.response.data.message || 'Erro ao buscar entregas'}`
          );
        }
        throw new Error(error.message || "Erro ao buscar entregas");
      }
    },
    onError: (error) => {
      console.error("Erro ao carregar entregas:", error.message);
    },
    refetchOnWindowFocus: false,
    staleTime: 30000, 
    cacheTime: 3600000, 
    retry: 2,
  });
}