export const validateRequired = (value) => !!value.length;

export const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export const validatePhoneNumber = (phoneNumber) =>
  !!phoneNumber.length &&
  phoneNumber.match(
    /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
  );

export function validateUser(user) {
  const errors = {};

  // Validação do nome
  if (!validateRequired(user.nome)) {
    errors.nome = 'Preencha o campo obrigatório';
  }

  // Validação do turno
  if (!validateRequired(user.turno)) {
    errors.turno = 'Preencha o campo obrigatório';
  }

  // Validação do email
  if (!validateRequired(user.email)) {
    errors.email = 'Preencha o campo obrigatório';
  } else if (!validateEmail(user.email)) {
    errors.email = 'Email não está no formato correto';
    console.log('Erro de validação: Formato de email inválido');
  }

  // Validação do telefone celular
  if (!validateRequired(user.telefoneCelular)) {
    errors.telefoneCelular = 'Preencha o campo obrigatório';
  } else if (!validatePhoneNumber(user.telefoneCelular)) {
    errors.telefoneCelular = 'Telefone celular não está no formato correto';
    console.log('Erro de validação: Formato de telefone celular inválido');
  }

  return errors;
}