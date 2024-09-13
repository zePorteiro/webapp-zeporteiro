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
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              nome: undefined,
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
        accessorKey: 'turno',
        header: 'Turno',
        editVariant: 'select',
        editSelectOptions: [
          { value: 'Manhã', label: 'Manhã' },
          { value: 'Tarde', label: 'Tarde' },
          { value: 'Noite', label: 'Noite' },
        ], 
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
    table.setCreatingRow(null); 
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
    table.setEditingRow(null);
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
    createDisplayMode: 'modal', 
    editDisplayMode: 'modal',
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
          table.setCreatingRow(true); 
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
        console.log('Enviando porteiro:', JSON.stringify(user, null, 2));

        const fkUser = sessionStorage.getItem("fkUser") - 1;
        const response = await axios.post(`http://localhost:8080/porteiros/${fkUser}`, user, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Resposta:', response.data);
        return response.data;
      } catch (error) {
        console.error('Erro ao criar porteiro:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(['porteiros']);
      const previousUsers = queryClient.getQueryData(['porteiros']) || [];

      // Verifica se newUser é um objeto e o adiciona ao cache
      if (typeof newUser === 'object' && !Array.isArray(newUser)) {
        queryClient.setQueryData(['porteiros'], [...previousUsers, newUser]);
      } else {
        console.error('newUser não é um objeto:', newUser);
      }

      return { previousUsers };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
    onError: (error, newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['porteiros'], context.previousUsers);
      }
    },
  });
}


//READ hook (get users from api)
function useGetPorteiros() {
  return useQuery({
    queryKey: ['porteiros'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/porteiros', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Erro ao buscar porteiros:', {
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
function useUpdatePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/porteiros/${user.id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error('Erro ao atualizar porteiro:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; 
      }
    },
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries(['porteiros']);
      const previousUsers = queryClient.getQueryData(['porteiros']) || [];

      queryClient.setQueryData(
        ['porteiros'],
        previousUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );

      return { previousUsers };
    },
    onError: (error, updatedUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['porteiros'], context.previousUsers); 
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['porteiros']); 
    },
  });
}


//DELETE hook (delete user in api)
function useDeletePorteiro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      try {
        await axios.delete(`http://localhost:8080/porteiros/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        });
        return; 
      } catch (error) {
        console.error('Erro ao deletar porteiro:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; 
      }
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries(['porteiros']);
      const previousUsers = queryClient.getQueryData(['porteiros']) || [];

      queryClient.setQueryData(['porteiros'], previousUsers.filter((user) => user.id !== userId));

      return { previousUsers }; 
    },
    onError: (error, userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['porteiros'], context.previousUsers); 
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['porteiros']);
    },
  });
}


const queryClient = new QueryClient();

const ExampleWithProviders = () => (
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
  
