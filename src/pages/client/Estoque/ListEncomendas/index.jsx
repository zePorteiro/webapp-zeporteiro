import { useMemo, useState } from "react";
import axios from "axios";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { validateEntrega } from "./validations";


const TableEntregas = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const { mutateAsync: createEntrega, isLoading: isCreatingEntrega } = useCreateEntrega();
  const { mutateAsync: updateEntrega, isLoading: isUpdatingEntrega } = useUpdateEntrega();
  const { mutateAsync: deleteEntrega, isLoading: isDeletingEntrega } = useDeleteEntrega();
  
  const { data: fetchedEntregas = [], isLoading: isLoadingEntregas, isError: isLoadingEntregasError, isFetching: isFetchingEntregas } = useGetEntregas();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'tipoEntrega',
        header: 'Tipo de Entrega',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.tipoEntrega,
          helperText: validationErrors?.tipoEntrega,
          onFocus: () => setValidationErrors((prevErrors) => ({
            ...prevErrors,
            tipoEntrega: undefined,
          })),
          InputLabelProps: {
            shrink: true, 
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px', 
              },
            },
          },
        },
      },
      {
        accessorKey: 'dataRecebimentoPorteiro',
        header: 'Data de Recebimento do Porteiro',
        muiEditTextFieldProps: {
          type: 'date',
          required: true,
          error: !!validationErrors?.dataRecebimentoPorteiro,
          helperText: validationErrors?.dataRecebimentoPorteiro,
          onFocus: () => setValidationErrors((prevErrors) => ({
            ...prevErrors,
            dataRecebimentoPorteiro: undefined,
          })),
          InputLabelProps: {
            shrink: true, 
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px', 
              },
            },
          },
        },
      },
      {
        accessorKey: 'dataRecebimentoMorador',
        header: 'Data de Recebimento do Morador',
        muiTableBodyCellProps: {
          sx: { textAlign: 'center' },
        },
        muiEditTextFieldProps: {
          required: false,
          type: 'date',
          disabled: true,
          error: !!validationErrors?.dataRecebimentoMorador,
          helperText: validationErrors?.dataRecebimentoMorador,
          InputLabelProps: {
            shrink: true, 
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px', 
              },
            },
          },
        },
      },
      {
        accessorKey: 'recebido',
        header: 'Recebido',
        muiTableBodyCellProps: {
          sx: { textAlign: 'center' },
        },
        muiEditTextFieldProps: {
          type: 'text',
          required: false,
          disabled: true,
          error: !!validationErrors?.recebido,
          helperText: validationErrors?.recebido,
        },
      },
      {
        accessorKey: 'apartamento.id',
        header: 'Apartamento ID',
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          disabled: false,
          error: !!validationErrors?.apartamentoId,
          helperText: validationErrors?.apartamentoId,
          InputLabelProps: {
            shrink: true, 
          },
        },
      },
      {
        accessorKey: 'porteiro.nome',
        header: 'Nome do Porteiro',
        muiEditTextFieldProps: {
          required: true,
          disabled: false,
          error: !!validationErrors?.porteiroNome,
          helperText: validationErrors?.porteiroNome,
          InputLabelProps: {
            shrink: true, 
          },
        },
        muiTableBodyCellProps: {
          sx: { textAlign: 'center' },
        },
      },      
    ],
    [validationErrors]
  );

  const handleCreateEntrega = async ({ values, table }) => {
    try {
      console.log("Iniciando criação de entrega:", values);
      const entrega = {
        tipoEntrega: values.tipoEntrega,
        dataRecebimentoPorteiro: values.dataRecebimentoPorteiro,
        apartamento: { id: values.apartamentoId },
        porteiro: { id: values.porteiroId },
      };
  
      await createEntrega(entrega);
      table.setCreatingRow(null);
    } catch (error) {
      console.error('Erro ao criar entrega:', error);
    }
  };
  
  const handleCreateEntregaAction = async ({ values, table }) => {
    const newValidationErrors = validateEntrega(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("Erros de validação:", newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    }
    console.log("Validação concluída, iniciando salvamento");
    setValidationErrors({});
    await handleCreateEntrega({ values, table });
  };
  
  const handleSaveEntrega = async ({ values, table }) => {
    const newValidationErrors = validateEntrega(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("Erros de validação:", newValidationErrors); 
      setValidationErrors(newValidationErrors);
      return;
    }
    console.log("Validação concluída, iniciando atualização");
    setValidationErrors({});
    
    try {
      await updateEntrega(values);
      table.setEditingRow(null);
    } catch (error) {
      console.error('Erro ao atualizar entrega:', error);
    }
  };
  

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir essa entrega?")) {
      deleteEntrega(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedEntregas,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingEntregasError
      ? { color: "error", children: "Erro ao carregar dados" }
      : undefined,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntregaAction,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEntrega,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Entrega</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar Entrega</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Adicionar Entrega
      </Button>
    ),
    isLoading: isLoadingEntregas,
    isSaving: isCreatingEntrega || isUpdatingEntrega || isDeletingEntrega,
    showAlertBanner: isLoadingEntregasError,
    showProgressBars: isFetchingEntregas,
  });

  return <MaterialReactTable table={table} />;
};

// Requisições (POST, PUT, DELETE, GET)
function useCreateEntrega() {
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

// UPDATE hook
function useUpdateEntrega() {
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

// DELETE hook
function useDeleteEntrega() {
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

function useGetEntregas() {
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

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TableEntregas />
    </QueryClientProvider>
  );
};

export default App;