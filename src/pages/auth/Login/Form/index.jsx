import React, { useState } from "react";
import authService from "../../../../services/api/authService";
import {
  Form,
  InputWrapper,
  InputLabel,
  RequiredIndicator,
  EmailInput,
  PasswordField,
  PasswordInput,
  EyeIcon,
  MensagemErro,
  Botao,
} from "./styles";
import IconButton from "@mui/material/IconButton";

const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (event) => {
    const novoEmail = event.target.value;
    setEmail(novoEmail);
    validarEmail(novoEmail);
  };

  const handleBlurEmail = () => {
    setTouchedEmail(true);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(valor));
  };

  const isInvalidEmail = !isValidEmail && touchedEmail;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(email, senha);
      if (response) {
        window.location.href = "/cadastrar-encomenda";
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputLabel htmlFor="email">
          Email<RequiredIndicator>*</RequiredIndicator>
        </InputLabel>
        <EmailInput
          type="email"
          id="email"
          name="email"
          placeholder="Digite o seu email"
          value={email}
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
          $isValid={isValidEmail}
          autoComplete="email"
          disabled={loading}
        />
        {isInvalidEmail && <MensagemErro>Email inválido</MensagemErro>}
      </InputWrapper>

      <InputWrapper>
        <InputLabel htmlFor="senha">
          Senha<RequiredIndicator>*</RequiredIndicator>
        </InputLabel>
        <PasswordField>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            id="senha"
            name="senha"
            placeholder="Digite a sua senha"
            value={senha}
            onChange={handleChangeSenha}
            autoComplete="current-password"
            disabled={loading}
          />
          <IconButton
            onClick={togglePasswordVisibility}
          />
        </PasswordField>
      </InputWrapper>
      {error && <MensagemErro>{error}</MensagemErro>}
      <Botao type="submit" disabled={loading}>
        Login
      </Botao>
    </Form>
  );
};

export default FormularioLogin;
