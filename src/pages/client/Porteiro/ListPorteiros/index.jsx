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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreatePorteiro, useGetPorteiros, useUpdatePorteiro, useDeletePorteiro } from '../hooks/porteiroHooks';
import { useGetCondominios } from '../hooks/useGetCondominios';

const handleError = (error) => {
  console.error('Error:', error.response ? error.response.data : error.message);
};

const TablePorteiros = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedCondominioId, setSelectedCondominioId] = useState(null);

  // Fetch condomínios
  const { data: condominios = [] } = useGetCondominios();

  // Hooks for CRUD operations
  const { mutateAsync: createPorteiro, isPending: isCreatingPorteiro } = useCreatePorteiro();
  const {
    data: fetchedPorteiros = [],
    isError: isLoadingPorteirosError,
    isFetching: isFetchingPorteiros,
    isLoading: isLoadingPorteiros,
  } = useGetPorteiros();
  const { mutateAsync: updatePorteiro, isPending: isUpdatingPorteiro } = useUpdatePorteiro();
  const { mutateAsync: deletePorteiro, isPending: isDeletingPorteiro } = useDeletePorteiro();

  const validateForm = (values) => {
    const errors = {};
    if (!values.nome) errors.nome = 'Nome é obrigatório';
    if (!values.rg) errors.rg = 'RG é obrigatório';
    if (!values.senha) errors.senha = 'Senha é obrigatória';
    if (!selectedCondominioId) errors.condominioId = 'Condomínio é obrigatório';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreatePorteiro = async ({ values, table }) => {
    if (!validateForm(values)) return;
    try {
      await createPorteiro({ ...values, condominioId: selectedCondominioId });
      table.setCreatingRow(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSavePorteiro = async ({ values, table }) => {
    if (!validateForm(values)) return;
    try {
      await updatePorteiro({ ...values, condominioId: selectedCondominioId });
      table.setEditingRow(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeletePorteiro = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esse porteiro?')) {
      try {
        await deletePorteiro(id);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const table = useMaterialReactTable({
    columns: useMemo(() => [
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
            setValidationErrors((prev) => ({ ...prev, nome: undefined })),
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
            setValidationErrors((prev) => ({ ...prev, rg: undefined })),
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
            setValidationErrors((prev) => ({ ...prev, senha: undefined })),
        },
      },
      {
        accessorKey: 'condominioId',
        header: 'Condomínio',
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          error: !!validationErrors?.condominioId,
          helperText: validationErrors?.condominioId,
          onFocus: () =>
            setValidationErrors((prev) => ({ ...prev, condominioId: undefined })),
        },
      },
    ], [validationErrors, condominios]),
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
      setSelectedCondominioId(null);
    },
    onCreatingRowSave: handleCreatePorteiro,
    onEditingRowCancel: () => {
      setValidationErrors({});
      setSelectedCondominioId(null);
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
            value={condominios.find((condominio) => condominio.id === selectedCondominioId) || null}
            onChange={(event, newValue) => setSelectedCondominioId(newValue ? newValue.id : null)}
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
            value={condominios.find((condominio) => condominio.id === selectedCondominioId) || null}
            onChange={(event, newValue) => setSelectedCondominioId(newValue ? newValue.id : null)}
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
          <IconButton color="error" onClick={() => handleDeletePorteiro(row.original.id)}>
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

export default TablePorteiros;