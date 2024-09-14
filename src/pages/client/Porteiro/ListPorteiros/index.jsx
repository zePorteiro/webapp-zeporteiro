import axios from 'axios';
import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
  Autocomplete,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { validateUser } from './validations';

const TablePorteiros = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedCondominio, setSelectedCondominio] = useState(null);

  // Call READ hook for condomínios
  const { data: condominios = [] } = useGetCondominios();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'nome',
        header: 'Nome',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.nome,
          helperText: validationErrors?.nome,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              nome: undefined,
            }),
        },
      },
      {
        accessorKey: 'rg',
        header: 'RG',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.rg,
          helperText: validationErrors?.rg,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              rg: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'senha',
        header: 'Senha',
        muiEditTextFieldProps: {
          type: 'password',
          required: true,
          error: !!validationErrors?.senha,
          helperText: validationErrors?.senha,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              senha: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  // Call CREATE hook
  const { mutateAsync: createPorteiro, isPending: isCreatingPorteiro } = useCreatePorteiro();
  // Call READ hook
  const {
    data: fetchedPorteiros = [],
    isError: isLoadingPorteirosError,
    isFetching: isFetchingPorteiros,
    isLoading: isLoadingPorteiros,
  } = useGetPorteiros();
  // Call UPDATE hook
  const { mutateAsync: updatePorteiro, isPending: isUpdatingPorteiro } = useUpdatePorteiro();
  // Call DELETE hook
  const { mutateAsync: deletePorteiro, isPending: isDeletingPorteiro } = useDeletePorteiro();

  // CREATE action
  const handleCreatePorteiro = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createPorteiro({ ...values, condominio: selectedCondominio });
    table.setCreatingRow(null);
  };

  // UPDATE action
  const handleSavePorteiro = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updatePorteiro({ ...values, condominio: selectedCondominio });
    table.setEditingRow(null);
  };

  // DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Tem certeza que deseja excluir esse porteiro?')) {
      deletePorteiro(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedPorteiros,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingPorteirosError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => {
      setValidationErrors({});
      setSelectedCondominio(null);
    },
    onCreatingRowSave: handleCreatePorteiro,
    onEditingRowCancel: () => {
      setValidationErrors({});
      setSelectedCondominio(null);
    },
    onEditingRowSave: handleSavePorteiro,

    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Porteiro</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <Autocomplete
            options={condominios}
            getOptionLabel={(option) => option.nome}
            value={selectedCondominio}
            onChange={(event, newValue) => setSelectedCondominio(newValue)}
            renderInput={(params) => <TextField {...params} label="Condomínio" />}
          />
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar Porteiro</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <Autocomplete
            options={condominios}
            getOptionLabel={(option) => option.nome}
            value={selectedCondominio}
            onChange={(event, newValue) => setSelectedCondominio(newValue)}
            renderInput={(params) => <TextField {...params} label="Condomínio" />}
          />
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Adicionar Porteiro
      </Button>
    ),
    isLoading: isLoadingPorteiros,
    isSaving: isCreatingPorteiro || isUpdatingPorteiro || isDeletingPorteiro,
    showAlertBanner: isLoadingPorteirosError,
    showProgressBars: isFetchingPorteiros,
  });

  return <MaterialReactTable table={table} />;
};

// CREATE hook (post new porteiro to API)
function useCreatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (porteiro) => {
      try {
        const response = await axios.post('http://localhost:8080/porteiros', porteiro, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao criar porteiro:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (newPorteiro) => {
      await queryClient.cancelQueries(['users']);
      const previousPorteiros = queryClient.getQueryData(['users']) || [];

      queryClient.setQueryData(['users'], [...previousPorteiros, newPorteiro]);

      return { previousPorteiros };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

// READ hook (get all porteiros from API)
function useGetPorteiros() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/porteiros', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar porteiros:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
  });
}

// UPDATE hook (update existing porteiro in API)
function useUpdatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (porteiro) => {
      try {
        const response = await axios.put(`http://localhost:8080/porteiros/${porteiro.id}`, porteiro, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar porteiro:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (updatedPorteiro) => {
      await queryClient.cancelQueries(['users']);
      const previousPorteiros = queryClient.getQueryData(['users']) || [];

      queryClient.setQueryData(
        ['users'],
        previousPorteiros.map((p) =>
          p.id === updatedPorteiro.id ? updatedPorteiro : p
        )
      );

      return { previousPorteiros };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

// DELETE hook (delete existing porteiro from API)
function useDeletePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (porteiroId) => {
      try {
        await axios.delete(`http://localhost:8080/porteiros/${porteiroId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return porteiroId;
      } catch (error) {
        console.error('Erro ao excluir porteiro:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (deletedPorteiroId) => {
      await queryClient.cancelQueries(['users']);
      const previousPorteiros = queryClient.getQueryData(['users']) || [];

      queryClient.setQueryData(
        ['users'],
        previousPorteiros.filter((p) => p.id !== deletedPorteiroId)
      );

      return { previousPorteiros };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

// READ hook for condomínios
function useGetCondominios() {
  return useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/condominios', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar condomínios:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
  });
}

// Wrap TablePorteiros with QueryClientProvider
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TablePorteiros />
    </QueryClientProvider>
  );
};

export default App;
