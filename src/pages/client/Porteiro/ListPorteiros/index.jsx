import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreatePorteiro, useGetPorteiros, useUpdatePorteiro, useDeletePorteiro } from '../hooks/porteiroHooks';

const handleError = (error) => {
  console.error('Error:', error.response ? error.response.data : error.message);
};

const validateForm = (values) => {
  const errors = {};
  if (!values.nome) errors.nome = 'Nome é obrigatório';
  if (!values.rg) errors.rg = 'RG é obrigatório';
  else if (!/^\d{1,9}$/.test(values.rg)) errors.rg = 'RG deve conter apenas números e ter no máximo 9 dígitos';
  if (!values.senha) errors.senha = 'Senha é obrigatória';
  else if (values.senha.length < 6 || values.senha.length > 20) errors.senha = 'Senha deve ter entre 6 e 20 caracteres';
  return errors;
};

const TablePorteiros = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingPorteiro, setEditingPorteiro] = useState(null);
  const [porteiroToDelete, setPorteiroToDelete] = useState(null);
  const [newPorteiro, setNewPorteiro] = useState({
    nome: '',
    rg: '',
    senha: '',
  });

  const { mutateAsync: createPorteiro, isPending: isCreatingPorteiro } = useCreatePorteiro();
  const {
    data: fetchedPorteiros = [],
    isError: isLoadingPorteirosError,
    isFetching: isFetchingPorteiros,
    isLoading: isLoadingPorteiros,
    refetch: refetchPorteiros,
  } = useGetPorteiros();
  const { mutateAsync: updatePorteiro, isPending: isUpdatingPorteiro } = useUpdatePorteiro();
  const { mutateAsync: deletePorteiro, isPending: isDeletingPorteiro } = useDeletePorteiro();

  const handleCreatePorteiro = async () => {
    const errors = validateForm(newPorteiro);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const condominioId = Number(sessionStorage.getItem('condominioId'));
      await createPorteiro({ ...newPorteiro, condominioId });
      await refetchPorteiros();
      setOpenCreateModal(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditPorteiro = async () => {
    const errors = validateForm(editingPorteiro);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const condominioId = Number(sessionStorage.getItem('condominioId'));
      await updatePorteiro({ ...editingPorteiro, condominioId });
      await refetchPorteiros();
      setOpenEditModal(false);
      setEditingPorteiro(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeletePorteiro = async () => {
    if (!porteiroToDelete) return;
    try {
      await deletePorteiro(porteiroToDelete.id);
      await refetchPorteiros();
      setOpenDeleteModal(false);
      setPorteiroToDelete(null);
    } catch (error) {
      handleError(error);
    }
  };

  const table = useMaterialReactTable({
    columns: useMemo(() => [
      {
        accessorKey: 'nome',
        header: 'Nome',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          error: !!validationErrors.nome,
          helperText: validationErrors.nome,
          onFocus: () => setValidationErrors((prev) => ({ ...prev, nome: undefined })),
          onBlur: (event) => {
            const { value } = event.target;
            if (!/^[A-Za-z\s]+$/.test(value)) {
              setValidationErrors((prev) => ({ ...prev, nome: 'Nome deve conter apenas letras' }));
            }
          },
        },
      },
      {
        accessorKey: 'rg',
        header: 'RG',
        muiEditTextFieldProps: {
          type: 'text',
          inputMode: 'numeric',
          inputProps: { maxLength: 9 },
          required: true,
          error: !!validationErrors.rg,
          helperText: validationErrors.rg,
          onFocus: () => setValidationErrors((prev) => ({ ...prev, rg: undefined })),
          onBlur: (event) => {
            const { value } = event.target;
            if (!/^\d{1,9}$/.test(value)) {
              setValidationErrors((prev) => ({ ...prev, rg: 'RG deve conter apenas números e ter no máximo 9 dígitos' }));
            }
          },
        },
      },
      {
        accessorKey: 'senha',
        header: 'Senha',
        Cell: () => '*******',
        muiEditTextFieldProps: {
          type: 'password',
          required: true,
          error: !!validationErrors.senha,
          helperText: validationErrors.senha,
          onFocus: () => setValidationErrors((prev) => ({ ...prev, senha: undefined })),
        },
      },
      {
        accessorKey: 'id',
        header: 'ID Porteiro',
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          disabled: true,
          error: !!validationErrors?.id,
          helperText: validationErrors?.id,
          InputLabelProps: {
            shrink: true,
          },
          inputProps: {
            min: 1,
          },
        },
      },
      ], [validationErrors]),
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
      setNewPorteiro({
        nome: '',
        rg: '',
        senha: '',
      });
    },
    onEditingRowCancel: () => {
      setValidationErrors({});
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => {
            setEditingPorteiro(row.original);
            setOpenEditModal(true);
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => {
            setPorteiroToDelete(row.original);
            setOpenDeleteModal(true);
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          // Redefinir newPorteiro ao abrir o modal de criação
          setNewPorteiro({
            nome: '',
            rg: '',
            senha: '',
          });
          setOpenCreateModal(true);
        }}
        sx={{ backgroundColor: '#294b29' }}
      >
        Adicionar Porteiro
      </Button>
    ),
    isLoading: isLoadingPorteiros,
    isSaving: isCreatingPorteiro || isUpdatingPorteiro || isDeletingPorteiro,
  });

  return (
    <>
      <MaterialReactTable table={table} />

      {/* Modal de criação de novo porteiro */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          width: '400px',
        },
      }} sx={{
        '& .MuiDialogTitle-root': {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
        },
        '& .MuiDialogContent-root': {
          paddingBottom: '20px',
        },
      }}>
        <DialogTitle>Adicionar Novo Porteiro</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            value={newPorteiro.nome}
            onChange={(e) => setNewPorteiro({ ...newPorteiro, nome: e.target.value })}
            required
            error={!!validationErrors.nome}
            helperText={validationErrors.nome}
            fullWidth
            margin="normal"
          />
          <TextField
            label="RG"
            value={newPorteiro.rg}
            onChange={(e) => setNewPorteiro({ ...newPorteiro, rg: e.target.value })}
            required
            error={!!validationErrors.rg}
            helperText={validationErrors.rg}
            inputProps={{ maxLength: 9 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            value={newPorteiro.senha}
            onChange={(e) => setNewPorteiro({ ...newPorteiro, senha: e.target.value })}
            required
            error={!!validationErrors.senha}
            helperText={validationErrors.senha}
            type="password"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}
            sx={{
              color: '#294b29',
            }}>Cancelar</Button>
          <Button
            onClick={handleCreatePorteiro}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#294b29',
              '&:hover': {
                backgroundColor: '#294b29',
              },
             }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edição de porteiro */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          width: '400px',
        },
      }} sx={{
        '& .MuiDialogTitle-root': {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
        },
        '& .MuiDialogContent-root': {
          paddingBottom: '20px',
        },
      }}>
        <DialogTitle>Editar Porteiro</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            value={editingPorteiro?.nome || ''}
            onChange={(e) => setEditingPorteiro({ ...editingPorteiro, nome: e.target.value })}
            required
            error={!!validationErrors.nome}
            helperText={validationErrors.nome}
            fullWidth
            margin="normal"
          />
          <TextField
            label="RG"
            value={editingPorteiro?.rg || ''}
            onChange={(e) => setEditingPorteiro({ ...editingPorteiro, rg: e.target.value })}
            required
            error={!!validationErrors.rg}
            helperText={validationErrors.rg}
            inputProps={{ maxLength: 9 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            value={editingPorteiro?.senha || ''}
            onChange={(e) => setEditingPorteiro({ ...editingPorteiro, senha: e.target.value })}
            required
            error={!!validationErrors.senha}
            helperText={validationErrors.senha}
            type="password"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} sx={{
            color: '#294b29',
          }}>Cancelar</Button>
          <Button
            onClick={handleEditPorteiro}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#294b29',
              '&:hover': {
                backgroundColor: '#294b29',
              },
             }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmação de exclusão de porteiro */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          width: '400px',
        },
      }} sx={{
        '& .MuiDialogTitle-root': {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
        },
        '& .MuiDialogContent-root': {
          paddingBottom: '20px',
        },
      }}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja excluir o porteiro <strong>{porteiroToDelete?.nome}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}
            sx={{
              color: '#294b29',
            }}>Cancelar</Button>
          <Button
            onClick={handleDeletePorteiro}
            variant="contained"
            color="error"
            sx={
              { backgroundColor: '#294b29',
                '&:hover': {
                  backgroundColor: '#294b29',
                },
               }
            }
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablePorteiros;
