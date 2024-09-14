export const validateEntrega = (values) => {
  const errors = {};

  if (!values.nome) {
      errors.nome = "O destinatário é obrigatório.";
  }

  if (!values.apartamento) {
      errors.apartamento = "O apartamento é obrigatório.";
  } else if (isNaN(values.apartamento) || values.apartamento <= 0) {
      errors.apartamento = "O apartamento deve ser um número positivo.";
  }

  if (!values.dataRecebido) {
      errors.dataRecebido = "A data recebida é obrigatória.";
  } else if (!validateDate(values.dataRecebido)) {
      errors.dataRecebido = "A data recebida deve ser uma data válida.";
  }

  if (values.dataRetirado && !validateDate(values.dataRetirado)) {
      errors.dataRetirado = "A data retirada deve ser uma data válida.";
  }

  return errors;
};


// Funções auxiliares para validação
const validateRequired = (value) => !!value;

// Validação de data
const validateDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date <= today;
};

// Validação para o formulário de morador
export function validateMorador(user) {
  const errors = {};

  // Validação do nome
  if (!validateRequired(user.nome)) {
    errors.nome = 'Preencha o campo obrigatório';
  }

  // Validação da data recebida
  if (!validateRequired(user.dataRecebido)) {
    errors.dataRecebido = 'Preencha o campo obrigatório';
  } else if (!validateDate(user.dataRecebido)) {
    errors.dataRecebido = 'A data não pode ser maior que a data atual';
    console.log('Erro de validação: Data inserida maior que a data atual');
  }

  return errors;
}
