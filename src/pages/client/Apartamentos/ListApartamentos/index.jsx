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
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableApartamentos = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const { mutateAsync: createApartamentos, isPending: isCreatingApartamentos } = useCreateUser();

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
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
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
        accessorKey: "bloco",
        header: "Bloco",
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
          // remove any previous validation errors when user focuses on the input
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
          // remove any previous validation errors when user focuses on the input
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

  // Função para lidar com a criação de apartamentos
  const handleCreateApartamentos = async ({ values, table }) => {
    try {
      await createApartamentos(values); // Envie a lista de apartamentos
      table.setCreatingRow(null); // Saia do modo de criação
    } catch (error) {
      console.error('Erro ao criar apartamentos:', error);
    }
  };

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

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
    if (window.confirm("Tem certeza que deseja excluir esse usuário?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
        color: "error",
        children: "Error loading data",
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Apartamento</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
        <DialogTitle variant="h3">Editar Apartamento</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
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
        Adicionar Apartamento
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
    mutationFn: async (apartamentos) => {
      try {
        const response = await axios.post('http://10.0.0.178:8080/apartamentos', apartamentos, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error('Erro ao criar apartamentos:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    onMutate: async (newApartamentos) => {
      await queryClient.cancelQueries(['users']);
      const previousUsers = queryClient.getQueryData(['users']) || [];
      
      // Verifica se newApartamentos é um array
      if (Array.isArray(newApartamentos)) {
        queryClient.setQueryData(['users'], [...previousUsers, ...newApartamentos]);
      } else {
        console.error('newApartamentos não é um array:', newApartamentos);
      }

      return { previousUsers };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
    onError: (error, newApartamentos, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://10.0.0.178:8080/apartamentos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao obter dados:", {
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
        // Realiza a requisição PUT à API para atualizar o usuário
        const response = await axios.put(
          `http://10.0.0.178:8080/apartamentos/${user.id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Inclua o token se a API precisar de autenticação
            },
          }
        );
        return response.data; // Retorna os dados atualizados da API
      } catch (error) {
        console.error("Erro ao atualizar usuário:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; // Lança o erro para ser tratado pelo React Query
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
      return { previousUsers }; // Retorna o estado anterior para possível rollback
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]); // Refaz a requisição para garantir que os dados estejam atualizados
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(["users"], context.previousUsers); // Restaura o estado anterior em caso de erro
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      try {
        // Realiza a requisição DELETE à API para excluir o usuário
        await axios.delete(`http://10.0.0.178:8080/apartamentos/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Inclua o token se a API precisar de autenticação
          },
        });
        return; // Apenas resolve sem dados, pois a exclusão não retorna um corpo
      } catch (error) {
        console.error("Erro ao excluir usuário:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error; // Lança o erro para ser tratado pelo React Query
      }
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries(["users"]);
      const previousUsers = queryClient.getQueryData(["users"]) || [];
      queryClient.setQueryData(
        ["users"],
        previousUsers.filter((user) => user.id !== userId)
      );
      return { previousUsers }; // Retorna o estado anterior para possível rollback
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]); // Refaz a requisição para garantir que os dados estejam atualizados
    },
    onError: (error, userId, context) => {
      queryClient.setQueryData(["users"], context.previousUsers); // Restaura o estado anterior em caso de erro
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
