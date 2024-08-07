import * as React from "react";

import {
  FormularioContato,
  CamposFormulario,
  CampoFormulario,
  Rotulo,
  Entrada,
  CampoTelefone,
  CamposTelefone,
  MensagemErro,
  BotaoSubmit,
} from "./styles";

export default function FormParaContato() {
  const [telefone, setTelefone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailValido, setEmailValido] = React.useState(true);
  const [telefoneValido, setTelefoneValido] = React.useState(true);

  const formatarTelefone = (telefone) => {
    const apenasNumeros = telefone.replace(/[^\d]/g, "");
    const telefoneFormatado = apenasNumeros.replace(
      /^(\d{5})(\d{0,4})/,
      "$1-$2"
    );
    return telefoneFormatado;
  };

  const handleChangeTelefone = (event) => {
    const novoTelefone = event.target.value;
    setTelefone(formatarTelefone(novoTelefone));
    validarTelefone(novoTelefone);
  };

  const handleChangeEmail = (event) => {
    const novoEmail = event.target.value;
    setEmail(novoEmail);
    validarEmail(novoEmail);
  };

  const validarEmail = (email) => {
    const regexEmail = /\S+@\S+\.\S+/;
    setEmailValido(regexEmail.test(email));
  };

  const validarTelefone = (telefone) => {
    const apenasNumeros = telefone.replace(/[^\d]/g, "");
    setTelefoneValido(apenasNumeros.length === 9);
  };

  return (
    <FormularioContato>
      <CamposFormulario>
        <CampoFormulario>
          <Rotulo>Nome do Responsável</Rotulo>
          <Entrada type="text" placeholder="Digite o seu nome completo" />
        </CampoFormulario>
        <CampoFormulario>
          <Rotulo>E-mail para contato</Rotulo>
          <Entrada
            type="email"
            placeholder="Digite o seu email"
            value={email}
            onChange={handleChangeEmail}
          />
          {!emailValido && <MensagemErro>Email inválido</MensagemErro>}
        </CampoFormulario>
        <CamposTelefone>
          <CampoTelefone>
            <Rotulo>DDD</Rotulo>
            <Entrada type="tel" placeholder="DDD" />
          </CampoTelefone>
          <CampoTelefone>
            <Rotulo>Telefone</Rotulo>
            <Entrada
              type="tel"
              placeholder="Número do telefone"
              value={telefone}
              onChange={handleChangeTelefone}
            />
            {!telefoneValido && (
              <MensagemErro>O telefone celular deve ter 9 dígitos</MensagemErro>
            )}
          </CampoTelefone>
        </CamposTelefone>
      </CamposFormulario>
      <BotaoSubmit>Contrate agora</BotaoSubmit>
    </FormularioContato>
  );
}
