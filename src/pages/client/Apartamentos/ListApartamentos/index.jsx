import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateApartamento, useGetApartamentos, useUpdateApartamento, useDeleteApartamento } from '../hooks/apartamentosHooks';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableApartamentos = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newApartamento, setNewApartamento] = useState({
    numAp: '',
    bloco: '',
    vazio: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null); // Apartamento a ser excluído
  const [openEditModal, setOpenEditModal] = useState(false); // Modal de edição
  const [editingApartamento, setEditingApartamento] = useState(null); // Apartamento sendo editado

  const { data: fetchedApartamentos, isLoading: isLoadingApartamentos, isError: isLoadingApartamentosError } = useGetApartamentos();
  const { mutateAsync: createApartamento } = useCreateApartamento();
  const { mutateAsync: updateApartamento } = useUpdateApartamento();
  const { mutateAsync: deleteApartamento } = useDeleteApartamento();

  const condominioId = sessionStorage.getItem('condominioId');

  const columns = useMemo(
    () => [
      {
        accessorKey: "numAp",
        header: "Número do Apartamento",
        size: 80,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.numAp,
          helperText: validationErrors?.numAp,
        },
      },
      {
        accessorKey: "bloco",
        header: "Bloco",
        muiTableBodyCellEditTextFieldProps: {
          required: false,
          error: !!validationErrors?.bloco,
          helperText: validationErrors?.bloco,
        },
      },
      {
        accessorKey: "vazio",
        header: "Vazio",
        Cell: ({ cell }) => (
          <Checkbox
            checked={cell.getValue()}
            disabled
          />
        ),
        muiTableBodyCellEditTextFieldProps: {
          type: 'checkbox',
        },
      },
    ],
    [validationErrors]
  );

  const validateApartamento = (values) => {
    const errors = {};
    if (!values.bloco || values.bloco.trim() === '') errors.bloco = 'Bloco é obrigatório';
    if (!values.numAp || values.numAp.trim() === '') errors.numAp = 'Número do apartamento é obrigatório';
    return errors;
  };

  const handleCreateApartamentoWithValidation = async () => {
    const newValidationErrors = validateApartamento(newApartamento);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    try {
      await createApartamento({ ...newApartamento, condominioId });
      setOpenCreateModal(false); // Fecha o modal após a criação
      setNewApartamento({ numAp: '', bloco: '', vazio: false }); // Reseta o formulário
      toast.success("Apartamento atualizado com sucesso");
    } catch (error) {
      console.error('Erro ao criar apartamento:', error);
      toast.error('Erro ao criar apartamento');
    }
  };

  const openDeleteConfirmModal = (row) => {
    setApartmentToDelete(row.original); // Define o apartamento a ser excluído
    setOpenDeleteModal(true); // Abre o modal de confirmação
  };

  const confirmDeleteApartamento = async () => {
    try {
      await deleteApartamento(apartmentToDelete.id);
      toast.success("Apartamento excluído com sucesso");
      setOpenDeleteModal(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error('Erro ao excluir apartamento:', error);
      toast.error('Erro ao excluir apartamento');
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    const errors = validateApartamento(values);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error(Object.values(errors).join(' '));
      return;
    }

    setValidationErrors({});
    try {
      await updateApartamento({ ...row.original, ...values, condominioId });
      exitEditingMode();
      toast.success("Apartamento atualizado com sucesso");
    } catch (error) {
      toast.error('Erro ao atualizar apartamento');
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedApartamentos || [],
    enableEditing: true,
    getRowId: (row) => row.id,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveRowEdits,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip arrow placement="left" title="Editar">
          <IconButton onClick={() => { setOpenEditModal(true); setEditingApartamento(row.original); }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="right" title="Excluir">
          <IconButton onClick={() => openDeleteConfirmModal(row)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    localization: {
      save: "Salvar",
      cancel: "Cancelar",
      edit: "Editar Apartamento",
    },
  });

  const handleEditApartamento = async () => {
    const newValidationErrors = validateApartamento(editingApartamento);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    try {
      await updateApartamento({ ...editingApartamento, condominioId });
      setOpenEditModal(false); // Fecha o modal após a edição
      setEditingApartamento(null); // Reseta o apartamento em edição
      toast.success("Apartamento atualizado com sucesso");
    } catch (error) {
      console.error('Erro ao editar apartamento:', error);
      toast.error('Erro ao editar apartamento');
    }
  };

  return (
    <>
      <ToastContainer />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateModal(true)}
        sx={{
          backgroundColor: '#294b29',  // Cor de fundo personalizada
          '&:hover': {
            backgroundColor: '#294b29',  // Cor de fundo ao passar o mouse
          },
        }}
      >
        Adicionar Apartamento
      </Button>

      <MaterialReactTable table={table} />

      {/* Modal de criação de novo apartamento */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} PaperProps={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f5f5f5',
          width: '400px',  // Tamanho fixo do modal
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
        <DialogTitle>Cadastrar Novo Apartamento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Número do Apartamento"
            type="text"
            fullWidth
            value={newApartamento.numAp}
            onChange={(e) => setNewApartamento({ ...newApartamento, numAp: e.target.value })}
            error={!!validationErrors.numAp}
            helperText={validationErrors.numAp}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            margin="dense"
            label="Bloco"
            type="text"
            fullWidth
            value={newApartamento.bloco}
            onChange={(e) => setNewApartamento({ ...newApartamento, bloco: e.target.value })}
            error={!!validationErrors.bloco}
            helperText={validationErrors.bloco}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newApartamento.vazio}
                onChange={(e) => setNewApartamento({ ...newApartamento, vazio: e.target.checked })}
              />
            }
            label="Vazio"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)} sx={{
            color: '#294b29',  // Cor de fundo personalizada
          }} >Cancelar</Button>
          <Button
            onClick={handleCreateApartamentoWithValidation}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#294b29',  // Cor de fundo personalizada
              '&:hover': {
                backgroundColor: '#294b29',  // Cor de fundo ao passar o mouse
              },
            }}
          >
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de edição de apartamento */}
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        PaperProps={{
          style: {
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
          },
        }}
        sx={{
          '& .MuiDialogTitle-root': {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '24px',
          },
          '& .MuiDialogContent-root': {
            paddingBottom: '20px',
          },
        }}
      >
        <DialogTitle>Edição de Apartamento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Número do Apartamento"
            type="text"
            fullWidth
            value={editingApartamento?.numAp || ''}
            onChange={(e) => setEditingApartamento({ ...editingApartamento, numAp: e.target.value })}
            error={!!validationErrors.numAp}
            helperText={validationErrors.numAp}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            margin="dense"
            label="Bloco"
            type="text"
            fullWidth
            value={editingApartamento?.bloco || ''}
            onChange={(e) => setEditingApartamento({ ...editingApartamento, bloco: e.target.value })}
            error={!!validationErrors.bloco}
            helperText={validationErrors.bloco}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingApartamento?.vazio || false}
                onChange={(e) => setEditingApartamento({ ...editingApartamento, vazio: e.target.checked })}
              />
            }
            label="Vazio"
            sx={{ marginBottom: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} sx={{
            color: '#294b29',  // Cor de fundo personalizada
          }}>Cancelar</Button>
          <Button onClick={handleEditApartamento} variant="contained" color="primary" sx={{
            backgroundColor: '#294b29', '&:hover': {
              backgroundColor: '#294b29',  // Cor de fundo ao passar o mouse
            },
          }}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmação de exclusão */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2, fontSize: '16px' }}>
            Deseja realmente excluir o apartamento <b>{apartmentToDelete?.numAp}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary"
            sx={{
              color: '#294b29',  // Cor do texto personalizada
            }}>Cancelar</Button>
          <Button onClick={confirmDeleteApartamento} variant="contained" color="primary"
            sx={{
              backgroundColor: '#294b29',  // Cor de fundo personalizada
              '&:hover': {
                backgroundColor: '#294b29',  // Cor de fundo ao passar o mouse
              },
            }}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableApartamentos;
