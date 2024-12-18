import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import {
  Form,
  InputWrapper,
  InputLabel,
  RequiredIndicator,
  EmailInput,
  PasswordField,
  PasswordInput,
  MensagemErro,
  Botao,
} from "./styles";

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
    console.log("Formulário de login submetido.");

    try {
      const response = await axios.post("http://10.0.0.145:8080/clientes/login", {
        email,
        senha,
      });
      sessionStorage.setItem("token", response.data.token)

      console.log("Status HTTP da resposta:", response.status);

      if (response.status === 200 || response.status === 201) {
        toast.success("Login realizado com sucesso!");
        setTimeout(() => {
          window.location.href = "/cadastrar-encomenda";
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Credenciais incorretas. Verifique seu email e senha.");
        } else {
          toast.error(error.response.data.message || "Erro ao fazer login. Por favor, tente novamente.");
        }
      } else {
        toast.error("Erro ao fazer login. Verifique sua conexão e tente novamente.");
      }
    }

    setLoading(false);
    console.log("Processo de login concluído.");
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
          <IconButton onClick={togglePasswordVisibility}>
            <Visibility /> {/* Inclua o ícone aqui */}
          </IconButton>
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
