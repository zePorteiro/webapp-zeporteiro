import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// CREATE 
export function useCreateEntrega() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newEntrega) => {
      try {
        const token = sessionStorage.getItem('token');
        const fkUser = sessionStorage.getItem('fkUser');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }
        if (!fkUser) {
          throw new Error('fkUser não encontrado no sessionStorage');
        }

        const responseApartamento = await axios.get(`http://localhost:8080/apartamentos?numAp=${newEntrega.numAp}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const apartamentos = responseApartamento.data;
        if (!Array.isArray(apartamentos) || apartamentos.length === 0) {
          throw new Error('Apartamento não encontrado');
        }

        const apartamento = apartamentos.find(ap => ap.numAp === newEntrega.numAp);
        if (!apartamento) {
          throw new Error('Apartamento não encontrado');
        }

        const payload = {
          data_recebimento_porteiro: newEntrega.dataRecebimentoPorteiro,
          fk_apartamento: apartamento.id,
          fk_porteiro: newEntrega.fkPorteiro,
          tipo_entrega: newEntrega.tipoEntrega,
        };

        console.log('Payload a ser enviado:', payload);
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

        if (response.status === 201) {
          console.log('Entrega criada com sucesso:', response.data);
          return response.data;
        } else {
          throw new Error(`Erro ao criar entrega: ${response.statusText}`);
        }
      } catch (error) {
        if (error.response) {
          console.error('Erro do servidor:', error.response.data);
          throw new Error(`Erro ${error.response.status}: ${error.response.data.message || 'Erro desconhecido'}`);
        } else if (error.request) {
          console.error('Nenhuma resposta do servidor:', error.request);
          throw new Error('Nenhuma resposta do servidor');
        } else {
          console.error('Erro ao configurar a requisição:', error.message);
          throw new Error(error.message);
        }
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
          throw new Error('Erro ao atualizar entrega');
        }
      } catch (error) {
        console.error('Erro ao atualizar entrega:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
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
          throw new Error('Erro ao deletar entrega');
        }
      } catch (error) {
        console.error('Erro ao deletar entrega:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
    },
  });
}

// GET 
export function useGetEntregas() {
  return useQuery({
    queryKey: ['entregas'],
    queryFn: async () => {
      try {
        const token = sessionStorage.getItem('token');

        const response = await axios.get(
          `http://localhost:8080/entregas`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (response.status === 200) {
          return response.data;  
        } else {
          throw new Error('Erro ao buscar entregas');
        }
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
        throw new Error(error.response?.data?.message || 'Erro ao buscar entregas'); // Mensagem de erro mais específica
      }
    },
    onError: (error) => {
      console.error('Erro ao carregar entregas:', error.message); 
    },
    refetchOnWindowFocus: false, 
  });
}

