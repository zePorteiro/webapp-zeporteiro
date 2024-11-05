import axios from 'axios';
import { useMemo, useState } from 'react';
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
} from "@tanstack/react-query";
import Dados from '../../../../utils/dados.json'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TablePorteiros = () => {
  const [validationErrors, setValidationErrors] = useState({});

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
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'turno',
        header: 'Turno',
        editVariant: 'select',
        editSelectOptions: [
          { value: 'Manhã', label: 'Manhã' },
          { value: 'Tarde', label: 'Tarde' },
          { value: 'Noite', label: 'Noite' },
        ], // Options to select
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.turno,
          helperText: validationErrors?.turno,
        },
      },
      {
        accessorKey: 'telefoneCelular',
        header: 'Telefone Celular',
        muiEditTextFieldProps: {
          required: true,
          type: 'tel',
          inputProps: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
          },
          error: !!validationErrors?.telefoneCelular,
          helperText: validationErrors?.telefoneCelular,
          // remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              telefoneCelular: undefined,
            }),
        },
      },      
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetPorteiros();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdatePorteiro();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeletePorteiro();

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
    if (window.confirm('Tem certeza que deseja excluir esse usuário?')) {
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
        <DialogTitle variant="h3">Adicionar Porteiro</DialogTitle>
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
        <DialogTitle variant="h3">Editar Porteiro</DialogTitle>
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
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Adicionar Porteiro
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
function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.post('http://10.0.0.145:8080/porteiros', user, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(['users']);
      const previousUsers = queryClient.getQueryData(['users']) || [];

      // Atualiza o cache de maneira otimista
      queryClient.setQueryData(['users'], [...previousUsers, newUser]);

      return { previousUsers };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error, newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
  });
}

//READ hook (get users from api)
function useGetPorteiros() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://10.0.0.145:8080/porteiros', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data; // Retorna os dados dos usuários obtidos da API
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    refetchOnWindowFocus: false, // Não refaz a consulta quando a janela ganha foco
  });
}

//UPDATE hook (put user in api)
function useUpdatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.put(`http://10.0.0.145:8080/porteiros/${user.id}`, user, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    // Atualização otimista do cache
    onMutate: (newUserInfo) => {
      const previousUsers = queryClient.getQueryData(['users']) || [];

      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser.id === newUserInfo.id ? { ...prevUser, ...newUserInfo } : prevUser
        )
      );

      return { previousUsers };
    },
    // Reverte o cache em caso de erro
    onError: (error, newUserInfo, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    // Refetch users after mutation to ensure data consistency
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

//DELETE hook (delete user in api)
function useDeletePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      try {
        await axios.delete(`http://10.0.0.145:8080/porteiros/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    // Atualização otimista do cache
    onMutate: (userId) => {
      const previousUsers = queryClient.getQueryData(['users']) || [];

      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },
    // Reverte o cache em caso de erro
    onError: (error, userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    // Refetch users after mutation to ensure data consistency
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <TablePorteiros />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validatePhoneNumber = (phoneNumber) =>
  !!phoneNumber.length &&
  phoneNumber.match(
    /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
  );

  function validateUser(user) {
    const errors = {};
  
    // Validação do nome
    if (!validateRequired(user.nome)) {
      errors.nome = 'Preencha o campo obrigatório';
    }
  
    // Validação do turno
    if (!validateRequired(user.turno)) {
      errors.turno = 'Preencha o campo obrigatório';
    }
  
    // Validação do email
    if (!validateRequired(user.email)) {
      errors.email = 'Preencha o campo obrigatório';
    } else if (!validateEmail(user.email)) {
      errors.email = 'Email não está no formato correto';
      console.log('Erro de validação: Formato de email inválido');
    }
  
    // Validação do telefone celular
    if (!validateRequired(user.telefoneCelular)) {
      errors.telefoneCelular = 'Preencha o campo obrigatório';
    } else if (!validatePhoneNumber(user.telefoneCelular)) {
      errors.telefoneCelular = 'Telefone celular não está no formato correto';
      console.log('Erro de validação: Formato de telefone celular inválido');
    }
  
    return errors;
  }
  
