import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// CREATE
function useCreatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPorteiro) => {
      try {
        const response = await axios.post(
          'http://localhost:8080/porteiros',
          newPorteiro,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error('Erro ao criar porteiro');
        }
      } catch (error) {
        console.error('Erro ao criar porteiro:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
  });
}

// UPDATE
function useUpdatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPorteiro) => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/porteiros/${updatedPorteiro.id}`,
          updatedPorteiro,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Erro ao atualizar porteiro');
        }
      } catch (error) {
        console.error('Erro ao atualizar porteiro:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
  });
}

// DELETE
function useDeletePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:8080/porteiros/${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 204) {
          return true;
        } else {
          throw new Error('Erro ao deletar porteiro');
        }
      } catch (error) {
        console.error('Erro ao deletar porteiro:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
  });
}

// GET
function useGetPorteiros() {
  return useQuery({
    queryKey: ['porteiros'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/porteiros',
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Erro ao buscar porteiros');
        }
      } catch (error) {
        console.error('Erro ao buscar porteiros:', error);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Erro ao carregar porteiros:', error);
    },
  });
}

export { useCreatePorteiro, useUpdatePorteiro, useDeletePorteiro, useGetPorteiros };