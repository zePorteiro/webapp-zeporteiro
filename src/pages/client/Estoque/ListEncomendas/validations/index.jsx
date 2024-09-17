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


  if (!validateRequired(values['apartamento.id'])) {
    errors['apartamento.id'] = "O ID do apartamento é obrigatório.";
  } else if (isNaN(values['apartamento.id']) || values['apartamento.id'] <= 0) {
    errors['apartamento.id'] = "O ID do apartamento deve ser um número positivo.";
  }

 
  if (!validateRequired(values['porteiro.nome'])) {
    errors['porteiro.nome'] = "O nome do porteiro é obrigatório.";
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
