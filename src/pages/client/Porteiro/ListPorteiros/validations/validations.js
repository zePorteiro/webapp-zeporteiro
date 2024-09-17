export const validateRequired = (value) => {
  return value !== undefined && value !== null && value.length > 0;
};

export const validateSize = (value, minLength, maxLength) => {
  return value.length >= minLength && value.length <= maxLength;
};

export const validateNumericLength = (value, maxLength) => {
  const numbersOnly = /^\d+$/; 
  return numbersOnly.test(value) && value.length <= maxLength;
};

export function validatePorteiro(porteiro) {
  const errors = {};

  // Validação do nome
  if (!validateRequired(porteiro.nome)) {
    errors.nome = 'Nome é obrigatório';
  } else if (!validateSize(porteiro.nome, 1, 100)) {
    errors.nome = 'Nome deve ter entre 1 e 100 caracteres';
  }

  // Validação do RG
  if (!validateRequired(porteiro.rg)) {
    errors.rg = 'RG é obrigatório';
  } else if (!validateNumericLength(porteiro.rg, 9)) {
    errors.rg = 'RG deve conter apenas números e ter no máximo 9 dígitos';
  }

  // Validação da senha
  if (!validateRequired(porteiro.senha)) {
    errors.senha = 'Senha é obrigatória';
  } else if (!validateSize(porteiro.senha, 6, 20)) {
    errors.senha = 'Senha deve ter entre 6 e 20 caracteres';
  }

  // Validação do ID do condomínio
  if (porteiro.condominioId === undefined || porteiro.condominioId === null) {
    errors.condominioId = 'ID do condomínio é obrigatório';
  }

  return errors;
}
