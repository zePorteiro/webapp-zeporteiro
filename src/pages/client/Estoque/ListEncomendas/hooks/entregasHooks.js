import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// CREATE 
export function useCreateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEntrega) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/entregas',
          newEntrega,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error('Erro ao criar entrega');
        }
      } catch (error) {
        console.error('Erro ao criar entrega:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
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
        const response = await axios.get(
          'http://localhost:8080/entregas/pendentes',
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
        throw error;
      }
    },
    onError: (error) => {
      console.error('Erro ao carregar entregas:', error);
    },
  });
}
