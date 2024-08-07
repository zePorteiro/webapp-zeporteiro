export function validarNome(nome) {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/;
  return regex.test(nome);
}

export function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function validarRG(rg) {
  const regex = /^[0-9]{1,9}$/;
  return regex.test(rg);
}

export const validarCelular = (valor) => {
  return /^\d{0,11}$/.test(valor); // Retorna true se o valor contiver apenas números e tiver no máximo 11 dígitos
};