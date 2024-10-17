import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook para criar apartamento
export function useCreateApartamento() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (apartamento) => {
            try {
                console.log('Enviando apartamento:', JSON.stringify(apartamento, null, 2));

                const condominioId = sessionStorage.getItem("condominioId");
                if (!condominioId) {
                    throw new Error('ID do condomínio não encontrado no sessionStorage');
                }

                const fkUser = sessionStorage.getItem("fkUser");
                const userId = fkUser ? Number(fkUser) - 1 : null;
                
                const response = await axios.post(
                    `http://localhost:8080/apartamentos/${condominioId}`,
                    apartamento,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Resposta:', response.data);
                return response.data;
            } catch (error) {
                console.error('Erro ao criar apartamento:', {
                    message: error.message,
                    response: error.response ? error.response.data : 'Sem resposta do servidor',
                    stack: error.stack,
                });
                throw error;
            }
        },
        onMutate: async (newApartamento) => {
            await queryClient.cancelQueries(['apartamentos']);
            const previousApartamentos = queryClient.getQueryData(['apartamentos']) || [];

            if (typeof newApartamento === 'object' && !Array.isArray(newApartamento)) {
                queryClient.setQueryData(['apartamentos'], [...previousApartamentos, newApartamento]);
            } else {
                console.error('newApartamento não é um objeto válido:', newApartamento);
            }

            return { previousApartamentos };
        },
        onSettled: () => {
            queryClient.invalidateQueries(['apartamentos']);
        },
        onError: (error, newApartamento, context) => {
            if (context?.previousApartamentos) {
                queryClient.setQueryData(['apartamentos'], context.previousApartamentos);
            }
        },
    });
}

export function useGetApartamentos() {
    return useQuery({
        queryKey: ["apartamentos"],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:8080/apartamentos`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });

                return response.data;
            } catch (error) {
                console.error('Erro ao obter apartamentos:', error);
                throw error; 
            }
        },
        refetchOnWindowFocus: false,
    });
}


// Hook para atualizar apartamento
export function useUpdateApartamento() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (apartamento) => {
            try {
                console.log('Atualizando apartamento:', JSON.stringify(apartamento, null, 2));
                await axios.put(`http://localhost:8080/apartamentos/${apartamento.id}`, apartamento);
            } catch (error) {
                console.error('Erro ao atualizar apartamento:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["apartamentos"]);
        },
    });
}

// Hook para deletar apartamento
export function useDeleteApartamento() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            try {
                console.log('Deletando apartamento com ID:', id);
                await axios.delete(`http://localhost:8080/apartamentos/${id}`);
            } catch (error) {
                console.error('Erro ao deletar apartamento:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["apartamentos"]);
        },
    });
}
