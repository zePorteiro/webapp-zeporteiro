import { toast } from 'react-toastify'; 

export const handleError = (error) => {
  console.error('Ocorreu um erro:', error.response ? error.response.data : error.message);

  toast.error('Erro: ' + (error.response ? error.response.data.message : error.message));
};
