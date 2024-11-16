export const validateEntrega = (values) => {
  const errors = {};


  if (!validateRequired(values.tipoEntrega)) {
    errors.tipoEntrega = "O tipo de entrega é obrigatório.";
  } else if (values.tipoEntrega.length < 2 || values.tipoEntrega.length > 300) {
    errors.tipoEntrega = "O tipo de entrega deve ter entre 2 e 300 caracteres.";
  }


  if (!validateRequired(values.dataRecebimentoPorteiro)) {
    errors.dataRecebimentoPorteiro = "A data de recebimento pelo porteiro é obrigatória.";
  } else if (!validateDate(values.dataRecebimentoPorteiro)) {
    errors.dataRecebimentoPorteiro = "A data deve ser uma data válida e não futura.";
  }


  if (!validateRequired(values.numAp)) {
    errors.numAp = "O número do apartamento é obrigatório.";
  } else if (isNaN(values.numAp) || values.numAp <= 0) {
    errors.numAp = "O número do apartamento deve ser um número positivo.";
  }

  if (!validateRequired(values.idPorteiro)) {
    errors.idPorteiro = "O ID do porteiro é obrigatório.";
  } else if (!Number.isInteger(Number(values.idPorteiro)) || Number(values.idPorteiro) <= 0) {
    errors.idPorteiro = "O ID do porteiro deve ser um número inteiro positivo.";
  }

  return errors;
};


const validateRequired = (value) => {
  return value !== undefined && value !== null && value !== "";
};


const validateDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date <= today; 
};
