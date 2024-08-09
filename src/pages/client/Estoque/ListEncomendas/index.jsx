import { useMemo, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
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

const TableApartamentos = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'nome',
        header: 'Destinatário',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.nome,
          helperText: validationErrors?.nome,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              nome: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'apartamento',
        header: 'Apartamento',
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          error: !!validationErrors?.apartamento,
          helperText: validationErrors?.apartamento,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              apartamento: undefined,
            }),
        },
      },
      {
        accessorKey: 'bloco',
        header: 'Bloco',
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.bloco,
          helperText: validationErrors?.bloco,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              bloco: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'dataRecebido',
        header: 'Data Recebido',
        muiEditTextFieldProps: {
          required: true,
          type: 'date',
          error: !!validationErrors?.dataRecebido,
          helperText: validationErrors?.dataRecebido,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dataRecebido: undefined,
            }),
        },
      },
      {
        accessorKey: 'dataRetirado',
        header: 'Data Retirado',
        muiEditTextFieldProps: {
          required: false,
          type: 'date',
          error: !!validationErrors?.dataRetirado,
          helperText: validationErrors?.dataRetirado,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dataRetirado: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateEntrega();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetEntregas();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateEntrega();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteEntrega();

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Tem certeza que deseja excluir essa encomenda?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Cadastrar Encomenda</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar Encomenda</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
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
        Cadastrar Encomenda
      </Button>
    ),
    telefoneCelular: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (encomenda) => {
      try {
        const response = await axios.post('http://localhost:8080/entregas', encomenda, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao salvar encomenda:', error.response ? error.response.data : error.message);
        throw error; 
      }
    },
    onMutate: async (newEncomenda) => {
      await queryClient.cancelQueries(['entregas']); 

      const previousEntregas = queryClient.getQueryData(['entregas']) || []; 

      queryClient.setQueryData(['entregas'], (prevEntregas) => [
        ...prevEntregas,
        {
          ...newEncomenda,
          id: (Math.random() + 1).toString(36).substring(7), 
        },
      ]);

      return { previousEntregas };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['entregas']); 
    },
    onError: (error, newEncomenda, context) => {
      if (context?.previousEntregas) {
        queryClient.setQueryData(['entregas'], context.previousEntregas); 
      }
    },
  });
}

//READ hook (get users from api)
function useGetEntregas() {
  return useQuery({
    queryKey: ['entregas'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/entregas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao obter dados:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entrega) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/entregas/${entrega.id}`,
          entrega,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar entrega:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; 
      }
    },
    onMutate: async (updatedEntrega) => {
      await queryClient.cancelQueries(['entregas']);
      const previousEntregas = queryClient.getQueryData(['entregas']) || [];
      queryClient.setQueryData(
        ['entregas'],
        previousEntregas.map((entrega) =>
          entrega.id === updatedEntrega.id ? updatedEntrega : entrega
        )
      );
      return { previousEntregas }; 
    },
    onSettled: () => {
      queryClient.invalidateQueries(['entregas']); 
    },
    onError: (error, updatedEntrega, context) => {
      queryClient.setQueryData(['entregas'], context.previousEntregas); 
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteEntrega() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entregaId) => {
      try {
        await axios.delete(`http://localhost:8080/entregas/${entregaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
          },
        });
        return;
      } catch (error) {
        console.error('Erro ao excluir entrega:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },
    onMutate: async (entregaId) => {
      await queryClient.cancelQueries(['entregas']);
      const previousEntregas = queryClient.getQueryData(['entregas']) || [];
      queryClient.setQueryData(
        ['entregas'],
        previousEntregas.filter((entrega) => entrega.id !== entregaId)
      );
      return { previousEntregas }; 
    },
    onSettled: () => {
      queryClient.invalidateQueries(['entregas']); 
    },
    onError: (error, entregaId, context) => {
      queryClient.setQueryData(['entregas'], context.previousEntregas); 
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <TableApartamentos />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateDate = (date) => {
  const today = dayjs().startOf('day').format('YYYY-MM-DD');
  return validateRequired(date) && date <= today;
};

function validateUser(user) {
  const errors = {};

  // Validação do nome
  if (!validateRequired(user.nome)) {
    errors.nome = 'Preencha o campo obrigatório';
  }

  // Validação da data recebida
  if (!validateRequired(user.dataRecebido)) {
    errors.dataRecebido = 'Preencha o campo obrigatório';
  } else if (!validateDate(user.dataRecebido)) {
    errors.dataRecebido = 'A data não pode ser maior que a data atual';
    console.log('Erro de validação: Data inserida maior que a data atual');
  }

  return errors;
}

