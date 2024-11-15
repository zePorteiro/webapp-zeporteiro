import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function useCreatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPorteiro) => {
      try {
        const fkUser = sessionStorage.getItem('fkUser');
        const condominioIdProvisorio = fkUser ? Number(fkUser) - 1 : null; 
        const response = await axios.post(
          'http://98.80.93.196:80/api/porteiros',
          {
            condominioId: condominioIdProvisorio,
            nome: newPorteiro.nome,
            rg: newPorteiro.rg,
            senha: newPorteiro.senha
          },
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
          throw new Error(`Erro ao criar porteiro: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Erro ao criar porteiro:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao criar porteiro');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
    onError: (error) => {
      console.error('Erro ao criar porteiro:', error);
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
          `http://98.80.93.196:8080/porteiros/${updatedPorteiro.id}`,
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
          `http://98.80.93.196:8080/porteiros/${id}`,
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
        const fkUser = sessionStorage.getItem('fkUser');
        const condominioIdProvisorio = fkUser ? Number(fkUser) - 1 : null; 
        const response = await axios.get(
          `http://98.80.93.196:8080/porteiros/condominio/${condominioIdProvisorio}`,
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