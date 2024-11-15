
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCondominios = () => {
  return useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      const token = sessionStorage.getItem('token');
      
      try {
        const response = await axios.get('http://98.80.93.196:80/api/condominios', {
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
