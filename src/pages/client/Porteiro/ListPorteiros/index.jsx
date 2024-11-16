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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreatePorteiro, useGetPorteiros, useUpdatePorteiro, useDeletePorteiro } from '../hooks/porteiroHooks';
import { useGetCondominios } from '../hooks/useGetCondominios';

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

  const { mutateAsync: createPorteiro, isPending: isCreatingPorteiro } = useCreatePorteiro();
  const {
    data: fetchedPorteiros = [],
    isError: isLoadingPorteirosError,
    isFetching: isFetchingPorteiros,
    isLoading: isLoadingPorteiros,
  } = useGetPorteiros();
  const { mutateAsync: updatePorteiro, isPending: isUpdatingPorteiro } = useUpdatePorteiro();
  const { mutateAsync: deletePorteiro, isPending: isDeletingPorteiro } = useDeletePorteiro();

  const handleCreatePorteiro = async ({ values, table }) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const condominioId = Number(sessionStorage.getItem('condominioId'));
      await createPorteiro({ ...values, condominioId });
      table.setCreatingRow(null);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSavePorteiro = async ({ values, table }) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const condominioId = Number(sessionStorage.getItem('condominioId'));
      await updatePorteiro({ ...values, condominioId });
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
            console.log('Nome Value onBlur:', value); // Log de depuração
            if (!/^[A-Za-z\s]+$/.test(value)) { // Permitir espaços
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
            console.log('RG Value onBlur:', value); // Log de depuração
            if (!/^\d{1,9}$/.test(value)) {
              setValidationErrors((prev) => ({ ...prev, rg: 'RG deve conter apenas números e ter no máximo 9 dígitos' }));
            }
          },
        },
      },
      {
        accessorKey: 'senha',
        header: 'Senha',
        muiEditTextFieldProps: {
          type: 'password',
          required: true,
          error: !!validationErrors.senha,
          helperText: validationErrors.senha,
          onFocus: () => setValidationErrors((prev) => ({ ...prev, senha: undefined })),
        },
      },
      {
        accessorKey: 'condominioId',
        header: 'Condomínio',
        muiEditTextFieldProps: {
          type: 'number',  
          required: true,
          error: !!validationErrors.condominioId,
          helperText: validationErrors.condominioId,
          onFocus: () => setValidationErrors((prev) => ({ ...prev, condominioId: undefined })),
        },
        renderCell: ({ cell }) => (
          <TextField
            value={selectedCondominioId || ''}  
            onChange={(e) => setSelectedCondominioId(e.target.value)}
            fullWidth
            type="number"
          />
        ),
      },
    ], [validationErrors, selectedCondominioId]),
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
    },
    onCreatingRowSave: handleCreatePorteiro,
    onEditingRowCancel: () => {
      setValidationErrors({});
    },
    onEditingRowSave: handleSavePorteiro,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Porteiro</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
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
        <DialogTitle variant="h3">Editar Porteiro</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
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
        color="success" 
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Adicionar Porteiro
      </Button>
    ),
    isLoading: isLoadingPorteiros,
    isSaving: isCreatingPorteiro || isUpdatingPorteiro || isDeletingPorteiro,    
  });

  return <MaterialReactTable table={table} />;
};

export default TablePorteiros;