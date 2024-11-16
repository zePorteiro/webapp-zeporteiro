import { useMemo, useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCreateApartamento, useGetApartamentos, useUpdateApartamento, useDeleteApartamento } from '../hooks/apartamentosHooks'; // Importando hooks separados

const TableApartamentos = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newApartamento, setNewApartamento] = useState({
    numAp: '',
    bloco: '',
    vazio: false,
    condominioId: '',
  });

  const { data: fetchedApartamentos, isLoading: isLoadingApartamentos, isError: isLoadingApartamentosError } = useGetApartamentos();
  const { mutateAsync: createApartamento } = useCreateApartamento();
  const { mutateAsync: updateApartamento } = useUpdateApartamento();
  const { mutateAsync: deleteApartamento } = useDeleteApartamento();

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
          required: true,
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
    if (values.condominioId === undefined || values.condominioId === null) errors.condominioId = 'Condomínio ID é obrigatório';
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
      await createApartamento(newApartamento);
      setOpenCreateModal(false); // Fecha o modal após a criação
      setNewApartamento({ numAp: '', bloco: '', vazio: false, condominioId: '' }); // Reseta o formulário
    } catch (error) {
      console.error('Erro ao criar apartamento:', error);
    }
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir esse apartamento?")) {
      deleteApartamento(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedApartamentos || [],
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingApartamentosError
      ? {
        color: "error",
        children: "Erro ao carregar dados",
      }
      : undefined,
    onEditingRowCancel: () => setValidationErrors({}),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip arrow placement="left" title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
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
  });

  return (
    <>
      <Button
        variant="contained"
        color="success" 
        onClick={() => setOpenCreateModal(true)}
        sx={{ mb: 2 }}
      >
        Adicionar Apartamento
      </Button>

      <MaterialReactTable table={table} />


      {/* Modal de criação de novo apartamento */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
          <Button onClick={() => setOpenCreateModal(false)}>Cancelar</Button>
          <Button onClick={handleCreateApartamentoWithValidation}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableApartamentos;
