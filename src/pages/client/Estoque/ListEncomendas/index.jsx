// TableEntregas.js
import { useMemo, useState } from "react";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Select, MenuItem } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useCreateEntrega, useUpdateEntrega, useDeleteEntrega, useGetEntregas } from "./hooks/entregasHooks";
import { validateEntrega } from "./validations";

const TableEntregas = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const { mutateAsync: createEntrega, isLoading: isCreatingEntrega } = useCreateEntrega();
  const { mutateAsync: updateEntrega, isLoading: isUpdatingEntrega } = useUpdateEntrega();
  const { mutateAsync: deleteEntrega, isLoading: isDeletingEntrega } = useDeleteEntrega();

  const { data: fetchedEntregas = [], isLoading: isLoadingEntregas, isError: isLoadingEntregasError, isFetching: isFetchingEntregas } = useGetEntregas();
  const { allPorteiros } = useCreateEntrega();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID da Entrega',
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
      {
        accessorKey: 'tipoEntrega',
        header: 'Tipo de Entrega',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.tipoEntrega,
          helperText: validationErrors?.tipoEntrega,
          onFocus: () => setValidationErrors((prevErrors) => ({
            ...prevErrors,
            tipoEntrega: undefined,
          })),
          InputLabelProps: {
            shrink: true,
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px',
              },
            },
            // Adicionando validação de tamanho
            inputProps: {
              minLength: 2,
              maxLength: 300,
            },
          },
          // Validação em tempo real
          onChange: (e) => {
            const value = e.target.value;
            if (value.length > 300) {
              e.target.value = value.slice(0, 300);
            }
          },
        },
      },
      {
        accessorKey: 'dataRecebimentoPorteiro',
        header: 'Data de Recebimento do Porteiro',
        muiEditTextFieldProps: {
          type: 'date',
          required: true,
          error: !!validationErrors?.dataRecebimentoPorteiro,
          helperText: validationErrors?.dataRecebimentoPorteiro,
          onFocus: () => setValidationErrors((prevErrors) => ({
            ...prevErrors,
            dataRecebimentoPorteiro: undefined,
          })),
          InputLabelProps: {
            shrink: true,
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px',
              },
            },
          },
          // Adiciona validação de data não futura
          inputProps: {
            max: new Date().toISOString().split('T')[0], // Define a data máxima como hoje
          },
        },
      },
      {
        accessorKey: 'dataRecebimentoMorador',
        header: 'Data de Recebimento do Morador',
        muiTableBodyCellProps: {
          sx: { textAlign: 'center' },
        },
        muiEditTextFieldProps: {
          required: false,
          type: 'date',
          disabled: true, // mantido disabled pois é preenchido apenas na confirmação de recebimento
          error: !!validationErrors?.dataRecebimentoMorador,
          helperText: validationErrors?.dataRecebimentoMorador,
          InputLabelProps: {
            shrink: true,
          },
          InputProps: {
            sx: {
              '& input': {
                paddingTop: '8px',
              },
            },
          },
        },
      },
      {
        accessorKey: 'recebido',
        header: 'Recebido',
        muiTableBodyCellProps: {
          sx: { textAlign: 'center' },
        },
        Cell: ({ cell }) => (
          <span>
            {cell.getValue() ? 'Sim' : 'Não'}
          </span>
        ),
        muiEditTextFieldProps: {
          select: false,
          required: false,
          disabled: true,
          error: !!validationErrors?.recebido,
          helperText: validationErrors?.recebido,
          SelectProps: {
            native: true,
          },
          children: [
            <option key="" value="">
              Selecione
            </option>,
            <option key="true" value="true">
              Sim
            </option>,
            <option key="false" value="false">
              Não
            </option>,
          ],
        },
      },
      {
        accessorKey: 'numAp',
        header: 'Número Apto',
        muiEditTextFieldProps: {
          type: 'text',
          required: true,
          disabled: false,
          error: !!validationErrors?.numAp,
          helperText: validationErrors?.numAp,
          InputLabelProps: {
            shrink: true,
          },
          inputProps: {
            pattern: '^[0-9]+$',
            inputMode: 'numeric',
          },
          onChange: (e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
          },
        },
        Cell: ({ cell }) => cell.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'idPorteiro',
        header: 'ID do Porteiro',
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          disabled: false,
          error: !!validationErrors?.idPorteiro,
          helperText: validationErrors?.idPorteiro,
          InputLabelProps: {
            shrink: true,
          },
          inputProps: {
            min: 1,
          },
        },
      }
    ],
    [validationErrors]
  );

  const handleCreateEntrega = async ({ values, table }) => {
    try {
      console.log("Iniciando criação de entrega:", values);
      const entrega = {
        tipoEntrega: values.tipoEntrega,
        dataRecebimentoPorteiro: values.dataRecebimentoPorteiro,
        dataRecebimentoMorador: values.dataRecebimentoMorador,
        recebido: values.recebido ?? false,
        numAp: values.numAp,
        idPorteiro: values.idPorteiro
      };

      await createEntrega(entrega);
      table.setCreatingRow(null);
    } catch (error) {
      console.error('Erro ao criar entrega:', error);
    }
  };

  const handleCreateEntregaAction = async ({ values, table }) => {
    const newValidationErrors = validateEntrega(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("Erros de validação:", newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    }
    console.log("Validação concluída, iniciando salvamento");
    setValidationErrors({});
    await handleCreateEntrega({ values, table });
  };

  const handleSaveEntrega = async ({ values, table }) => {
    const newValidationErrors = validateEntrega(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      console.log("Erros de validação:", newValidationErrors);
      setValidationErrors(newValidationErrors);
      return;
    }
    console.log("Validação concluída, iniciando atualização");
    setValidationErrors({});

    try {
      await updateEntrega(values);
      table.setEditingRow(null);
    } catch (error) {
      console.error('Erro ao atualizar entrega:', error);
    }
  };


  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Tem certeza que deseja excluir essa entrega?")) {
      deleteEntrega(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedEntregas,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingEntregasError
      ? { color: "error", children: "Erro ao carregar dados" }
      : undefined,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntregaAction,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEntrega,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Adicionar Entrega</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Editar Entrega</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
    renderTopToolbarCustomActions: ({ table }) => {
      const handleGenerateCSV = () => {

        const headers = [
          'Tipo de Entrega',
          'Data Recebimento Porteiro',
          'Data Recebimento Morador',
          'Recebido',
          'Número do Apartamento',
          'Nome do Porteiro'
        ].join(',');

        const rows = fetchedEntregas.map((entrega) => {

          const formatDate = (date) => date ? new Date(date).toLocaleString() : '';

          return [
            entrega.tipoEntrega,
            formatDate(entrega.dataRecebimentoPorteiro),
            formatDate(entrega.dataRecebimentoMorador),
            entrega.recebido ? 'Sim' : 'Não',
            entrega.numAp,
            entrega.porteiroNome
          ].join(',');
        });

        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'entregas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={() => table.setCreatingRow(true)}
            style={{ marginRight: '8px' }}
          >
            Adicionar Entrega
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleGenerateCSV}
          >
            Gerar CSV
          </Button>
        </div>
      );
    },
    isLoading: isLoadingEntregas,
    isSaving: isCreatingEntrega || isUpdatingEntrega || isDeletingEntrega,
    showAlertBanner: isLoadingEntregasError,
    showProgressBars: isFetchingEntregas,
  });

  return <MaterialReactTable table={table} />;
};

export default TableEntregas;
