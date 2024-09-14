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

const TableApartamentos = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const { mutateAsync: createApartamentos, isPending: isCreatingApartamentos } = useCreateApartamento(); // Atualize o nome do hook

  const columns = useMemo(
    () => [
      {
        accessorKey: "numeroAp",
        header: "Apartamento",
        enableEditing: true,
        size: 80,
      },
      {
        accessorKey: "nome",
        header: "Nome do Morador",
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
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
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
        accessorKey: "bloco",
        header: "Bloco",
        muiEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.bloco,
          helperText: validationErrors?.bloco,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              bloco: undefined,
            }),
        },
      },
      {
        accessorKey: "telefoneCelular",
        header: "Telefone Celular",
        muiEditTextFieldProps: {
          required: true,
          type: "tel",
          inputProps: {
            inputMode: "numeric",
            pattern: "[0-9]*",
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
      {
        accessorKey: "telefoneFixo",
        header: "Telefone Fixo",
        muiEditTextFieldProps: {
          required: false,
          type: "tel",
          inputProps: {
            inputMode: "numeric",
            pattern: "[0-9]*",
          },
          error: !!validationErrors?.telefoneFixo,
          helperText: validationErrors?.telefoneFixo,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              telefoneFixo: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const handleCreateApartamentos = async ({ values, table }) => {
    try {
      const apartamento = {
        bloco: values.bloco,
        numeroAp: values.numeroAp,
        vazio: values.vazio !== undefined ? values.vazio : false, 
        condominioId: values.condominioId
      };
      
      console.log('Criando apartamento:', JSON.stringify(apartamento, null, 2));
      
      await createApartamentos(apartamento);
      table.setCreatingRow(null);
    } catch (error) {
      console.error('Erro ao criar apartamento:', error);
    }
  };

  // Call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateApartamento();
  // Call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetApartamentos();
  // Call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  // Call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();


  // CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await handleCreateApartamentos({ values, table }); 
  };

  // UPDATE action
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

  // DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir esse usuário?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowSave: handleCreateApartamentos,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Apartamento</DialogTitle>
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
        <DialogTitle variant="h3">Editar Apartamento</DialogTitle>
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
        Adicionar Apartamento
      </Button>
    ),
    isLoading: isLoadingUsers,
    isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
    showAlertBanner: isLoadingUsersError,
    showProgressBars: isFetchingUsers,
  });

  return <MaterialReactTable table={table} />;
};

// CREATE hook (post new user to API)
function useCreateApartamento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apartamento) => {
      try {
        console.log('Enviando apartamento:', JSON.stringify(apartamento, null, 2));

        const fkUser = sessionStorage.getItem("fkUser") - 1;
        const response = await axios.post(`http://localhost:8080/apartamentos/${fkUser}`, apartamento, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        });
        console.log('Resposta:', response.data);
        return response.data;
      } catch (error) {
        console.error('Erro ao criar apartamento:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (newApartamento) => {
      await queryClient.cancelQueries(['users']);
      const previousUsers = queryClient.getQueryData(['users']) || [];
      
      if (typeof newApartamento === 'object' && !Array.isArray(newApartamento)) {
        queryClient.setQueryData(['users'], [...previousUsers, newApartamento]);
      } else {
        console.error('newApartamento não é um objeto:', newApartamento);
      }

      return { previousUsers };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error, newApartamento, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
  });
}

//READ hook (get users from api)
function useGetApartamentos() {
  return useQuery({
    queryKey: ['apartamentos'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:8080/apartamentos', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/apartamentos/${user.id}`, 
          user,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Erro ao atualizar usuário:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; 
      }
    },
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData(["users"]) || [];
      queryClient.setQueryData(
        ["users"],
        previousUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      return { previousUsers }; 
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]); 
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(["users"], context.previousUsers); 
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      try {

        await axios.delete(`http://localhost:8080/apartamentos/${userId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        return; 
      } catch (error) {
        console.error("Erro ao excluir usuário:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; 
      }
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData(["users"]) || [];
      queryClient.setQueryData(
        ["users"],
        previousUsers.filter((user) => user.id !== userId)
      );
      return { previousUsers }; 
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]); 
    },
    onError: (error, userId, context) => {
      queryClient.setQueryData(["users"], context.previousUsers); 
    },
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <TableApartamentos />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validatePhoneNumber = (phoneNumber) =>
  !!phoneNumber.length && phoneNumber.match(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/);

function validateUser(user) {
  const errors = {};

  // Validação do nome
  if (!validateRequired(user.nome)) {
    errors.nome = "Preencha o campo obrigatório";
  }

  // Validação do email
  if (!validateRequired(user.email)) {
    errors.email = "Preencha o campo obrigatório";
  } else if (!validateEmail(user.email)) {
    errors.email = "Email não está no formato correto";
    console.log("Erro de validação: Formato de email inválido");
  }

  // Validação do telefone celular
  if (!validateRequired(user.telefoneCelular)) {
    errors.telefoneCelular = "Preencha o campo obrigatório";
  } else if (!validatePhoneNumber(user.telefoneCelular)) {
    errors.telefoneCelular = "Telefone celular não está no formato correto";
    console.log("Erro de validação: Formato de telefone celular inválido");
  }

  return errors;
}
