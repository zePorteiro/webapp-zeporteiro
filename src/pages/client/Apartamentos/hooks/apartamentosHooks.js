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
                    console.error('ID do condomínio não encontrado no sessionStorage. Verifique se o usuário selecionou um condomínio.');
                    alert("Erro: ID do condomínio não encontrado. Por favor, selecione um condomínio antes de cadastrar um apartamento.");
                    throw new Error('ID do condomínio não encontrado no sessionStorage');
                }

                const response = await axios.post(
                    `http://98.80.93.196:80/api/apartamentos/${condominioId}`,
                    apartamento,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Resposta:', response.data);

                const apartamentoId = response.data.id;
                if (apartamentoId) {
                    let storedIds = sessionStorage.getItem("apartamentoIds");

                    if (storedIds) {
                        storedIds = JSON.parse(storedIds);
                    } else {
                        storedIds = [];
                    }

                    storedIds.push(apartamentoId);
                    sessionStorage.setItem("apartamentoIds", JSON.stringify(storedIds));
                    console.log("Apartamentos cadastrados:", storedIds);
                }

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
                const response = await axios.get(`http://98.80.93.196:8080/apartamentos`, {
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
                await axios.put(`http://98.80.93.196:8080/apartamentos/${apartamento.id}`, apartamento);
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

                const response = await axios.delete(`http://98.80.93.196:8080/apartamentos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                });

                if (response.status === 204) {
                    console.log('Apartamento excluído com sucesso');
                } else {
                    throw new Error(`Erro ao excluir apartamento: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Erro ao deletar apartamento:', error);
                throw error;
            }
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries(['apartamentos']);
            const previousApartamentos = queryClient.getQueryData(['apartamentos']);

            queryClient.setQueryData(
                ['apartamentos'],
                previousApartamentos?.filter((apartamento) => apartamento.id !== id)
            );

            return { previousApartamentos }; 
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['apartamentos']); 
        },
        onError: (error, variables, context) => {

            if (context?.previousApartamentos) {
                queryClient.setQueryData(['apartamentos'], context.previousApartamentos);
            }
        },
    });
}