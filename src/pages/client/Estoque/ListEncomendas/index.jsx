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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'tipoEntrega',
        header: 'Tipo de Entrega',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.tipoEntrega,
          helperText: validationErrors?.tipoEntrega,
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              tipoEntrega: undefined,
            })),
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
          onFocus: () =>
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              dataRecebimentoPorteiro: undefined,
            })),
        },
      },
      {
        accessorKey: 'dataRecebimentoMorador',
        header: 'Data de Recebimento do Morador',
        muiTableBodyCellProps: {
          sx: {
            textAlign: 'center',
          },
        },
        muiEditTextFieldProps: {
          type: 'date',
          disabled: true,
          error: !!validationErrors?.dataRecebimentoMorador,
          helperText: validationErrors?.dataRecebimentoMorador,
        },
      },
      {
        accessorKey: 'recebido',
        header: 'Recebido',
        muiTableBodyCellProps: {
          sx: {
            textAlign: 'center',
          },
        },
        muiEditTextFieldProps: {
          type: 'checkbox',
          disabled: true,
          error: !!validationErrors?.recebido,
          helperText: validationErrors?.recebido,
        },
      },
      {
        accessorKey: 'apartamento.id',
        header: 'Apartamento ID',
        muiTableBodyCellEditTextFieldProps: {
          type: 'number',
          required: false,
          disabled: true,
        },
      },
      {
        accessorKey: 'porteiro.nome',
        header: 'Nome do Porteiro',
        muiTableBodyCellProps: {
          sx: {
            textAlign: 'center',
          },
        },
      }
    ],
    [validationErrors]
  );

  const handleCreateEntrega = async ({ values, table }) => {
    try {
      const entrega = {
        tipoEntrega: values.tipoEntrega,
        dataRecebimentoPorteiro: values.dataRecebimentoPorteiro,
        // Campos 'dataRecebimentoMorador' e 'recebido' não devem ser incluídos aqui
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
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await handleCreateEntrega({ values, table });
  };

  const handleSaveEntrega = async ({ values, table }) => {
    const newValidationErrors = validateEntrega(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateEntrega(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir essa entrega?")) {
      deleteEntrega(row.original.id);
    }
  };

  const {
    data: fetchedEntregas = [],
    isError: isLoadingEntregasError,
    isFetching: isFetchingEntregas,
    isLoading: isLoadingEntregas,
  } = useGetEntregas();

  const table = useMaterialReactTable({
    columns,
    data: fetchedEntregas,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingEntregasError
      ? {
        color: "error",
        children: "Erro ao carregar dados",
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntregaAction,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEntrega,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Entrega</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
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
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
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
      <Button
        variant="contained"
        onClick={() => table.setCreatingRow(true)}
      >
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

// CREATE hook (post new entrega to API)
function useCreateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEntrega) => {
      try {
        const response = await axios.post('/entregas', newEntrega);
        return response.data;
      } catch (error) {
        console.error('Erro ao criar entrega:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
    },
    onError: (error) => {
      console.error('Erro ao criar entrega:', error.message);
    },
  });
}

// UPDATE hook (update entrega in API)
function useUpdateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedEntrega) => {
      try {
        const response = await axios.patch(`/entregas/${updatedEntrega.id}`, updatedEntrega);
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar entrega:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
    },
    onError: (error) => {
      console.error('Erro ao atualizar entrega:', error.message);
    },
  });
}

// DELETE hook (delete entrega from API)
function useDeleteEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        await axios.delete(`/entregas/${id}`);
      } catch (error) {
        console.error('Erro ao excluir entrega:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['entregas']);
    },
    onError: (error) => {
      console.error('Erro ao excluir entrega:', error.message);
    },
  });
}

// GET hook (fetch entregas from API)
function useGetEntregas() {
  return useQuery({
    queryKey: ['entregas'],
    queryFn: async () => {
      try {
        const response = await axios.get('/entregas');
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar entregas:', error.response?.data || error.message);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Erro ao buscar entregas:', error.message);
    },
  });
}

// Main component with QueryClientProvider
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TableEntregas />
    </QueryClientProvider>
  );
};

export default App;
