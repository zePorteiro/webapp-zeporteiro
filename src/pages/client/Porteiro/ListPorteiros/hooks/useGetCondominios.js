import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useGetCondominios() {
  return useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/condominios');
        return response.data;
      } catch (error) {
        console.error('Erro ao obter condomínios:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    select: data => data.map(condominio => ({
      id: condominio.id,
      nome: condominio.nome,
    })),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
