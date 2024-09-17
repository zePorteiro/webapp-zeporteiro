import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCondominios = () => {
  return useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      const token = sessionStorage.getItem('token');
      
      try {
        const response = await axios.get('http://localhost:8080/condominios', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao obter condomínios:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error('Erro ao obter condomínios:', error);
    }
  });
};
